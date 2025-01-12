import { 
    getAuth, createUserWithEmailAndPassword, 
    onAuthStateChanged, signInWithEmailAndPassword, signOut
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js"

const auth = getAuth();

const email = document.getElementById("email");
const password = document.getElementById("password");
const signUpBtn = document.getElementById("signup-btn");
const signInBtn = document.getElementById("login-btn");
const signOutBtn = document.getElementById("logout-btn");



onAuthStateChanged(auth, (user) => {
    //console.log(user);
    if(user){
        window.location.href = "second.html";
    }else{
        window.location.href = "login.html";
    }

});

const signUpButtonPressed = async (e) => {
    //console.log("Pressed!");
    e.preventDefault();

    try{

        const userCredential  = await createUserWithEmailAndPassword(auth, email.value, password.value);
       // console.log(userCredential);
       
    }catch(error){ 
       console.log(error.code);
       
    }
};

const signOutButtonPressed = async () => {
    //console.log("Pressed!");
    try{
        await signOut(auth);
        email.value = "";
        password.value = "";
        window.location.href = "login.html";

    }catch(error){
        console.log(error);
    }

};

const signInButtonPressed = async (e) => {
    //console.log("Pressed!");
    e.preventDefault();
    try{
        await signInWithEmailAndPassword(auth, email.value, password.value);

    }catch(error){
        console.log(error);
    }

};

signUpBtn.addEventListener("click", signUpButtonPressed);
signInBtn.addEventListener("click", signInButtonPressed);
signOutBtn.addEventListener("click", signOutButtonPressed);