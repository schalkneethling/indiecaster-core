import { defineCollection, z } from 'astro:content';

// Define the episodes collection schema
const episodes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    duration: z.string(),
    audioFile: z.string(),
    artwork: z.object({
      src: z.string(),
      alt: z.string(),
      // Podcast artwork specifications (platform-agnostic) - optional
      podcast: z.object({
        showCover: z.string().optional(), // 3000x3000px for podcast platforms
        episodeArt: z.string().optional(), // 3000x3000px for individual episodes
        heroImage: z.string().optional(), // 4320x1080px for wide format displays
      }).optional(),
      // Legacy support - will be used if podcast not specified - optional
      legacy: z.object({
        src: z.string(),
        alt: z.string()
      }).optional()
    }),
    draft: z.boolean().default(false),
    guests: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    youtube: z.string().optional(),
    explicit: z.boolean().default(false),
    episodeNumber: z.number().optional(),
    season: z.number().optional(),
    showNotes: z.string(),
    hasVttTranscript: z.boolean().default(false),
    hasSrtTranscript: z.boolean().default(false)
  })
});

// Define the guests collection schema
const guests = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    bio: z.string(),
    profilePicture: z.string(),
    socialLinks: z.record(z.string()).optional(),
    website: z.string().url().optional(),
    company: z.string().optional(),
    title: z.string().optional(),
    episodes: z.array(z.string()).optional() // References to episode slugs
  })
});

// Export the collections
export const collections = { episodes, guests }; 
