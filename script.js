/**
 * Urla Saran Tej - Professional Portfolio JavaScript
 * Handles Dynamic GitHub Sync, Add New Image System, Theme Switching, and Animations
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTypewriter();
  initNavigation();
  initProjectsFilter();
  initGitHubReposSync();
  initImageGallerySystem();
  initResumeModal();
  initContactForm();
  updateCurrentYear();
});

/* ==========================================================================
   1. Theme Management (Dark / Light Mode)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const htmlElement = document.documentElement;
  const themeIcon = themeToggleBtn.querySelector('i');

  // Load saved theme or default to dark
  const savedTheme = localStorage.getItem('saran_portfolio_theme') || 'dark';
  applyTheme(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('saran_portfolio_theme', newTheme);
    showToast(`Switched to ${newTheme} theme`);
  });

  function applyTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      themeIcon.className = 'fa-solid fa-moon';
      themeToggleBtn.setAttribute('title', 'Switch to Light Mode');
    } else {
      themeIcon.className = 'fa-solid fa-sun';
      themeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
    }
  }
}

/* ==========================================================================
   2. Dynamic Typewriter Effect
   ========================================================================== */
function initTypewriter() {
  const typewriterElem = document.getElementById('typewriter');
  if (!typewriterElem) return;

  const roles = [
    'Full Stack Web Developer',
    'MCA Scholar @ Pondicherry Univ',
    'React.js & Node.js Developer',
    'Competitive Coder',
    'Video Editor & Photographer'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typewriterElem.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typewriterElem.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 110;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 1600; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Pause before next word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   3. Navigation, Mobile Menu & ScrollSpy
   ========================================================================== */
function initNavigation() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  // Mobile menu toggle
  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileMenuBtn.querySelector('i');
      if (navMenu.classList.contains('open')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    });

    // Close on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });
  }

  // ScrollSpy to highlight active link
  window.addEventListener('scroll', () => {
    let currentSection = '';
    const scrollPosition = window.pageYOffset + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   4. Projects Filter System
   ========================================================================== */
function initProjectsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5. Dynamic GitHub Repositories Fetcher & Synchronizer
   ========================================================================== */
function initGitHubReposSync() {
  const username = 'tejurla12';
  const refreshBtn = document.getElementById('refreshGithubBtn');
  const syncStatus = document.getElementById('syncStatus');
  const projectsContainer = document.getElementById('projectsContainer');

  async function fetchGitHubRepos() {
    if (refreshBtn) {
      const icon = refreshBtn.querySelector('i');
      if (icon) icon.classList.add('fa-spin');
    }
    if (syncStatus) {
      syncStatus.innerHTML = `<i class="fa-solid fa-spinner fa-spin" style="color: var(--accent-primary);"></i> Fetching public repos from GitHub...`;
    }

    try {
      const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, {
        headers: { 'Accept': 'application/vnd.github.v3+json' }
      });

      if (!response.ok) {
        throw new Error(`GitHub API returned status ${response.status}`);
      }

      const repos = await response.json();
      renderGitHubRepos(repos);

      if (syncStatus) {
        syncStatus.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #10b981;"></i> Synced with GitHub (@${username}) &bull; ${repos.length} Public Repos`;
      }
      showToast(`Successfully synced ${repos.length} GitHub repositories!`);
    } catch (err) {
      console.warn('GitHub live fetch warning:', err);
      if (syncStatus) {
        syncStatus.innerHTML = `<i class="fa-solid fa-circle-info" style="color: #f59e0b;"></i> Showing cached GitHub projects (@${username})`;
      }
      showToast('Using curated GitHub project records');
    } finally {
      if (refreshBtn) {
        const icon = refreshBtn.querySelector('i');
        if (icon) icon.classList.remove('fa-spin');
      }
      updateProjectCounts();
    }
  }

  function renderGitHubRepos(repos) {
    if (!repos || !Array.isArray(repos) || repos.length === 0) return;

    // Remove existing dynamically-added github repo cards if any
    const existingDynamicCards = document.querySelectorAll('.dynamic-github-card');
    existingDynamicCards.forEach(c => c.remove());

    // Filter out forks or keep all public
    repos.forEach(repo => {
      // If card already exists by repo name, update its stats or skip
      const existingCard = Array.from(document.querySelectorAll('.project-card')).find(c => {
        const titleElem = c.querySelector('.project-title');
        return titleElem && titleElem.textContent.trim().toLowerCase() === repo.name.toLowerCase();
      });

      if (existingCard) {
        // Update stars/forks
        const meta = existingCard.querySelector('.project-meta');
        if (meta) {
          meta.innerHTML = `
            <span><i class="fa-solid fa-circle" style="color: #10b981; font-size: 0.6rem;"></i> ${repo.language || 'Code'}</span>
            <span><i class="fa-regular fa-star"></i> ${repo.stargazers_count}</span>
            <span><i class="fa-solid fa-code-fork"></i> ${repo.forks_count}</span>
          `;
        }
      } else {
        // Create new dynamic project card
        const card = document.createElement('div');
        card.className = 'rounded-box project-card dynamic-github-card';
        card.setAttribute('data-category', 'github');

        const cleanDesc = repo.description || 'Public GitHub project repository with open source code and documentation.';
        const lang = repo.language || 'Source';

        card.innerHTML = `
          <div class="project-card-header">
            <span class="project-badge badge-github"><i class="fa-brands fa-github"></i> GitHub Live</span>
            <div class="icon-link" title="Open Repository"><i class="fa-solid fa-code-branch"></i></div>
          </div>
          <h3 class="project-title">${escapeHTML(repo.name)}</h3>
          <p class="project-desc">${escapeHTML(cleanDesc)}</p>
          <div class="project-tech-stack">
            <span class="tech-tag">${escapeHTML(lang)}</span>
            <span class="tech-tag">Git</span>
            <span class="tech-tag">Open Source</span>
          </div>
          <div class="project-card-footer">
            <div class="project-meta">
              <span><i class="fa-solid fa-circle" style="color: #6366f1; font-size: 0.6rem;"></i> ${escapeHTML(lang)}</span>
              <span><i class="fa-regular fa-star"></i> ${repo.stargazers_count}</span>
              <span><i class="fa-solid fa-code-fork"></i> ${repo.forks_count}</span>
            </div>
            <div class="project-links">
              <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="icon-link" title="View Source on GitHub">
                <i class="fa-brands fa-github"></i>
              </a>
            </div>
          </div>
        `;

        projectsContainer.appendChild(card);
      }
    });

    // Reapply current filter if any
    const activeFilterBtn = document.querySelector('.filter-btn.active');
    if (activeFilterBtn) {
      const activeFilter = activeFilterBtn.getAttribute('data-filter');
      document.querySelectorAll('.project-card').forEach(c => {
        if (activeFilter === 'all' || c.getAttribute('data-category') === activeFilter) {
          c.style.display = 'flex';
        } else {
          c.style.display = 'none';
        }
      });
    }
  }

  function updateProjectCounts() {
    const allCount = document.querySelectorAll('.project-card').length;
    const featuredCount = document.querySelectorAll('.project-card[data-category="featured"]').length;
    const githubCount = document.querySelectorAll('.project-card[data-category="github"]').length;

    const countAllElem = document.getElementById('countAll');
    const countFeaturedElem = document.getElementById('countFeatured');
    const countGithubElem = document.getElementById('countGithub');

    if (countAllElem) countAllElem.textContent = allCount;
    if (countFeaturedElem) countFeaturedElem.textContent = featuredCount;
    if (countGithubElem) countGithubElem.textContent = githubCount;
  }

  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      fetchGitHubRepos();
    });
  }

  // Automatically fetch on initial load
  fetchGitHubRepos();
}

