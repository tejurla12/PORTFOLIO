# Urla Saran Tej - Professional Portfolio & GitHub Showcase

> A modern, authentic developer portfolio with rounded box architecture, live GitHub synchronization, interactive image management, and smooth responsive transitions.

![Urla Saran Tej Portfolio Preview](profile.jpg)

---

## 🌟 Key Features

1. **Authentic Profile & Resume Integration:**
   - **Academic Details:** MCA at Pondicherry University (80%), B.Sc CS from Sir C R R College / AKNU (80%), Intermediate (85%), SSLC (90%).
   - **Technical Stack:** React.js, Node.js, JavaScript (ES6+), Python, Java, SQL, HTML5, CSS3, Git & GitHub.
   - **Experience & Achievements:** TCS Full-Time Internship Alum, Coding Competition Winner, NPTEL Certified, Tech Symposium Presenter.
   - **Personal Context:** 4 Spoken Languages (English, Telugu, Tamil, German) & Creative Pursuits (Video Editing, Photography, Badminton).

2. **Rounded Box Architecture & Modern UI:**
   - Custom CSS design system with rounded container boxes (`border-radius: 18px–28px`).
   - Glassmorphism backdrop-blur effects and ambient floating glowing gradients.
   - Micro-interactions, hover glow effects, and smooth layout transitions.
   - Dark and Light mode toggle with automatic persistence in `localStorage`.

3. **Live GitHub Projects Sync:**
   - Fetches public repositories in real-time from GitHub API (`https://api.github.com/users/tejurla12/repos`).
   - Displays repository stars, forks, programming language indicator, descriptions, and one-click GitHub links.
   - Includes automatic cached fallback if offline or GitHub API rate limits.
   - Interactive project categories: *All Work*, *Featured Systems*, and *Live GitHub Repos*.

4. **Dynamic "Add New Image" Gallery:**
   - Upload local photos or provide web URLs directly from the UI.
   - Live preview, captioning, and category tagging (*Photography, Project, Certificate, College, Personal*).
   - Saved automatically into browser `localStorage` so images persist across refreshes!
   - Option to delete custom images directly from the gallery card.

5. **Integrated Resume Viewer & Print Engine:**
   - In-app modal resume preview.
   - Standalone printable resume page (`resume.html`) formatted for one-click printing or PDF export.

---

## 📁 File Structure

```text
portfolio/
├── index.html       # Main interactive portfolio application
├── styles.css       # Complete modern CSS design system (Dark/Light themes)
├── script.js        # Dynamic scripts (GitHub API sync, Add Image system, Theme, Typewriter)
├── resume.html      # Formatted printable resume document
├── profile.jpg      # Urla Saran Tej's authentic profile image
└── README.md        # Documentation and deployment guide
```

---

## 🚀 How to Run Locally

You can open the portfolio in any modern browser:

1. Double-click `index.html` to open it in Chrome, Edge, Firefox, or Safari.
2. Alternatively, run a lightweight local development server:
   ```bash
   # Using Python 3:
   python -m http.server 8000
   ```
   Then open `http://localhost:8000` in your browser.

---

## 🌐 How to Publish to GitHub Pages (Shareable Link)

To make your portfolio live on the web so anyone with the link can see your portfolio and your GitHub projects:

### Option 1: As your Main Profile Site (`tejurla12.github.io`)
1. Create a new repository on your GitHub account named: `tejurla12.github.io`
2. Push these files to that repository:
   ```bash
   git init
   git add .
   git commit -m "Launch professional developer portfolio"
   git branch -M main
   git remote add origin https://github.com/tejurla12/tejurla12.github.io.git
   git push -u origin main
   ```
3. Your site will automatically go live at **`https://tejurla12.github.io`**!

### Option 2: In a Project Repository (e.g. `portfolio`)
1. Create a repository named `portfolio` on GitHub.
2. Push your files:
   ```bash
   git init
   git add .
   git commit -m "Add modern portfolio website"
   git branch -M main
   git remote add origin https://github.com/tejurla12/portfolio.git
   git push -u origin main
   ```
3. On GitHub, go to your repository **Settings** &rarr; **Pages**.
4. Under **Branch**, select `main` and root `/`, then click **Save**.
5. Your live link will be: **`https://tejurla12.github.io/portfolio/`**!

---

## 📸 How to Add New Images

### Method 1: Directly via the Website (No Coding Required)
1. Open the portfolio in your browser.
2. Scroll to the **Photo & Media Gallery** section.
3. Click the **"+ Add New Image"** button.
4. Select **Upload Local File** (or paste an Image URL), enter a caption, choose a category tag, and click **"Save to Portfolio"**.
5. Your new image will appear in the gallery and remain saved in your browser!

### Method 2: Adding Permanent Images to the Code
1. Place your new image file in the portfolio directory (e.g., `my-photo.jpg`).
2. Open `index.html` and look for the `<div class="gallery-grid" id="galleryGrid">` section.
3. Add a new gallery card snippet:
   ```html
   <div class="gallery-card">
     <img src="my-photo.jpg" alt="Description" class="gallery-img">
     <div class="gallery-overlay">
       <span class="gallery-tag">Photography</span>
       <div class="gallery-title">Your Photo Title</div>
       <div class="gallery-caption">Brief caption describing the image</div>
     </div>
   </div>
   ```
4. Commit and push your changes to GitHub!

---

## 📬 Contact & Connect

- **Name:** Urla Saran Tej
- **Email:** [tejurla12@gmail.com](mailto:tejurla12@gmail.com)
- **Phone:** +91 7893836775
- **GitHub:** [https://github.com/tejurla12](https://github.com/tejurla12)
- **Education:** MCA @ Pondicherry University
