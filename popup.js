document.addEventListener('DOMContentLoaded', function () {


// chrome.runtime.sendMessage({ action: "clearNotification" });
  var openWebsiteButton = document.getElementById('submit');
  var websiteForm = document.getElementById('websiteForm');
  var titleInput = document.getElementById('title');
  var linkInput = document.getElementById('link');
  let currentTab = null;
  let localStorageKey = null;

  // Pre-fill link field with the current page's URL
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    currentTab = tabs[0];
    localStorageKey = `formData-${currentTab.url}`;
    console.log('setting localStorageKey', localStorageKey);
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

  openWebsiteButton.addEventListener('click', function () {
    // Rest of your code to handle the button click event
    // ...
  });

  websiteForm.addEventListener('keyup', function () {
    var formData = new FormData(websiteForm);
    var title = formData.get('title');
    var link = formData.get('link');
    var tags = formData.get('tags');
    var message = formData.get('message');

    // Save the form data to localStorage
    var storedFormData = {
      title: title,
      link: link,
      tags: tags,
      message: message
    };
    localStorage.setItem(localStorageKey, JSON.stringify(storedFormData));
})
// setTimeout(() => {
//     console.log('setting codemirror')

//   var myTextarea = document.getElementById('message');

//   var editor = CodeMirror.fromTextArea(myTextarea, {
//     mode: {
//           name: "gfm",
//           tokenTypeOverrides: {
//             emoji: "emoji"
//           }
//     },
//     theme: 'dracula',
//     lineNumbers: true
//   });

// var wait, options = {column: 60}, changing = false;
// editor.on("change", function(cm, change) {
//   if (changing) return;
//   clearTimeout(wait);
//   wait = setTimeout(function() {
//     changing = true;
//     cm.wrapParagraphsInRange(change.from, CodeMirror.changeEnd(change), options);
//     changing = false;
//   }, 200);
// });

//   }, 1000)


});



// ---

//async function getData(url = "") {
//  // Default options are marked with *
//  const response = await fetch(url, {
//    method: "GET", // *GET, POST, PUT, DELETE, etc.
//    mode: "cors", // no-cors, *cors, same-origin
//    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//    credentials: "same-origin", // include, *same-origin, omit
//    headers: {
//      "Content-Type": "application/json",
//      // 'Content-Type': 'application/x-www-form-urlencoded',
//    },
//    redirect: "follow", // manual, *follow, error
//    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//  });
//  return response.json(); // parses JSON response into native JavaScript objects
//}


//async function postData(url = "", data = {}) {
//  // Default options are marked with *
//  const response = await fetch(url, {
//    method: "POST", // *GET, POST, PUT, DELETE, etc.
//    mode: "cors", // no-cors, *cors, same-origin
//    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//    credentials: "same-origin", // include, *same-origin, omit
//    headers: {
//      "Content-Type": "application/json",
//    'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
//      // 'Content-Type': 'application/x-www-form-urlencoded',
//    },
//    redirect: "follow", // manual, *follow, error
//    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//    body: JSON.stringify(data), // body data type must match "Content-Type" header
//  });
//  return response.json(); // parses JSON response into native JavaScript objects
//}

//async function getData(url = "") {
//  // Default options are marked with *
//  const response = await fetch(url, {
//    method: "GET", // *GET, POST, PUT, DELETE, etc.
//    mode: "cors", // no-cors, *cors, same-origin
//    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//    credentials: "same-origin", // include, *same-origin, omit
//    headers: {
//      "Content-Type": "application/json",
//      // 'Content-Type': 'application/x-www-form-urlencoded',
//    },
//    redirect: "follow", // manual, *follow, error
//    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//  });
//  return response.json(); // parses JSON response into native JavaScript objects
//}


//    // get the form element from dom
//    const formElement = document.querySelector('form#websiteForm');

//    // convert the form to JSON
//    const getFormJSON = (form) => {
//      const data = new FormData(form);
//      return Array.from(data.keys()).reduce((result, key) => {
//        result[key] = data.get(key);
//        return result;
//      }, {});
//    };

//    // handle the form submission event, prevent default form behaviour, check validity, convert form to JSON
//    const handler = (event) => {
//      event.preventDefault();
//      const valid = formElement.reportValidity();
//      if (valid) {
//        const result = getFormJSON(formElement);
//        console.log(result)

//        postData("https://thoughts.waylonwalker.com/post/", result).then((data) => {
//        // postData("http://localhost:5000/post/", result).then((data) => {

//if (data.hasOwnProperty('detail')) {
//  // Check if the value of the "detail" key is "Could not validate credentials"
//  if (data.detail === 'Could not validate credentials' || data.detail === 'Not authenticated') {
//    const errorElement = document.querySelector('#error');
//    errorElement.innerHTML = `failed to authenticate`;
//    //change erorrElement to display block
//    errorElement.style.display = 'block';
//    setTimeout(() => {
//      errorElement.style.display = 'none';
//    }, 3000);
//    console.log('failed to authenticate', data); // JSON data parsed by `data.json()` call
//  }
//} else {
//formElement.innerHTML = `<h1>Success!</h1><h2>${data.id} - ${data.title}</h2><a href="${data.link}">${data.link}</a><p>${data.message}</p><p> last ${data.id - 1}</p>`;
//console.log('success!! data:', data); // JSON data parsed by `data.json()` call
//chrome.runtime.sendMessage({ action: "showNotification" });
//}

//        });
//      }
//    }


//    formElement.addEventListener("submit", handler)
//document.body.addEventListener('htmx:afterSwap', function(evt) {
//    const userElement = document.getElementById('user');
//    if (userElement !== null) {
//        localStorage.setItem('access_token', userElement.dataset.token);
//    }
//});
//document.body.addEventListener('htmx:configRequest', (event) => {
//    const token = localStorage.getItem('access_token');
//    console.log('adding the bearer token', token);
//    event.detail.headers['Authorization'] = `Bearer ${token}`
//})
