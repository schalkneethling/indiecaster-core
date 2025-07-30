# Content Creation Scripts

This directory contains Node.js scripts to help content creators generate properly formatted episode and guest files.

## Available Scripts

### Podcast Initialization
Interactive script to set up your podcast configuration.

```bash
npm run init-podcast
```

This script will prompt you for:
- Podcast name and description
- Host name
- Domain name
- Featured episode details (optional)

### Episode Generator
```bash
npm run create-episode "Your Episode Title"
```

Creates a new episode file with:
- Proper frontmatter structure
- All required and optional fields
- Content templates and structure
- References to the user guide
- Draft status enabled by default

### Guest Generator
```bash
npm run create-guest "Guest Full Name"
```

Creates a new guest file with:
- Proper frontmatter structure
- All required and optional fields
- Comprehensive bio template
- References to the user guide

### Demo Content Management
```bash
npm run demo-content seed <path-to-demo-folder>
npm run demo-content teardown
```

Manages demo content for testing and demonstration:
- **seed**: Populates the project with demo content from a specified folder
- **teardown**: Removes demo content and restores original content
- Automatically creates backups before seeding
- Supports any folder structure that matches the project layout

## Features

- **Automatic Filename Generation**: Converts titles to kebab-case
- **Template Content**: Includes helpful content structure
- **User Guide References**: Links to documentation
- **Error Handling**: Prevents overwriting existing files
- **Clear Instructions**: Provides next steps after creation

## Usage Examples

```bash
# Create an episode
npm run create-episode "Building Sustainable Open Source Communities"

# Create a guest profile
npm run create-guest "Jane Springfield"

# Seed demo content for testing
npm run demo-content seed ./demo-content
npm run demo-content seed /path/to/demo/folder

# Remove demo content and restore original
npm run demo-content teardown
```

## Generated Files

### Episode Files
- Location: `src/content/episodes/`
- Filename: `episode-title.md`
- Status: Draft by default (`draft: true`)

### Guest Files
- Location: `src/content/guests/`
- Filename: `guest-name.md`
- Status: Ready to use

## Next Steps

After running a script:
1. Edit the frontmatter with your specific details
2. Add your content below the frontmatter
3. Add media files (audio, artwork, profile pictures)
4. Set `draft: false` when ready to publish
5. Run `npm run dev` to preview

For detailed information, see the [Content Collections User Guide](../docs/content-collections-user-guide.md). 
