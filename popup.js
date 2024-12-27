document.addEventListener("DOMContentLoaded", function () {
  // chrome.runtime.sendMessage({ action: "clearNotification" });
  var openWebsiteButton = document.getElementById("submit");
  var websiteForm = document.getElementById("websiteForm");
  var titleInput = document.getElementById("title");
  var linkInput = document.getElementById("link");
  var messageInput = document.getElementById("message");
  let currentTab = null;
  let localStorageKey = null;

  // Handle paste events for images
  messageInput.addEventListener('paste', async function(e) {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        e.preventDefault();
        // const file = items[i].getAsFile();
        const blob = items[i].getAsFile();
        console.log(`Processing image: size=${blob.size} bytes`);
        
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const file = new File([blob], `screenshot-${timestamp}.png`, { type: 'image/png' });
        
        // Create FormData and append the file
        const formData = new FormData();
        formData.append('file', file);

        try {
          const response = await fetch('https://dropper.wayl.one/api/upload/', {
          // const response = await fetch('http://localhost:8000/api/upload/', {
            method: 'POST',
            body: formData
          });

          if (!response.ok) {
            throw new Error('Upload failed');
          }

          const data = await response.json();
          
          // Construct the full URL using the returned filename
          const imageUrl = `https://dropper.wayl.one/api/file/${data.filename}`;
          // const imageUrl = `http://localhost:8000/api/file/${data.filename}`;
          
          // Insert the markdown link at cursor position
          const cursorPos = messageInput.selectionStart;
          const textBefore = messageInput.value.substring(0, cursorPos);
          const textAfter = messageInput.value.substring(cursorPos);
          const markdownLink = `![image](${imageUrl})`;
          
          messageInput.value = textBefore + markdownLink + textAfter;
          
          // Update cursor position after the inserted link
          messageInput.selectionStart = cursorPos + markdownLink.length;
          messageInput.selectionEnd = cursorPos + markdownLink.length;
          
          // Trigger the keyup event to save form data
          messageInput.dispatchEvent(new Event('keyup'));
        } catch (error) {
          console.error('Error uploading image:', error);
          document.getElementById('error').textContent = 'Failed to upload image: ' + error.message;
        }
        break;
      }
    }
  });

  // Pre-fill link field with the current page's URL
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    currentTab = tabs[0];
    localStorageKey = `formData-${currentTab.url}`;
    console.log("setting localStorageKey", localStorageKey);
    titleInput.value = currentTab.title;
    linkInput.value = currentTab.url;
    var storedFormData = JSON.parse(localStorage.getItem(localStorageKey));

    if (storedFormData) {
      websiteForm.title.value = storedFormData.title;
      websiteForm.link.value = storedFormData.link;
      websiteForm.tags.value = storedFormData.tags;
      websiteForm.message.value = storedFormData.message;
    }
  });

  // Send request to shots service when popup is focused
  window.addEventListener('focus', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      if (tabs[0]) {
        const shotsUrl = `https://shots.wayl.one/shot/?url=${encodeURIComponent(tabs[0].url)}&height=450&width=800&scaled_width=800&scaled_height=450&selectors=`;
        fetch(shotsUrl, { method: 'HEAD' })
          .then(response => {
            console.log('Shots request response:', {
              status: response.status,
              statusText: response.statusText,
              headers: Object.fromEntries(response.headers.entries())
            });
          })
          .catch(error => console.error('Error sending shots request:', error));
      }
    });
  });

  openWebsiteButton.addEventListener("click", function () {
    // Rest of your code to handle the button click event
    // ...
  });

  websiteForm.addEventListener("keyup", function () {
    var formData = new FormData(websiteForm);
    var title = formData.get("title");
    var link = formData.get("link");
    var tags = formData.get("tags");
    var message = formData.get("message");

    // Save the form data to localStorage
    var storedFormData = {
      title: title,
      link: link,
      tags: tags,
      message: message,
    };
    localStorage.setItem(localStorageKey, JSON.stringify(storedFormData));
  });
});
