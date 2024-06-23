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
     <div style="display: flex">
              <input
                type="file"
                id="profileimage"
                placeholder="enter the profileimage"
                accept="image/"
                onchange="uploadimage(event)"
              />upload profile image
            </div>
    `;
    // document.querySelector(".showhide").style.visibility = "visible";
  } else {
    document.querySelector(".user").innerHTML = `
    <h3>please login</h3>
    `;
  }
  if (firebase.auth().currentUser.photoURL) {
    document.getElementById("img").src = firebase.auth().currentUser.photoURL;
  } else {
    document.getElementById("img").src =
      "https://www.shutterstock.com/image-vector/user-icon-trendy-flat-style-600nw-1697898655.jpg";
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
function uploadimage(e) {
  console.log(e.target.files[0]);
  const uid = firebase.auth().currentUser.uid;

  var fileRef = firebase.storage().ref().child(`/users/${uid}/profile`);

  const uploadtask = fileRef.put(e.target.files[0]);
  uploadtask.on(
    "state_changed",
    (snapshot) => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      if (progress == "100") alert("image uploaded succesfully");
    },
    (error) => {
      console.log(error);
    },
    () => {
      uploadtask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        console.log("File available at", downloadURL);
        firebase.auth().currentUser.updateProfile({
          photoURL: downloadURL,
        });
      });
    }
  );
}
