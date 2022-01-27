const $userID = document.querySelector('#user-id');
const $userPW = document.querySelector('#user-pw');
const $loginBtn = document.querySelector('#login-btn');
let userID;
let userPW;

function onClickLoginBtn() {
  userID = $userID.value;
  userPW = $userPW.value;
}
$loginBtn.addEventListener('click', onClickLoginBtn);
$userID.addEventListener('keypress', (event) => {
  if (event.key === 'Enter' && !event.shiftKey) onClickLoginBtn();
});
$userPW.addEventListener('keypress', (event) => {
  if (event.key === 'Enter' && !event.shiftKey) onClickLoginBtn();
});