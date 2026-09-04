# Yashvi's Birthday Website — Design Skeleton

## Concept
A single-page, cinematic experience. She opens the site, taps once to "begin,"
and from that point on the site plays itself like a short film — sections
transition automatically, timed to the voice note, rather than being scrolled
manually. No scrollbar-driven pacing; the voice note IS the pacing.
If she wants to linger, a manual scroll should still work as an override, but
the default experience is hands-off after the opening tap.

**Tone:** dreamy, cinematic, warm-dark, happy-but-teary.
**Stack:** Vite + React (already set up), Tailwind CSS for layout/utility styling, Framer Motion for animation (with manual CSS/JS where Framer Motion doesn't fit — e.g. the audio-timeline sync itself is plain JS state, not an animation library concern). Photos in `/public/images`, audio in `/public/audio`.

---

## Color Palette
| Role | Hex | Use |
|---|---|---|
| Base background | `#1a1410` | Page background, near-black but warm (not pure black) |
| Background alt | `#221a15` | Secondary panels, card backgrounds |
| Primary accent (warmth) | `#e8a94a` → `#f4c47a` | Headlines, glow effects, the "open" button, active states |
| Secondary accent | `#c9776b` | Timeline dots, photo overlay tints, dividers |
| Text | `#f2e8dc` | Body copy, warm off-white — never pure white |
| Muted text | `#b8a998` | Captions, dates, secondary labels |

Overall reference: candlelight in a dark room / golden hour through a window / warm film grain.

---

## Global Motion Language
- Slow fades and gentle upward drift (12–20px) on entry, nothing snappy or "corporate."
- Soft film-grain or noise overlay (very subtle, ~4-6% opacity) across the whole site for cinematic texture.
- Warm vignette on all photos (darken edges slightly, keep center warm-lit).
- Section transitions: crossfade + slight scale (1.02 → 1.0), not hard cuts.
- A single ambient particle/light layer (dust motes or soft bokeh) persists faintly behind every section — this is what stitches the "movie" feeling together instead of each section feeling separate.

---

## Animation & Styling Division of Labor
To keep the build consistent rather than mixing approaches ad hoc per section:

- **Tailwind** — layout, spacing, typography sizing, responsive breakpoints, anything static. Reference the `globals.css` tokens via Tailwind's theme config (extend `colors`, `fontFamily` from the CSS variables) rather than hardcoding hex/px values in `className` strings.
- **Framer Motion** — all entrance/exit animations, crossfades between sections, the staggered `SplitText`-style reveals, photo focus-ins, drift/parallax in the Gallery. This should be the default for anything driven by React state (which section is active, which photo is showing).
- **Manual CSS** — the film grain overlay, vignette gradients, glow effects (`text-shadow`, `filter`) — static visual texture that doesn't need to animate or respond to state, defined once in `globals.css` and applied via utility classes.
- **Manual JS (no library)** — the `MasterTimeline`/`AudioGate` logic itself. This is state management keyed to `audio.currentTime`, not animation — Framer Motion should *react* to this state (e.g. `animate` triggered when `currentSection` changes), not drive the timeline itself.

**react-bits components** (`Aurora`, `SplitText`, `PixelTransition`, etc.) already bring their own animation internally — don't wrap them in additional Framer Motion unless you need to control *when* they mount/unmount relative to the timeline, in which case Framer Motion's `AnimatePresence` around the react-bits component (not inside it) is the right layer.



**Design tokens** (colors, fonts, motion timing) live in `globals.css` — import first, reference via CSS variables everywhere below. Do not hardcode hex values in components.

| Section | react-bits components | Custom components needed |
|---|---|---|
| 1. Opening Gate | `Aurora` or `DarkVeil` (background), `FadeContent` (name/prompt) | `AudioGate` — handles the tap, starts audio + drives the master timeline |
| 2. Café | `SplitText` (phrase reveal), `GridDistortion` or `PixelTransition` (photo focus-in) | `PhotoFocusReveal` — blurred → sharp transition synced to `AudioGate` timeline |
| 3. Falling / Proposal | `AnimatedContent` (timeline dot/label) | — |
| 4. Timeline of Memories | `PixelTransition` / `GridDistortion` (photo-to-photo), `ImageTrail` (lighter beats) | `TimelineSequencer` — divides section duration evenly across however many photos are placed in `/public/images`; reads photo count at build/runtime |
| 5. Declaration | `SplitText` (staggered lines), `LightRays` or `Beams` (warm-tinted background) | — |
| 6. Closing | `Aurora`/`DarkVeil` (bookend), `FadeContent` | `ReplayPrompt` — quiet replay option once audio ends |
| 7. Gallery (post-audio) | `ImageTrail` or custom masonry | `DriftGallery` — parallax/tilt masonry, self-paced, not audio-timed. No react-bits equivalent covers this cleanly |
| Global | — | `MasterTimeline` — single source of truth keyed to `audio.currentTime` for sections 1–6; once audio ends, control hands off to `DriftGallery`'s own scroll/interaction state. `FilmGrainOverlay` — persistent subtle noise layer (`--grain-opacity` token) |

**Note on custom components:** these aren't available pre-built anywhere — they're the connective tissue that makes the "movie" concept actually work (audio-driven sequencing, not scroll-driven). Budget the most build time here, not on the react-bits pieces.

---



### 1. Opening Gate (0:00 — before playback starts)
- Full-bleed dark background, `Aurora` or `DarkVeil` (react-bits) in slow motion, warm-tinted (override default cool colors with the accent palette above).
- Center: her name, "Yashvi," in a soft serif or elegant script, gently glowing (`#e8a94a`).
- Below it, a single small prompt — something like "tap to begin" — pulsing gently.
- **This tap is what starts both the voice note audio AND the auto-scroll sequence.** Solves the browser autoplay restriction and becomes the ritual moment of "opening" the site.
- React-bits: `Aurora`/`DarkVeil` for background, `FadeContent` for the name/prompt entrance.

### 2. Café — First Meeting (audio 0:32–1:35)
- **Photo: the mirror selfie from the actual day you met** — the one where the wall text behind you both reads "LET'S MAKE IT HAPPEN." Use this as the hero image for this section. That text is real, unplanned, and lands as a quiet wink once she notices it — worth letting the photo hold a beat longer than the others so it can actually be read.
- Photo as a soft blurred/dimmed background at first, then sharpens into focus right as the mirror text becomes legible — a small reveal moment.
- This beat is longer than originally planned (~1 min) because your actual recording adds the "you said no initially but then you agreed" detail and the improvised line about learning each other's traumas within a day. Worth a second on-screen fragment for that: e.g. "One day. Already knowing each other's scars." — timed to land after the first phrase, not competing with it.
- React-bits: `SplitText` for the phrase reveals (two, spaced apart), `GridDistortion` or `PixelTransition` as the photo eases into focus.

### 3. The Hours That Turned Into Days (audio 1:35–2:30)
- Transition to a second photo — something a little more intimate/close (image 2 or 4 style).
- Subtle timeline marker appears here (a small glowing dot with a date/label) — this is the start of the "timeline" thread that continues through the rest of the site.
- Text on screen: minimal, one line, e.g. "Five days." — let the audio carry this section, visuals stay quiet.
- React-bits: `AnimatedContent` for the dot/label entrance.

### 4. Now — Timeline of Memories (audio 2:30–3:40, longest section)
- This is the vertical "chapters" sequence — each photo you have gets its own beat.
- Layout: one photo per beat, large and centered, soft warm vignette, with a short caption/date beneath in muted text (`#b8a998`).
- Internally this section has two emotional registers, worth a subtle shift partway through (~3:09): the first half is about presence ("every weekend," "condition my system runs on"), the second half shifts to constancy ("baseline now," "quiet hum"). Consider a slightly slower photo pace or a subtle lighting shift at that internal midpoint rather than treating it as flat throughout.
- Alternate tone photo-to-photo (goofy candid → romantic close → goofy → romantic) rather than strict chronological seriousness.
- React-bits: `PixelTransition` or `GridDistortion` between each photo change; `ImageTrail` if you want a lighter, playful moment mixed in (good for the goofier photos).

### 5. Declaration (audio 3:40–4:26 — future imagining, building to the peak line)
- Strip back to near-empty frame — dark background, ambient light layer only, no photo.
- Let most of this beat run with no on-screen text at all — the "keys and shared mornings" imagery is vivid enough spoken, text would compete with it.
- Reserve on-screen text for the very end of the beat only, as the bridge into Section 6:
  - "I am endlessly, stupidly, completely certain about you."
- This is the emotional peak line — give it the most breathing room of anything in the site, held a beat longer than any other text moment.
- React-bits: `SplitText` with slow stagger (used sparingly, just for the one line), `LightRays` or `Beams` (warm-tinted) behind the text.

### 6. Closing (audio 4:26–4:42 — "Happy birthday my love... always and forever, I love you so much")
- Return to the opening's visual language — same background treatment as the gate, for symmetry.
- Final spoken line becomes the on-screen text — she actually closes with "Now and then. Always and forever. I love you so much," which is a stronger closing line to put on screen than a paraphrase:
  - "Now and then. Always and forever."
- Audio ends here. This is where control hands off from the `MasterTimeline` to the standalone `DriftGallery` — see Section 7.
- React-bits: `Aurora`/`DarkVeil` again (bookend), `FadeContent` for final text.

### 7. Gallery — "All of Us" (post-audio, self-paced — not timed to the recording)
- Once the voice note ends, the site transitions into a free-form gallery she can browse at her own pace — no timer, no auto-advance.
- Drifting masonry of all remaining photos, gentle parallax/tilt on hover (desktop) or scroll (mobile).
- A quiet replay option lives here too (`ReplayPrompt`) — she'll very likely want to hear it again right after.
- React-bits: `ImageTrail` or a soft masonry with subtle hover glow.

---

## Audio Timeline & Section Mapping
Recording is **4:42.18 (282.18s)** — confirmed via file metadata. Timestamps below are built from your actual transcript with timing anchors, not estimated from word count.

| Timestamp | Section | Beat |
|---|---|---|
| 0:00 – 0:32 | 1. Opening Gate | Name, repeated; "what happens now and daily" |
| 0:32 – 1:35 | 2. Café | Meeting story + improvised "traumas/insecurities within a day" line |
| 1:35 – 2:30 | 3. Falling / Proposal | Sitting with her pain, five days, "not for one second, not for two second, no way" |
| 2:30 – 3:09 | 4a. Timeline (presence) | "Every weekend... condition my system runs on" |
| 3:09 – 3:40 | 4b. Timeline (constancy) | "Baseline now... quiet humming underneath every single day" |
| 3:40 – 4:26 | 5. Declaration | Future imagining → "endlessly, stupidly, completely certain about you" |
| 4:26 – 4:42 | 6. Closing | "Happy birthday my love... always and forever, I love you so much" |
| — (post-audio) | 7. Gallery | Self-paced, not on the audio timeline |

Section 4 (combined 2:30–3:40, ~70s) is still the longest photo-driven section — good, that's real room for a proper chapter sequence. If you end up with fewer than ~15-20 photos, slow the per-photo hold time rather than adding filler.

## Voice Note Script (as actually recorded, with real timestamps)

**[Section 1 — Opening, 0:00–0:32]**
"Yashvi, my baby, happy birthday to you and I am really happy for your birthday. I want to start by saying your name the way it actually lives in my head. Not once, calmly, like a normal thought, but on repeat, running under everything else I do all the day. That's not an exaggeration for effect, that's just what happens now and daily."

**[Section 2 — Café, 0:32–1:35]**
"I want you to, you know, go back with me for a second to that cafe, like Pakeki, we know that, where we only meant to go there for introducing each other, nothing more. And me with this small forgettable plan, I asked you to go to the party and I was like let's see what happens — you said no initially but then you agreed. And instead of that being the end of anything, it became the actual beginning of everything, because we just kept talking, hours and hours, like they were minutes. I didn't notice time was leaving the room. And when did we just got so close to each other that within one day we know the traumas of each other and we know the insecurities of each other. I mean like wow, isn't it fascinating to you."

**[Section 3 — Falling / Proposal, 1:35–2:30]**
"Somewhere in those hours you started letting me see the parts of you which still caused you pain — the ones left over from before me. And something in me didn't want to fix you exactly, I wanted to sit close enough to that pain that it couldn't hurt you anymore, it don't makes you feel alone. I think that's the closest I can get to explaining what happened between us in those first few days. Five days I guess, and I don't know, you looked at me and decided I was safe enough to hand you your heart. And I still think about how much courage that must have taken, and I don't take it lightly, not for one second, not for two second, no way."

**[Section 4a — Timeline (presence), 2:30–3:09]**
"Every weekend since then, I show up wherever you are, and something in my chest settles the moment I see you — like whatever version of me exists during these weeks, during all of this time, was just a rough draft waiting for the real one to come back online. You didn't just become important to me. You became the condition my whole system runs — I don't function the way I'm supposed to when you're not here, you're not near, I mean I just go crazy."

**[Section 4b — Timeline (constancy), 3:09–3:40]**
"And while I used to think love was something you felt in bursts, a good moment, a nice memory, a warm feeling that came and went — you ruined that theory completely for me. What I feel for you doesn't come and go, it's just the baseline now, the quiet humming underneath every single day, whether I'm actively thinking about you or not — but you know that already, that I actively think about you milliseconds a day."

**[Section 5 — Declaration, 3:40–4:26]**
"And I know I'm already picturing things that haven't happened yet, like us building an actual life together, the kind with keys and shared mornings and arguments about nothing and a future I get to keep choosing over and over, for real. I want all of it baby, I really want all of it, with you specifically, not as an abstract idea of a future, but as a very particular one — whatever my future is, I just want it with you, I want you to be in that moment. So today, of everything I could say, here's what I actually want you to keep: I'm endlessly, stupidly, completely certain about you."

**[Section 6 — Closing, 4:26–4:42]**
"Happy birthday my love. Whatever comes next, I already know — I want you to know that I will be standing next to you for it. Now and then. Always and forever. I love you so much."

---

## Companion File
`globals.css` — ships alongside this doc, contains all color/typography/motion tokens as CSS custom properties. Reference `var(--color-accent)` etc. rather than hardcoding hex values anywhere in components.

## Technical Notes for Build
- **Autoplay:** audio must start only after the Section 1 tap (browser policy). Do not attempt true autoplay-on-load.
- **Auto-scroll:** drive Sections 1–6 with a timeline/state machine keyed to audio `currentTime`, not native scroll position. Manual scroll can still work as a fallback/skip.
- **Audio → Gallery hand-off:** at 4:42 (audio end), `MasterTimeline` hands control to `DriftGallery` — Section 7 is untimed and purely interaction-driven from that point on.
- **Photo count:** if using more than ~40-50 images total, lazy-load everything outside the current + next section to keep it smooth on mobile.
- **Audio format:** compress to opus/aac, ~96–128kbps, keep file size reasonable for fast load.
- **Mobile:** she'll almost certainly open this on her phone — test the whole timed sequence at phone screen width first, not desktop.
- **Timestamp confidence:** the boundaries in the Audio Timeline table above were built from real transcript anchors, but confirm them by ear once the audio's actually loaded in the project — small ±2-3s drift is likely and worth a final pass before it's done.