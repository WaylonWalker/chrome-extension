// Saves options to browser.storage
function saveOptions() {
  const apiUrl = document.getElementById('apiUrl').value.replace(/\/$/, ''); // Remove trailing slash
  
  browser.storage.sync.set({
    apiUrl: apiUrl || 'https://thoughts.waylonwalker.com'
  }).then(() => {
    // Update status to let user know options were saved
    const status = document.getElementById('status');
    status.textContent = 'Options saved.';
    status.style.display = 'block';
    status.className = 'success';
    setTimeout(() => {
      status.style.display = 'none';
    }, 2000);
  });
}

// Restores select box and checkbox state using the preferences
// stored in browser.storage.
function restoreOptions() {
  browser.storage.sync.get({
    apiUrl: 'https://thoughts.waylonwalker.com' // default value
  }).then((items) => {
    document.getElementById('apiUrl').value = items.apiUrl;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);