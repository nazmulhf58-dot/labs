

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* --------------------------------------------------------------------------
     1. PROJECT DATA REPOSITORY (For Modal Quick-View)
     -------------------------------------------------------------------------- */
  const projectsData = {
    codeflow: {
      title: 'CodeFlow — Developer Collaboration Dashboard',
      category: 'Full Stack',
      image: 'assets/images/project-1.jpg',
      tags: ['JavaScript', 'Node.js', 'Express', 'PostgreSQL', 'REST API', 'CSS Grid'],
      description: 'CodeFlow is an all-in-one developer productivity and pull request analytics portal designed for engineering teams. It aggregates commit logs, review turnarounds, and merge rates into intuitive real-time visualizations while providing automated review assignments.',
      features: [
        'Real-time commit and merge rate analytics tracking',
        'Automated pull request reviewer assignment algorithm',
        'Top contributor leaderboard with customizable time windows',
        'Full relational database schema designed with PostgreSQL',
        'Secure session authentication and RESTful API endpoints'
      ],
      repoUrl: 'https://github.com/nazmulhf58-dot'
    },
    codesolve: {
      title: 'CodeSolve — Interactive Code Judge & Runner',
      category: 'Algorithms & Systems',
      image: 'assets/images/project-2.jpg',
      tags: ['C++', 'JavaScript', 'HTML5', 'CSS3', 'Algorithms', 'Code Execution'],
      description: 'An online algorithmic problem-solving platform inspired by modern competitive programming environments. Features custom test-case execution, time and memory limit enforcement, and algorithmic problem tag filtering.',
      features: [
        'Syntax-aware code editor interface with custom frosted glass UI',
        'Multi-testcase execution panel with real-time pass/fail states',
        'Accurate execution time (ms) and peak memory profiling',
        'Algorithm classification system (DP, Graph Theory, Greedy, Math)',
        'Built with strict memory constraints and high-efficiency C++ backbones'
      ],
      repoUrl: 'https://github.com/nazmulhf58-dot'
    },
    aurora: {
      title: 'Aurora — Tech Marketplace & Cart',
      category: 'Frontend & UI',
      image: 'assets/images/project-3.jpg',
      tags: ['Vanilla JS', 'CSS3 Glassmorphism', 'Local Storage', 'Responsive Design'],
      description: 'A modern e-commerce user interface showcasing cutting-edge gadgetry. Built exclusively with vanilla JavaScript and CSS Grid, Aurora delivers a buttery smooth shopping experience without heavy framework overhead.',
      features: [
        'Interactive product catalog with category and price filtering',
        'Slide-out shopping cart drawer with live subtotal and tax calculation',
        'Cart persistence across page reloads using browser localStorage',
        'Fluid glassmorphism card elevation with tactile micro-interactions',
        '100% accessible keyboard navigation and ARIA attributes'
      ],
      repoUrl: 'https://github.com/nazmulhf58-dot'
    },
    climateai: {
      title: 'Climate AI — Weather & Radar Intelligence',
      category: 'Full Stack',
      image: 'assets/images/project-4.jpg',
      tags: ['Async JS', 'Data Visualization', 'REST APIs', 'CSS Custom Properties'],
      description: 'A meteorology analytics dashboard integrating atmospheric forecasts, live precipitation radar overlays, and machine learning climate anomaly predictions for global regions.',
      features: [
        'Asynchronous weather API data fetching with custom error resilience',
        'Interactive 7-day forecast cards and 30-day climate outlook indicators',
        'Radar loop animation control with playback time slider',
        'Elevated precipitation risk alerts with dynamic warning badges',
        'Responsive chart components built with pure semantic HTML & CSS'
      ],
      repoUrl: 'https://github.com/nazmulhf58-dot'
    }
  };

  /* --------------------------------------------------------------------------
     2. THEME MANAGER (Dark / Light Mode with Persistence)
     -------------------------------------------------------------------------- */
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const THEME_STORAGE_KEY = 'nh_portfolio_theme';

  function getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') || 'dark';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (e) {
      console.warn('LocalStorage unavailable for theme persistence', e);
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = getCurrentTheme();
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);

      // Notification toast feedback
      showToast(
        'Theme Changed',
        `Switched to ${nextTheme === 'dark' ? 'Dark' : 'Light'} Mode`,
        'info',
        2000
      );
    });
  }

  // Listen for OS system theme changes if user hasn't explicitly set preference
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(THEME_STORAGE_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  /* --------------------------------------------------------------------------
     3. FLOATING HEADER & ACTIVE SCROLLSPY NAVIGATION
     -------------------------------------------------------------------------- */
  const siteHeader = document.getElementById('siteHeader');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const sections = document.querySelectorAll('section[id], main > section[id]');

  // Header blur on scroll
  function handleHeaderScroll() {
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // Scrollspy via IntersectionObserver
  const scrollspyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        updateActiveNavLink(id);
      }
    });
  }, {
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0.1
  });

  sections.forEach((section) => scrollspyObserver.observe(section));

  function updateActiveNavLink(activeId) {
    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === `#${activeId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    mobileNavLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === `#${activeId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  /* --------------------------------------------------------------------------
     4. MOBILE NAVIGATION DRAWER
     -------------------------------------------------------------------------- */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');

  function openMobileMenu() {
    mobileMenuBtn.classList.add('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
    mobileNavDrawer.classList.add('open');
    mobileNavDrawer.setAttribute('aria-hidden', 'false');
  }

  function closeMobileMenu() {
    mobileMenuBtn.classList.remove('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    mobileNavDrawer.classList.remove('open');
    mobileNavDrawer.setAttribute('aria-hidden', 'true');
  }

  if (mobileMenuBtn && mobileNavDrawer) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mobileNavDrawer.classList.contains('open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Close when clicking any nav link
    mobileNavLinks.forEach((link) => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!siteHeader.contains(e.target) && mobileNavDrawer.classList.contains('open')) {
        closeMobileMenu();
      }
    });

    // Close on Esc key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNavDrawer.classList.contains('open')) {
        closeMobileMenu();
      }
    });
  }

  /* --------------------------------------------------------------------------
     5. DYNAMIC TYPEWRITER EFFECT IN HERO
     -------------------------------------------------------------------------- */
  const typewriterElement = document.getElementById('typewriterText');
  if (typewriterElement) {
    const words = [
      'interactive web applications.',
      'high-performance vanilla code.',
      'scalable backend APIs.',
      'algorithmic solutions.',
      'clean user interfaces.'
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 75;

    function typeLoop() {
      const currentWord = words[wordIndex];

      if (isDeleting) {
        typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 40;
      } else {
        typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 80;
      }

      // If full word typed
      if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 1600; // Pause at end of word
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 400; // Pause before next word
      }

      setTimeout(typeLoop, typeSpeed);
    }

    typeLoop();
  }

  /* --------------------------------------------------------------------------
     6. PROJECT FILTER SYSTEM
     -------------------------------------------------------------------------- */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Update active button state
      filterButtons.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterValue = btn.getAttribute('data-filter');

      // Filter cards with smooth animation
      projectCards.forEach((card) => {
        const cardCategory = card.getAttribute('data-category');
        const shouldShow = filterValue === 'all' || cardCategory === filterValue;

        if (shouldShow) {
          card.classList.remove('hidden');
          card.classList.remove('fade-in');
          // Trigger reflow to restart CSS animation
          void card.offsetWidth;
          card.classList.add('fade-in');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* --------------------------------------------------------------------------
     7. PROJECT DETAILS MODAL (<dialog>) WITH LIGHT-DISMISS FALLBACK
     -------------------------------------------------------------------------- */
  const projectModal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalDismissBtn = document.getElementById('modalDismissBtn');
  const viewDetailsButtons = document.querySelectorAll('.view-details-btn');

  // Modal Elements
  const modalTitle = document.getElementById('modalProjectTitle');
  const modalCategory = document.getElementById('modalProjectCategory');
  const modalImage = document.getElementById('modalProjectImage');
  const modalTags = document.getElementById('modalProjectTags');
  const modalDescription = document.getElementById('modalProjectDescription');
  const modalFeatures = document.getElementById('modalProjectFeatures');
  const modalRepoLink = document.getElementById('modalRepoLink');

  function openProjectModal(projectId) {
    const data = projectsData[projectId];
    if (!data || !projectModal) return;

    modalTitle.textContent = data.title;
    modalCategory.textContent = data.category;
    modalImage.src = data.image;
    modalImage.alt = `${data.title} screenshot`;
    modalDescription.textContent = data.description;
    modalRepoLink.href = data.repoUrl;

    // Render Tags
    modalTags.innerHTML = '';
    data.tags.forEach((tag) => {
      const tagSpan = document.createElement('span');
      tagSpan.className = 'tech-tag';
      tagSpan.textContent = tag;
      modalTags.appendChild(tagSpan);
    });

    // Render Features
    modalFeatures.innerHTML = '';
    data.features.forEach((feature) => {
      const li = document.createElement('li');
      li.textContent = feature;
      modalFeatures.appendChild(li);
    });

    // Show modal dialog
    if (typeof projectModal.showModal === 'function') {
      projectModal.showModal();
    } else {
      projectModal.setAttribute('open', '');
    }
  }

  function closeProjectModal() {
    if (!projectModal) return;
    if (typeof projectModal.close === 'function') {
      projectModal.close();
    } else {
      projectModal.removeAttribute('open');
    }
  }

  viewDetailsButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project');
      openProjectModal(projectId);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (modalDismissBtn) modalDismissBtn.addEventListener('click', closeProjectModal);

  // Modern Web Guidance: Light-dismiss fallback for browsers without closedby support
  if (projectModal && !('closedBy' in HTMLDialogElement.prototype)) {
    projectModal.addEventListener('click', (event) => {
      if (event.target !== projectModal) return;
      const rect = projectModal.getBoundingClientRect();
      const isInside = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );
      if (!isInside) {
        closeProjectModal();
      }
    });
  }

  /* --------------------------------------------------------------------------
     8. ANIMATED STATISTICS COUNTERS (IntersectionObserver)
     -------------------------------------------------------------------------- */
  const metricsSection = document.getElementById('metricsSection');
  const metricNumbers = document.querySelectorAll('.metric-number');
  let metricsAnimated = false;

  function animateCountUp(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 1600;
    const stepTime = 25;
    const totalSteps = duration / stepTime;
    const increment = target / totalSteps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current);
      }
    }, stepTime);
  }

  if (metricsSection && metricNumbers.length > 0) {
    const metricsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !metricsAnimated) {
          metricsAnimated = true;
          metricNumbers.forEach((num) => animateCountUp(num));
        }
      });
    }, {
      threshold: 0.35
    });

    metricsObserver.observe(metricsSection);
  }

  /* --------------------------------------------------------------------------
     9. CONTACT FORM VALIDATION & TOAST NOTIFICATIONS
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');

  // Input elements
  const nameInput = document.getElementById('contactName');
  const emailInput = document.getElementById('contactEmail');
  const subjectInput = document.getElementById('contactSubject');
  const messageInput = document.getElementById('contactMessage');

  // Error elements
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const subjectError = document.getElementById('subjectError');
  const messageError = document.getElementById('messageError');

  // Email regex validator
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validateField(input, errorElement, condition) {
    if (!input) return false;
    const group = typeof input.closest === 'function' ? input.closest('.form-group') : null;
    if (!group) {
      return !!condition;
    }

    if (!condition) {
      group.classList.add('has-error');
      return false;
    } else {
      group.classList.remove('has-error');
      return true;
    }
  }

  // Live input validation listeners
  if (nameInput) {
    nameInput.addEventListener('input', () => {
      validateField(nameInput, nameError, nameInput.value.trim().length >= 2);
    });
  }

  if (emailInput) {
    emailInput.addEventListener('input', () => {
      validateField(emailInput, emailError, isValidEmail(emailInput.value.trim()));
    });
  }

  if (subjectInput) {
    subjectInput.addEventListener('input', () => {
      validateField(subjectInput, subjectError, subjectInput.value.trim().length >= 3);
    });
  }

  if (messageInput) {
    messageInput.addEventListener('input', () => {
      validateField(messageInput, messageError, messageInput.value.trim().length >= 10);
    });
  }

  // Form submission handler
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Perform full validation check
      const isNameValid = validateField(nameInput, nameError, nameInput.value.trim().length >= 2);
      const isEmailValid = validateField(emailInput, emailError, isValidEmail(emailInput.value.trim()));
      const isSubjectValid = validateField(subjectInput, subjectError, subjectInput.value.trim().length >= 3);
      const isMessageValid = validateField(messageInput, messageError, messageInput.value.trim().length >= 10);

      if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
        showToast(
          'Validation Error',
          'Please complete all required fields correctly before submitting.',
          'error',
          4000
        );
        return;
      }

      // Enter loading state
      if (submitBtn) {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
      }

      // Simulate asynchronous transmission
      setTimeout(() => {
        if (submitBtn) {
          submitBtn.classList.remove('loading');
          submitBtn.disabled = false;
        }
        contactForm.reset();

        // Clear error states
        document.querySelectorAll('.form-group').forEach((g) => g.classList.remove('has-error'));

        // Display success toast notification
        showToast(
          'Message Sent Successfully!',
          'Thank you for reaching out, Nazmul will respond within 24 hours.',
          'success',
          5000
        );
      }, 1200);
    });
  }

  /* --------------------------------------------------------------------------
     10. TOAST NOTIFICATION SYSTEM
     -------------------------------------------------------------------------- */
  const toastContainer = document.getElementById('toastContainer');

  function showToast(title, message, type = 'info', duration = 3500) {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.setAttribute('role', 'status');

    let iconSvg = '';
    if (type === 'success') {
      iconSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>';
    } else if (type === 'error') {
      iconSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';
    } else {
      iconSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';
    }

    toast.innerHTML = `
      <div class="toast-icon">${iconSvg}</div>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
      <button type="button" class="toast-close" aria-label="Close notification">&times;</button>
    `;

    toastContainer.appendChild(toast);

    const closeBtn = toast.querySelector('.toast-close');
    const dismiss = () => {
      toast.classList.add('toast-hiding');
      setTimeout(() => {
        if (toast.parentElement) toast.remove();
      }, 300);
    };

    if (closeBtn) closeBtn.addEventListener('click', dismiss);
    setTimeout(dismiss, duration);
  }

  // Export showToast globally if needed
  window.showToast = showToast;

  /* --------------------------------------------------------------------------
     11. FLOATING BACK TO TOP BUTTON
     -------------------------------------------------------------------------- */
  const backToTopBtn = document.getElementById('backToTopBtn');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* --------------------------------------------------------------------------
     12. SMOOTH SCROLL FOR IN-PAGE ANCHORS
     -------------------------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  console.log('✨ Nazmul Hassan Portfolio loaded with 100% Vanilla JavaScript.');
});
