
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyB79YeHcsM6QGu5v4IR5fm4cJtGcmqzB5w",
    authDomain: "login-with-firebase-20bdf.firebaseapp.com",
    projectId: "login-with-firebase-20bdf",
    storageBucket: "login-with-firebase-20bdf.firebasestorage.app",
    messagingSenderId: "449252389640",
    appId: "1:449252389640:web:1b076ec92f1ba15056b2bd",
    measurementId: "G-2M2KX00L6Z"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
 // console.log(app);