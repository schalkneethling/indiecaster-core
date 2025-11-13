/**
 * API Endpoint: Save Social Media Links
 *
 * Processes social media links from the setup wizard
 * and updates indiecaster-config.js
 */

import type { APIRoute } from 'astro';
import fs from 'fs';
import path from 'path';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    // Validate URLs if provided
    const urlPattern = /^https?:\/\/.+/;
    for (const [key, value] of Object.entries(data)) {
      if (value && typeof value === 'string' && value.trim()) {
        if (!urlPattern.test(value)) {
          return new Response(
            JSON.stringify({
              success: false,
              message: `Invalid URL for ${key}: ${value}`
            }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
          );
        }
      }
    }

    // Read the current config file
    const configPath = path.join(process.cwd(), 'indiecaster-config.js');
    let configContent = fs.readFileSync(configPath, 'utf-8');

    // Find the socialLinks section
    const socialLinksPattern = /socialLinks:\s*\{([^}]*)\}/s;
    const match = configContent.match(socialLinksPattern);

    if (!match) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Could not find socialLinks section in config file'
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Build new socialLinks object
    const socialLinks: string[] = [];
    const platforms = ['twitter', 'youtube', 'instagram', 'facebook', 'linkedin', 'mastodon', 'github', 'website'];

    for (const platform of platforms) {
      const value = data[platform]?.trim() || '';
      if (value) {
        socialLinks.push(`    ${platform}: '${value}'`);
      } else {
        socialLinks.push(`    ${platform}: ''`);
      }
    }

    const newSocialLinks = `socialLinks: {\n${socialLinks.join(',\n')}\n  }`;

    // Replace socialLinks section
    configContent = configContent.replace(socialLinksPattern, newSocialLinks);

    // Write updated config back to file
    fs.writeFileSync(configPath, configContent, 'utf-8');

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Social links saved successfully'
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error saving social links:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to save social links'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
