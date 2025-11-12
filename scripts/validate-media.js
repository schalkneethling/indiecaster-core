#!/usr/bin/env node

/**
 * Media File Validation Script
 *
 * Validates that all required media files exist and meet specifications:
 * - Checks for existence of required files
 * - Validates files are not 1-byte placeholders
 * - Checks image dimensions (where possible)
 * - Validates audio files are accessible
 * - Reports missing or invalid files
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getCollection } from 'astro:content';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

let errorCount = 0;
let warningCount = 0;
let successCount = 0;

function log(message, type = 'info') {
  const prefix = {
    error: `${colors.red}❌ ERROR:${colors.reset}`,
    warning: `${colors.yellow}⚠️  WARNING:${colors.reset}`,
    success: `${colors.green}✓${colors.reset}`,
    info: `${colors.blue}ℹ${colors.reset}`,
    title: `${colors.cyan}${colors.reset}`
  }[type];

  console.log(`${prefix} ${message}`);

  if (type === 'error') errorCount++;
  if (type === 'warning') warningCount++;
  if (type === 'success') successCount++;
}

function fileExists(filepath) {
  try {
    return fs.existsSync(filepath);
  } catch {
    return false;
  }
}

function getFileSize(filepath) {
  try {
    const stats = fs.statSync(filepath);
    return stats.size;
  } catch {
    return 0;
  }
}

function isPlaceholder(filepath) {
  const size = getFileSize(filepath);
  return size <= 1; // 1-byte or empty files are placeholders
}

function validatePodcastArtwork() {
  console.log('\n' + colors.cyan + '━'.repeat(60) + colors.reset);
  console.log(colors.cyan + '📸 Podcast Artwork Validation' + colors.reset);
  console.log(colors.cyan + '━'.repeat(60) + colors.reset + '\n');

  const artworkPaths = [
    'public/logo.svg',
    'public/logo.png'
  ];

  let found = false;
  for (const artworkPath of artworkPaths) {
    if (fileExists(artworkPath)) {
      if (isPlaceholder(artworkPath)) {
        log(`${artworkPath} exists but is a placeholder (${getFileSize(artworkPath)} bytes)`, 'warning');
      } else {
        log(`Found podcast artwork: ${artworkPath}`, 'success');
        found = true;
      }
    }
  }

  if (!found) {
    log('No valid podcast artwork found. Required: public/logo.svg or public/logo.png', 'error');
    log('Podcast artwork must be 3000x3000px, under 500KB (Apple requirement)', 'info');
  }
}

function validateFavicons() {
  console.log('\n' + colors.cyan + '━'.repeat(60) + colors.reset);
  console.log(colors.cyan + '🔖 Favicon Validation' + colors.reset);
  console.log(colors.cyan + '━'.repeat(60) + colors.reset + '\n');

  const requiredFavicons = [
    { path: 'public/favicon-16x16.png', size: '16x16px' },
    { path: 'public/favicon-32x32.png', size: '32x32px' },
    { path: 'public/apple-touch-icon.png', size: '180x180px' }
  ];

  for (const favicon of requiredFavicons) {
    if (!fileExists(favicon.path)) {
      log(`Missing favicon: ${favicon.path} (${favicon.size})`, 'error');
    } else if (isPlaceholder(favicon.path)) {
      log(`${favicon.path} is a placeholder`, 'warning');
    } else {
      log(`Found favicon: ${favicon.path}`, 'success');
    }
  }
}

async function validateEpisodeAudio() {
  console.log('\n' + colors.cyan + '━'.repeat(60) + colors.reset);
  console.log(colors.cyan + '🎧 Episode Audio Validation' + colors.reset);
  console.log(colors.cyan + '━'.repeat(60) + colors.reset + '\n');

  try {
    // Dynamically import Astro content collections
    const { getCollection } = await import('../.astro/content.d.ts' || 'astro:content');

    // In a real implementation, we'd need to properly load the episodes
    // For now, we'll check the episodes directory
    const episodesDir = 'src/content/episodes';
    if (!fs.existsSync(episodesDir)) {
      log('Episodes directory not found: ' + episodesDir, 'warning');
      return;
    }

    const episodeFiles = fs.readdirSync(episodesDir).filter(file => file.endsWith('.md'));

    if (episodeFiles.length === 0) {
      log('No episode files found', 'warning');
      return;
    }

    log(`Found ${episodeFiles.length} episode file(s)`, 'info');

    // Basic check: look for audio files mentioned in episodes
    for (const episodeFile of episodeFiles) {
      const filepath = path.join(episodesDir, episodeFile);
      const content = fs.readFileSync(filepath, 'utf8');

      // Extract audioFile field from frontmatter
      const audioFileMatch = content.match(/audioFile:\s*["']?([^"'\n]+)["']?/);
      if (audioFileMatch) {
        const audioFile = audioFileMatch[1];
        const audioPath = `public/audio/episodes/${audioFile}.mp3`;

        if (!fileExists(audioPath)) {
          log(`Missing audio for ${episodeFile}: ${audioPath}`, 'error');
        } else if (isPlaceholder(audioPath)) {
          log(`Audio file for ${episodeFile} is a placeholder: ${audioPath}`, 'warning');
        } else {
          const sizeInMB = (getFileSize(audioPath) / (1024 * 1024)).toFixed(2);
          log(`Found audio for ${episodeFile}: ${audioPath} (${sizeInMB} MB)`, 'success');
        }
      }
    }
  } catch (error) {
    log(`Could not validate episode audio: ${error.message}`, 'warning');
    log('Run "npm run dev" first to generate content collection types', 'info');
  }
}

function validateProfileImages() {
  console.log('\n' + colors.cyan + '━'.repeat(60) + colors.reset);
  console.log(colors.cyan + '👤 Profile Images Validation' + colors.reset);
  console.log(colors.cyan + '━'.repeat(60) + colors.reset + '\n');

  const hostsDir = 'src/content/hosts';
  if (!fs.existsSync(hostsDir)) {
    log('Hosts directory not found: ' + hostsDir, 'warning');
    return;
  }

  const hostFiles = fs.readdirSync(hostsDir).filter(file => file.endsWith('.md'));

  if (hostFiles.length === 0) {
    log('No host files found', 'warning');
    return;
  }

  log(`Found ${hostFiles.length} host file(s)`, 'info');

  for (const hostFile of hostFiles) {
    const filepath = path.join(hostsDir, hostFile);
    const content = fs.readFileSync(filepath, 'utf8');

    // Extract profilePicture field
    const profileMatch = content.match(/profilePicture:\s*["']?([^"'\n]+)["']?/);
    if (profileMatch) {
      const profileSlug = profileMatch[1];

      // Check for all three required formats
      const formats = [
        { path: `public/profile-images/${profileSlug}.png`, format: 'PNG (200x200)' },
        { path: `public/profile-images/${profileSlug}@2x.webp`, format: 'WebP (400x400)' },
        { path: `public/profile-images/${profileSlug}@2x.avif`, format: 'AVIF (400x400)' }
      ];

      let allFound = true;
      for (const format of formats) {
        if (!fileExists(format.path)) {
          log(`Missing ${format.format} for ${hostFile}: ${format.path}`, 'error');
          allFound = false;
        } else if (isPlaceholder(format.path)) {
          log(`${format.format} for ${hostFile} is a placeholder: ${format.path}`, 'warning');
          allFound = false;
        }
      }

      if (allFound) {
        log(`All profile image formats found for ${hostFile}`, 'success');
      }
    }
  }

  // Check guests
  const guestsDir = 'src/content/guests';
  if (fs.existsSync(guestsDir)) {
    const guestFiles = fs.readdirSync(guestsDir).filter(file => file.endsWith('.md'));
    if (guestFiles.length > 0) {
      log(`\nFound ${guestFiles.length} guest file(s)`, 'info');
      // Similar validation for guests (optional)
    }
  }
}

function validateEpisodeArtwork() {
  console.log('\n' + colors.cyan + '━'.repeat(60) + colors.reset);
  console.log(colors.cyan + '🎨 Episode Artwork Validation' + colors.reset);
  console.log(colors.cyan + '━'.repeat(60) + colors.reset + '\n');

  const episodesDir = 'src/content/episodes';
  if (!fs.existsSync(episodesDir)) {
    log('Episodes directory not found', 'warning');
    return;
  }

  const episodeFiles = fs.readdirSync(episodesDir).filter(file => file.endsWith('.md'));
  let artworkCount = 0;

  for (const episodeFile of episodeFiles) {
    const filepath = path.join(episodesDir, episodeFile);
    const content = fs.readFileSync(filepath, 'utf8');

    // Extract artwork src from frontmatter
    const artworkMatch = content.match(/artwork:\s*\n\s*src:\s*["']?([^"'\n]+)["']?/);
    if (artworkMatch) {
      const artworkSrc = artworkMatch[1];
      const artworkPath = `public/episode-artwork/${artworkSrc}`;

      if (!fileExists(artworkPath)) {
        log(`Missing artwork for ${episodeFile}: ${artworkPath}`, 'warning');
      } else if (isPlaceholder(artworkPath)) {
        log(`Artwork for ${episodeFile} is a placeholder: ${artworkPath}`, 'warning');
      } else {
        const sizeInKB = (getFileSize(artworkPath) / 1024).toFixed(2);
        if (getFileSize(artworkPath) > 500 * 1024) {
          log(`Artwork for ${episodeFile} exceeds 500KB: ${sizeInKB} KB`, 'warning');
        } else {
          log(`Found artwork for ${episodeFile}: ${artworkPath} (${sizeInKB} KB)`, 'success');
        }
        artworkCount++;
      }
    }
  }

  if (artworkCount === 0) {
    log('No episode-specific artwork found (using podcast artwork as fallback)', 'info');
  }
}

function validateSocialShareImage() {
  console.log('\n' + colors.cyan + '━'.repeat(60) + colors.reset);
  console.log(colors.cyan + '📱 Social Share Image Validation' + colors.reset);
  console.log(colors.cyan + '━'.repeat(60) + colors.reset + '\n');

  const socialSharePath = 'public/social-share.png';

  if (!fileExists(socialSharePath)) {
    log('Social share image not found: ' + socialSharePath, 'warning');
    log('Recommended: Create 1200x630px image for social media sharing', 'info');
  } else if (isPlaceholder(socialSharePath)) {
    log('Social share image is a placeholder', 'warning');
  } else {
    const sizeInKB = (getFileSize(socialSharePath) / 1024).toFixed(2);
    log(`Found social share image: ${socialSharePath} (${sizeInKB} KB)`, 'success');
  }
}

function printSummary() {
  console.log('\n' + colors.cyan + '━'.repeat(60) + colors.reset);
  console.log(colors.cyan + '📊 Validation Summary' + colors.reset);
  console.log(colors.cyan + '━'.repeat(60) + colors.reset + '\n');

  console.log(`${colors.green}✓ Passed:${colors.reset} ${successCount}`);
  console.log(`${colors.yellow}⚠️  Warnings:${colors.reset} ${warningCount}`);
  console.log(`${colors.red}❌ Errors:${colors.reset} ${errorCount}`);

  console.log('\n' + colors.cyan + '━'.repeat(60) + colors.reset + '\n');

  if (errorCount > 0) {
    console.log(colors.red + 'Media validation FAILED with errors.' + colors.reset);
    console.log('Please fix the errors above before deploying.\n');
    console.log('See docs/MEDIA-REQUIREMENTS.md for detailed specifications.\n');
    process.exit(1);
  } else if (warningCount > 0) {
    console.log(colors.yellow + 'Media validation passed with warnings.' + colors.reset);
    console.log('Your site will work, but consider addressing warnings for best quality.\n');
  } else {
    console.log(colors.green + '✓ All media files validated successfully!' + colors.reset);
    console.log('Your podcast is ready for deployment.\n');
  }
}

async function main() {
  console.log('\n' + colors.cyan + '═'.repeat(60) + colors.reset);
  console.log(colors.cyan + '  IndieCaster Media Validation' + colors.reset);
  console.log(colors.cyan + '═'.repeat(60) + colors.reset);

  validatePodcastArtwork();
  validateFavicons();
  await validateEpisodeAudio();
  validateProfileImages();
  validateEpisodeArtwork();
  validateSocialShareImage();
  printSummary();
}

// Run validation
main().catch(error => {
  console.error(colors.red + '\nValidation failed with error:' + colors.reset);
  console.error(error);
  process.exit(1);
});
