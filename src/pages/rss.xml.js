import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const episodes = await getCollection('episodes');
  
  // Filter out draft episodes and sort by publication date (newest first)
  const publishedEpisodes = episodes
    .filter((episode) => !episode.data.draft)
    .sort((a, b) => new Date(b.data.pubDate) - new Date(a.data.pubDate));

  return rss({
    title: 'IndieCaster',
    description: indieCasterConfig.elevatorPitch,
    site: context.site,
    items: publishedEpisodes.map((episode) => ({
      title: episode.data.title,
      description: episode.data.description,
      pubDate: episode.data.pubDate,
      link: `/episodes/${episode.slug}/`
    })),
    customData: `<language>en</language>`
  });
} 
