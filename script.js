document.getElementById("signups").addEventListener("click", () => {
  document.querySelector(".signup").style.visibility = "visible";
  document.querySelector(".signin").style.visibility = "hidden";
});
document.getElementById("logins").addEventListener("click", () => {
  document.querySelector(".signup").style.visibility = "hidden";
  document.querySelector(".signin").style.visibility = "visible";
});
document.getElementById("close").addEventListener("click", () => {
  document.querySelector(".signin").style.visibility = "hidden";
  console.log("close");
});
document.getElementById("close1").addEventListener("click", () => {
  document.querySelector(".signup").style.visibility = "hidden";
  console.log("close");
});
