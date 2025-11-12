import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { indieCasterConfig } from '../../indiecaster.config.js';

export async function GET(context) {
  const episodes = await getCollection('episodes');

  // Filter out draft episodes and sort by publication date (newest first)
  const publishedEpisodes = episodes
    .filter((episode) => !episode.data.draft)
    .sort((a, b) => new Date(b.data.pubDate) - new Date(a.data.pubDate));

  const siteUrl = context.site || `https://${indieCasterConfig.domain}`;

  return rss({
    title: indieCasterConfig.podcastName,
    description: indieCasterConfig.elevatorPitch,
    site: siteUrl,
    xmlns: {
      itunes: 'http://www.itunes.com/dtds/podcast-1.0.dtd',
      content: 'http://purl.org/rss/1.0/modules/content/',
      atom: 'http://www.w3.org/2005/Atom'
    },
    customData: `
      <language>${indieCasterConfig.metaLanguage || 'en'}</language>
      <copyright>© ${new Date().getFullYear()} ${indieCasterConfig.hostName}</copyright>
      <itunes:author>${indieCasterConfig.hostName}</itunes:author>
      <itunes:subtitle>${indieCasterConfig.elevatorPitch.substring(0, 255)}</itunes:subtitle>
      <itunes:summary>${indieCasterConfig.metaDefaultDescription}</itunes:summary>
      <itunes:owner>
        <itunes:name>${indieCasterConfig.hostName}</itunes:name>
        <itunes:email>podcast@${indieCasterConfig.domain}</itunes:email>
      </itunes:owner>
      <itunes:image href="${siteUrl}/${indieCasterConfig.logo}" />
      <itunes:category text="Technology" />
      <itunes:explicit>false</itunes:explicit>
      <itunes:type>episodic</itunes:type>
      <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    `,
    items: publishedEpisodes.map((episode) => {
      // Build episode-specific custom data
      const episodeData = [];

      // iTunes duration
      if (episode.data.duration) {
        episodeData.push(`<itunes:duration>${episode.data.duration}</itunes:duration>`);
      }

      // Episode type (full, trailer, or bonus)
      episodeData.push(`<itunes:episodeType>full</itunes:episodeType>`);

      // Explicit content flag
      const explicit = episode.data.explicit || false;
      episodeData.push(`<itunes:explicit>${explicit}</itunes:explicit>`);

      // Episode number
      if (episode.data.episodeNumber) {
        episodeData.push(`<itunes:episode>${episode.data.episodeNumber}</itunes:episode>`);
      }

      // Season number
      if (episode.data.season) {
        episodeData.push(`<itunes:season>${episode.data.season}</itunes:season>`);
      }

      // Episode artwork (if available)
      if (episode.data.artwork?.src) {
        const artworkUrl = `${siteUrl}/episode-artwork/${episode.data.artwork.src}`;
        episodeData.push(`<itunes:image href="${artworkUrl}" />`);
      }

      // Author (host name)
      episodeData.push(`<itunes:author>${indieCasterConfig.hostName}</itunes:author>`);

      // Content (full show notes if available)
      if (episode.data.showNotes) {
        const escapedNotes = episode.data.showNotes
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&apos;');
        episodeData.push(`<content:encoded><![CDATA[${escapedNotes}]]></content:encoded>`);
      }

      return {
        title: episode.data.title,
        description: episode.data.description,
        pubDate: episode.data.pubDate,
        link: `${siteUrl}/episodes/${episode.slug}/`,
        enclosure: {
          url: `${siteUrl}/audio/episodes/${episode.data.audioFile}.mp3`,
          type: 'audio/mpeg',
          // Note: length is required by RSS spec but calculating actual file size
          // requires file system access. Set to 0 as placeholder - should be updated
          // with actual file size for production use
          length: 0
        },
        customData: episodeData.join('\n      ')
      };
    })
  });
} 
