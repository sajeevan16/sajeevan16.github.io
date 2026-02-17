/**
 * Reusable Navigation Component (v2)
 * This script injects the navigation header into the page.
 * It handles relative paths and determines which menu to show (Main or Sub).
 */

(function() {
  const currentPath = window.location.pathname;
  
  // Determine relative path base
  // Simple check: if path ends with .html and has more than one slash, or contains folders like /articles/
  const isSubdirectory = currentPath.includes('/articles/') && currentPath.split('/').length > 2;
  const basePath = isSubdirectory ? '../' : '';

  // Define keywords for pages that use the "Sub Nav"
  // We check if the URL contains these strings (robust against .html extension or lack thereof)
  const subNavKeywords = [
    'articles',
    'why-hire-me',
    'technical-skills',
    'leadership-projects',
    'career-journey'
  ];

  // Check if current page is a Sub Nav page
  // Matches '/articles.html', '/articles/', '/why-hire-me', etc.
  const isSubNav = subNavKeywords.some(keyword => currentPath.includes(keyword));

  console.log('Navbar Debug:', { currentPath, isSubNav, isSubdirectory });

  let navbarHTML = '';

  if (isSubNav) {
    // --- Sub Navigation (for Articles, Career, etc.) ---
    // Links point back to themselves or siblings using basePath
    navbarHTML = `
    <header id="header" class="header d-flex flex-column justify-content-center">
      <i class="header-toggle d-xl-none bi bi-list"></i>
      <nav id="navmenu" class="navmenu">
        <ul>
          <li><a href="${basePath}index.html"><i class="bi bi-house navicon"></i><span>Home</span></a></li>
          <li><a href="${basePath}articles.html"><i class="bi bi-newspaper navicon"></i><span>Articles</span></a></li>
          <li><a href="${basePath}why-hire-me.html"><i class="bi bi-trophy navicon"></i><span>Why Hire Me</span></a></li>
          <li><a href="${basePath}technical-skills.html"><i class="bi bi-code-slash navicon"></i><span>Technical Skills</span></a></li>
          <li><a href="${basePath}leadership-projects.html"><i class="bi bi-people navicon"></i><span>Leadership</span></a></li>
          <li><a href="${basePath}career-journey.html"><i class="bi bi-signpost navicon"></i><span>Career Journey</span></a></li>
        </ul>
      </nav>
    </header>
    `;
  } else {
    // --- Main Navigation (for index.html, portfolio-details.html, etc.) ---
    
    // Determine if we are on the home page (index.html or root)
    const isHomePage = currentPath.endsWith('index.html') || currentPath.endsWith('/') || currentPath === '/sajeevan16.github.io/';
  
    // Links logic
    const homeLink = isHomePage ? '#hero' : `${basePath}index.html`;
    const aboutLink = isHomePage ? '#about' : `${basePath}index.html#about`;
    const resumeLink = isHomePage ? '#resume' : `${basePath}index.html#resume`;
    const portfolioLink = isHomePage ? '#portfolio' : `${basePath}index.html#portfolio`;
    const galleryLink = isHomePage ? '#gallery' : `${basePath}index.html#gallery`;
    const servicesLink = isHomePage ? '#services' : `${basePath}index.html#services`;
    const contactLink = isHomePage ? '#contact' : `${basePath}index.html#contact`;
    const articlesLink = `${basePath}articles.html`;

    navbarHTML = `
<header id="header" class="header d-flex flex-column justify-content-center">
      <i class="header-toggle d-xl-none bi bi-list"></i>
      <nav id="navmenu" class="navmenu">
        <ul>
          <li><a href="${homeLink}" class="${isHomePage ? 'active' : ''}"><i class="bi bi-house navicon"></i><span>Home</span></a></li>
          <li><a href="${articlesLink}"><i class="bi bi-newspaper navicon"></i><span>Articles</span></a></li>
          <li><a href="${aboutLink}"><i class="bi bi-person navicon"></i><span>About</span></a></li>
          <li><a href="${resumeLink}"><i class="bi bi-file-earmark-text navicon"></i><span>Experience</span></a></li>
          <li><a href="${portfolioLink}"><i class="bi bi-code-square navicon"></i><span>Projects</span></a></li>
          <li><a href="${galleryLink}"><i class="bi bi-images navicon"></i><span>Gallery</span></a></li>
          <li><a href="${servicesLink}"><i class="bi bi-award navicon"></i><span>Certifications</span></a></li>
          <li><a href="${contactLink}"><i class="bi bi-envelope navicon"></i><span>Contact</span></a></li>
        </ul>
      </nav>
    </header>
    `;
  }

  // Inject the navbar
  const placeholder = document.getElementById('navbar-placeholder');
  if (placeholder) {
    placeholder.innerHTML = navbarHTML;
  } else {
    console.warn('Navbar placeholder not found. Appending to body start.');
    document.body.insertAdjacentHTML('afterbegin', navbarHTML);
  }

  // Highlight active link
  const navLinks = document.querySelectorAll('#navmenu a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    
    if (isSubNav) {
      // Sub Nav Active Logic
      // Check if the current URL contains the key part of the href (e.g. "why-hire-me")
      // Remove relative '../' and extension '.html' for cleaner checking
      const cleanHref = href.replace('../', '').replace('.html', '');
      
      if (cleanHref === 'index') {
         // Home link only active if we are strictly on home? But we are in Sub Nav mode, so Home is never active self?
         // Actually, if we are in Sub Nav, we are NOT on Home.
      } else if (cleanHref === 'articles' && currentPath.includes('/articles/')) {
         link.classList.add('active'); // Parent "Articles" active for sub-articles
      } else if (currentPath.includes(cleanHref)) {
         link.classList.add('active');
      }
    } else {
       // Main Nav Active Logic (optional, mostly handled by isHomePage or external scrollspy)
    }
  });

  // Re-attach event listeners for mobile toggle
  const headerToggleBtn = document.querySelector('.header-toggle');
  if (headerToggleBtn) {
    headerToggleBtn.addEventListener('click', () => {
      document.querySelector('#header').classList.toggle('header-show');
      headerToggleBtn.classList.toggle('bi-list');
      headerToggleBtn.classList.toggle('bi-x');
    });
  }

  // Hide mobile nav on click
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        document.querySelector('#header').classList.remove('header-show');
        headerToggleBtn.classList.add('bi-list');
        headerToggleBtn.classList.remove('bi-x');
      }
    });
  });

})();
