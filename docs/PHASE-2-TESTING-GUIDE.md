# Phase 2 Testing Guide: Web-Based Setup Wizard

This document provides step-by-step instructions for testing the IndieCaster setup wizard.

## Pre-Test Setup

### 1. Verify Current State

Check the current config file state:

```bash
cat indiecaster.config.js
```

You should see placeholder values like:
- `podcastName: "IndieCaster"`
- `domain: "[YOUR_DOMAIN]"`
- `hostName: "[YOUR_NAME]"`
- etc.

### 2. Start Development Server

```bash
npm run dev
```

Note the port (likely http://localhost:4321 or 4322).

### 3. Open Browser

Navigate to: `http://localhost:4321/setup` (or whatever port is shown)

## Step-by-Step Testing

### Step 1: Welcome Page

**URL:** `/setup`

**Expected:**
- ✅ Page loads with purple gradient background
- ✅ Progress bar shows 1/6 (16.67%)
- ✅ 6 step indicators, first one highlighted
- ✅ "Welcome to IndieCaster!" heading
- ✅ Prerequisites checks run automatically
  - Node.js check (✓)
  - Write permissions check (✓)
  - Dependencies check (✓)
- ✅ "Get Started" button becomes enabled after checks

**Actions:**
1. Wait for all checks to complete (~1.5 seconds)
2. Verify button becomes clickable
3. Click "Get Started →"

**Expected Result:** Navigate to `/setup/podcast`

---

### Step 2: Podcast Information

**URL:** `/setup/podcast`

**Expected:**
- ✅ Progress bar shows 2/6 (33.33%)
- ✅ Second step indicator highlighted
- ✅ Form with all required fields marked with *
- ✅ Character counters for text areas
- ✅ Color pickers with hex input sync

**Test Data:**
```
Podcast Name: Tech Talks Daily
Elevator Pitch: Exploring the latest in technology and innovation
Meta Description: Join us as we dive deep into tech trends, interview industry leaders, and explore the future of technology
Domain: techta lksdaily.com
Language: English (selected by default)
Primary Brand Color: #667eea (default)
Secondary Brand Color: #764ba2 (default)
```

**Actions:**
1. Fill in all required fields
2. Type in textarea and watch character counter update
3. Try color picker - verify hex input syncs
4. Click "Continue →"

**Expected Result:**
- ✅ Form validates (all required fields filled)
- ✅ Data saved (check browser console for success/error)
- ✅ Navigate to `/setup/host`

**Verify:**
```bash
# Check config was updated
cat indiecaster.config.js | grep -A 1 "podcastName\|domain\|elevatorPitch"
```

Should show your new values.

---

### Step 3: Host Profile

**URL:** `/setup/host`

**Expected:**
- ✅ Progress bar shows 3/6 (50%)
- ✅ Third step indicator highlighted
- ✅ Profile picture upload area with circular preview
- ✅ Back button to previous step
- ✅ Info box explaining image optimization

**Test Data:**
```
Host Name: Jane Doe
Host Bio: Technology enthusiast and podcast host with 10 years of experience in the tech industry. Passionate about making complex topics accessible to everyone.
Profile Picture: (use any square JPG/PNG, at least 400x400px)
```

**Actions:**
1. Fill in host name and bio
2. Click "Choose File" button
3. Select an image file
4. Verify preview appears in circular area
5. Verify file name and size shown
6. Try "Remove" button (should clear selection)
7. Re-select file
8. Click "Continue →"

**Expected Result:**
- ✅ Image preview shows selected photo
- ✅ Remove button appears and works
- ✅ Form validates
- ✅ Data saved and image processed
- ✅ Navigate to `/setup/social`

**Verify:**
```bash
# Check host file created
ls -la src/content/hosts/
cat src/content/hosts/jane-doe.md

# Check optimized images created
ls -la public/images/hosts/
# Should see: jane-doe.png, jane-doe@2x.webp, jane-doe@2x.avif

# Check config updated
cat indiecaster.config.js | grep "hostName\|hostProfilePicture"
```

---

### Step 4: Social Media Links

**URL:** `/setup/social`

**Expected:**
- ✅ Progress bar shows 4/6 (66.67%)
- ✅ Fourth step indicator highlighted
- ✅ 8 social platform sections with icons
- ✅ All fields optional (no required markers)
- ✅ Skip button available
- ✅ Info box explaining optional nature

**Test Data (fill 3-4 platforms):**
```
Twitter: https://twitter.com/techtalksdaily
YouTube: https://youtube.com/@techtalksdaily
LinkedIn: https://linkedin.com/company/techtalksdaily
GitHub: https://github.com/techtalksdaily
```

**Actions:**
1. Fill in 3-4 social media URLs
2. Leave some platforms empty
3. Try invalid URL (should show validation error)
4. Fix to valid URL
5. Click "Continue →" (or test "Skip →")

**Expected Result:**
- ✅ URL validation works
- ✅ Can skip entirely
- ✅ Only filled platforms are saved
- ✅ Navigate to `/setup/episode`

**Verify:**
```bash
# Check socialMedia array updated
cat indiecaster.config.js | grep -A 30 "socialMedia"
# Should see your URLs in the appropriate entries
```

---

### Step 5: First Episode (Optional)

**URL:** `/setup/episode`

**Expected:**
- ✅ Progress bar shows 5/6 (83.33%)
- ✅ Fifth step indicator highlighted
- ✅ Yellow optional banner at top
- ✅ Audio file upload area
- ✅ Skip button available
- ✅ Duration format validation (MM:SS or HH:MM:SS)

**Test Data (if adding episode):**
```
Episode Title: Welcome to Tech Talks Daily
Episode Description: In our inaugural episode, we introduce the show, discuss our mission, and preview upcoming topics.
Publish Date: (today's date or future date)
Duration: 45:30
Season: 1
Episode: 1
Audio File: (any MP3 file, max 500MB)
Explicit Content: (unchecked)
```

**Actions:**

**Option A: Add Episode**
1. Fill in all fields
2. Upload audio file
3. Verify file info shown
4. Click "Continue →"

**Option B: Skip**
1. Leave all fields empty
2. Click "Skip →"

**Expected Result:**
- ✅ If skipped: Navigate directly to `/setup/deploy`
- ✅ If filled: Validates all required fields
- ✅ Audio file upload works
- ✅ Duration format validates (shows error for invalid format)
- ✅ Navigate to `/setup/deploy`

**Verify (if episode added):**
```bash
# Check episode file created
ls -la src/content/episodes/
cat src/content/episodes/welcome-to-tech-talks-daily.md

# Check audio file saved
ls -la public/audio/episodes/
# Should see: welcome-to-tech-talks-daily.mp3
```

---

### Step 6: Deploy & Complete

**URL:** `/setup/deploy`

**Expected:**
- ✅ Progress bar shows 6/6 (100%)
- ✅ All step indicators completed (checkmarks)
- ✅ Green success banner
- ✅ Configuration summary showing entered data
- ✅ Build/preview command code blocks
- ✅ Copy buttons for commands
- ✅ 4 deployment platform links
- ✅ 4 resource documentation links
- ✅ "Finish Setup & Build Site" button

**Actions:**
1. Verify configuration summary shows your data
2. Test copy buttons on code blocks
3. Click deployment platform links (open in new tabs)
4. Click resource documentation links
5. Click "Finish Setup & Build Site" button

**Expected Result:**
- ✅ Summary shows correct values from localStorage
- ✅ Copy buttons work (paste to verify)
- ✅ External links open in new tabs
- ✅ "View Homepage" link goes to `/`
- ✅ Alert shown about running build command

---

## Navigation Testing

### Back Navigation
1. From any step (2-6), click "← Back"
2. Verify previous page loads
3. Verify form data is pre-filled from localStorage

### Progress Bar
1. Click through all steps
2. Verify progress bar fills correctly:
   - Step 1: 16.67%
   - Step 2: 33.33%
   - Step 3: 50%
   - Step 4: 66.67%
   - Step 5: 83.33%
   - Step 6: 100%

### Direct URL Access
1. Try accessing `/setup/deploy` directly
2. Should work (no forced linear flow)
3. Summary should show data if steps were completed

---

## Responsive Design Testing

### Desktop (1920x1080)
- ✅ Two-column layouts where applicable
- ✅ Side-by-side form rows
- ✅ Full step indicator visible

### Tablet (768x1024)
- ✅ Layouts adjust appropriately
- ✅ Buttons stack if needed

### Mobile (375x667)
- ✅ Forms stack to single column
- ✅ Step indicator hidden (progress bar only)
- ✅ Buttons full width
- ✅ Image uploads center properly

**Actions:**
1. Open browser dev tools (F12)
2. Toggle device toolbar
3. Test various screen sizes
4. Verify layouts adapt correctly

---

## Browser Compatibility Testing

Test in multiple browsers:
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if on Mac)

