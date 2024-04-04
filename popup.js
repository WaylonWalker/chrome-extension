document.addEventListener("DOMContentLoaded", function () {
  // chrome.runtime.sendMessage({ action: "clearNotification" });
  var openWebsiteButton = document.getElementById("submit");
  var websiteForm = document.getElementById("websiteForm");
  var titleInput = document.getElementById("title");
  var linkInput = document.getElementById("link");
  let currentTab = null;
  let localStorageKey = null;

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

  // Check if form data exists in localStorage and fill the form

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
