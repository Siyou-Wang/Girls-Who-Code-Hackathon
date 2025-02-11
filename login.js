import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyB79YeHcsM6QGu5v4IR5fm4cJtGcmqzB5w",
    authDomain: "login-with-firebase-20bdf.firebaseapp.com",
    projectId: "login-with-firebase-20bdf",
    storageBucket: "login-with-firebase-20bdf.firebasestorage.app",
    messagingSenderId: "449252389640",
    appId: "1:449252389640:web:1b076ec92f1ba15056b2bd",
    measurementId: "G-2M2KX00L6Z"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginBT = document.getElementById("loginBTN")
const signUpBT = document.getElementById("signUpBTN")


// function loginFunc (e) {
//     e.preventDefault()
// }


signUpBT.addEventListener("click", function (event) {
    event.preventDefault()

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            // ...

            const db = getFirestore()
            const docRef = doc(db, "users", user.uid)
            setDoc(docRef, {id:user.uid, email:email, total:0})

            alert("You have signed up. Please log in.");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
            // ..
        });

})

loginBT.addEventListener("click", function (event) {
    event.preventDefault()

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            
            alert("You have logged in");
            localStorage.setItem("loggedInUserID",user.uid)
            localStorage.setItem("addedMiles",0)
            
            window.location.href= "second.html";
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode)
        });
})


