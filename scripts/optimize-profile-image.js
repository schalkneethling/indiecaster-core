#!/usr/bin/env node

/**
 * Profile Image Optimizer
 *
 * Generates all required profile image formats from a source image.
 * Uses the already-installed Sharp dependency.
 *
 * Usage:
 *   npm run optimize-profile <source-image-path> <output-filename>
 *
 * Example:
 *   npm run optimize-profile ~/Downloads/headshot.jpg john-doe
 *
 * Outputs:
 *   public/profile-images/john-doe.png (200x200px)
 *   public/profile-images/john-doe@2x.webp (400x400px)
 *   public/profile-images/john-doe@2x.avif (400x400px)
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
};

function log(message, type = 'info') {
  const prefix = {
    error: `${colors.red}❌ ERROR:${colors.reset}`,
    warning: `${colors.yellow}⚠️  WARNING:${colors.reset}`,
    success: `${colors.green}✓${colors.reset}`,
    info: `${colors.blue}ℹ${colors.reset}`,
    title: `${colors.cyan}${colors.bold}`
  }[type];

  console.log(`${prefix} ${message}`);
}

function printUsage() {
  console.log(`
${colors.cyan}${colors.bold}Profile Image Optimizer${colors.reset}

${colors.bold}Usage:${colors.reset}
  npm run optimize-profile <source-image-path> <output-filename>

${colors.bold}Arguments:${colors.reset}
  source-image-path    Path to your source image (JPG, PNG, WebP, etc.)
  output-filename      Desired filename (without extension, kebab-case recommended)

${colors.bold}Example:${colors.reset}
  npm run optimize-profile ~/Downloads/headshot.jpg john-doe

${colors.bold}Output:${colors.reset}
  This will create three optimized files in public/profile-images/:
  - john-doe.png        (200x200px, base image)
  - john-doe@2x.webp    (400x400px, high-res WebP)
  - john-doe@2x.avif    (400x400px, high-res AVIF)

${colors.bold}Tips:${colors.reset}
  - Source image should be at least 400x400px (larger is better)
  - Use a square aspect ratio image for best results
  - Photo will be auto-cropped to square if needed
  - Output filename will be used in host/guest frontmatter
  `);
}

async function optimizeProfileImage(sourcePath, outputFilename) {
  try {
    // Validate source path
    if (!fs.existsSync(sourcePath)) {
      log(`Source image not found: ${sourcePath}`, 'error');
      log('Please check the file path and try again.', 'info');
      process.exit(1);
    }

    // Validate filename (basic check)
    if (outputFilename.includes('.')) {
      log('Output filename should not include file extension', 'error');
      log('Example: Use "john-doe" instead of "john-doe.png"', 'info');
      process.exit(1);
    }

    // Warn about filename convention
    if (outputFilename !== outputFilename.toLowerCase() || outputFilename.includes(' ')) {
      log('Filename should be lowercase and use hyphens instead of spaces', 'warning');
      log(`Recommended: "${outputFilename.toLowerCase().replace(/\s+/g, '-')}"`, 'info');

      const readline = await import('readline');
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

      const answer = await new Promise(resolve => {
        rl.question('Continue anyway? (y/n): ', resolve);
      });
      rl.close();

      if (answer.toLowerCase() !== 'y' && answer.toLowerCase() !== 'yes') {
        log('Operation cancelled.', 'info');
        process.exit(0);
      }
    }

    // Create output directory if it doesn't exist
    const outputDir = path.join(process.cwd(), 'public', 'profile-images');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
      log(`Created directory: ${outputDir}`, 'info');
    }

    // Load source image
    log(`\n📸 Loading source image: ${sourcePath}`, 'info');
    const image = sharp(sourcePath);
    const metadata = await image.metadata();

    log(`   Source image: ${metadata.width}x${metadata.height}px, ${metadata.format}`, 'info');

    // Check if image is large enough
    const minSize = Math.min(metadata.width, metadata.height);
    if (minSize < 400) {
      log('Source image is smaller than 400px on its shortest side', 'warning');
      log('Output quality may be reduced. Recommend using a larger image.', 'warning');
    }

    console.log(`\n${colors.cyan}Generating optimized images...${colors.reset}\n`);

    // Generate PNG (200x200)
    const pngPath = path.join(outputDir, `${outputFilename}.png`);
    await image
      .resize(200, 200, { fit: 'cover', position: 'center' })
      .png({ quality: 90, compressionLevel: 9 })
      .toFile(pngPath);

    const pngSize = (fs.statSync(pngPath).size / 1024).toFixed(2);
    log(`Created: ${outputFilename}.png (200x200px, ${pngSize} KB)`, 'success');

    // Generate WebP @2x (400x400)
    const webpPath = path.join(outputDir, `${outputFilename}@2x.webp`);
    await image
      .resize(400, 400, { fit: 'cover', position: 'center' })
      .webp({ quality: 85 })
      .toFile(webpPath);

    const webpSize = (fs.statSync(webpPath).size / 1024).toFixed(2);
    log(`Created: ${outputFilename}@2x.webp (400x400px, ${webpSize} KB)`, 'success');

    // Generate AVIF @2x (400x400)
    const avifPath = path.join(outputDir, `${outputFilename}@2x.avif`);
    await image
      .resize(400, 400, { fit: 'cover', position: 'center' })
      .avif({ quality: 80 })
      .toFile(avifPath);

    const avifSize = (fs.statSync(avifPath).size / 1024).toFixed(2);
    log(`Created: ${outputFilename}@2x.avif (400x400px, ${avifSize} KB)`, 'success');

    const totalSize = (parseFloat(pngSize) + parseFloat(webpSize) + parseFloat(avifSize)).toFixed(2);

    console.log(`\n${colors.green}${colors.bold}✓ Success!${colors.reset} Generated 3 profile images (${totalSize} KB total)\n`);

    log('📂 Files saved to: public/profile-images/', 'info');
    log('📝 Use in frontmatter:', 'info');
    console.log(`   ${colors.cyan}profilePicture: "${outputFilename}"${colors.reset}\n`);

    log('Next steps:', 'info');
    console.log(`   1. Use "${outputFilename}" in your host/guest frontmatter`);
    console.log(`   2. Run ${colors.cyan}npm run validate-media${colors.reset} to verify`);
    console.log(`   3. Run ${colors.cyan}npm run dev${colors.reset} to preview\n`);

  } catch (error) {
    log(`Image processing failed: ${error.message}`, 'error');

    if (error.message.includes('Input file is missing') || error.message.includes('ENOENT')) {
      log('The source image file could not be found or accessed.', 'info');
    } else if (error.message.includes('Input buffer') || error.message.includes('unsupported')) {
      log('The source file may not be a valid image format.', 'info');
      log('Supported formats: JPG, PNG, WebP, GIF, TIFF, AVIF', 'info');
    } else if (error.message.includes('EACCES')) {
      log('Permission denied. Check file/directory permissions.', 'info');
    }

    process.exit(1);
  }
}

async function main() {
  console.log(`\n${colors.cyan}${'═'.repeat(60)}${colors.reset}`);
  console.log(`${colors.cyan}${colors.bold}  IndieCaster Profile Image Optimizer${colors.reset}`);
  console.log(`${colors.cyan}${'═'.repeat(60)}${colors.reset}\n`);

  // Get command line arguments
  const args = process.argv.slice(2);

  // Check for help flag
  if (args.includes('--help') || args.includes('-h') || args.length === 0) {
    printUsage();
    process.exit(0);
  }

  // Validate arguments
  if (args.length < 2) {
    log('Missing required arguments', 'error');
    printUsage();
    process.exit(1);
  }

  const [sourcePath, outputFilename] = args;

  // Expand ~ to home directory if present
  const expandedPath = sourcePath.startsWith('~')
    ? sourcePath.replace('~', process.env.HOME || process.env.USERPROFILE)
    : sourcePath;

  // Convert to absolute path if relative
  const absolutePath = path.isAbsolute(expandedPath)
    ? expandedPath
    : path.resolve(process.cwd(), expandedPath);

  await optimizeProfileImage(absolutePath, outputFilename);
}

// Run the script
main().catch(error => {
  log(`Unexpected error: ${error.message}`, 'error');
  console.error(error);
  process.exit(1);
});