**Check:**
- Form validation works
- File uploads work
- Color pickers work
- Styling appears correctly
- No console errors

---

## localStorage Testing

### Data Persistence
1. Complete Step 2 (podcast info)
2. Close browser tab
3. Reopen `http://localhost:4321/setup/podcast`
4. Verify form data is pre-filled

### Clear Data
```javascript
// In browser console:
localStorage.clear();
location.reload();
```

Should start fresh with empty forms.

### Inspect Stored Data
```javascript
// In browser console:
console.log('Podcast Info:', localStorage.getItem('podcast-info'));
console.log('Host Info:', localStorage.getItem('host-info'));
console.log('Social Links:', localStorage.getItem('social-links'));
console.log('Episode Info:', localStorage.getItem('episode-info'));
```

---

## Full Integration Test

### Complete Wizard Flow
1. Start fresh (clear localStorage)
2. Complete all 6 steps with real data
3. Upload real images and audio files
4. Review summary on final page

### Verify File System Changes
```bash
# Check config file
cat indiecaster.config.js

# Check host files
ls -la src/content/hosts/
ls -la public/images/hosts/

# Check episode files (if added)
ls -la src/content/episodes/
ls -la public/audio/episodes/
```

### Build and Preview
```bash
# Build the site
npm run build

# Preview built site
npm run preview
```

