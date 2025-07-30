# Slug Bug Documentation

## Issue Description
The project has encountered a slug-related bug twice during development. This document records the details for future investigation.

## Bug Details

### Problem
- Astro's content collections generate slugs automatically from filenames
- The slug generation appears to be inconsistent or causing routing issues
- Episode URLs are not resolving correctly

### Evidence from Terminal Output
```
19:07:55 [200] /episodes/episode-2 17ms
19:08:29 [200] /episodes/episode-1 9ms
```

### Files Involved
- `src/content/episodes/episode-1.md` - slug: `episode-1`
- `src/content/episodes/episode-2.md` - slug: `episode-2`
- `src/pages/episodes/[slug].astro` - dynamic route handler

### Potential Causes
1. **Content Collection Configuration**: The `src/content.config.ts` doesn't specify custom slug generation
2. **File Naming Convention**: Files are named `episode-1.md`, `episode-2.md` which should generate slugs `episode-1`, `episode-2`
3. **Route Matching**: The dynamic route `[slug].astro` should match these slugs

### Investigation Needed
1. Check if Astro's default slug generation is working correctly
2. Verify that `getStaticPaths()` in `[slug].astro` is generating the correct paths
3. Test if manual slug specification in frontmatter would resolve the issue
4. Check for any caching issues with Astro's content collections

### Temporary Workaround
- Ensure episode files are named consistently: `episode-{number}.md`
- Verify that the `getStaticPaths()` function is correctly mapping episode slugs to routes

### Next Steps
1. Add explicit slug configuration to content schema if needed
2. Test slug generation with different file naming patterns
3. Consider adding slug validation to the content schema
4. Monitor for recurrence of this issue

## Related Files
- `src/content/episodes/`
- `src/pages/episodes/[slug].astro`
- `src/content.config.ts`
- `astro.config.mjs`

---
*Documented on: [Current Date]*
*Status: Needs investigation* 