/* ==========================================================================
   6. Interactive "Add New Image" System with LocalStorage Persistence
   ========================================================================== */
function initImageGallerySystem() {
  const openModalBtn = document.getElementById('openAddImageModalBtn');
  const closeModalBtn = document.getElementById('closeAddImageModalBtn');
  const cancelBtn = document.getElementById('cancelAddImageBtn');
  const modal = document.getElementById('addImageModal');
  const addImageForm = document.getElementById('addImageForm');

  const radioFile = document.getElementById('radioFile');
  const radioUrl = document.getElementById('radioUrl');
  const fileUploadContainer = document.getElementById('fileUploadContainer');
  const urlUploadContainer = document.getElementById('urlUploadContainer');
  const fileInput = document.getElementById('imageFileInput');
  const urlInput = document.getElementById('imageUrlInput');
  const previewArea = document.getElementById('imagePreviewArea');
  const titleInput = document.getElementById('imageTitleInput');
  const tagSelect = document.getElementById('imageTagSelect');
  const galleryGrid = document.getElementById('galleryGrid');

  let currentPreviewSrc = '';

  // Load custom saved images from localStorage
  loadSavedImages();

  // Modal Open / Close
  if (openModalBtn && modal) {
    openModalBtn.addEventListener('click', () => {
      modal.classList.add('open');
      resetImageForm();
    });
  }

  function closeModal() {
    if (modal) modal.classList.remove('open');
    resetImageForm();
  }

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

  // Close when clicking backdrop
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // Switch between Local File and Web URL
  if (radioFile && radioUrl) {
    radioFile.addEventListener('change', () => {
      if (radioFile.checked) {
        fileUploadContainer.style.display = 'block';
        urlUploadContainer.style.display = 'none';
        updatePreview();
      }
    });

    radioUrl.addEventListener('change', () => {
      if (radioUrl.checked) {
        fileUploadContainer.style.display = 'none';
        urlUploadContainer.style.display = 'block';
        updatePreview();
      }
    });
  }

  // Handle local file selection
  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        // Enforce max size limit (5MB) for browser localStorage
        if (file.size > 5 * 1024 * 1024) {
          alert('Image file is too large! Please choose an image under 5MB.');
          fileInput.value = '';
          return;
        }

        const reader = new FileReader();
        reader.onload = function(evt) {
          currentPreviewSrc = evt.target.result;
          previewArea.innerHTML = `<img src="${currentPreviewSrc}" alt="Preview">`;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Handle URL input
  if (urlInput) {
    urlInput.addEventListener('input', () => {
      const url = urlInput.value.trim();
      if (url) {
        currentPreviewSrc = url;
        previewArea.innerHTML = `<img src="${currentPreviewSrc}" alt="Preview" onerror="this.parentElement.innerHTML='<span style=\\'color:#ef4444;\\'>Failed to load image from URL</span>'">`;
      }
    });
  }

  function updatePreview() {
    if (radioFile.checked) {
      if (fileInput.files[0]) {
        // already handled by reader
      } else {
        previewArea.innerHTML = `<span style="color: var(--text-muted); font-size: 0.85rem;"><i class="fa-regular fa-image"></i> Select an image file</span>`;
        currentPreviewSrc = '';
      }
    } else {
      const val = urlInput.value.trim();
      if (val) {
        currentPreviewSrc = val;
        previewArea.innerHTML = `<img src="${currentPreviewSrc}" alt="Preview">`;
      } else {
        previewArea.innerHTML = `<span style="color: var(--text-muted); font-size: 0.85rem;"><i class="fa-solid fa-link"></i> Enter an image URL</span>`;
        currentPreviewSrc = '';
      }
    }
  }

  function resetImageForm() {
    if (addImageForm) addImageForm.reset();
    currentPreviewSrc = '';
    radioFile.checked = true;
    fileUploadContainer.style.display = 'block';
    urlUploadContainer.style.display = 'none';
    previewArea.innerHTML = `<span style="color: var(--text-muted); font-size: 0.85rem;"><i class="fa-regular fa-image"></i> Select an image to preview</span>`;
  }

  // Handle Form Submission (Save Image)
  if (addImageForm) {
    addImageForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!currentPreviewSrc) {
        alert('Please choose a file or provide a valid image URL first!');
        return;
      }

      const title = titleInput.value.trim() || 'Portfolio Image';
      const tag = tagSelect.value || 'Photo';

      const newImageObj = {
        id: 'img_' + Date.now(),
        src: currentPreviewSrc,
        title: title,
        tag: tag,
        date: new Date().toLocaleDateString()
      };

      // Save to localStorage
      saveImageToStorage(newImageObj);

      // Render to DOM
      renderGalleryCard(newImageObj, true);

      closeModal();
      showToast('New image added to your portfolio gallery!');
    });
  }

  function saveImageToStorage(item) {
    try {
      const saved = JSON.parse(localStorage.getItem('saran_portfolio_images') || '[]');
      saved.push(item);
      localStorage.setItem('saran_portfolio_images', JSON.stringify(saved));
    } catch (err) {
      console.error('Storage error:', err);
      showToast('Note: Large image saved in current session (browser storage full)');
    }
  }

  function loadSavedImages() {
    try {
      const saved = JSON.parse(localStorage.getItem('saran_portfolio_images') || '[]');
      saved.forEach(item => {
        renderGalleryCard(item, false);
      });
    } catch (err) {
      console.warn('Could not read saved images:', err);
    }
  }

  function renderGalleryCard(item, prepend = false) {
    const card = document.createElement('div');
    card.className = 'gallery-card custom-gallery-card';
    card.id = item.id;

    card.innerHTML = `
      <img src="${item.src}" alt="${escapeHTML(item.title)}" class="gallery-img">
      <button class="gallery-delete-btn" title="Remove this image" data-id="${item.id}">
        <i class="fa-solid fa-trash-can"></i>
      </button>
      <div class="gallery-overlay">
        <span class="gallery-tag">${escapeHTML(item.tag)}</span>
        <div class="gallery-title">${escapeHTML(item.title)}</div>
        <div class="gallery-caption">Added on ${item.date || 'Recent'}</div>
      </div>
    `;

    // Attach delete handler
    const deleteBtn = card.querySelector('.gallery-delete-btn');
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (confirm(`Remove "${item.title}" from your gallery?`)) {
        removeImageFromStorage(item.id);
        card.remove();
        showToast('Image removed from gallery');
      }
    });

    if (prepend && galleryGrid.firstChild) {
      galleryGrid.insertBefore(card, galleryGrid.firstChild);
    } else {
      galleryGrid.appendChild(card);
    }
  }

  function removeImageFromStorage(id) {
    try {
      let saved = JSON.parse(localStorage.getItem('saran_portfolio_images') || '[]');
      saved = saved.filter(i => i.id !== id);
      localStorage.setItem('saran_portfolio_images', JSON.stringify(saved));
    } catch (err) {
      console.error(err);
    }
  }
}

