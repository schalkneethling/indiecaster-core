# IndieCaster MVP Master Plan
## From Terminal-Only to User-Friendly Self-Hosted Podcast Platform

**Version:** 1.0
**Last Updated:** 2025-11-12
**Status:** Ready for Implementation

---

## Executive Summary

IndieCaster has achieved **100% MVP completion** for its core static site functionality. However, it currently requires terminal usage for all setup and content management, creating a significant barrier for non-technical podcasters. This plan outlines a comprehensive strategy to transform IndieCaster into a **truly accessible, self-hosted podcast platform** that rivals the ease of WordPress while maintaining the power and flexibility that technical users appreciate.

### Vision Statement
> *"Make IndieCaster so easy that a podcaster can go from zero to published in 15 minutes, without ever opening a terminal—while still providing power users with the CLI tools they love."*

### Key Differentiators
1. **Web-Based Setup Wizard** - WordPress-style onboarding
2. **Hybrid Approach** - Both web UI and CLI tools available
3. **One-Click Deployment** - Integrated hosting platform support
4. **Import Anything** - Migrate from any podcast platform
5. **Self-Hosted Freedom** - Complete control, no vendor lock-in
6. **Production-Ready Performance** - Fast, SEO-optimized, accessible

---

## Current State Analysis

### ✅ What's Working (100% MVP Complete)
- **Core Infrastructure**: Astro-based static site generator with excellent performance
- **Content Collections**: Type-safe content management with Zod validation
- **RSS Feed**: Basic feed generation (needs enhancement)
- **SEO & Performance**: Comprehensive optimization, structured data, sitemaps
- **Responsive Design**: Mobile-optimized with service worker for offline support
- **CLI Tools**: Scripts for episode/host/guest creation, RSS import
- **Documentation**: 17+ comprehensive guides

### ⚠️ Critical Issues to Address

#### 1. **Syntax Error in setup-hosts.js** (Line 377-378)
```javascript
// Current (broken):
}
}

// Should be:
}
// Missing closing brace causes script to fail
```

#### 2. **RSS Feed Enhancement Needed**
- Missing iTunes-specific tags
- Audio enclosures not working
- Episode artwork not included
- Duration metadata needs proper formatting

#### 3. **User Experience Barriers**
- **Terminal Required**: All setup requires command-line knowledge
- **Configuration Complexity**: Manual editing of config files
- **Media Management**: Manual file placement in correct directories
- **No Visual Feedback**: Can't see changes without running dev server
- **Error Handling**: Limited guidance when things go wrong

#### 4. **Content Management Limitations**
- No visual editor for markdown
- No media upload interface
- No content preview before publishing
- No batch operations (bulk edit, delete, etc.)

---

## Strategic Goals

### Phase-Based Approach
This plan is divided into **6 phases**, each building on the previous one, with clear milestones where work can be tested, reviewed, and merged to main.

### Success Criteria
- ✅ **Zero Terminal Requirement** for basic users
- ✅ **15-Minute Setup** from clone to first episode published
- ✅ **Visual Content Management** via web interface
- ✅ **One-Click Deploy** to major hosting platforms
- ✅ **Maintain CLI Power** for technical users
- ✅ **Full RSS Compatibility** with all major podcast platforms
- ✅ **Professional Quality** output comparable to enterprise solutions

---

## Phase 1: Foundation & Bug Fixes
**Duration:** 1 week
**Goal:** Fix critical issues, solidify existing features, establish quality baseline

### 1.1 Fix Critical Bugs

#### **Task 1.1.1: Fix setup-hosts.js Syntax Error**
**Priority:** CRITICAL
**Files:** `scripts/setup-hosts.js`

**Current Issue:**
```javascript:scripts/setup-hosts.js
// Line 296-378
  } finally {
      rl.close();
}

function updateHostConfig(hostName, profilePicture) {
  // ... function code
}

async function updateEpisodeFiles(primaryHostSlug, coHostSlug = null) {
  // ... function code
}

// Run the script
main();
}
```

**Fix Required:**
- Remove duplicate closing brace at line 378
- Ensure `main()` function is properly closed
- Add error handling for edge cases
- Test with multiple hosts

**Test Plan:**
```bash
npm run setup-hosts
# Test scenarios:
# 1. Single host setup
# 2. Co-host setup
# 3. Overwrite existing host
# 4. Cancel mid-setup (Ctrl+C)
# 5. Invalid input handling
```

#### **Task 1.1.2: Enhance RSS Feed for Podcast Platforms**
**Priority:** HIGH
**Files:** `src/pages/rss.xml.js`

**Required Enhancements:**
```javascript
// Add iTunes namespace and tags
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { indieCasterConfig } from '../../indiecaster.config.js';

export async function GET(context) {
  const episodes = await getCollection('episodes');
  const publishedEpisodes = episodes
    .filter(episode => !episode.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: indieCasterConfig.podcastName,
    description: indieCasterConfig.metaDefaultDescription,
    site: context.site,
    xmlns: {
      itunes: 'http://www.itunes.com/dtds/podcast-1.0.dtd',
      content: 'http://purl.org/rss/1.0/modules/content/',
      atom: 'http://www.w3.org/2005/Atom'
    },
    customData: `
      <language>en-us</language>
      <itunes:author>${indieCasterConfig.hostName}</itunes:author>
      <itunes:subtitle>${indieCasterConfig.elevatorPitch}</itunes:subtitle>
      <itunes:summary>${indieCasterConfig.metaDefaultDescription}</itunes:summary>
      <itunes:owner>
        <itunes:name>${indieCasterConfig.hostName}</itunes:name>
        <itunes:email>podcast@${indieCasterConfig.domain}</itunes:email>
      </itunes:owner>
      <itunes:image href="https://${indieCasterConfig.domain}/logo.svg" />
      <itunes:category text="Technology" />
      <itunes:explicit>false</itunes:explicit>
    `,
    items: publishedEpisodes.map((episode) => ({
      title: episode.data.title,
      description: episode.data.description,
      pubDate: episode.data.pubDate,
      link: `/episodes/${episode.slug}/`,
      enclosure: {
        url: `https://${indieCasterConfig.domain}/audio/episodes/${episode.data.audioFile}.mp3`,
        type: 'audio/mpeg',
        length: 0 // TODO: Calculate actual file size
      },
      customData: `
        <itunes:duration>${episode.data.duration}</itunes:duration>
        <itunes:episodeType>full</itunes:episodeType>
        <itunes:explicit>${episode.data.explicit || false}</itunes:explicit>
        ${episode.data.episodeNumber ? `<itunes:episode>${episode.data.episodeNumber}</itunes:episode>` : ''}
        ${episode.data.season ? `<itunes:season>${episode.data.season}</itunes:season>` : ''}
        ${episode.data.artwork ? `<itunes:image href="https://${indieCasterConfig.domain}/episode-artwork/${episode.data.artwork.src}" />` : ''}
      `
    }))
  });
}
```

**Validation:**
- Test with [Podbase RSS Validator](https://podba.se/validate/)
- Test with [Cast Feed Validator](https://castfeedvalidator.com/)
- Submit to Apple Podcasts Connect (test account)
- Verify in Spotify for Podcasters

### 1.2 Replace Placeholder Files

#### **Task 1.2.1: Create Media File Requirements Document**
**Files:** `docs/MEDIA-REQUIREMENTS.md`

**Content:**
- Required formats for each file type
- Dimension requirements
- File size limits
- Naming conventions
- Quality guidelines
- Tools and resources for creation

#### **Task 1.2.2: Add Media File Validation**
**Files:** `scripts/validate-media.js` (new)

```javascript
#!/usr/bin/env node
/**
 * Validates media files against requirements
 * Checks:
 * - File existence
 * - File size (not 1-byte placeholders)
 * - Image dimensions
 * - Audio format
 * - Naming conventions
 */
