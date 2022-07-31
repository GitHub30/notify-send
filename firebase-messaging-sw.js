importScripts('https://www.gstatic.com/firebasejs/7.19.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.19.1/firebase-messaging.js');
var firebaseConfig = {
    apiKey: "AIzaSyC8bXJ5D6leHu6_9oI0_IdUJXYYQ7ZEoMM",
    authDomain: "fcm2me.firebaseapp.com",
    projectId: "fcm2me",
    storageBucket: "fcm2me.appspot.com",
    messagingSenderId: "973975048110",
    appId: "1:973975048110:web:7b4317ca97213a8b70c23f",
    measurementId: "G-SQVJNDEXZC"
};
firebase.initializeApp(firebaseConfig);
firebase.messaging();
