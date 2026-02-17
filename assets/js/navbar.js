/**
 * Reusable Navigation Component
 * This script injects the navigation header into the page.
 * It handles relative paths for subdirectories and sets the active class.
 */

(function() {
  const currentPath = window.location.pathname;
  // Determine if we are in a subdirectory (e.g., articles/)
  // Simple check: if path ends with .html and has more than one slash, or contains folders
  const isSubdirectory = currentPath.includes('/articles/') && currentPath.split('/').length > 2;
  const basePath = isSubdirectory ? '../' : '';
  
  // Determine if we are on the home page (index.html or root)
  const isHomePage = currentPath.endsWith('index.html') || currentPath.endsWith('/') || currentPath === '/sajeevan16.github.io/';

  // If on home page, use anchor links (#about). If on other pages, use full path (index.html#about).
  // Note: For GitHub Pages project site, root might be /sajeevan16.github.io/
  const homeLink = isHomePage ? '#hero' : `${basePath}index.html`;
  const aboutLink = isHomePage ? '#about' : `${basePath}index.html#about`;
  const resumeLink = isHomePage ? '#resume' : `${basePath}index.html#resume`;
  const portfolioLink = isHomePage ? '#portfolio' : `${basePath}index.html#portfolio`;
  const galleryLink = isHomePage ? '#gallery' : `${basePath}index.html#gallery`;
  const servicesLink = isHomePage ? '#services' : `${basePath}index.html#services`;
  const contactLink = isHomePage ? '#contact' : `${basePath}index.html#contact`;
  const articlesLink = `${basePath}articles.html`;

  const navbarHTML = `
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

  // Inject the navbar
  const placeholder = document.getElementById('navbar-placeholder');
  if (placeholder) {
    placeholder.innerHTML = navbarHTML;
  } else {
    // Fallback if placeholder is missing
    console.warn('Navbar placeholder not found. Appending to body start.');
    document.body.insertAdjacentHTML('afterbegin', navbarHTML);
  }

  // Highlight active link based on current URL
  const navLinks = document.querySelectorAll('#navmenu a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    
    // Clear active class first (Home is default active in HTML, but we might want to override)
    // Actually, allowing main.js scrollspy to handle index.html is better.
    // We only force 'active' for separate pages.

    if (!isHomePage) {
        // If we are on articles.html or sub-pages
        if (currentPath.includes('articles.html') || currentPath.includes('/articles/')) {
            if (href.includes('articles.html')) {
                // Remove active from Home and add to Articles
                document.querySelector('#navmenu a[href*="index.html"]').classList.remove('active');
                link.classList.add('active');
            }
        }
        // Handle other pages if they exist
        else if (currentPath.includes('technical-skills.html') && href.includes('services')) {
             // Example: if technical-skills was linked to Services, but it's not directly in nav
        }
    }
  });

  // Re-attach event listeners for mobile toggle (since main.js might have run before this or needs re-binding)
  // We assume main.js logic for toggles might not work on dynamically added elements if it uses direct selection once.
  // So we replicate the toggle logic here for safety.
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
