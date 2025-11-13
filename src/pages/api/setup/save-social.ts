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
    const configPath = path.join(process.cwd(), 'indiecaster.config.js');
    let configContent = fs.readFileSync(configPath, 'utf-8');

    // Map wizard field names to config array names
    const platformMap: Record<string, string> = {
      twitter: 'Social Media',  // Maps to the X entry
      youtube: 'YouTube',
      instagram: 'Instagram',
      facebook: 'Facebook',
      linkedin: 'LinkedIn',
      mastodon: 'Mastodon',
      github: 'GitHub',
      website: 'Discord'  // Using Discord entry for personal website, or we can add new entry
    };

    // Update URLs in the socialMedia array
    for (const [wizardKey, platformName] of Object.entries(platformMap)) {
      const url = data[wizardKey]?.trim();
      if (url) {
        // Find and replace the URL for this platform
        const pattern = new RegExp(
          `(name:\\s*"${platformName}",[\\s\\S]*?url:\\s*")([^"]*)(")`,
          'g'
        );
        configContent = configContent.replace(pattern, `$1${url}$3`);
      }
    }

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
