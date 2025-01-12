import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, getDoc, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

let totalMiles, totalCarbon

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
const db = getFirestore()
//console.log(auth)

const logoutBT = document.getElementById("logoutBTN")

logoutBT.addEventListener("click", function (event){
    event.preventDefault()

    signOut(auth).then(() => {
        alert("Succesfully signed out.")
        localStorage.setItem("loggedInUserID", null)
        window.location.href = "login.html"
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
})

onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const id = localStorage.getItem("loggedInUserID")
      
      const docRef = doc(db, "users", id)
      getDoc(docRef)
      .then((docSnap)=>{
        const userData = docSnap.data();
        totalMiles = Number(userData.total);
        totalCarbon = totalMiles*20;
        document.getElementById("totalMiles").innerHTML=totalMiles
        document.getElementById("totalCarbon").innerHTML=totalCarbon
      })
      .catch((error)=>{
        console.log(error)
      })
      // ...
    } else {
      // User is signed out
      // ...
      console.log("lack")
    }
  });

document.getElementById("addBTN").addEventListener("click", function(){
    const id = localStorage.getItem("loggedInUserID")
      
    const docRef = doc(db, "users", id)
    
    const addedMiles = localStorage.getItem("addedMiles")
    
    totalMiles = (Math.round((Number(totalMiles)+Number(addedMiles))*10))/10

    document.getElementById("totalMiles").innerHTML = totalMiles
    document.getElementById("totalCarbon").innerHTML = totalMiles*20
    
    setDoc(docRef, {total:totalMiles})
    localStorage.setItem("addedMiles",0)
    reset()
    
})

function reset(){
    document.getElementById("source").value = "";
    document.getElementById("dest").value = "";
    document.getElementById("CarTime").innerHTML = "";
    document.getElementById("BikeTime").innerHTML = "";
    document.getElementById("WalkTime").innerHTML= "";
    document.getElementById("carbonSaved").innerHTML = "#";
    document.getElementById("gallonsSaved").innerHTML= "#";
}

//firebase
//const db = getFirestore(app);