import User from "./User.js";

/*
문제점 
#1 입력 종류 제한
   조건에 따라 한글, 영어, 숫자, 특수문자 입력을 제한해야 함.
   한글 제외한 나머지는 일단 아스키로 노가다 처리함.
   replace와 정규표현식 활용 방법 찾아볼 것.

#2 조건 충족하지 않으면 포커스 그대로 남아있게 하고 싶음.
   근데 this.focus(); 해놓으면 조건 충족하기 전까지 다른 칸으로 못 넘어감

#3 생년월일 연도 범위 제한이랑 2월 날짜 제한
*/

const $userID = document.querySelector('#user-id');
const $userPW = document.querySelector('#user-pw');
const $userPW2 = document.querySelector('#user-pw2');
const $userName = document.querySelector('#user-name');
const $userGender = document.querySelector('#user-gender');
const $userBD = document.querySelector('#user-birthdate');
const $userCP = document.querySelector('#user-mobile');
const $userVerifyCode = document.querySelector('#user-verify-input');
const $signupBtn = document.querySelector('#signup-btn');
let userID;
let userPW;
let userName;
let userGender;
let userYY;
let userMM;
let userDD;
let userCP;
const checkValidity = {
  id: false,
  pw: false,
  pw2: false,
  name: false,
  gender: false,
  yy: false,
  mm: false,
  dd: false,
  cp: false,
}

// 메시지 나타내기
function displayMessage($target, message, color) {
  $target.style.color = color;
  $target.textContent = message;
}

// 글자 제한 검사 (특수문자 등)
function checkValidChar(type, userChars, specialChars = []) {
  const userCharCodes = userChars.split('').map((char) => char.charCodeAt(0));
  const numAski = Array(10).fill(48).map((num, i) => num + i);
  const uppercaseAski = Array(26).fill(65).map((num, i) => num + i);
  const lowercaseAski = Array(26).fill(97).map((num, i) => num + i);
  const specialCharAski = specialChars.map((char) => char.charCodeAt(0));
  let validCharsAski;
  switch (type) {
    case 'id':
      validCharsAski = numAski.concat(uppercaseAski).concat(lowercaseAski).concat(specialCharAski);  
      break;   
    case 'pw':
      validCharsAski = Array(95).fill(33).map((num, i) => num + i);  // 공백 제외하고 전부 가능
      break;
    // case ''
    default:
      break;
  }
  const validity = userCharCodes.every((charCode) => validCharsAski.includes(charCode));
  return validity;
}

// 아이디 확인
function checkID() {
  const id = this.value;
  const $message = document.querySelector('#id .message');
  let message;
  let color;
  if (!id) {
    message = '필수 정보입니다.'
    color = 'tomato';
    checkValidity.id = false;
    // this.focus();
  } else if (id.length < 5 || id.length > 20 || !checkValidChar('id', id, ['_', '-'])) {
    message = '5~20자의 영문 소문자, 숫자, 특수기호(_),(-)만 사용 가능합니다.'
    color = 'tomato';
    checkValidity.id = false;
    // this.focus();
  } else if (id.length >= 5 && id.length <= 20 && checkValidChar('id', id, ['_', '-'])) {
    message = '사용 가능한 아이디입니다.';
    color = '#795548';
    userID = id;
    checkValidity.id = true;
  }
  displayMessage($message, message, color);
}
$userID.addEventListener('focusout', checkID);

// 비밀번호 확인
function checkPW() {
  const pw = this.value;
  const $message = document.querySelector('#pw .message');
  let message;
  let color;
  if (!pw) {
    message = '필수 정보입니다.'
    color = 'tomato';
    checkValidity.pw = false;
    // this.focus();
  } else if (pw.length < 8 || pw.length > 16 || !checkValidChar('pw', pw)) {
    message = '8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.';
    color = 'tomato';
    checkValidity.pw = false;
    // this.focus();
  } else if (pw.length >= 8 && pw.length <= 16 && checkValidChar('pw', pw)) {
    message = '사용 가능한 비밀번호입니다.';
    color = '#795548';
    userPW = pw;
    checkValidity.pw = true;
    doubleCheckPW();
  }
  displayMessage($message, message, color);
}
$userPW.addEventListener('focusout', checkPW);

