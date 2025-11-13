/**
 * API Endpoint: Save Podcast Configuration
 *
 * Processes podcast information from the setup wizard
 * and updates indiecaster-config.js
 */

import type { APIRoute } from 'astro';
import fs from 'fs';
import path from 'path';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    // Validate required fields
    const required = ['podcastName', 'elevatorPitch', 'metaDescription', 'domain', 'metaLanguage'];
    for (const field of required) {
      if (!data[field] || !data[field].trim()) {
        return new Response(
          JSON.stringify({
            success: false,
            message: `Missing required field: ${field}`
          }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    // Read the current config file
    const configPath = path.join(process.cwd(), 'indiecaster-config.js');
    let configContent = fs.readFileSync(configPath, 'utf-8');

    // Update each field in the config
    const updates: Record<string, string> = {
      podcastName: data.podcastName.trim(),
      elevatorPitch: data.elevatorPitch.trim(),
      metaDescription: data.metaDescription.trim(),
      domain: data.domain.trim(),
      metaLanguage: data.metaLanguage.trim(),
    };

    // Add optional brand colors if provided
    if (data.primaryBrandColor) {
      updates.primaryBrandColor = data.primaryBrandColor;
    }
    if (data.secondaryBrandColor) {
      updates.secondaryBrandColor = data.secondaryBrandColor;
    }

    // Replace values in config file
    for (const [key, value] of Object.entries(updates)) {
      // Handle string values
      const stringPattern = new RegExp(`(${key}:\\s*['"\`])([^'"\`]*?)(['"\`])`, 'g');
      configContent = configContent.replace(stringPattern, `$1${value}$3`);
    }

    // Write updated config back to file
    fs.writeFileSync(configPath, configContent, 'utf-8');

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Configuration saved successfully'
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error saving configuration:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to save configuration'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
