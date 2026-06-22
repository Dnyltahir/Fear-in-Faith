/** Encode filenames with spaces for safe URLs */
function videoPath(filename: string) {
  return `/videos/${encodeURIComponent(filename)}`;
}

export const VIDEO_FILES = {
  wakingUp: videoPath("Waking Up.mp4"),
  news: videoPath("News.mp4"),
  babaSituation1: videoPath("Baba Situation 1.mp4"),
  babaSituation2: videoPath("Baba Situation 2.mp4"),
  onlineSearch: videoPath("Online Search.mp4"),
  walkingIn: videoPath("Walking In.mp4"),
  libraryWalkIn: videoPath("Library Walk In.mp4"),
  readingBook: videoPath("Reading Book.mp4"),
  uncleSamiSituation1: videoPath("Uncle Sami Situation 1.mp4"),
  uncleSamiSituation2: videoPath("Uncle Sami Situation 2.mp4"),
  uncleSamiPickingUpBook: videoPath("Uncle Sami Picking up Book.mp4"),
  talkingToAudience: videoPath("Talking to Audience.mp4"),
  watchingCartoons: videoPath("Watching Cartoons.mp4"),
  searchOnlinePath1: videoPath("SEARCH ONLINE PATH 1.MP4"),
  dreamScene: videoPath("Dream Scene.mp4"),
  prayerScene: videoPath("Prayer Scene.mp4"),
  afterSleepSearchOnlinePath: videoPath("after sleep search online path.MP4"),
} as const;

/** Static art for the IQRA / Theodicy shelf card (hover plays episode preview) */
export const IQRA_EPISODE_THUMBNAIL = "/images/iqra-show-watermark.jpg";

export type WatchSlug =
  | "theodicy"
  | "baba-situation-1"
  | "baba-situation-2"
  | "watches-youtube-path"
  | "sleep-path"
  | "allah-for-guidance"
  | "after-sleep-search-online"
  | "online-search-path"
  | "library-walk-in-path"
  | "uncle-sami-ask-book"
  | "uncle-sami-research";

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

const AFTER_BABA_SITUATION_1: AfterChoice[] = [
  {
    slug: "online-search-path",
    label: "Search online",
    caption: "Look things up, then head to the library.",
    icon: "book",
  },
  {
    slug: "library-walk-in-path",
    label: "Library walk-in",
    caption: "Go straight to the library.",
    icon: "chat",
  },
];

const AFTER_BABA_SITUATION_2: AfterChoice[] = [
  {
    slug: "watches-youtube-path",
    label: "WATCHES YOUTUBE",
    caption: "Watch videos online instead.",
    icon: "book",
  },
  {
    slug: "sleep-path",
    label: "SLEEP",
    caption: "Go to sleep and dream.",
    icon: "chat",
  },
];

const AFTER_SLEEP: AfterChoice[] = [
  {
    slug: "allah-for-guidance",
    label: "Allah for guidance",
    caption: "Turn to Allah for guidance.",
    icon: "book",
  },
  {
    slug: "after-sleep-search-online",
    label: "Search Online Path",
    caption: "Search online for answers.",
    icon: "chat",
  },
];

const UNCLE_SAMI_CHOICES: AfterChoice[] = [
  {
    slug: "uncle-sami-ask-book",
    label: "Ask for the book",
    caption: "Ask Uncle Sami for the book.",
    icon: "book",
  },
  {
    slug: "uncle-sami-research",
    label: "Talk about his research",
    caption: "Talk to him about his research.",
    icon: "chat",
  },
];

const UNCLE_SAMI_FINALE: string[] = [
  VIDEO_FILES.uncleSamiPickingUpBook,
  VIDEO_FILES.readingBook,
  VIDEO_FILES.talkingToAudience,
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
    afterChoices: AFTER_BABA_SITUATION_1,
    funLevel: 5,
  },
  "baba-situation-2": {
    slug: "baba-situation-2",
    title: "Baba Situation 2",
    synopsis: "You chose the second path with Baba.",
    videoSrc: VIDEO_FILES.babaSituation2,
    afterChoices: AFTER_BABA_SITUATION_2,
    funLevel: 5,
  },
  "watches-youtube-path": {
    slug: "watches-youtube-path",
    title: "Watches YouTube",
    synopsis: "You watched videos online.",
    videoSrc: VIDEO_FILES.walkingIn,
    videoSequence: [
      VIDEO_FILES.watchingCartoons,
      VIDEO_FILES.searchOnlinePath1,
    ],
    funLevel: 5,
  },
  "sleep-path": {
    slug: "sleep-path",
    title: "Sleep",
    synopsis: "You went to sleep.",
    videoSrc: VIDEO_FILES.dreamScene,
    afterChoices: AFTER_SLEEP,
    funLevel: 5,
  },
  "allah-for-guidance": {
    slug: "allah-for-guidance",
    title: "Allah for guidance",
    synopsis: "You turned to Allah for guidance.",
    videoSrc: VIDEO_FILES.prayerScene,
    funLevel: 5,
  },
  "after-sleep-search-online": {
    slug: "after-sleep-search-online",
    title: "Search Online Path",
    synopsis: "You searched online after waking from the dream.",
    videoSrc: VIDEO_FILES.afterSleepSearchOnlinePath,
    funLevel: 5,
  },
  "online-search-path": {
    slug: "online-search-path",
    title: "Search online",
    synopsis: "You walked in, searched online, then entered the library.",
    videoSrc: VIDEO_FILES.walkingIn,
    videoSequence: [VIDEO_FILES.onlineSearch, VIDEO_FILES.libraryWalkIn],
    afterChoices: UNCLE_SAMI_CHOICES,
    funLevel: 5,
  },
  "library-walk-in-path": {
    slug: "library-walk-in-path",
    title: "Library Walk In",
    synopsis: "You walked into the library.",
    videoSrc: VIDEO_FILES.libraryWalkIn,
    afterChoices: UNCLE_SAMI_CHOICES,
    funLevel: 5,
  },
  "uncle-sami-ask-book": {
    slug: "uncle-sami-ask-book",
    title: "Ask for the book",
    synopsis: "You asked Uncle Sami for the book.",
    videoSrc: VIDEO_FILES.uncleSamiSituation1,
    videoSequence: UNCLE_SAMI_FINALE,
    funLevel: 5,
  },
  "uncle-sami-research": {
    slug: "uncle-sami-research",
    title: "Talk about his research",
    synopsis: "You talked with Uncle Sami about his research.",
    videoSrc: VIDEO_FILES.uncleSamiSituation2,
    videoSequence: UNCLE_SAMI_FINALE,
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
