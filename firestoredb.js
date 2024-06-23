function createusercollection(user) {
  const name = document.getElementById("name").value;
  const mobilenumber = document.getElementById("mobilenumber").value;
  firebase.firestore().collection("users").doc(user.email).set({
    uid: user.uid,
    name: name,
    email: user.email,
    phonenumber: mobilenumber,
    expense: "0",
    authoriseaccount: user.emailVerified,
  });

  firebase.firestore().collection("expense").doc(user.email).set({
    expense: 0,
  });
}

//hello//
async function getuserinfo(email) {
  const usersnapshot = await firebase
    .firestore()
    .collection("users")
    .doc(email)
    .get();

  const usersnapshotexpense = await firebase
    .firestore()
    .collection("expense")
    .doc(email)
    .get();

  const userinfo = usersnapshot.data();
  const userinfoexpense = usersnapshotexpense.data();
  if (userinfo && userinfoexpense) {
    document.querySelector(".user").innerHTML = `
    <h3>Username:${userinfo.name}</h3>
    <h3>Email:${userinfo.email}</h3>
    <h3>phonenumber:${userinfo.phonenumber}</h3>
    <h3>Authorise_account:${firebase.auth().currentUser.emailVerified}</h3>
  <h3>Expense:${userinfoexpense.expense}</h3>
    <input type="text" id="expenses" placeholder="enter the expense"><button onclick="add()">add</button>
    
    `;
    // document.querySelector(".showhide").style.visibility = "visible";
  } else {
    document.querySelector(".user").innerHTML = `
    <h3>please login</h3>
    `;
  }
}

function updataexpense(email) {
  const expenses = document.getElementById("expenses").value;
  console.log(expenses);
  // firebase.firestore().collection("expense").doc(email).set({
  //   expense: expenses,
  // });
  const doc = firebase.firestore().collection("expense").doc(email);
  doc.update({
    expense: firebase.firestore.FieldValue.increment(expenses),
  });
}

function add() {
  const expenses = document.getElementById("expenses");

  const exp = firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      updataexpense(user.email);
      expenses.value = "";
    } else {
      console.log("please signin");
      expenses.value = "";
    }
  });
}
