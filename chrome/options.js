// Saves options to chrome.storage
function saveOptions() {
  const apiUrl = document.getElementById('apiUrl').value.replace(/\/$/, ''); // Remove trailing slash
  
  chrome.storage.sync.set({
    apiUrl: apiUrl || 'https://thoughts.waylonwalker.com'
  }, () => {
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
// stored in chrome.storage.
function restoreOptions() {
  chrome.storage.sync.get({
    apiUrl: 'https://thoughts.waylonwalker.com' // default value
  }, (items) => {
    document.getElementById('apiUrl').value = items.apiUrl;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);