/* ==========================================================================
   7. Resume Modal System
   ========================================================================== */
function initResumeModal() {
  const viewResumeBtn = document.getElementById('viewResumeBtn');
  const resumeModal = document.getElementById('resumeModal');
  const closeResumeModalBtn = document.getElementById('closeResumeModalBtn');
  const doneResumeBtn = document.getElementById('doneResumeBtn');

  function openResume() {
    if (resumeModal) resumeModal.classList.add('open');
  }

  function closeResume() {
    if (resumeModal) resumeModal.classList.remove('open');
  }

  if (viewResumeBtn) {
    viewResumeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openResume();
    });
  }

  if (closeResumeModalBtn) closeResumeModalBtn.addEventListener('click', closeResume);
  if (doneResumeBtn) doneResumeBtn.addEventListener('click', closeResume);

  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) closeResume();
    });
  }
}

/* ==========================================================================
   8. Contact Form & Email Card Quick Copy
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  const emailCard = document.getElementById('emailCard');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const subject = document.getElementById('contactSubject').value.trim();
      const message = document.getElementById('contactMessage').value.trim();

      // Formulate mailto link
      const mailtoUrl = `mailto:tejurla12@gmail.com?subject=${encodeURIComponent(subject + ' - via Portfolio from ' + name)}&body=${encodeURIComponent('Hi Saran,\n\n' + message + '\n\nFrom: ' + name + '\nEmail: ' + email)}`;
      
      window.location.href = mailtoUrl;

      showToast(`Thank you, ${name}! Opening your email client to send message.`);
      contactForm.reset();
    });
  }

  if (emailCard) {
    emailCard.addEventListener('click', (e) => {
      // If user holds control/command or clicks copy, copy to clipboard
      navigator.clipboard.writeText('tejurla12@gmail.com').then(() => {
        showToast('Email "tejurla12@gmail.com" copied to clipboard!');
      }).catch(() => {});
    });
  }
}

/* ==========================================================================
   9. Toast Notification Utility
   ========================================================================== */
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');

  if (!toast || !toastMessage) return;

  toastMessage.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/* ==========================================================================
   10. Helper Utilities
   ========================================================================== */
function updateCurrentYear() {
  const yearElem = document.getElementById('currentYear');
  if (yearElem) {
    yearElem.textContent = new Date().getFullYear();
  }
}

function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
