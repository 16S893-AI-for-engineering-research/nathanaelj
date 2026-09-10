/**
 * Fix navigation links for dev mode
 * In dev mode with base path /nathanaelj, links fail because Astro builds them
 * as /nathanaelj/... but dev server is at localhost/...
 * This script detects dev mode and strips the base path from all links
 */

function fixLinksForDevMode() {
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  
  if (!isLocalhost) {
    // Production mode - links are correct as-is
    return;
  }

  // Dev mode - fix all links
  const links = document.querySelectorAll('a[href^="/nathanaelj/"]');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href) {
      // Strip /nathanaelj prefix
      const fixedHref = href.replace(/^\/nathanaelj/, '') || '/';
      link.setAttribute('href', fixedHref);
    }
  });
}

// Run on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', fixLinksForDevMode);
} else {
  fixLinksForDevMode();
}

// Also run on any dynamic content updates
const observer = new MutationObserver(fixLinksForDevMode);
observer.observe(document.body, { childList: true, subtree: true });
