/** Encode filenames with spaces for safe URLs */
function videoPath(filename: string) {
  return `/videos/${encodeURIComponent(filename)}`;
}

export const VIDEO_FILES = {
  /** Chapter 1 main episode */
  theodicy: videoPath("IMG_2388.MP4"),
  uncleSami: videoPath("talk to uncle sami.MP4"),
  simplyBook: videoPath("simply get the book.MP4"),
} as const;

/** Static art for the IQRA / Theodicy shelf card (hover plays episode preview) */
export const IQRA_EPISODE_THUMBNAIL = "/images/iqra-show-watermark.jpg";

export type WatchSlug = "theodicy" | "uncle-sami" | "get-the-book";

export type AfterChoice = {
  slug: WatchSlug;
  label: string;
  caption: string;
  /** Parchment button icon treatment */
  icon: "chat" | "book";
};

export type WatchEpisode = {
  slug: WatchSlug;
  title: string;
  synopsis: string;
  videoSrc: string;
  /** When the main chapter ends, offer these follow-up videos */
  afterChoices?: AfterChoice[];
  funLevel: 0 | 1 | 2 | 3 | 4 | 5;
};

const AFTER_CHOICES: AfterChoice[] = [
  {
    slug: "uncle-sami",
    label: "Talk with Uncle Sami",
    caption: "A warm follow-up conversation.",
    icon: "chat",
  },
  {
    slug: "get-the-book",
    label: "Simply get the book",
    caption: "See the story land on the page.",
    icon: "book",
  },
];

export const WATCH_BY_SLUG: Record<WatchSlug, WatchEpisode> = {
  theodicy: {
    slug: "theodicy",
    title: "Theodicy",
    synopsis:
      "If ALLAH is so powerfull , why does He not make everyone good?",
    videoSrc: VIDEO_FILES.theodicy,
    afterChoices: AFTER_CHOICES,
    funLevel: 5,
  },
  "uncle-sami": {
    slug: "uncle-sami",
    title: "Talk with Uncle Sami",
    synopsis: "You chose the conversation path. Enjoy this bonus moment.",
    videoSrc: VIDEO_FILES.uncleSami,
    funLevel: 5,
  },
  "get-the-book": {
    slug: "get-the-book",
    title: "Simply get the book",
    synopsis: "You chose the book path. Enjoy this bonus moment.",
    videoSrc: VIDEO_FILES.simplyBook,
    funLevel: 5,
  },
};

export function findWatchEpisode(slug: string): WatchEpisode | undefined {
  const key = decodeURIComponent(slug).trim().toLowerCase();
  if (key in WATCH_BY_SLUG) return WATCH_BY_SLUG[key as WatchSlug];
  return undefined;
}

/** Single series row for the shelf: IQRA → Chapter 1 → one episode */
export const IQRA_SHOW = {
  id: "iqra",
  name: "IQRA",
  accent: "border-[#9440DD]",
} as const;