```

### 1.3 Testing & Documentation

#### **Task 1.3.1: Create Test Checklist**
**Files:** `docs/TESTING-CHECKLIST.md`

**Include:**
- Development server startup
- All page routes working
- RSS feed validation
- Build process
- Production preview
- Cross-browser testing
- Mobile responsiveness
- Accessibility testing

#### **Task 1.3.2: Update Documentation**
**Files:** Update all docs to reflect bug fixes

---

### Phase 1 Milestone: "Solid Foundation"
**Deliverables:**
- ✅ All critical bugs fixed
- ✅ RSS feed validates with podcast platforms
- ✅ Comprehensive testing checklist
- ✅ Updated documentation
- ✅ Clean build with no errors
- ✅ Ready to merge to main

**Review Criteria:**
- All npm scripts run without errors
- RSS feed passes validation
- Build process completes successfully
- Documentation is accurate and up-to-date

---

## Phase 2: Web-Based Setup Wizard
**Duration:** 2-3 weeks
**Goal:** Create WordPress-style setup wizard accessible via browser

### 2.1 Architecture Design

#### **Task 2.1.1: Setup Wizard Architecture**

**Approach:** Astro Pages + API Routes

**Directory Structure:**
```
src/
├── pages/
│   ├── setup/
│   │   ├── index.astro           # Setup wizard landing
│   │   ├── step-1-welcome.astro  # Welcome & prerequisites
│   │   ├── step-2-podcast.astro  # Podcast info
│   │   ├── step-3-host.astro     # Host profile
│   │   ├── step-4-social.astro   # Social media links
│   │   ├── step-5-episode.astro  # First episode
│   │   ├── step-6-deploy.astro   # Deployment options
│   │   └── complete.astro        # Success page
│   └── api/
│       └── setup/
│           ├── save-config.js    # Save configuration
│           ├── create-host.js    # Create host file
│           ├── create-episode.js # Create episode file
│           ├── upload-media.js   # Handle media uploads
│           └── validate.js       # Validation endpoints
├── components/
│   └── setup/
│       ├── SetupLayout.astro     # Wizard layout
│       ├── StepIndicator.astro   # Progress indicator
│       ├── SetupForm.astro       # Form components
│       └── MediaUploader.astro   # File upload component
└── utils/
    └── setup/
        ├── config-manager.js     # Config file manipulation
        ├── file-manager.js       # File creation/management
        └── validators.js         # Input validation
```

#### **Task 2.1.2: Setup Detection Logic**

**Files:** `src/middleware.js` (new)

```javascript
/**
 * Middleware to detect if setup is needed
 * Redirects to /setup if config contains placeholder values
 */
export async function onRequest(context, next) {
  const { url, redirect } = context;

  // Skip setup routes
  if (url.pathname.startsWith('/setup/') || url.pathname.startsWith('/api/setup/')) {
    return next();
  }

  // Check if setup is complete
  const config = await import('../indiecaster.config.js');
  const needsSetup =
    config.indieCasterConfig.domain === '[YOUR_DOMAIN]' ||
    config.indieCasterConfig.hostName === '[YOUR_NAME]';

  if (needsSetup && url.pathname !== '/setup') {
    return redirect('/setup', 302);
  }

  return next();
}
```

### 2.2 Setup Wizard Implementation

#### **Task 2.2.1: Step 1 - Welcome & Prerequisites**
**Files:** `src/pages/setup/index.astro`

**UI Elements:**
- Welcome message
- Prerequisites checklist:
  - [ ] Node.js installed (detected automatically)
  - [ ] npm/yarn available (detected automatically)
  - [ ] Git initialized (detected automatically)
  - [ ] Write permissions (detected automatically)
- System requirements check
- "Get Started" button → Step 2

**Features:**
- Automatic system detection
- Clear error messages if requirements not met
- Link to installation guides

#### **Task 2.2.2: Step 2 - Podcast Information**
**Files:** `src/pages/setup/step-2-podcast.astro`

**Form Fields:**
```astro
<SetupForm step={2}>
  <FormField
    name="podcastName"
    label="Podcast Name"
    type="text"
    required
    placeholder="My Awesome Podcast"
    help="The name of your podcast"
  />

  <FormField
    name="elevatorPitch"
    label="Elevator Pitch"
    type="textarea"
    required
    maxlength="160"
    placeholder="A podcast about..."
    help="A compelling one-sentence description (max 160 characters)"
  />

  <FormField
    name="metaDescription"
    label="Meta Description"
    type="textarea"
    required
    maxlength="160"
    placeholder="For search engines..."
    help="Appears in search results and social shares (150-160 characters)"
  />

  <FormField
    name="domain"
    label="Website Domain"
    type="text"
    required
    pattern="^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$"
    placeholder="mypodcast.com"
    help="Your podcast website domain"
  />

  <FormField
    name="language"
    label="Language"
    type="select"
    required
    options={["en", "es", "fr", "de", "pt"]}
    default="en"
  />

  <ColorPicker
    name="primaryColor"
    label="Primary Brand Color"
    default="#1c1c44"
  />

  <ColorPicker
    name="secondaryColor"
    label="Secondary Brand Color"
    default="#dab97e"
  />

  <FormActions>
    <Button type="button" variant="secondary" onClick="history.back()">Back</Button>
    <Button type="submit" variant="primary">Continue</Button>
  </FormActions>
</SetupForm>
```

**Validation:**
- Real-time validation as user types
- Domain format validation
- Character count for descriptions
- Color hex value validation

**API Endpoint:** `POST /api/setup/save-config`
- Validates input
- Updates `indiecaster.config.js`
- Returns success/error
- Redirects to Step 3

#### **Task 2.2.3: Step 3 - Host Profile**
**Files:** `src/pages/setup/step-3-host.astro`

**Form Fields:**
```astro
<SetupForm step={3}>
  <FormField
    name="hostName"
    label="Your Full Name"
    type="text"
    required
    placeholder="Jane Doe"
  />

  <FormField
    name="hostBio"
    label="Your Bio"
    type="textarea"
    required
    placeholder="Tell us about yourself..."
    help="A brief biography for your host profile"
  />

  <MediaUploader
    name="hostProfilePicture"
    label="Profile Picture"
    accept="image/png,image/jpeg,image/webp"
    required
    help="Recommended: 400x400px, max 1MB"
    preview={true}
  />

  <FormField
    name="hostTitle"
    label="Job Title"
    type="text"
    placeholder="Host & Creator"
  />

  <FormField
    name="hostCompany"
    label="Company"
    type="text"
    placeholder="Your Company"
  />

  <FormField
    name="hostWebsite"
    label="Website"
    type="url"
    placeholder="https://yourwebsite.com"
  />

  <SocialMediaFields />

  <FormActions>
    <Button type="button" variant="secondary" onClick="history.back()">Back</Button>
    <Button type="submit" variant="primary">Continue</Button>
  </FormActions>
