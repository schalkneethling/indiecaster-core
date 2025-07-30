---
title: "Draft Episode Example - This Should Not Appear Publicly"
description: "This is a draft episode created to test the draft functionality. This episode should not appear on the public website or in RSS feeds."
pubDate: 2024-12-01
duration: "30:00"
audioFile: "draft-episode-example"
artwork:
  src: "draft-episode-example"
  alt: "Draft episode artwork for testing purposes"
draft: true
guests: ["jane-springfield"]
tags: ["draft", "testing", "example"]
youtube: "example-video-id"
explicit: false
episodeNumber: 999
season: 1
showNotes: "This is a draft episode for testing the draft functionality in the content collections system."
hasVttTranscript: false
hasSrtTranscript: false
---

# Draft Episode Example

This is a draft episode that should **NOT** appear on the public website. This file exists to:

## Purpose

1. **Test Draft Functionality**: Verify that episodes with `draft: true` are properly filtered out
2. **Demonstrate Usage**: Show content creators how to use the draft feature
3. **Development Testing**: Allow developers to test the draft system locally

## Expected Behavior

- ❌ Should NOT be accessible via direct URL (returns 404)
- ❌ Should NOT appear on the episodes listing page
- ❌ Should NOT appear on the homepage
- ❌ Should NOT be included in RSS feeds
- ❌ Should NOT generate a public URL

## How to Publish This Episode

To make this episode public, simply change the frontmatter:

```markdown
draft: false
```

Or remove the `draft` field entirely (it defaults to `false`).

## Content Structure

This episode demonstrates the proper structure for episode content:

### Key Topics

- Understanding draft functionality
- Content workflow best practices
- Testing procedures for content management

### Guest Information

This episode features Jane Springfield, who will discuss content management strategies.

### Show Notes

This episode covers:
- How to use the draft feature effectively
- Best practices for content workflow
- Testing and validation procedures

### Timestamps

- 00:00 - Introduction to draft episodes
- 05:00 - How draft functionality works
- 15:00 - Best practices for content creators
- 25:00 - Testing and validation
- 30:00 - Conclusion

### Resources Mentioned

- [Content Collections User Guide](../docs/content-collections-user-guide.md)
- [Astro Content Collections Documentation](https://docs.astro.build/en/guides/content-collections/)

---

*This is a draft episode created for testing purposes. It should not appear on the public website.* 
