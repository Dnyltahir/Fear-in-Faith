import { WatchPlayer } from "@/components/watch/WatchPlayer";
import { findWatchEpisode } from "@/lib/content";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export default async function WatchPage({ params }: Props) {
  const { slug } = await params;
  const episode = findWatchEpisode(slug);
  if (!episode) notFound();
  return <WatchPlayer episode={episode} />;
}