</SetupForm>
```

**Features:**
- Image upload with preview
- Image cropping/resizing tool
- Automatic slug generation from name
- Optional co-host setup (checkbox to add another host)

**API Endpoints:**
- `POST /api/setup/upload-media` - Handles image upload
- `POST /api/setup/create-host` - Creates host markdown file

#### **Task 2.2.4: Step 4 - Social Media & Podcast Platforms**
**Files:** `src/pages/setup/step-4-social.astro`

**UI:**
```astro
<SetupForm step={4}>
  <FormSection title="Social Media Links">
    <PlatformLink platform="twitter" />
    <PlatformLink platform="linkedin" />
    <PlatformLink platform="instagram" />
    <PlatformLink platform="facebook" />
    <PlatformLink platform="github" />
    <PlatformLink platform="mastodon" />
    <Button type="button" variant="outline" onClick="addCustomPlatform">
      + Add Custom Platform
    </Button>
  </FormSection>

  <FormSection title="Podcast Platforms">
    <PlatformLink platform="apple-podcasts" />
    <PlatformLink platform="spotify" />
    <PlatformLink platform="youtube" />
    <PlatformLink platform="amazon-music" />
    <PlatformLink platform="overcast" />
    <FormField
      name="rssUrl"
      label="RSS Feed URL"
      type="url"
      readonly
      value={`https://${domain}/rss.xml`}
      help="Submit this URL to podcast directories"
    />
  </FormSection>

  <FormActions>
    <Button type="button" variant="secondary">Skip</Button>
    <Button type="submit" variant="primary">Continue</Button>
  </FormActions>
</SetupForm>
```

**Features:**
- Platform-specific URL validation
- Icons for each platform
- Optional: Can skip and add later
- Copy RSS URL to clipboard

#### **Task 2.2.5: Step 5 - First Episode (Optional)**
**Files:** `src/pages/setup/step-5-episode.astro`

**Form:**
```astro
<SetupForm step={5}>
  <Alert type="info">
    You can create your first episode now or skip and do it later from the dashboard.
  </Alert>

  <FormField
    name="episodeTitle"
    label="Episode Title"
    type="text"
    placeholder="Welcome to My Podcast"
  />

  <FormField
    name="episodeDescription"
    label="Episode Description"
    type="textarea"
    placeholder="In this episode..."
  />

  <FormField
    name="pubDate"
    label="Publication Date"
    type="date"
    default={new Date().toISOString().split('T')[0]}
  />

  <MediaUploader
    name="audioFile"
    label="Audio File"
    accept="audio/mpeg,audio/mp3"
    help="Upload your episode audio file (MP3 format)"
  />

  <FormField
    name="duration"
    label="Duration"
    type="text"
    pattern="^[0-9]{1,3}:[0-5][0-9]$"
    placeholder="45:30"
    help="Format: MM:SS or HHH:MM"
  />

  <MediaUploader
    name="episodeArtwork"
    label="Episode Artwork (Optional)"
    accept="image/png,image/jpeg"
    help="3000x3000px recommended"
  />

  <FormField
    name="showNotes"
    label="Show Notes"
    type="markdown"
    placeholder="# Show Notes\n\n- Topic 1\n- Topic 2"
  />

  <FormField
    name="tags"
    label="Tags"
    type="tags"
    placeholder="technology, interview, tutorial"
  />

  <FormActions>
    <Button type="button" variant="secondary">Skip</Button>
    <Button type="submit" variant="primary">Create Episode</Button>
  </FormActions>
</SetupForm>
```

**Features:**
- Audio file upload with progress bar
- Automatic duration detection from audio file
- Markdown editor with preview
- Tag input with autocomplete
- Draft/Publish toggle

#### **Task 2.2.6: Step 6 - Deployment Options**
**Files:** `src/pages/setup/step-6-deploy.astro`

**UI:**
```astro
<SetupForm step={6}>
  <Alert type="success">
    🎉 Your podcast website is configured!
  </Alert>

  <FormSection title="Choose Deployment Method">
    <DeploymentOption
      platform="netlify"
      icon="netlify-icon.svg"
      title="Deploy to Netlify"
      description="Free hosting with automatic deployments"
      difficulty="Easy"
      onClick={deployToNetlify}
    />

    <DeploymentOption
      platform="vercel"
      icon="vercel-icon.svg"
      title="Deploy to Vercel"
      description="Instant deployment with edge network"
      difficulty="Easy"
      onClick={deployToVercel}
    />

    <DeploymentOption
      platform="github-pages"
      icon="github-icon.svg"
      title="Deploy to GitHub Pages"
      description="Free hosting for public repositories"
      difficulty="Medium"
      onClick={deployToGitHub}
    />

    <DeploymentOption
      platform="manual"
      icon="server-icon.svg"
      title="Manual Deployment"
      description="Deploy to your own server"
      difficulty="Advanced"
      onClick={showManualInstructions}
    />
  </FormSection>

  <FormActions>
    <Button type="button" variant="outline" onClick="skipDeployment">
      I'll Deploy Later
    </Button>
  </FormActions>
</SetupForm>
```

**Features:**
- One-click deploy to popular platforms
- OAuth integration for Netlify/Vercel
- Automatic Git setup and push
- Manual deployment instructions
- Domain configuration guide

#### **Task 2.2.7: Setup Complete Page**
**Files:** `src/pages/setup/complete.astro`

**UI:**
```astro
<SetupComplete>
  <Confetti />

  <Heading>🎉 Setup Complete!</Heading>

  <Message>
    Your podcast website is ready. Here's what you can do next:
  </Message>

  <NextSteps>
    <Step icon="eye">
      <StepTitle>Preview Your Site</StepTitle>
      <StepDescription>See how your podcast website looks</StepDescription>
      <Button href="/" variant="primary">View Site</Button>
    </Step>

    <Step icon="plus">
      <StepTitle>Create Another Episode</StepTitle>
      <StepDescription>Add more content to your podcast</StepDescription>
      <Button href="/admin/episodes/new" variant="outline">New Episode</Button>
    </Step>

    <Step icon="settings">
      <StepTitle>Customize Your Site</StepTitle>
      <StepDescription>Fine-tune colors, layout, and more</StepDescription>
      <Button href="/admin/settings" variant="outline">Settings</Button>
    </Step>

    <Step icon="rocket">
      <StepTitle>Deploy to Production</StepTitle>
      <StepDescription>Make your podcast live on the web</StepDescription>
      <Button href="/admin/deploy" variant="outline">Deploy</Button>
    </Step>
  </NextSteps>

  <Resources>
    <ResourceLink href="/docs">📚 Documentation</ResourceLink>
    <ResourceLink href="/docs/rss-submission">📡 Submit to Podcast Directories</ResourceLink>
    <ResourceLink href="/docs/customization">🎨 Customization Guide</ResourceLink>
  </Resources>
</SetupComplete>
```

### 2.3 API Implementation

#### **Task 2.3.1: Configuration Management API**
**Files:** `src/pages/api/setup/save-config.js`

```javascript
import fs from 'fs/promises';
import path from 'path';
import { z } from 'zod';

// Validation schema
const configSchema = z.object({
  podcastName: z.string().min(1).max(100),
  elevatorPitch: z.string().min(10).max(160),
  metaDescription: z.string().min(10).max(160),
  domain: z.string().regex(/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/),
  language: z.string().length(2),
  primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  secondaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
});

