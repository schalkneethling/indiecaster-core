#!/usr/bin/env node

/**
 * IndieCaster Podcast Initialization Script
 * 
 * This script helps you set up your podcast website by prompting for basic information
 * and updating the configuration file automatically.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function initPodcast() {
  console.log('🎙️  Welcome to IndieCaster Podcast Setup!\n');
  console.log('This script will help you configure your podcast website.\n');

  try {
    // Get basic podcast information
    const podcastName = await question('What is your podcast name? ');
    const podcastDescription = await question('Briefly describe your podcast: ');
    const hostName = await question('What is your name (host)? ');
    const domain = await question('What is your website domain? (e.g., mypodcast.com): ');
    
    // Get episode information
    const hasFeaturedEpisode = await question('Do you want to configure a featured episode? (y/n): ');
    
    let featuredEpisodeConfig = '';
    if (hasFeaturedEpisode.toLowerCase() === 'y') {
      const episodeTitle = await question('Featured episode title: ');
      const episodeSummary = await question('Featured episode summary: ');
      const guestName = await question('Featured episode guest name: ');
      const audioFile = await question('Audio file name (without .mp3): ');
      
      featuredEpisodeConfig = `
  // <<-- START :: Featured episode configuration (OPTIONAL)
  // Remove this entire section if you want to use the latest published episode instead
  featuredEpisodeGuestName: "${guestName}",
  featuredEpisodeGuestProfilePicture: "${guestName.toLowerCase().replace(/\s+/g, '-')}",
  featuredEpisodeTitle: "${episodeTitle}",
  featuredEpisodeSummary: "${episodeSummary}",
  featuredEpisodeTrack: "${audioFile}",
  featuredEpisodeURL: "episode-1",
  // <<-- END :: Featured episode configuration`;
    }

    // Read the current config file
    const configPath = path.join(__dirname, '..', 'indiecaster.config.js');
    let configContent = fs.readFileSync(configPath, 'utf8');

    // Update the config with user input
    configContent = configContent.replace(
      /domain: "\[YOUR_DOMAIN\]"/,
      `domain: "${domain}"`
    );

    configContent = configContent.replace(
      /elevatorPitch:\s*"\[YOUR_PODCAST_NAME\] - \[BRIEF_DESCRIPTION_OF_YOUR_PODCAST\]"/,
      `elevatorPitch: "${podcastName} - ${podcastDescription}"`
    );

    configContent = configContent.replace(
      /hostName: "Your Name"/,
      `hostName: "${hostName}"`
    );

    configContent = configContent.replace(
      /hostProfilePicture: "your-profile-picture"/,
      `hostProfilePicture: "${hostName.toLowerCase().replace(/\s+/g, '-')}"`
    );

    // Replace or add featured episode configuration
    const featuredEpisodeRegex = /\/\/ <<-- START :: Featured episode configuration[\s\S]*?\/\/ <<-- END :: Featured episode configuration/;
    if (featuredEpisodeConfig) {
      if (featuredEpisodeRegex.test(configContent)) {
        configContent = configContent.replace(featuredEpisodeRegex, featuredEpisodeConfig);
      } else {
        // Add featured episode config after elevator pitch
        configContent = configContent.replace(
          /\/\/ <<-- END :: Your elevator pitch\n/,
          `// <<-- END :: Your elevator pitch${featuredEpisodeConfig}\n`
        );
      }
    }

    // Write the updated config
    fs.writeFileSync(configPath, configContent);

    console.log('\n✅ Configuration updated successfully!');
    console.log('\n📝 Next steps:');
    console.log('1. Add your profile image to public/profile-images/');
    console.log('2. Replace the sample episode content in src/content/episodes/episode-1.md');
    console.log('3. Add your audio files to public/audio/episodes/');
    console.log('4. Customize colors and branding in indiecaster.config.js');
    console.log('5. Run "npm run dev" to start developing');
    
    console.log('\n📚 For detailed instructions, see:');
    console.log('- docs/GETTING-STARTED.md');
    console.log('- docs/SETUP-CHECKLIST.md');

  } catch (error) {
    console.error('❌ Error during setup:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Run the initialization
initPodcast(); 