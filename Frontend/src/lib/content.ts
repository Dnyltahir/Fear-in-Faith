/** Encode filenames with spaces for safe URLs */
function videoPath(filename: string) {
  return `/videos/${encodeURIComponent(filename)}`;
}

export const VIDEO_FILES = {
  wakingUp: videoPath("Waking Up.mp4"),
  news: videoPath("News.mp4"),
  babaSituation1: videoPath("Baba Situation 1.mp4"),
  babaSituation2: videoPath("Baba Situation 2.mp4"),
} as const;

/** Static art for the IQRA / Theodicy shelf card (hover plays episode preview) */
export const IQRA_EPISODE_THUMBNAIL = "/images/iqra-show-watermark.jpg";

export type WatchSlug = "theodicy" | "baba-situation-1" | "baba-situation-2";

export type AfterChoice = {
  slug: WatchSlug;
  label: string;
  caption: string;
  icon: "chat" | "book";
};

export type WatchEpisode = {
  slug: WatchSlug;
  title: string;
  synopsis: string;
  /** First segment played for this episode */
  videoSrc: string;
  /** Additional segments played in order before any branch choices */
  videoSequence?: string[];
  /** Shown after the final segment ends */
  afterChoices?: AfterChoice[];
  funLevel: 0 | 1 | 2 | 3 | 4 | 5;
};

const BABA_CHOICES: AfterChoice[] = [
  {
    slug: "baba-situation-1",
    label: "Baba Situation 1",
    caption: "Follow this path with Baba.",
    icon: "chat",
  },
  {
    slug: "baba-situation-2",
    label: "Baba Situation 2",
    caption: "See what happens on this path.",
    icon: "book",
  },
];

export const WATCH_BY_SLUG: Record<WatchSlug, WatchEpisode> = {
  theodicy: {
    slug: "theodicy",
    title: "Theodicy",
    synopsis:
      "If ALLAH is so powerfull , why does He not make everyone good?",
    videoSrc: VIDEO_FILES.wakingUp,
    videoSequence: [VIDEO_FILES.news],
    afterChoices: BABA_CHOICES,
    funLevel: 5,
  },
  "baba-situation-1": {
    slug: "baba-situation-1",
    title: "Baba Situation 1",
    synopsis: "You chose the first path with Baba.",
    videoSrc: VIDEO_FILES.babaSituation1,
    funLevel: 5,
  },
  "baba-situation-2": {
    slug: "baba-situation-2",
    title: "Baba Situation 2",
    synopsis: "You chose the second path with Baba.",
    videoSrc: VIDEO_FILES.babaSituation2,
    funLevel: 5,
  },
};

export function findWatchEpisode(slug: string): WatchEpisode | undefined {
  const key = decodeURIComponent(slug).trim().toLowerCase();
  if (key in WATCH_BY_SLUG) return WATCH_BY_SLUG[key as WatchSlug];
  return undefined;
}

export function getEpisodeVideoSegments(episode: WatchEpisode): string[] {
  return [episode.videoSrc, ...(episode.videoSequence ?? [])].filter(Boolean);
}

/** Single series row for the shelf: IQRA → Chapter 1 → one episode */
export const IQRA_SHOW = {
  id: "iqra",
  name: "IQRA",
  accent: "border-[#9440DD]",
} as const;