export async function POST({ request }) {
  try {
    const data = await request.json();

    // Validate input
    const validated = configSchema.parse(data);

    // Read current config
    const configPath = path.join(process.cwd(), 'indiecaster.config.js');
    let configContent = await fs.readFile(configPath, 'utf8');

    // Update config fields
    configContent = configContent
      .replace(/podcastName: "[^"]*"/, `podcastName: "${validated.podcastName}"`)
      .replace(/elevatorPitch:\s*"[^"]*"/, `elevatorPitch: "${validated.elevatorPitch}"`)
      .replace(/domain: "\[YOUR_DOMAIN\]"/, `domain: "${validated.domain}"`)
      .replace(/metaDefaultDescription:\s*"[^"]*"/, `metaDefaultDescription: "${validated.metaDescription}"`)
      .replace(/colorPrimaryColor: "#[0-9A-Fa-f]{6}"/, `colorPrimaryColor: "${validated.primaryColor}"`)
      .replace(/colorSecondaryColor: "#[0-9A-Fa-f]{6}"/, `colorSecondaryColor: "${validated.secondaryColor}"`);

    // Write updated config
    await fs.writeFile(configPath, configContent);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
```

#### **Task 2.3.2: Media Upload API**
**Files:** `src/pages/api/setup/upload-media.js`

```javascript
import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

export async function POST({ request }) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const type = formData.get('type'); // 'profile', 'episode-artwork', 'audio'
    const filename = formData.get('filename');

    if (!file) {
      return new Response(JSON.stringify({ error: 'No file provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Determine target directory
    let targetDir;
    switch (type) {
      case 'profile':
        targetDir = 'public/profile-images';
        break;
      case 'episode-artwork':
        targetDir = 'public/episode-artwork';
        break;
      case 'audio':
        targetDir = 'public/audio/episodes';
        break;
      default:
        return new Response(JSON.stringify({ error: 'Invalid file type' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
    }

    const targetPath = path.join(process.cwd(), targetDir);
    await fs.mkdir(targetPath, { recursive: true });

    // For images, process with sharp
    if (type === 'profile' || type === 'episode-artwork') {
      const buffer = await file.arrayBuffer();
      const imageBuffer = Buffer.from(buffer);

      // Save original as PNG
      await sharp(imageBuffer)
        .resize(400, 400, { fit: 'cover' })
        .png()
        .toFile(path.join(targetPath, `${filename}.png`));

      // Save WebP version
      await sharp(imageBuffer)
        .resize(800, 800, { fit: 'cover' })
        .webp()
        .toFile(path.join(targetPath, `${filename}@2x.webp`));

      // Save AVIF version
      await sharp(imageBuffer)
        .resize(800, 800, { fit: 'cover' })
        .avif()
        .toFile(path.join(targetPath, `${filename}@2x.avif`));

      return new Response(JSON.stringify({
        success: true,
        filename: filename,
        formats: ['png', 'webp', 'avif']
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // For audio, save as-is
    if (type === 'audio') {
      const buffer = await file.arrayBuffer();
      await fs.writeFile(
        path.join(targetPath, `${filename}.mp3`),
        Buffer.from(buffer)
      );

      return new Response(JSON.stringify({
        success: true,
        filename: `${filename}.mp3`
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

  } catch (error) {
    return new Response(JSON.stringify({
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
```

#### **Task 2.3.3: Host Creation API**
**Files:** `src/pages/api/setup/create-host.js`

```javascript
import fs from 'fs/promises';
import path from 'path';
import { z } from 'zod';

const hostSchema = z.object({
  name: z.string().min(1),
  bio: z.string().min(10),
  profilePicture: z.string(),
  title: z.string().optional(),
  company: z.string().optional(),
  website: z.string().url().optional(),
  socialLinks: z.record(z.string()).optional(),
});

function toKebabCase(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function POST({ request }) {
  try {
    const data = await request.json();
    const validated = hostSchema.parse(data);

    const slug = toKebabCase(validated.name);
    const hostsDir = path.join(process.cwd(), 'src', 'content', 'hosts');
    const filepath = path.join(hostsDir, `${slug}.md`);

    // Check if file exists
    try {
      await fs.access(filepath);
      return new Response(JSON.stringify({
        error: 'Host already exists'
      }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch {
      // File doesn't exist, proceed with creation
    }

    // Build frontmatter
    let frontmatter = `---
name: "${validated.name}"
bio: "${validated.bio}"
profilePicture: "${validated.profilePicture}"`;

    if (validated.socialLinks && Object.keys(validated.socialLinks).length > 0) {
      frontmatter += `\nsocialLinks:`;
      for (const [platform, url] of Object.entries(validated.socialLinks)) {
        frontmatter += `\n  ${platform}: "${url}"`;
      }
    }

    if (validated.website) {
      frontmatter += `\nwebsite: "${validated.website}"`;
    }

    if (validated.company) {
      frontmatter += `\ncompany: "${validated.company}"`;
    }

    if (validated.title) {
      frontmatter += `\ntitle: "${validated.title}"`;
    }

    frontmatter += `\nepisodes: []`;
    frontmatter += `\nisMainHost: true`;
    frontmatter += `\n---`;

    const content = `${frontmatter}

# ${validated.name}

${validated.bio}
`;

    await fs.writeFile(filepath, content);

    return new Response(JSON.stringify({
      success: true,
      slug: slug
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
```

#### **Task 2.3.4: Episode Creation API**
**Files:** `src/pages/api/setup/create-episode.js`

```javascript
import fs from 'fs/promises';
import path from 'path';
import { z } from 'zod';

const episodeSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(10),
  pubDate: z.string(),
  duration: z.string().regex(/^[0-9]{1,3}:[0-5][0-9]$/),
  audioFile: z.string(),
  showNotes: z.string(),
  tags: z.array(z.string()).optional(),
  artwork: z.string().optional(),
  draft: z.boolean().default(false),
});

function toKebabCase(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function POST({ request }) {
  try {
    const data = await request.json();
    const validated = episodeSchema.parse(data);

    const slug = toKebabCase(validated.title);
    const episodesDir = path.join(process.cwd(), 'src', 'content', 'episodes');
    const filepath = path.join(episodesDir, `${slug}.md`);

    // Build frontmatter
    let frontmatter = `---
title: "${validated.title}"
description: "${validated.description}"
pubDate: ${validated.pubDate}
duration: "${validated.duration}"
audioFile: "${validated.audioFile}"
artwork:
  src: "${validated.artwork || 'default-artwork.png'}"
  alt: "${validated.title}"
showNotes: "${validated.description}"
hosts: ["main-host"]
draft: ${validated.draft}`;

    if (validated.tags && validated.tags.length > 0) {
      frontmatter += `\ntags: [${validated.tags.map(t => `"${t}"`).join(', ')}]`;
    }

    frontmatter += `\n---\n\n`;

    const content = frontmatter + validated.showNotes;

    await fs.writeFile(filepath, content);

    return new Response(JSON.stringify({
      success: true,
      slug: slug
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
```

### 2.4 UI Components

#### **Task 2.4.1: Create Setup UI Components**
**Files:** Multiple files in `src/components/setup/`

**Components to Create:**
- `SetupLayout.astro` - Consistent layout for all setup steps
- `StepIndicator.astro` - Visual progress through steps
- `FormField.astro` - Reusable form input component
- `MediaUploader.astro` - File upload with preview
- `ColorPicker.astro` - Color selection component
- `SocialMediaFields.astro` - Social media link inputs
- `PlatformLink.astro` - Platform URL configuration
- `MarkdownEditor.astro` - Simple markdown editor
- `Alert.astro` - Alert/notification component
- `DeploymentOption.astro` - Deployment platform card

---

### Phase 2 Milestone: "Setup Wizard Complete"
**Deliverables:**
- ✅ Fully functional web-based setup wizard
- ✅ All 6 setup steps implemented
- ✅ API endpoints working
- ✅ Media upload working
- ✅ Auto-detection of setup completion
- ✅ Redirect to setup on first run
- ✅ Documentation updated

**Review Criteria:**
- Complete setup from browser in under 15 minutes
- All configuration saved correctly
- Media files uploaded and processed correctly
- No terminal required for basic setup
- Works across major browsers

---

## Phase 3: Admin Dashboard
**Duration:** 3-4 weeks
**Goal:** Create web-based admin interface for ongoing content management

### 3.1 Dashboard Architecture

**Directory Structure:**
```
src/
├── pages/
│   ├── admin/
│   │   ├── index.astro              # Dashboard home
│   │   ├── episodes/
│   │   │   ├── index.astro          # Episode list
│   │   │   ├── [slug].astro         # Edit episode
│   │   │   └── new.astro            # Create episode
│   │   ├── hosts/
│   │   │   ├── index.astro          # Host list
│   │   │   ├── [slug].astro         # Edit host
│   │   │   └── new.astro            # Create host
│   │   ├── guests/
│   │   │   ├── index.astro          # Guest list
│   │   │   ├── [slug].astro         # Edit guest
│   │   │   └── new.astro            # Create guest
│   │   ├── media.astro              # Media library
│   │   ├── settings.astro           # Site settings
│   │   ├── deploy.astro             # Deployment
│   │   └── analytics.astro          # Analytics (future)
│   └── api/
│       └── admin/
│           ├── episodes/
│           │   ├── list.js
│           │   ├── get.js
│           │   ├── create.js
│           │   ├── update.js
│           │   └── delete.js
│           ├── hosts/[...].js
│           ├── guests/[...].js
│           ├── media/[...].js
│           └── settings/[...].js
├── components/
│   └── admin/
│       ├── DashboardLayout.astro
│       ├── Sidebar.astro
│       ├── Topbar.astro
│       ├── EpisodeCard.astro
│       ├── EpisodeTable.astro
│       ├── MarkdownEditor.astro
│       ├── MediaLibrary.astro
│       └── [...].astro
└── styles/
    └── admin.css                     # Admin-specific styles
```

### 3.2 Dashboard Implementation

#### **Task 3.2.1: Dashboard Home**
**Files:** `src/pages/admin/index.astro`

**UI Sections:**
- Welcome message with site stats
- Quick actions (New Episode, New Guest, View Site)
- Recent episodes list
- Draft episodes needing attention
- System status (build status, RSS validation, etc.)
- Quick tips and getting started guide

**Stats to Display:**
- Total episodes
- Total hosts/guests
- Published episodes
- Draft episodes
- Total audio duration
- Average episode length

#### **Task 3.2.2: Episode Management**
**Files:** `src/pages/admin/episodes/index.astro`

**Features:**
- Table view of all episodes
- Filter by: Published/Draft, Tag, Date, Host
- Sort by: Date, Title, Duration
- Search episodes
- Bulk actions (Publish, Unpublish, Delete)
- Quick edit (title, status, pub date)
- Column toggles (customize visible columns)

**Episode List Columns:**
- Thumbnail (artwork)
- Title
- Status (Published/Draft badge)
- Publication Date
- Duration
- Hosts
- Tags
- Actions (Edit, Duplicate, Delete)

#### **Task 3.2.3: Episode Editor**
**Files:** `src/pages/admin/episodes/[slug].astro`

**Editor Layout:**
- **Left Sidebar (30%):**
  - Episode artwork preview
  - Audio player preview
  - Save/Publish buttons
  - Status selector (Draft/Published)
  - Publication date picker
  - Tags input
  - Categories (if implemented)

- **Main Content (70%):**
  - Title input (large)
  - Description textarea
  - Markdown editor with toolbar:
    - Bold, Italic, Link, List
    - Heading levels
    - Code block
    - Quote
    - Preview toggle
  - Show notes editor
  - Media uploads:
    - Audio file
    - Artwork
    - Additional attachments

- **Right Sidebar (Collapsible):**
  - SEO Preview
    - Google search result preview
    - Social share preview (Twitter, Facebook)
  - Settings:
    - Episode number
    - Season number
    - Explicit content flag
    - Enable comments
    - YouTube video ID
    - Transcript upload

**Real-Time Features:**
- Auto-save (every 30 seconds)
- Visual save indicator
- Unsaved changes warning
- Preview in new tab
- Markdown preview

#### **Task 3.2.4: Media Library**
**Files:** `src/pages/admin/media.astro`

**Features:**
- Grid/List view toggle
- Filter by type (Audio, Images, Documents)
- Search by filename
- Bulk upload (drag & drop)
- Bulk actions (Delete, Download)
- File details panel:
  - Filename
  - File size
  - Dimensions (for images)
  - Duration (for audio)
  - Upload date
  - Used in (which episodes)
- Replace file
- Generate optimized versions

**Media Types:**
- Audio files (MP3, WAV)
- Images (PNG, JPEG, WebP, AVIF)
- Transcripts (VTT, SRT)
- Documents (PDF)

#### **Task 3.2.5: Settings**
**Files:** `src/pages/admin/settings.astro`

**Settings Sections:**

1. **General Settings**
   - Podcast name
   - Tagline/elevator pitch
   - Description
   - Language
   - Timezone

2. **Branding**
   - Logo upload
   - Favicon upload
   - Primary color
   - Secondary color
   - Font selection
   - Custom CSS

3. **RSS Feed**
   - Feed title
   - Feed description
   - Copyright notice
   - iTunes category
   - Explicit content flag
   - Feed language
   - Author name/email

4. **Social Media**
   - Platform links
   - Open Graph image
   - Twitter card type
   - Social sharing buttons

5. **Navigation**
   - Menu items editor
   - Footer links
   - Enable/disable pages

6. **Performance**
   - Image optimization settings
   - Caching settings
   - Service worker enable/disable

7. **Advanced**
   - Custom domain
   - Analytics code
   - Custom head/footer code
   - robots.txt editor
   - htaccess editor (if applicable)

### 3.3 API Endpoints

#### **Task 3.3.1: Episodes API**
**Files:** `src/pages/api/admin/episodes/*.js`

**Endpoints:**
- `GET /api/admin/episodes/list` - List all episodes (with filters)
- `GET /api/admin/episodes/get/[slug]` - Get single episode
- `POST /api/admin/episodes/create` - Create new episode
- `PUT /api/admin/episodes/update/[slug]` - Update episode
- `DELETE /api/admin/episodes/delete/[slug]` - Delete episode
- `POST /api/admin/episodes/duplicate/[slug]` - Duplicate episode
- `POST /api/admin/episodes/bulk` - Bulk actions

**Features:**
- Validation with Zod
- Error handling
- Auto-save support
- Slug generation
- File system operations
- Git integration (optional)

#### **Task 3.3.2: Media API**
**Files:** `src/pages/api/admin/media/*.js`

**Endpoints:**
- `GET /api/admin/media/list` - List all media files
- `POST /api/admin/media/upload` - Upload file(s)
- `GET /api/admin/media/get/[id]` - Get file details
- `DELETE /api/admin/media/delete/[id]` - Delete file
- `POST /api/admin/media/optimize/[id]` - Optimize image
- `GET /api/admin/media/usage/[id]` - Get file usage

#### **Task 3.3.3: Settings API**
**Files:** `src/pages/api/admin/settings/*.js`

**Endpoints:**
- `GET /api/admin/settings/get` - Get all settings
- `PUT /api/admin/settings/update` - Update settings
- `POST /api/admin/settings/validate` - Validate settings

### 3.4 Authentication (Optional but Recommended)

#### **Task 3.4.1: Simple Password Protection**
**Files:** `src/middleware.js` (update)

**Implementation:**
- Environment variable for admin password
- Cookie-based authentication
- Login page at `/admin/login`
- Session timeout (24 hours)
- Logout functionality

**Security Considerations:**
- HTTPS only
- Bcrypt password hashing
- CSRF protection
- Rate limiting on login attempts

**Note:** For production, recommend external auth (OAuth, Auth0, etc.)

---

### Phase 3 Milestone: "Admin Dashboard Complete"
**Deliverables:**
- ✅ Fully functional admin dashboard
- ✅ Episode CRUD operations
- ✅ Host/Guest management
- ✅ Media library
- ✅ Settings management
- ✅ Authentication system
- ✅ Mobile-responsive admin UI
- ✅ Documentation for admin features

**Review Criteria:**
- Create, edit, delete episodes via web UI
- Upload and manage media files
- Update settings without editing config files
- Works on tablets and mobile devices
- No terminal required for content management

---

## Phase 4: Enhanced CLI Tools
**Duration:** 2 weeks
**Goal:** Improve terminal tools for power users, ensure parity with web UI

### 4.1 CLI Improvements

#### **Task 4.1.1: Interactive Episode Creator**
**Files:** `scripts/create-episode.js` (enhance)

**New Features:**
- Interactive prompts with validation
- Markdown editor in terminal (or external editor launch)
- Tag autocomplete from existing tags
- Host selection from existing hosts
- Audio file selection/browser
- Duration auto-detection from audio file
- Preview before saving
- Draft/Publish selection

#### **Task 4.1.2: Batch Operations CLI**
**Files:** `scripts/batch-operations.js` (new)

**Operations:**
- Bulk publish/unpublish episodes
- Bulk tag addition/removal
- Bulk host assignment
- Regenerate all episode slugs
- Fix broken links
- Validate all episodes
- Generate missing artwork
- Optimize all images

#### **Task 4.1.3: Import/Export CLI**
**Files:** `scripts/import-export.js` (new)

**Features:**
- Export episodes to JSON/CSV
- Import episodes from JSON/CSV
- Backup entire podcast (content + media)
- Restore from backup
- Migrate between IndieCaster instances

#### **Task 4.1.4: Development CLI**
**Files:** `scripts/dev-tools.js` (new)

**Tools:**
- Generate demo content
- Seed database with test data
- Run validation tests
- Check for broken links
- Verify media files exist
- RSS feed validation
- SEO audit
- Performance audit

### 4.2 CLI Framework

#### **Task 4.2.1: Unified CLI Interface**
**Files:** `scripts/indiecaster.js` (new)

**Command Structure:**
```bash
npm run indiecaster -- <command> [options]

Commands:
  init              Run setup wizard
  episode           Episode management
    create          Create new episode
    edit            Edit existing episode
    list            List all episodes
    delete          Delete episode
  host              Host management
    create          Create host
    edit            Edit host
    list            List hosts
  guest             Guest management
  media             Media management
    list            List media files
    optimize        Optimize images
    validate        Check media files
  import            Import content
    rss             Import from RSS feed
    json            Import from JSON
  export            Export content
  deploy            Deploy site
  dev               Development tools
  validate          Validate content
```

**Implementation:**
```javascript
#!/usr/bin/env node
import { Command } from 'commander';

const program = new Command();

program
  .name('indiecaster')
  .description('IndieCaster CLI - Manage your podcast website')
  .version('1.0.0');

program
  .command('episode')
  .description('Manage episodes')
  .command('create')
  .action(createEpisode);

// ... more commands

program.parse();
```

---

### Phase 4 Milestone: "Enhanced CLI Tools"
**Deliverables:**
- ✅ Improved interactive CLI tools
- ✅ Batch operation support
- ✅ Import/export functionality
- ✅ Development utilities
- ✅ Unified CLI interface
- ✅ CLI documentation

**Review Criteria:**
- CLI tools have feature parity with web UI
- Batch operations work correctly
- Import/export tested with various formats
- Development tools helpful for debugging

---

## Phase 5: One-Click Deployment
**Duration:** 2-3 weeks
**Goal:** Integrate with hosting platforms for easy deployment

### 5.1 Deployment Integrations

#### **Task 5.1.1: Netlify Integration**
**Files:**
- `scripts/deploy/netlify.js`
- `netlify.toml` (configuration)

**Features:**
- One-click OAuth authorization
- Automatic site creation
- Environment variable setup
- Custom domain configuration
- Automatic deployments on git push
- Deploy previews for PRs

**Implementation:**
```javascript
// scripts/deploy/netlify.js
import { NetlifyAPI } from 'netlify';

export async function deployToNetlify() {
  // 1. Authenticate with Netlify
  // 2. Create new site
  // 3. Configure build settings
  // 4. Upload build
  // 5. Configure custom domain
  // 6. Set up continuous deployment
}
```

**netlify.toml:**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### **Task 5.1.2: Vercel Integration**
**Files:**
- `scripts/deploy/vercel.js`
- `vercel.json` (configuration)

**Features:**
- Vercel CLI integration
- Automatic project setup
- Environment variable management
- Custom domain configuration
- Edge function support
- Analytics integration

#### **Task 5.1.3: GitHub Pages Integration**
**Files:**
- `scripts/deploy/github-pages.js`
- `.github/workflows/deploy.yml`

**Features:**
- GitHub Actions workflow
- Automatic deployment on push to main
- Custom domain support
- CNAME configuration
- Build artifact caching

**GitHub Actions Workflow:**
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

#### **Task 5.1.4: Manual Deployment**
**Files:** `docs/DEPLOYMENT-GUIDE.md`

**Instructions for:**
- AWS S3 + CloudFront
- DigitalOcean Spaces
- Traditional web hosting (FTP)
- Docker containers
- Self-hosted solutions

### 5.2 Deployment UI

#### **Task 5.2.1: Deployment Dashboard**
**Files:** `src/pages/admin/deploy.astro`

**UI Sections:**
- Current deployment status
- Deployment history
- Platform selection
- Configuration
- Build logs
- Deploy button
- Rollback functionality

#### **Task 5.2.2: Build System Integration**
**Files:** `scripts/build/production.js`

**Features:**
- Pre-deployment validation
- Content validation
- Media file checks
- RSS feed validation
- SEO validation
- Performance optimization
- Build artifact generation
- Deployment preview

---

### Phase 5 Milestone: "One-Click Deployment"
**Deliverables:**
- ✅ Netlify integration working
- ✅ Vercel integration working
- ✅ GitHub Pages workflow
- ✅ Manual deployment docs
- ✅ Deployment dashboard
- ✅ Build validation system
- ✅ Rollback functionality

**Review Criteria:**
- Deploy to Netlify in under 5 minutes
- Automatic deployments working
- Custom domains configurable
- Build validation catches errors
- Deployment docs comprehensive

---

## Phase 6: Polish & Launch Preparation
**Duration:** 2-3 weeks
**Goal:** Final polish, testing, documentation, and launch readiness

### 6.1 Testing & Quality Assurance

#### **Task 6.1.1: Comprehensive Testing**

**Test Categories:**

1. **Setup Wizard Testing**
   - [ ] Complete setup wizard flow
   - [ ] All validation rules working
   - [ ] Media upload working
   - [ ] Configuration saved correctly
   - [ ] First episode creation
   - [ ] Deployment integration

2. **Admin Dashboard Testing**
   - [ ] All CRUD operations
   - [ ] Media library
   - [ ] Settings updates
   - [ ] Authentication
   - [ ] Mobile responsiveness
   - [ ] Cross-browser compatibility

3. **CLI Tools Testing**
   - [ ] All CLI commands
   - [ ] Error handling
   - [ ] Edge cases
   - [ ] Import/export
   - [ ] Batch operations

4. **Content Output Testing**
   - [ ] All pages render correctly
   - [ ] RSS feed validates
   - [ ] SEO meta tags correct
   - [ ] Structured data valid
   - [ ] Images optimized
   - [ ] Audio playback working

5. **Performance Testing**
   - [ ] Lighthouse scores >90
   - [ ] Load time <3 seconds
   - [ ] Image optimization working
   - [ ] Service worker caching
   - [ ] Mobile performance

6. **Accessibility Testing**
   - [ ] Screen reader compatible
   - [ ] Keyboard navigation
   - [ ] ARIA labels
   - [ ] Color contrast
   - [ ] Focus indicators

#### **Task 6.1.2: Automated Testing**
**Files:** `tests/` (new directory)

**Test Suites:**
- Unit tests for utility functions
- Integration tests for API endpoints
- E2E tests for setup wizard
- E2E tests for admin dashboard
- RSS feed validation tests
- Content validation tests

**Tools:**
- Vitest for unit/integration tests
- Playwright for E2E tests
- Axe for accessibility testing

### 6.2 Documentation

#### **Task 6.2.1: User Documentation**

**Documents to Create/Update:**

1. **Quick Start Guide** (`docs/QUICK-START.md`)
   - 5-minute setup via web UI
   - Create first episode
   - Deploy to Netlify
   - Submit to podcast directories

2. **Setup Guide** (`docs/SETUP-GUIDE.md`)
   - Detailed setup instructions
   - System requirements
   - Troubleshooting common issues

3. **User Manual** (`docs/USER-MANUAL.md`)
   - Complete feature documentation
   - Admin dashboard guide
   - Content management
   - Media management
   - Settings reference

4. **CLI Reference** (`docs/CLI-REFERENCE.md`)
   - All CLI commands
   - Examples
   - Options reference
   - Tips and tricks

5. **Deployment Guide** (`docs/DEPLOYMENT-GUIDE.md`)
   - Platform-specific instructions
   - Custom domain setup
   - SSL certificate setup
   - CDN configuration
   - Performance optimization

6. **Customization Guide** (`docs/CUSTOMIZATION-GUIDE.md`)
   - Theming and branding
   - Custom CSS
   - Component customization
   - Adding new pages
   - Extending functionality

7. **RSS & Podcast Directories** (`docs/PODCAST-SUBMISSION-GUIDE.md`)
   - Apple Podcasts
   - Spotify
   - Google Podcasts
   - Amazon Music
   - YouTube Music
   - Other directories

8. **Troubleshooting** (`docs/TROUBLESHOOTING.md`)
   - Common issues and solutions
   - Error messages explained
   - Getting help

#### **Task 6.2.2: Developer Documentation**

**Documents to Create:**

1. **Architecture Overview** (`docs/dev/ARCHITECTURE.md`)
   - Project structure
   - Technology stack
   - Design decisions
   - Data flow

2. **API Reference** (`docs/dev/API-REFERENCE.md`)
   - All API endpoints
   - Request/response formats
   - Error codes
   - Examples

3. **Contributing Guide** (`CONTRIBUTING.md`)
   - Code style guide
   - Development setup
   - Testing requirements
   - Pull request process

4. **Component Library** (`docs/dev/COMPONENTS.md`)
   - All components documented
   - Props reference
   - Usage examples
   - Styling guide

### 6.3 Marketing & Launch Materials

#### **Task 6.3.1: Landing Page**
**Files:** Create separate marketing site or update README

**Content:**
- Hero section with value proposition
- Feature highlights
- Screenshots/demo video
- Comparison with competitors
- Testimonials (if available)
- Pricing (if applicable)
- Call to action (Get Started, View Demo)

#### **Task 6.3.2: Demo Site**
**URL:** `demo.indiecaster.com`

**Features:**
- Pre-configured demo podcast
- Sample episodes and content
- Admin dashboard access (demo mode)
- Try before you clone
- Reset every hour

#### **Task 6.3.3: Launch Checklist**

**Pre-Launch:**
- [ ] All features tested and working
- [ ] Documentation complete
- [ ] Demo site deployed
- [ ] Landing page live
- [ ] Video tutorials recorded
- [ ] Blog post written
- [ ] Social media posts prepared
- [ ] Product Hunt submission ready
- [ ] Hacker News submission ready
- [ ] Reddit posts prepared
- [ ] Email to beta testers

**Launch Day:**
- [ ] Publish blog post
- [ ] Submit to Product Hunt
- [ ] Post on Hacker News
- [ ] Share on Twitter/X
- [ ] Post on Reddit (/r/webdev, /r/podcasting)
- [ ] Send email to beta testers
- [ ] Update GitHub README
- [ ] Create GitHub release
- [ ] Announce on Discord/Slack communities

**Post-Launch:**
- [ ] Monitor feedback
- [ ] Respond to questions
- [ ] Fix critical bugs
- [ ] Create tutorial content
- [ ] Engage with community

### 6.4 Final Polish

#### **Task 6.4.1: UI/UX Polish**
- Consistent spacing and typography
- Loading states for all async operations
- Error states with helpful messages
- Empty states with clear CTAs
- Smooth transitions and animations
- Responsive design refinement
- Accessibility improvements

#### **Task 6.4.2: Performance Optimization**
- Code splitting optimization
- Image optimization
- Font loading optimization
- Critical CSS extraction
- Service worker optimization
- Bundle size reduction

#### **Task 6.4.3: Security Audit**
- Input validation audit
- XSS prevention check
- CSRF protection verification
- File upload security
- Authentication security
- Dependency vulnerability scan

---

### Phase 6 Milestone: "Launch Ready"
**Deliverables:**
- ✅ Comprehensive testing completed
- ✅ All documentation finished
- ✅ Demo site deployed
- ✅ Landing page live
- ✅ Video tutorials created
- ✅ Launch materials prepared
- ✅ Final polish complete
- ✅ Security audit passed

**Review Criteria:**
- All tests passing
- Lighthouse scores >90 across all pages
- Documentation comprehensive and accurate
- Demo site impressive and stable
- Ready for public launch

---

## Success Metrics

### Quantitative Metrics

1. **Setup Time:**
   - Target: <15 minutes from clone to first episode published
   - Current: ~45 minutes (terminal-based)

2. **Performance:**
   - Lighthouse Performance: >90
   - Lighthouse Accessibility: >95
   - Lighthouse SEO: >95
   - Lighthouse Best Practices: >90

3. **User Adoption:**
   - GitHub stars: Target 500+ in first month
   - Active installations: Target 100+ in first month
   - Community contributions: Target 5+ contributors

4. **Documentation:**
   - Complete coverage of all features
   - Video tutorials for key tasks
   - Active community forum/discussions

### Qualitative Metrics

1. **User Feedback:**
   - "Easiest podcast hosting setup I've ever done"
   - "Works great without terminal knowledge"
   - "Professional results out of the box"

2. **Developer Experience:**
   - Clear, intuitive API
   - Excellent documentation
   - Easy to extend and customize

3. **Competitive Position:**
   - Easier than competitors' solutions
   - More features than static site competitors
   - Better performance than database-driven competitors

---

## Risk Management

### Technical Risks

1. **File System Operations in Browser**
   - **Risk:** Node.js file system operations don't work in browser
   - **Mitigation:** Use API routes (server-side) for all file operations
   - **Status:** Addressed in architecture

2. **Build Process Complexity**
   - **Risk:** Astro build process might conflict with admin UI
   - **Mitigation:** Separate admin UI from production build; use dev mode for admin
   - **Status:** Needs testing

3. **Media File Size**
   - **Risk:** Large audio files could cause upload/storage issues
   - **Mitigation:** Implement chunked uploads, file size limits, compression
   - **Status:** To be addressed in Phase 3

### User Experience Risks

1. **Terminal Requirement Perception**
   - **Risk:** Users might still perceive IndieCaster as technical/complex
   - **Mitigation:** Marketing emphasis on web UI, clear messaging, video demos
   - **Status:** Address in Phase 6

2. **Migration from Other Platforms**
   - **Risk:** Users have difficulty migrating existing podcasts
   - **Mitigation:** Robust RSS import, migration guides, automated tools
   - **Status:** RSS import exists, needs enhancement

3. **Deployment Complexity**
   - **Risk:** Users struggle with deployment despite integrations
   - **Mitigation:** Excellent documentation, video tutorials, one-click options
   - **Status:** Address in Phase 5

### Project Risks

1. **Scope Creep**
   - **Risk:** Feature requests lead to extended timeline
   - **Mitigation:** Strict phase boundaries, post-MVP roadmap for nice-to-haves
   - **Status:** Managed through phased approach

2. **Resource Constraints**
   - **Risk:** Limited development resources cause delays
   - **Mitigation:** Phase-based approach allows for flexible timeline
   - **Status:** Mitigated by plan structure

3. **Technology Changes**
   - **Risk:** Astro or dependencies introduce breaking changes
   - **Mitigation:** Lock dependency versions, thorough testing before upgrades
   - **Status:** To be addressed in Phase 6 (version pinning)

---

## Post-MVP Roadmap

### Version 1.1 - Enhanced Features (2-3 months)

1. **Advanced Analytics**
   - Download tracking
   - Listener demographics
   - Episode performance
   - Platform breakdown
   - Geographic distribution

2. **Email Newsletter Integration**
   - Episode announcements
   - Newsletter signup forms
   - Integration with ConvertKit, Mailchimp
   - Automated episode emails

3. **Comments & Community**
   - Episode comments
   - Comment moderation
   - Integration with Disqus/other services
   - Community forum

4. **Transcripts**
   - VTT/SRT transcript support
   - Automatic transcription integration (Whisper API)
   - Searchable transcripts
   - Timestamp navigation

### Version 1.2 - Monetization (3-4 months)

1. **Sponsorship Management**
   - Sponsor profiles
   - Ad insertion points
   - Sponsorship tracking
   - Sponsor analytics

2. **Premium Content**
   - Paid episode gating
   - Membership tiers
   - Stripe integration
   - Member-only content

3. **Donations & Support**
   - Buy Me a Coffee integration
   - Patreon integration
   - Ko-fi integration
   - Custom donation page

### Version 2.0 - Platform Features (4-6 months)

1. **Multi-Podcast Support**
   - Manage multiple podcasts from one instance
   - Shared hosts across podcasts
   - Cross-promotion features

2. **Team Collaboration**
   - Multiple user accounts
   - Role-based permissions (Editor, Author, Admin)
   - Workflow management
   - Editorial calendar

3. **Advanced Customization**
   - Theme marketplace
   - Plugin system
   - Custom component library
   - Visual page builder

4. **API & Integrations**
   - Public API for third-party tools
   - Zapier integration
   - Webhook support
   - Import from more platforms

---

## Resource Requirements

### Development Team

**Minimum Team:**
- 1 Full-Stack Developer (all phases)
- 1 UI/UX Designer (Phases 2, 3, 6)
- 1 Technical Writer (Phase 6)
- 1 QA Tester (Phase 6)

**Optimal Team:**
- 2 Full-Stack Developers
- 1 Frontend Specialist
- 1 UI/UX Designer
- 1 Technical Writer
- 1 DevOps Engineer
- 1 QA Tester
- 1 Product Manager

### Time Estimates

**Total MVP Timeline:** 12-16 weeks

- Phase 1: 1 week
- Phase 2: 2-3 weeks
- Phase 3: 3-4 weeks
- Phase 4: 2 weeks
- Phase 5: 2-3 weeks
- Phase 6: 2-3 weeks

**Accelerated Timeline:** 8-10 weeks (with larger team)

### Budget Considerations

**Development Costs:**
- Developer time (primary cost)
- Design tools (Figma, etc.)
- Testing tools (Playwright, etc.)

**Infrastructure:**
- Demo site hosting (Netlify/Vercel free tier)
- Domain name (~$15/year)
- Video hosting (YouTube free)

**Marketing:**
- Product Hunt submission (free)
- Video production (in-house recommended)
- Social media (free)

---

## Conclusion

This MVP Master Plan transforms IndieCaster from a terminal-centric tool into a **user-friendly, self-hosted podcast platform** that rivals the ease of WordPress while maintaining the performance and flexibility of a static site generator.

### Key Success Factors

1. **Phased Approach:** Each phase builds on the previous, with clear milestones for testing and review
2. **Dual Interface:** Both web UI and CLI support different user needs
3. **No Terminal Required:** Complete functionality available via browser
4. **One-Click Deploy:** Integration with major hosting platforms
5. **Excellent Documentation:** Comprehensive guides for all user types
6. **Community Focus:** Open source, welcoming contributions

### Next Steps

1. **Review this plan** with stakeholders
2. **Prioritize phases** based on resources and urgency
3. **Set up project management** (GitHub Projects, Jira, etc.)
4. **Create detailed task breakdown** for Phase 1
5. **Begin implementation** starting with critical bug fixes

### Vision Statement Revisited

> *"IndieCaster will be the **easiest self-hosted podcast platform** for indie podcasters—empowering them with professional-grade tools without requiring technical expertise, while giving power users the flexibility and performance they demand."*

---

**Document Maintainer:** Development Team
**Last Review:** 2025-11-12
**Next Review:** After Phase 1 completion

---

## Appendix A: Technology Stack

### Core Technologies
- **Framework:** Astro v5.13.3
- **Language:** JavaScript/TypeScript
- **Content:** Markdown + Frontmatter
- **Validation:** Zod
- **Styling:** CSS + PostCSS
- **Image Processing:** Sharp

### Admin Dashboard
- **UI Framework:** Astro (server-rendered)
- **JavaScript:** Vanilla JS (minimal framework)
- **Forms:** HTML5 + progressive enhancement
- **File Upload:** Native File API + chunked uploads
- **Markdown Editor:** SimpleMDE or similar

### Build & Deploy
- **Build Tool:** Vite
- **Package Manager:** npm
- **CI/CD:** GitHub Actions
- **Hosting:** Netlify, Vercel, GitHub Pages

### Testing
- **Unit Tests:** Vitest
- **E2E Tests:** Playwright
- **Accessibility:** Axe
- **Performance:** Lighthouse CI

---

## Appendix B: Competitive Analysis

### Competitors

1. **WordPress + Podcast Plugins**
   - Pros: Easy to use, large ecosystem
   - Cons: Slow, security risks, hosting costs, complex
   - IndieCaster Advantage: Faster, more secure, simpler, free hosting

2. **Podbean, Buzzsprout, etc.**
   - Pros: Very easy, hosted
   - Cons: Vendor lock-in, ongoing costs, limited customization
   - IndieCaster Advantage: Self-hosted, full control, no monthly fees

3. **Jekyll, Hugo, etc.**
   - Pros: Fast, static, free hosting
   - Cons: Extremely technical, no UI, manual everything
   - IndieCaster Advantage: Same performance, much easier to use

4. **Ghost + Podcast Theme**
   - Pros: Modern, clean, good UX
   - Cons: Hosting costs, limited podcast features
   - IndieCaster Advantage: Podcast-specific, free hosting, static

---

## Appendix C: Glossary

- **Astro:** Static site generator framework
- **Content Collections:** Astro's system for managing content
- **RSS Feed:** XML format for podcast distribution
- **iTunes Tags:** Podcast-specific XML tags for Apple Podcasts
- **Frontmatter:** YAML metadata at the top of markdown files
- **Static Site:** Website generated at build time (no database)
- **Progressive Enhancement:** Start with basic HTML, add features
- **Zod:** TypeScript-first schema validation
- **Sharp:** High-performance image processing library
- **Slug:** URL-friendly version of text (e.g., "my-episode")

---

*End of MVP Master Plan*
