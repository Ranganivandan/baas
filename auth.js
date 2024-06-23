async function signup() {
  const email = document.getElementById("emails");
  const password = document.getElementById("passwords");
  const name = document.getElementById("name");
  const number = document.getElementById("mobilenumber");
  console.log(email.value, password.value);
  try {
    const result = await firebase
      .auth()
      .createUserWithEmailAndPassword(email.value, password.value);
    console.log(result.user);

    firebase.auth().currentUser.sendEmailVerification();
    console.log(email.value);
    createusercollection(result.user);
  } catch (error) {
    console.log(error);
    document.querySelector(".user").innerHTML = error.message;
  }
  email.value = "";
  password.value = "";
  name.value = "";
  number.value = "";
}

async function login() {
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  console.log(email.value, password.value);
  try {
    const result = await firebase
      .auth()
      .signInWithEmailAndPassword(email.value, password.value);
    console.log(result.user);
  } catch (error) {
    console.log(error);
  }
  email.value = "";
  password.value = "";
}

function logout() {
  const out = firebase.auth().signOut();
  console.log(out);
}

const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    getuserinfo(user.email);
  } else {
    console.log("please signin");
  }
});
