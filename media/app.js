// Know if in the app
var inApp = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
var onApp = (location.pathname == "/app/");

// this event will only fire if the user does not have the pwa installed
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  window.installApp = event;
  document.getElementById("launchApp").style.display = "none";
  document.getElementById("installApp").style.display = "block";
});

// Service worked stuff
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(function(registration) {
		    registration.onupdatefound = function() {
          if(inApp) {
            alert("Updating app...");
            location.reload();
          }
		    }
	    }, function(err) {
		    console.log('ServiceWorker registration failed: ', err);
      });
  })
}
// App install
window.addEventListener('appinstalled', () => {
  alert("yay");
  location.href = "/app/";
});

// Force app size
if(inApp) {
  window.resizeTo(422, 584);
  window.addEventListener('resize', () => {
    window.resizeTo(422, 584);
  });
}

// Online only content
if(onApp && navigator.onLine) {
  var x = document.getElementsByClassName("online");
  for(i=0;i<x.length;i++) {
    x[i].style.display = "block";
  }
}

// Message stuff
if(onApp) {
  var messages = [
    "There is plenty of time to get stuff done later - why don't you play some games now?",
    "Ready to get distracted...?",
    "Games, anyone?",
    "Why do work when you can play?"
  ];
  var message = document.getElementById("message");
  message.innerText = messages[Math.floor(Math.random() * messages.length)];
}