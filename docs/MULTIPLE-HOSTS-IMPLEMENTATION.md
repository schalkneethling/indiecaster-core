# Multiple Hosts Feature Implementation

## Overview

This document outlines the implementation of support for multiple hosts in IndieCaster. Previously, the system only supported a single host defined in the configuration file. Now, IndieCaster supports multiple hosts through a content collection system similar to guests.

## Changes Made

### 1. Content Collection Schema Updates

**File**: `src/content.config.ts`

- Added new `hosts` collection schema with the following fields:
  - **Required**: `name`, `bio`, `profilePicture`
  - **Optional**: `socialLinks`, `website`, `company`, `title`, `episodes`, `isMainHost`
- Updated `episodes` collection schema to include `hosts` field (array of host slugs)
- Default value for `hosts` field is `["main-host"]` for backward compatibility

### 2. Content Structure

**New Directory**: `src/content/hosts/`

- Created hosts content collection directory
- Added sample host file: `main-host.md` (default host for backward compatibility)
- Host files follow the same pattern as guest files with additional `isMainHost` field

### 3. Component Updates

**Files Updated**:
- `src/components/EpisodeProfiles.astro`
- `src/components/EpisodeProfilesFeatured.astro`

**Changes**:
- Updated components to fetch host data from content collection
- Added support for displaying multiple hosts
- Maintained backward compatibility with config-based host information
- Hosts are displayed before guests in the UI

### 4. Episode Content Updates

**File**: `src/content/episodes/episode-1.md`

- Added `hosts: ["main-host"]` field to episode frontmatter
- This field references host slugs from the hosts collection

### 5. Scripts and Tools

**New File**: `scripts/create-host.js`

- Created host generation script similar to guest generation
- Automatically generates kebab-case filenames
- Creates properly formatted frontmatter
- Includes comprehensive bio template
- Provides clear next steps after creation

**Updated File**: `package.json`

- Added `create-host` script: `npm run create-host "Host Full Name"`

### 6. Documentation Updates

**Files Updated**:
- `docs/content-collections-user-guide.md`
- `docs/schemas.md`

**New Content**:
- Added "Adding a New Host" section with generator script instructions
- Added "Host Management" section with file structure and guidelines
- Added hosts collection schema documentation
- Updated episode schema to include hosts field
- Added host generator to content creation tools section

## Usage

### Creating a New Host

```bash
npm run create-host "Host Full Name"
```

This will:
1. Create a new host file in `src/content/hosts/`
2. Generate proper frontmatter with all fields
3. Include bio template and documentation references
4. Provide next steps for customization

### Adding Hosts to Episodes

In episode frontmatter, add the `hosts` field:

```yaml
---
title: "Episode Title"
# ... other fields ...
hosts: ["main-host", "co-host"]
guests: ["guest-name"]
# ... other fields ...
---
```

### Backward Compatibility

The implementation maintains full backward compatibility:

1. **Existing episodes** without `hosts` field will use the default `["main-host"]`
2. **Config-based host info** is used as fallback when host collection data is unavailable
3. **Main host flag** (`isMainHost: true`) helps identify the primary host
4. **Existing components** continue to work with single host configurations

## File Structure

```
src/
├── content/
│   ├── hosts/
│   │   └── main-host.md          # Default host
│   ├── guests/
│   └── episodes/
│       └── episode-1.md          # Updated with hosts field
├── components/
│   ├── EpisodeProfiles.astro     # Updated for multiple hosts
│   └── EpisodeProfilesFeatured.astro  # Updated for multiple hosts
└── content.config.ts             # Updated schema
```

## Migration Guide

### For Existing Users

1. **No immediate action required** - existing sites continue to work
2. **Optional migration** - can gradually move to content collection hosts
3. **Create main host** - run `npm run create-host "Your Name"` and set `isMainHost: true`
4. **Update episodes** - add `hosts: ["your-host-slug"]` to episode frontmatter

### For New Users

1. **Create hosts** - use `npm run create-host` for each host
2. **Set main host** - mark primary host with `isMainHost: true`
3. **Add to episodes** - reference host slugs in episode `hosts` field
4. **Add profile pictures** - place in `public/profile-images/`

## Benefits

1. **Multiple Hosts** - Support for co-hosted podcasts
2. **Rich Host Profiles** - Detailed bios, social links, and professional info
3. **Flexible Episode Hosting** - Different hosts for different episodes
4. **Consistent Structure** - Hosts follow same pattern as guests
5. **Backward Compatibility** - Existing sites continue to work
6. **Easy Management** - Generator scripts and clear documentation

## Future Enhancements

Potential future improvements:
- Host profile pages (similar to guest pages)
- Host-specific episode listings
- Host social media integration
- Host contribution tracking
- Host-specific branding options 
