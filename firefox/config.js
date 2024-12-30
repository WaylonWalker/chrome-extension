// Get the API URL from storage or return default
async function getApiUrl() {
  const result = await browser.storage.sync.get({
    apiUrl: 'https://thoughts.waylonwalker.com' // default value
  });
  return result.apiUrl;
}

// Initialize all API endpoints in the document
async function initializeApiEndpoints() {
  const apiUrl = await getApiUrl();
  
  // Update all hx-get and hx-post attributes
  document.querySelectorAll('[hx-get], [hx-post]').forEach(el => {
    if (el.hasAttribute('hx-get')) {
      const path = el.getAttribute('hx-get').replace('https://thoughts.waylonwalker.com', '');
      el.setAttribute('hx-get', `${apiUrl}${path}`);
    }
    if (el.hasAttribute('hx-post')) {
      const path = el.getAttribute('hx-post').replace('https://thoughts.waylonwalker.com', '');
      el.setAttribute('hx-post', `${apiUrl}${path}`);
    }
  });

  // Update stylesheet link if it exists
  const styleLink = document.querySelector('link[href*="thoughts.waylonwalker.com"]');
  if (styleLink) {
    const path = styleLink.getAttribute('href').replace('https://thoughts.waylonwalker.com', '');
    styleLink.setAttribute('href', `${apiUrl}${path}`);
  }
}