Navigate to the preview URL and verify:
- ✅ Homepage shows correct podcast name
- ✅ About page shows host info and bio
- ✅ Host profile picture displays
- ✅ Episodes page shows added episode (if created)
- ✅ Social media links appear in footer
- ✅ RSS feed includes correct metadata

---

## Error Handling Testing

### Missing Required Fields
1. Navigate to `/setup/podcast`
2. Leave podcast name empty
3. Try to submit
4. Verify HTML5 validation prevents submission

### Invalid File Types
1. Navigate to `/setup/host`
2. Try uploading a .txt file as profile picture
3. Verify error message shown
4. Try uploading image > 5MB
5. Verify size error shown

### Invalid URLs
1. Navigate to `/setup/social`
2. Enter "not-a-url" in Twitter field
3. Verify URL validation error

### API Endpoint Errors
1. Stop dev server
2. Try submitting a form
3. Verify fallback to localStorage works
4. Message shown about API unavailability

---

## Performance Testing

### Page Load Times
- Each page should load in < 500ms
- No layout shifts during loading
- Smooth transitions between steps

### File Upload
- Image optimization should complete quickly
- Progress indication would be nice (future enhancement)

### Build Time
```bash
time npm run build
```

Should complete in < 10 seconds.

---

## Security Testing

### XSS Prevention
Try entering malicious code in form fields:
```html
<script>alert('XSS')</script>
```

Should be escaped/sanitized when displayed.

### File Upload Security
- Only accepts specified file types
- Enforces file size limits
- Files saved to correct directories only

---

## Accessibility Testing

### Keyboard Navigation
- [ ] Can tab through all form fields
- [ ] Can submit with Enter key
- [ ] Focus indicators visible
- [ ] Skip links work

### Screen Reader
- [ ] Form labels properly associated
- [ ] Required fields announced
- [ ] Error messages announced
- [ ] Progress updates announced

### Color Contrast
- [ ] Text readable on backgrounds
- [ ] Error states visible to colorblind users

---

## Post-Testing Cleanup

### Reset for Next Test
```bash
# Reset config to placeholders
git checkout indiecaster.config.js

# Remove test host files
rm -rf src/content/hosts/jane-doe.md
rm -rf public/images/hosts/jane-doe*

# Remove test episode files (if created)
rm -rf src/content/episodes/welcome-*
rm -rf public/audio/episodes/welcome-*

# Clear localStorage (in browser console)
localStorage.clear();
```

---

## Known Issues / Limitations

### Expected Warnings
- "No API Route handler exists for the method GET" - This is expected, endpoints are POST-only

### Current Limitations
1. API endpoints only work during `npm run dev`, not after `npm run build`
2. No undo functionality (must edit files manually to revert)
3. No progress saving indicator (auto-save is silent)
4. No image preview before upload completes
5. Audio duration not auto-detected from file

### Future Enhancements
- Build-time processing script
- Admin panel for post-deployment editing
- Drag-and-drop file uploads
- Image cropping tool
- Audio duration auto-detection
- Progress indicators for uploads
- Validation preview (e.g., RSS feed preview)

---

## Success Criteria

Phase 2 testing is successful if:

- [ ] All 6 wizard steps load and display correctly
- [ ] Forms validate input properly
- [ ] Files upload and process correctly
- [ ] `indiecaster.config.js` updates with correct values
- [ ] Host profile markdown file created
- [ ] Profile images optimized (PNG, WebP, AVIF)
- [ ] Episode markdown file created (if added)
- [ ] Audio file saved correctly
- [ ] localStorage backup works
- [ ] Navigation (back/forward) works
- [ ] Responsive design works on mobile
- [ ] Site builds successfully after wizard
- [ ] Preview shows updated content

---

## Reporting Issues

If you find bugs during testing, please note:

1. **Step where issue occurred**
2. **Browser and version**
3. **Steps to reproduce**
4. **Expected vs actual behavior**
5. **Screenshots if applicable**
6. **Console errors (F12 → Console tab)**
7. **Network errors (F12 → Network tab)**

---

## Next Steps After Successful Testing

1. Merge `phase-2-setup-wizard` branch to `main`
2. Update main README.md to reference web wizard
3. Create video walkthrough (optional)
4. Begin Phase 3 planning
