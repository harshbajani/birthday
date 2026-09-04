export const CAFE_MIRROR_1 = '/images/cafe_mirror_1.jpg'
export const CAFE_MIRROR_2 = '/images/cafe_mirror_2.jpg'

export const PROPOSE_TEXT_1 = '/images/propose_text_1.jpg'
export const PROPOSE_TEXT_2 = '/images/propose_text_2.jpg'

/**
 * Timeline photos — curated subset for the audio-driven sequencer (Section 4).
 * ~25 photos across 70s ≈ 2.8s per photo hold time.
 * Ordered roughly chronologically, alternating tone (candid ↔ romantic).
 */
const TIMELINE_FILES = [
  'IMG-20260209-WA0005.jpg',
  'IMG-20260209-WA0019.jpg',
  'IMG-20260209-WA0024.jpg',
  'IMG-20260209-WA0026.jpg',
  'IMG-20260209-WA0028_01.jpg',
  'IMG-20260209-WA0030.jpg',
  'IMG-20260209-WA0032.jpg',
  'IMG-20260221-WA0016.jpg',
  'IMG-20260221-WA0027.jpg',
  'IMG_20260212_230228_806.jpg',
  'IMG_20260212_230228_811.jpg',
  'IMG_20260214_234329_035.jpg',
  'IMG_20260415_230803_240.jpg',
  'IMG_9703.jpg',
  'IMG_9706.jpg',
  'IMG_9710.jpg',
  'IMG_9712.jpg',
  'IMG_9862.jpg',
  'IMG_9873.JPG',
  'IMG_9875.JPG',
  'IMG_9882.jpg',
  'IMG_9885.jpg',
  'IMG_9891.jpg',
  'IMG_9895.jpg',
  'IMG_9898.jpg',
]

/**
 * All remaining photos — for the self-paced gallery only (Section 7).
 * Includes every image on disk that isn't a café mirror, propose screenshot, or in the timeline.
 */
const GALLERY_ONLY_FILES = [
  'IMG-20260209-WA0017.jpg',
  'IMG-20260209-WA0022.jpg',
  'IMG-20260209-WA0025.jpg',
  'IMG-20260209-WA0027.jpg',
  'IMG-20260209-WA0029_01.jpg',
  'IMG-20260209-WA0031.jpg',
  'IMG-20260209-WA0033.jpg',
  'IMG-20260221-WA0022.jpg',
  'IMG-20260226-WA0001.jpg',
  'IMG-20260226-WA0003.jpg',
  'IMG-20260413-WA0061.jpg',
  'IMG-20260413-WA0063.jpg',
  'IMG_20260212_230228_810.jpg',
  'IMG_20260214_234330_952.jpg',
  'IMG_20260508_161217_901.jpg',
  'IMG_20260508_161224_743.jpg',
  'IMG_20260508_161229_699.jpg',
  'IMG_20260508_161235_802.jpg',
  'IMG_20260612_161919_526.jpg',
  'IMG_20260612_161925_109.jpg',
  'IMG_20260612_161929_478.jpg',
  'IMG_20260613_001005_174.jpg',
  'IMG_20260613_001015_885.jpg',
  'IMG_20260613_001021_029.jpg',
  'IMG_20260613_001034_289.jpg',
  'IMG_20260613_001039_142.jpg',
  'IMG_20260613_001044_183.jpg',
  'IMG_20260613_001048_744.jpg',
  'IMG_20260613_001052_847.jpg',
  'IMG_9704.jpg',
  'IMG_9705.jpg',
  'IMG_9707.jpg',
  'IMG_9708.jpg',
  'IMG_9709.jpg',
  'IMG_9711.jpg',
  'IMG_9713.jpg',
  'IMG_9714.jpg',
  'IMG_9864.jpg',
  'IMG_9874.JPG',
  'IMG_9876.JPG',
  'IMG_9879.jpg',
  'IMG_9880.jpg',
  'IMG_9881.jpg',
  'IMG_9883.jpg',
  'IMG_9884.jpg',
  'IMG_9886.jpg',
  'IMG_9887.jpg',
  'IMG_9888.jpg',
  'IMG_9890.jpg',
  'IMG_9892.jpg',
  'IMG_9894.jpg',
  'IMG_9896.jpg',
  'IMG_9897.jpg',
  'Snapchat-433433742.jpg',
]

export const TIMELINE_PHOTOS = TIMELINE_FILES.map((f) => `/images/${f}`)

const GALLERY_ONLY_PHOTOS = GALLERY_ONLY_FILES.map((f) => `/images/${f}`)

/** Every photo for the gallery — timeline set + gallery-only set + café mirrors + proposal screenshots */
export const GALLERY_PHOTOS = [
  CAFE_MIRROR_1,
  CAFE_MIRROR_2,
  PROPOSE_TEXT_1,
  PROPOSE_TEXT_2,
  ...TIMELINE_PHOTOS,
  ...GALLERY_ONLY_PHOTOS,
]
