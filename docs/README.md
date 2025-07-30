# IndieCaster Documentation

Welcome to the IndieCaster documentation! This folder contains comprehensive guides and documentation for the IndieCaster podcast website platform.

## Documentation Overview

### 📚 [Content Collections Implementation Guide](./content-collections-implementation.md)
**For Developers & Technical Users**

A comprehensive technical guide covering:
- Architecture and file structure
- Content collections configuration
- Schema definitions and validation
- Dynamic route generation
- Component integration
- Type safety and TypeScript
- Migration from previous systems
- Troubleshooting and debugging

### 👥 [Content Collections User Guide](./content-collections-user-guide.md)
**For Content Creators & Podcast Managers**

A user-friendly guide covering:
- How to add new episodes and guests
- Content structure and formatting
- Required and optional fields
- Best practices for content creation
- SEO optimization tips
- Accessibility guidelines
- Content validation and troubleshooting

### 🎨 [Podcast Artwork Guide](./PODCAST-ARTWORK-GUIDE.md)
**For Designers & Content Creators**

Complete artwork specifications and best practices:
- Industry-standard podcast artwork requirements
- Design best practices and guidelines
- Technical specifications and file formats
- Quality assurance checklists
- Common mistakes to avoid
- Tools and resources for design

### 🔧 [Podcast Artwork Integration Guide](./PODCAST-ARTWORK-INTEGRATION.md)
**For Developers & Technical Users**

Technical integration details and implementation:
- Code architecture and component updates
- Artwork utility functions and APIs
- Context-aware artwork selection
- RSS feed integration
- Website optimization
- Validation and quality assurance
- Migration guide from legacy artwork
- Performance considerations and troubleshooting

## Quick Navigation

### For Content Creators
If you're adding episodes or managing guest information:
1. Start with the [Content Collections User Guide](./content-collections-user-guide.md)
2. Use the templates and examples provided
3. Follow the naming conventions and best practices
4. Check the troubleshooting section if you encounter issues

### For Designers
If you're creating podcast artwork:
1. Review the [Podcast Artwork Guide](./PODCAST-ARTWORK-GUIDE.md)
2. Follow the technical specifications and design guidelines
3. Use the quality assurance checklist before submission
4. Test your artwork at different sizes and on different platforms

### For Developers
If you're working on the codebase or extending functionality:
1. Review the [Content Collections Implementation Guide](./content-collections-implementation.md)
2. Understand the schema definitions and architecture
3. Follow Astro best practices for content collections
4. Use the provided TypeScript types for type safety
5. Check the [Podcast Artwork Integration Guide](./PODCAST-ARTWORK-INTEGRATION.md) for artwork system details

### For Both
- Both guides include practical examples and code snippets
- Validation errors and solutions are documented
- Best practices are clearly outlined
- Troubleshooting sections help resolve common issues

## Getting Started

### Prerequisites
- Node.js and npm installed
- Basic understanding of Markdown
- Familiarity with frontmatter (YAML at the top of Markdown files)

### First Steps
1. **Set up your development environment**:
   ```bash
   npm install
   npm run dev
   ```

2. **Add your first episode**:
   - Create a new file in `src/content/episodes/`
   - Follow the template in the user guide
   - Add your content and media files

3. **Add guest information**:
   - Create a new file in `src/content/guests/`
   - Include comprehensive guest details
   - Link guests to episodes

## Content Structure

```
src/content/
├── episodes/          # Episode content files
│   ├── episode-1.md
│   └── episode-2.md
├── guests/            # Guest profile files
│   ├── jane-springfield.md
│   └── sarah-judge.md
└── config.ts          # Content collections configuration
```

## Key Features

### ✅ Type Safety
- Full TypeScript support
- Schema validation with Zod
- IntelliSense in editors

### ✅ Performance
- Static generation
- Optimized content loading
- Efficient querying

### ✅ SEO Optimization
- Structured data
- Meta tags
- Clean URLs

### ✅ Podcast Platform Compliance
- Follows industry-standard podcast artwork guidelines
- Optimized for platform discoverability across all major platforms
- Professional visual standards that work everywhere

### ✅ Accessibility
- Alt text for images
- Semantic HTML
- Screen reader support

## Support

### Common Issues
- **Validation Errors**: Check the troubleshooting sections in both guides
- **Build Errors**: Run `npm run build` to see specific error messages
- **Type Errors**: Use `npx tsc --noEmit` for TypeScript checking

### Getting Help
1. Check the troubleshooting sections in the guides
2. Review the examples and templates
3. Ensure you're following the naming conventions
4. Verify your frontmatter structure

## Contributing

When contributing to the documentation:
1. Keep content clear and concise
2. Include practical examples
3. Update both technical and user guides as needed
4. Test any code examples or procedures

## Related Resources

- [Astro Content Collections Documentation](https://docs.astro.build/en/guides/content-collections/)
- [Zod Schema Validation](https://zod.dev/)
- [Markdown Guide](https://www.markdownguide.org/)
- [YAML Frontmatter](https://jekyllrb.com/docs/front-matter/)
- [Apple Podcasts Artwork Guide](https://podcasters.apple.com/artwork-guide) - Industry standard specifications

---

**Need help?** Start with the [Content Collections User Guide](./content-collections-user-guide.md) for content creation, or the [Implementation Guide](./content-collections-implementation.md) for technical details. 
