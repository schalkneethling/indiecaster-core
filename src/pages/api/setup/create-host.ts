/**
 * API Endpoint: Create Host Profile
 *
 * Processes host information and profile picture from the setup wizard
 * Creates host markdown file and optimizes profile image
 */

import type { APIRoute } from 'astro';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

export const prerender = false; // Run this route server-side

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();

    // Get form fields
    const hostName = formData.get('hostName')?.toString().trim();
    const hostBio = formData.get('hostBio')?.toString().trim();
    const profilePicture = formData.get('profilePicture') as File | null;

    // Validate required fields
    if (!hostName) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Host name is required'
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!hostBio) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Host bio is required'
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!profilePicture) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Profile picture is required'
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Generate slug from host name
    const slug = hostName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    // Process profile picture
    const imageBuffer = Buffer.from(await profilePicture.arrayBuffer());
    const outputDir = path.join(process.cwd(), 'public', 'images', 'hosts');

    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Generate optimized images
    const image = sharp(imageBuffer);

    // PNG (200x200)
    await image
      .clone()
      .resize(200, 200, { fit: 'cover', position: 'center' })
      .png({ quality: 90, compressionLevel: 9 })
      .toFile(path.join(outputDir, `${slug}.png`));

    // WebP @2x (400x400)
    await image
      .clone()
      .resize(400, 400, { fit: 'cover', position: 'center' })
      .webp({ quality: 85 })
      .toFile(path.join(outputDir, `${slug}@2x.webp`));

    // AVIF @2x (400x400)
    await image
      .clone()
      .resize(400, 400, { fit: 'cover', position: 'center' })
      .avif({ quality: 80 })
      .toFile(path.join(outputDir, `${slug}@2x.avif`));

    // Create host markdown file
    const hostsDir = path.join(process.cwd(), 'src', 'content', 'hosts');
    if (!fs.existsSync(hostsDir)) {
      fs.mkdirSync(hostsDir, { recursive: true });
    }

    const hostMarkdown = `---
name: "${hostName}"
bio: |
  ${hostBio.split('\n').join('\n  ')}
profilePicture: "${slug}"
---

${hostBio}
`;

    fs.writeFileSync(
      path.join(hostsDir, `${slug}.md`),
      hostMarkdown,
      'utf-8'
    );

    // Update indiecaster.config.js with host name and profile picture
    const configPath = path.join(process.cwd(), 'indiecaster.config.js');
    let configContent = fs.readFileSync(configPath, 'utf-8');

    // Update hostName in config
    configContent = configContent.replace(
      /(hostName:\s*['"`])([^'"`]*?)(['"`])/,
      `$1${hostName}$3`
    );

    // Update hostProfilePicture in config
    configContent = configContent.replace(
      /(hostProfilePicture:\s*['"`])([^'"`]*?)(['"`])/,
      `$1${slug}$3`
    );

    fs.writeFileSync(configPath, configContent, 'utf-8');

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Host profile created successfully',
        slug
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error creating host profile:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to create host profile'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