// 비밀번호 재확인
function doubleCheckPW() {
  const pw2 = $userPW2.value;
  const $message = document.querySelector('#pw2 .message');
  let message;
  let color;
  if (pw2 === userPW) {
    message = '비밀번호가 일치합니다.';
    color = '#795548';
    checkValidity.pw2 = true;
  } else {
    message = '비밀번호가 일치하지 않습니다.';
    color = 'tomato';
    checkValidity.pw2 = false;
  }
  displayMessage($message, message, color);
}
$userPW2.addEventListener('focusout', doubleCheckPW);

// 이름 확인
function checkName() {
  const name = this.value;
  const $message = document.querySelector('#name .message');
  let message;
  let color;
  if (!name) {
    message = '필수 정보입니다.'
    color = 'tomato';
    checkValidity.name = false;
  } else if (name.length >= 30) {  // 차후에 입력 제한 걸어야 함
    message = '1~30자 한글이나 영문 대 소문자를 사용하세요.';
    color = 'tomato';
    checkValidity.name = false;
  } else {
    message = '';
    color = '#8c7b75';
    userName = name;
    checkValidity.name = true;
  }
  displayMessage($message, message, color);
}
$userName.addEventListener('focusout', checkName);

// 성별 확인
function checkGender() {
  const gender = this.value;
  const $message = document.querySelector('#gender .message');
  let message;
  let color;
  if (gender === 'not-selected') {
    message = '필수 정보입니다.'
    color = 'tomato';
    checkValidity.gender = false;
  } else {
    message = '';
    color = '#8c7b75'
    userGender = gender;
    checkValidity.gender = true;
  }
  displayMessage($message, message, color);
}
$userGender.addEventListener('change', checkGender);

// 생년월일 확인
function checkBD(event) {
  console.log(event.target.id);
  const $message = document.querySelector('#bd .message');
  let message;
  let color;
  switch (event.target.id) {
    case 'user-yyyy':
      const yy = event.target.value;
      if (yy.length !== 4 || isNaN(Number(yy)) ) {
        message = '생년월일을 다시 확인해 주세요.';
        color = 'tomato';
        checkValidity.yy = false;
      } else {
        message = '';
        color = '#8c7b75'
        userYY = yy;
        checkValidity.yy = true;
      }
      break;
    case 'user-mm':
      const mm = event.target.value;
      if (Number(mm) < 1 || Number(mm) > 12 || isNaN(Number(mm))) {
        message = '생년월일을 다시 확인해주세요.';
        color = 'tomato';
        checkValidity.mm = false;
      } else {
        message = '';
        color = '#8c7b75'
        userMM = mm;
        checkValidity.mm = true;
      }
      break;
    case 'user-dd':
      const dd = event.target.value;
      if (Number(dd) < 1 || Number(dd) > 31 || isNaN(Number(dd))) {
        message = '생년월일을 다시 확인해주세요.';
        color = 'tomato';
        checkValidity.dd = false;
      } else {
        message = '';
        color = '#8c7b75'
        userDD = dd;
        checkValidity.dd = true;
      }
      break;
    default:
      checkValidity.yy = false;
      checkValidity.mm = false;
      checkValidity.dd = false;
      break;
    }
  displayMessage($message, message, color);
}
$userBD.addEventListener('focusout', checkBD);

// 핸드폰번호 확인
function checkCP() {
  const cp = this.value;
  const $message = document.querySelector('#mobile .message');
  let message;
  let color;
  if (!cp) {
    message = '필수 정보입니다.'
    color = 'tomato';
    checkValidity.cp = false;
  } else if (cp.length !== 11 || isNaN(Number(cp))) {
    message = '휴대폰 번호를 다시 확인해 주세요.';
    color= 'tomato';
    checkValidity.cp = false;
  } else {
    message = '';
    color = '#8c7b75'
    userCP = cp;
    checkValidity.cp = true;
  }
  displayMessage($message, message, color);
}
$userCP.addEventListener('focusout', checkCP);


// 인증번호 확인 구현해야 함


// 입력 양식 최종 확인
function finalCheck(event) {
  const valid = Object.values(checkValidity).every((value) => value === true);
  if (valid) {
    const newUser = new User(userID, userPW, userName, userGender, `${userYY}-${userMM}-${userDD}`, userCP);
    console.log(newUser);
    return newUser;
  } else {
    event.preventDefault();
    console.log(checkValidity);
    alert('양식을 다시 확인해 주세요.');
  }
}
$signupBtn.addEventListener('click', finalCheck);

