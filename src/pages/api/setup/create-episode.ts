/**
 * API Endpoint: Create Episode
 *
 * Processes episode information and audio file from the setup wizard
 * Creates episode markdown file and saves audio file
 */

import type { APIRoute } from 'astro';
import fs from 'fs';
import path from 'path';

export const prerender = false; // Run this route server-side

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();

    // Get form fields
    const title = formData.get('title')?.toString().trim();
    const description = formData.get('description')?.toString().trim();
    const pubDate = formData.get('pubDate')?.toString().trim();
    const duration = formData.get('duration')?.toString().trim();
    const season = formData.get('season')?.toString().trim();
    const episode = formData.get('episode')?.toString().trim();
    const explicit = formData.get('explicit') === 'true';
    const audioFile = formData.get('audioFile') as File | null;

    // Validate required fields
    if (!title) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Episode title is required'
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!description) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Episode description is required'
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!pubDate) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Publish date is required'
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!duration) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Duration is required'
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!audioFile) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Audio file is required'
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    // Save audio file
    const audioBuffer = Buffer.from(await audioFile.arrayBuffer());
    const audioDir = path.join(process.cwd(), 'public', 'audio', 'episodes');

    // Ensure output directory exists
    if (!fs.existsSync(audioDir)) {
      fs.mkdirSync(audioDir, { recursive: true });
    }

    // Get file extension from original filename
    const originalName = audioFile.name;
    const ext = path.extname(originalName).toLowerCase() || '.mp3';
    const audioFilename = `${slug}${ext}`;

    fs.writeFileSync(
      path.join(audioDir, audioFilename),
      audioBuffer
    );

    // Create episode markdown file
    const episodesDir = path.join(process.cwd(), 'src', 'content', 'episodes');
    if (!fs.existsSync(episodesDir)) {
      fs.mkdirSync(episodesDir, { recursive: true });
    }

    // Build frontmatter
    const frontmatter: string[] = [
      '---',
      `title: "${title}"`,
      `description: "${description}"`,
      `pubDate: ${pubDate}`,
      `duration: "${duration}"`,
      `audioFile: "${slug}"`,
      `artwork:`,
      `  src: "${slug}-artwork"`,
      `  alt: "${title} artwork"`,
      `explicit: ${explicit}`,
      `showNotes: "${description}"`
    ];

    if (season) {
      frontmatter.push(`season: ${season}`);
    }

    if (episode) {
      frontmatter.push(`episodeNumber: ${episode}`);
    }

    frontmatter.push('---');

    const episodeMarkdown = `${frontmatter.join('\n')}

# ${title}

${description}

## Show Notes

${description}
`;

    fs.writeFileSync(
      path.join(episodesDir, `${slug}.md`),
      episodeMarkdown,
      'utf-8'
    );

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Episode created successfully',
        slug,
        audioFile: audioFilename
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error creating episode:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to create episode'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
