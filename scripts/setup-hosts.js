#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Utility functions
function toKebabCase(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

function escapeYaml(str) {
  return str.replace(/"/g, '\\"');
}

// Promisify readline question
function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

// Handle graceful shutdown
function handleShutdown() {
  console.log('\n\n👋 Host setup cancelled. You can run this script again anytime with: npm run setup-hosts');
  rl.close();
  process.exit(0);
}

process.on('SIGINT', handleShutdown);
process.on('SIGTERM', handleShutdown);

async function promptForHost(isMainHost = true) {
  const hostType = isMainHost ? 'primary host' : 'co-host';
  console.log(`\n🎙️  Setting up your ${hostType}:`);
  
  // Required fields
  const name = await question(`Full name of ${hostType}: `);
  if (!name.trim()) {
    console.log('❌ Name is required. Please try again.');
    return await promptForHost(isMainHost);
  }
  
  const bio = await question(`Brief bio for ${name}: `);
  if (!bio.trim()) {
    console.log('❌ Bio is required. Please try again.');
    return await promptForHost(isMainHost);
  }
  
  const profilePictureDefault = `${toKebabCase(name)}-profile`;
  const profilePictureInput = await question(`Profile picture filename (default: ${profilePictureDefault}): `);
  const profilePicture = profilePictureInput.trim() || profilePictureDefault;
  
  // Ask if they want to provide optional information
  const wantsOptionalInfo = await question(`\nWould you like to add optional information for ${name} (company, website, social media)? (y/n): `);
  
  let company = '';
  let title = '';
  let website = '';
  const socialLinks = {};
  
  if (wantsOptionalInfo.toLowerCase() === 'y' || wantsOptionalInfo.toLowerCase() === 'yes') {
    console.log(`\n📝 Optional information for ${name}:`);
    
    company = await question('Company (optional): ');
    title = await question('Job title (optional): ');
    
    const websiteInput = await question('Website URL (optional): ');
    if (websiteInput.trim()) {
      if (isValidUrl(websiteInput.trim())) {
        website = websiteInput.trim();
      } else {
        console.log('⚠️  Invalid URL format. Skipping website field.');
      }
    }
    
    // Social links
    console.log(`\n🌐 Social media links for ${name} (optional, press Enter to skip):`);
    
    const twitter = await question('Twitter/X handle (without @): ');
    if (twitter.trim()) {
      socialLinks.twitter = `https://twitter.com/${twitter.trim().replace('@', '')}`;
    }
    
    const linkedin = await question('LinkedIn username or full URL: ');
    if (linkedin.trim()) {
      if (linkedin.includes('linkedin.com')) {
        socialLinks.linkedin = linkedin.trim();
      } else {
        socialLinks.linkedin = `https://linkedin.com/in/${linkedin.trim()}`;
      }
    }
    
    const instagram = await question('Instagram handle (without @): ');
    if (instagram.trim()) {
      socialLinks.instagram = `https://instagram.com/${instagram.trim().replace('@', '')}`;
    }
    
    const github = await question('GitHub username: ');
    if (github.trim()) {
      socialLinks.github = `https://github.com/${github.trim()}`;
    }
  } else {
    console.log(`✅ Skipping optional information for ${name}`);
  }
  
  return {
    name: name.trim(),
    bio: bio.trim(),
    profilePicture,
    company: company.trim(),
    title: title.trim(),
    website,
    socialLinks,
    isMainHost
  };
}

function createHostFile(hostData) {
  const slug = toKebabCase(hostData.name);
  const filepath = path.join('src', 'content', 'hosts', `${slug}.md`);
  
  // Check if file already exists
  if (fs.existsSync(filepath)) {
    return { exists: true, filepath, slug };
  }
  
  // Build frontmatter - only include fields that have values
  let frontmatter = `---
name: "${escapeYaml(hostData.name)}"
bio: "${escapeYaml(hostData.bio)}"
profilePicture: "${hostData.profilePicture}"`;

  if (Object.keys(hostData.socialLinks).length > 0) {
    frontmatter += `\nsocialLinks:`;
    for (const [platform, url] of Object.entries(hostData.socialLinks)) {
      frontmatter += `\n  ${platform}: "${url}"`;
    }
  }

  if (hostData.website) {
    frontmatter += `\nwebsite: "${hostData.website}"`;
  }

  if (hostData.company) {
    frontmatter += `\ncompany: "${escapeYaml(hostData.company)}"`;
  }

  if (hostData.title) {
    frontmatter += `\ntitle: "${escapeYaml(hostData.title)}"`;
  }

  frontmatter += `\nepisodes: []`;
  frontmatter += `\nisMainHost: ${hostData.isMainHost}`;
  frontmatter += `\n---`;

  const content = `${frontmatter}

# ${hostData.name}

${hostData.bio}

## About ${hostData.name}

*Add more detailed information about ${hostData.name} here.*

${hostData.company || hostData.title ? `## Professional Background

${hostData.title ? `**Current Role**: ${hostData.title}` : ''}${hostData.title && hostData.company ? ' at ' : ''}${hostData.company || ''}

*Add more details about professional experience and background.*` : ''}

${Object.keys(hostData.socialLinks).length > 0 || hostData.website ? `## Connect with ${hostData.name}

${hostData.website ? `- **Website**: [${hostData.website}](${hostData.website})` : ''}
${Object.entries(hostData.socialLinks).map(([platform, url]) => 
  `- **${platform.charAt(0).toUpperCase() + platform.slice(1)}**: [${url}](${url})`
).join('\n')}` : ''}

## Episodes featuring ${hostData.name}

*Episodes will be automatically linked here based on the hosts field in episode files.*
`;

  fs.writeFileSync(filepath, content);
  return { exists: false, filepath, slug };
}

async function handleExistingFile(hostData, filepath, slug) {
  console.log(`\n⚠️  Host file already exists: ${slug}.md`);
  const action = await question('Do you want to (o)verwrite, (s)kip, or (c)ancel? ');
  
  switch (action.toLowerCase()) {
    case 'o':
    case 'overwrite':
      const result = createHostFile(hostData);
      console.log(`✅ Overwritten host file: ${slug}.md`);
      return { created: true, slug };
      
    case 's':
    case 'skip':
      console.log(`⏭️  Skipped creating host file: ${slug}.md`);
      return { created: false, slug };
      
    case 'c':
    case 'cancel':
    default:
      handleShutdown();
      break;
  }
}

async function main() {
  console.log('🎯 IndieCaster Host Setup');
  console.log('===========================');
  console.log('This script will help you set up host profiles for your podcast.');
  console.log('All episodes currently reference "main-host" which we\'ll update.\n');
  
  try {
    // Setup primary host
    const primaryHost = await promptForHost(true);
    const primaryResult = createHostFile(primaryHost);
    
    if (primaryResult.exists) {
      const handled = await handleExistingFile(primaryHost, primaryResult.filepath, primaryResult.slug);
      if (!handled.created) {
        console.log('Primary host setup incomplete. Exiting.');
        rl.close();
        return;
      }
    } else {
      console.log(`✅ Created primary host: ${primaryResult.slug}.md`);
    }
    
    // Ask about co-host
    const hasCoHost = await question('\nDo you have a co-host? (y/n): ');
    let coHostSlug = null;
    
    if (hasCoHost.toLowerCase() === 'y' || hasCoHost.toLowerCase() === 'yes') {
      const coHost = await promptForHost(false);
      const coHostResult = createHostFile(coHost);
      
      if (coHostResult.exists) {
        const handled = await handleExistingFile(coHost, coHostResult.filepath, coHostResult.slug);
        if (handled.created) {
          coHostSlug = handled.slug;
        }
      } else {
        console.log(`✅ Created co-host: ${coHostResult.slug}.md`);
        coHostSlug = coHostResult.slug;
      }
    }
    
    // Update episode files to reference the new primary host
    console.log('\n🔄 Updating episode files...');
    await updateEpisodeFiles(primaryResult.slug, coHostSlug);
    
    // Update host configuration
    console.log('\n⚙️ Updating host configuration...');
    updateHostConfig(primaryResult.name, primaryResult.profilePicture);
    
    console.log('\n🎉 Host setup completed successfully!');
    console.log('\n📝 Next steps:');
    console.log('1. Add profile pictures to public/profile-pictures/');
    console.log('2. Review and enhance the host bio content');
    console.log('3. Run "npm run dev" to preview your podcast');
    
  } catch (error) {
    console.error('\n❌ Error during host setup:', error.message);
    console.log('You can run this script again with: npm run setup-hosts');
  } finally {
      rl.close();
}

function updateHostConfig(hostName, profilePicture) {
  const configPath = 'indiecaster.config.js';
  
  if (!fs.existsSync(configPath)) {
    console.log(`   ⚠️  Config file not found: ${configPath}`);
    return;
  }
  
  try {
    let configContent = fs.readFileSync(configPath, 'utf8');
    
    // Escape quotes in values
    const safeName = String(hostName || '').replace(/"/g, '\\"');
    const safeProfilePic = String(profilePicture || '').replace(/"/g, '\\"');
    
    // Update host name
    if (safeName) {
      configContent = configContent.replace(
        /hostName:\s*"[^"]*"/,
        `hostName: "${safeName}"`
      );
      console.log(`   ✅ Updated host name: ${safeName}`);
    }
    
    // Update host profile picture
    if (safeProfilePic) {
      configContent = configContent.replace(
        /hostProfilePicture:\s*"[^"]*"/,
        `hostProfilePicture: "${safeProfilePic}"`
      );
      console.log(`   ✅ Updated host profile picture: ${safeProfilePic}`);
    }
    
    fs.writeFileSync(configPath, configContent);
    
  } catch (error) {
    console.log(`   ⚠️  Could not update config: ${error.message}`);
  }
}



async function updateEpisodeFiles(primaryHostSlug, coHostSlug = null) {
  const episodesDir = path.join('src', 'content', 'episodes');
  
  if (!fs.existsSync(episodesDir)) {
    console.log('No episodes directory found. Episodes will reference the new hosts when created.');
    return;
  }
  
  const episodeFiles = fs.readdirSync(episodesDir).filter(file => file.endsWith('.md'));
  let updatedCount = 0;
  
  for (const file of episodeFiles) {
    const filepath = path.join(episodesDir, file);
    const content = fs.readFileSync(filepath, 'utf8');
    
    // Replace main-host with the new primary host
    const hostsArray = coHostSlug 
      ? `["${primaryHostSlug}", "${coHostSlug}"]`
      : `["${primaryHostSlug}"]`;
    
    const updatedContent = content.replace(
      /hosts:\s*\["main-host"\]/g,
      `hosts: ${hostsArray}`
    );
    
    if (updatedContent !== content) {
      fs.writeFileSync(filepath, updatedContent);
      updatedCount++;
    }
  }
  
  console.log(`   Updated ${updatedCount} episode file(s) to reference new hosts`);
}

// Run the script
main();
