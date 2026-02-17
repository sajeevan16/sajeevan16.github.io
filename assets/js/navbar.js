/**
 * Reusable Navigation Component
 * This script injects the navigation header into the page.
 * It handles relative paths for subdirectories and sets the active class.
 */

(function() {
  const currentPath = window.location.pathname;
  
  // Determine relative path base
  // Simple check: if path ends with .html and has more than one slash, or contains folders like /articles/
  // Note: This logic assumes a simple depth structure. Adjust if deeper nesting occurs.
  const isSubdirectory = currentPath.includes('/articles/') && currentPath.split('/').length > 2;
  const basePath = isSubdirectory ? '../' : '';

  // Define pages that use the "Sub Nav" (Articles, Career, etc.)
  // These pages share a specific navigation menu different from the main index.html
  const subNavPages = [
    'articles.html',
    'why-hire-me.html',
    'technical-skills.html',
    'leadership-projects.html',
    'career-journey.html'
  ];

  // Check if current page is a Sub Nav page
  // It handles both root-level sub-pages and pages inside /articles/
  const isSubNav = subNavPages.some(page => currentPath.endsWith(page)) || currentPath.includes('/articles/');

  let navbarHTML = '';

  if (isSubNav) {
    // --- Sub Navigation (for Articles, Career, etc.) ---
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
  
    // If on home page, use anchor links (#about). If on other pages, use full path (index.html#about).
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
          <li><a href="${aboutLink}"><i class="bi bi-person navicon"></i><span>About</span></a></li>
          <li><a href="${resumeLink}"><i class="bi bi-file-earmark-text navicon"></i><span>Experience</span></a></li>
          <li><a href="${portfolioLink}"><i class="bi bi-code-square navicon"></i><span>Projects</span></a></li>
          <li><a href="${articlesLink}"><i class="bi bi-newspaper navicon"></i><span>Articles</span></a></li>
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

  // Highlight active link based on current URL
  // Matches based on the href attribute containing the current page name
  const navLinks = document.querySelectorAll('#navmenu a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    
    // For Sub Nav pages, exact match is usually sufficient (e.g. "articles.html")
    // But we need to handle "active" class carefully.
    
    if (isSubNav) {
      // If the link href matches the current page filename
      // e.g. href="why-hire-me.html" and path ends with "why-hire-me.html"
      // or href="../articles.html" and path includes "/articles/"
      
      const pageName = currentPath.split('/').pop();
      
      if (currentPath.includes('/articles/') && href.includes('articles.html')) {
        link.classList.add('active');
         // If inside an article (e.g. ai-autopilot-problem.html), highlight "Articles"
         // There is no "ai-autopilot-problem.html" link in the nav, so "Articles" is the correct parent.
      }
      else if (href.endsWith(pageName) && pageName !== '') {
         link.classList.add('active');
      }
    } else {
        // Main Nav logic (handled mostly by isHomePage check above, or scrollspy in main.js)
        // If we are on portfolio-details.html, there is no "Portfolio Details" link in nav.
        // It might be nice to highlight "Projects" (Portfolio).
        // But main.js handles scrollspy for index.html.
        // For details pages, standard behavior is often no active link or "Home".
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
