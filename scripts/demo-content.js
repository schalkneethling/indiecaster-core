#!/usr/bin/env node

/**
 * IndieCaster Demo Content Management Script
 * 
 * This script can seed the project with demo content from a specified folder
 * and also tear down that content when needed.
 * 
 * Usage:
 *   npm run demo-content seed <path-to-demo-folder>
 *   npm run demo-content teardown
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// Backup directory for original content
const BACKUP_DIR = path.join(projectRoot, '.demo-backup');

function log(message, type = 'info') {
  const timestamp = new Date().toISOString();
  const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : 'ℹ️';
  console.log(`${prefix} [${timestamp}] ${message}`);
}

function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function copyDirectory(src, dest) {
  ensureDirectoryExists(dest);
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function backupOriginalContent() {
  log('Creating backup of original content...');
  
  const contentDirs = [
    'src/content/episodes',
    'src/content/guests',
    'public/audio/episodes',
    'public/profile-images',
    'public/episode-artwork'
  ];
  
  for (const dir of contentDirs) {
    const srcPath = path.join(projectRoot, dir);
    const backupPath = path.join(BACKUP_DIR, dir);
    
    if (fs.existsSync(srcPath)) {
      copyDirectory(srcPath, backupPath);
    }
  }
  
  log('Backup created successfully', 'success');
}

function restoreOriginalContent() {
  log('Restoring original content from backup...');
  
  if (!fs.existsSync(BACKUP_DIR)) {
    log('No backup found. Nothing to restore.', 'error');
    return false;
  }
  
  const contentDirs = [
    'src/content/episodes',
    'src/content/guests',
    'public/audio/episodes',
    'public/profile-images',
    'public/episode-artwork'
  ];
  
  for (const dir of contentDirs) {
    const backupPath = path.join(BACKUP_DIR, dir);
    const destPath = path.join(projectRoot, dir);
    
    if (fs.existsSync(backupPath)) {
      // Remove existing content
      if (fs.existsSync(destPath)) {
        fs.rmSync(destPath, { recursive: true, force: true });
      }
      
      // Restore from backup
      copyDirectory(backupPath, destPath);
    }
  }
  
  // Clean up backup directory
  fs.rmSync(BACKUP_DIR, { recursive: true, force: true });
  
  log('Original content restored successfully', 'success');
  return true;
}

function seedDemoContent(demoFolderPath) {
  log(`Seeding demo content from: ${demoFolderPath}`);
  
  if (!fs.existsSync(demoFolderPath)) {
    log(`Demo folder not found: ${demoFolderPath}`, 'error');
    return false;
  }
  
  // Create backup of current content
  backupOriginalContent();
  
  // Copy demo content to project
  const contentDirs = [
    'src/content/episodes',
    'src/content/guests',
    'public/audio/episodes',
    'public/profile-images',
    'public/episode-artwork'
  ];
  
  for (const dir of contentDirs) {
    const srcPath = path.join(demoFolderPath, dir);
    const destPath = path.join(projectRoot, dir);
    
    if (fs.existsSync(srcPath)) {
      log(`Copying ${dir}...`);
      
      // Remove existing content
      if (fs.existsSync(destPath)) {
        fs.rmSync(destPath, { recursive: true, force: true });
      }
      
      // Copy demo content
      copyDirectory(srcPath, destPath);
    } else {
      log(`Warning: ${dir} not found in demo folder`, 'error');
    }
  }
  
  log('Demo content seeded successfully', 'success');
  return true;
}

function showUsage() {
  console.log(`
🎙️  IndieCaster Demo Content Management

Usage:
  npm run demo-content seed <path-to-demo-folder>
  npm run demo-content teardown

Commands:
  seed <path>     - Seed the project with demo content from the specified folder
  teardown        - Remove demo content and restore original content

Examples:
  npm run demo-content seed ./demo-content
  npm run demo-content seed /path/to/demo/folder
  npm run demo-content teardown

Demo folder structure should match the project structure:
  demo-content/
  ├── src/
  │   └── content/
  │       ├── episodes/
  │       └── guests/
  └── public/
      ├── audio/episodes/
      ├── profile-images/
      └── episode-artwork/
`);
}

function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    showUsage();
    process.exit(1);
  }
  
  const command = args[0];
  
  try {
    switch (command) {
      case 'seed':
        if (args.length < 2) {
          log('Error: Please provide the path to the demo folder', 'error');
          showUsage();
          process.exit(1);
        }
        
        const demoPath = path.resolve(args[1]);
        if (seedDemoContent(demoPath)) {
          log('Demo content seeding completed successfully!', 'success');
          log('You can now run "npm run dev" to see the demo content.', 'info');
        } else {
          process.exit(1);
        }
        break;
        
      case 'teardown':
        if (restoreOriginalContent()) {
          log('Demo content teardown completed successfully!', 'success');
          log('Original content has been restored.', 'info');
        } else {
          process.exit(1);
        }
        break;
        
      case 'help':
      case '--help':
      case '-h':
        showUsage();
        break;
        
      default:
        log(`Unknown command: ${command}`, 'error');
        showUsage();
        process.exit(1);
    }
  } catch (error) {
    log(`Error: ${error.message}`, 'error');
    process.exit(1);
  }
}

// Run the script
main(); 