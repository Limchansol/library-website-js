/* 메인 시작 */

const $notice = document.querySelector('#notice');
const $$noticeIMG = document.querySelectorAll('#notice .notice-img');
const $previousBtn = document.querySelector('#notice #previous');
const $nextBtn = document.querySelector('#notice #next');
const $$indexMarks = document.querySelectorAll('#notice .index-mark');
const imgNumber = $$noticeIMG.length;
let interval;
let prevImgIndex = imgNumber;
let currIMGindex = 1;
let nextImgIndex = currIMGindex + 1;

function hide($target, index) {
  // 타겟을 따로 변수에 담아놓는 것과 그냥 인덱스로 선택하는 것 중 뭐가 나을까
  $target.classList.add('is-hidden');
  // $$noticeIMG[index - 1].classList.add('is-hidden');
  $$indexMarks[index - 1].style.opacity = 0.5;
}
function appear($target, index) {
  $target.classList.remove('is-hidden');
  $$indexMarks[index - 1].style.opacity = 1;
}

// 소식 이미지 자동 변경
function changeNoticeIMG() {
  interval = setInterval(() => {
    prevImgIndex = currIMGindex;
    currIMGindex = nextImgIndex;
    nextImgIndex = currIMGindex !== imgNumber ? currIMGindex + 1 : 1;
    const $currentIMG = document.querySelector(`#notice #img${currIMGindex}`);
    const $prevIMG = document.querySelector(`#notice #img${prevImgIndex}`);
    // console.log('cn', '$커런트이미지', $currentIMG);
    // console.log('cn', '$이전이미지', $prevIMG);
    // console.log('cn', '이전 인덱스', prevIndex);
    // console.log('cn', '이미지인덱스', IMGindex);
    // console.log('cn', '다음인덱스', nextIndex);
    hide($prevIMG, prevImgIndex);
    appear($currentIMG, currIMGindex);
  }, 2500);
}

// 이전 이미지로
function toPreviousIMG() {
  clearInterval(interval);
  const $currentIMG = document.querySelector(`#notice #img${currIMGindex}`);
  const $prevIMG = document.querySelector(`#notice #img${prevImgIndex}`);
  // console.log('tpi', '$커런트이미지', $currentIMG);
  // console.log('tip', '$이전이미지', $prevIMG);
  // console.log('tpi', '이전 인덱스', prevIndex);
  // console.log('tpi', '이미지인덱스', IMGindex);
  // console.log('tpi', '다음인덱스', nextIndex);
  hide($currentIMG, currIMGindex);
  appear($prevIMG, prevImgIndex);
  nextImgIndex = currIMGindex;
  currIMGindex = prevImgIndex;
  prevImgIndex = currIMGindex !== 1 ? currIMGindex - 1 : imgNumber; 
  changeNoticeIMG();
}

// 다음 이미지로
function toNextIMG() {
  clearInterval(interval);
  const $currentIMG = document.querySelector(`#notice #img${currIMGindex}`);
  const $nextIMG = document.querySelector(`#notice #img${nextImgIndex}`);
  // console.log('tni', '$커런트이미지', $currentIMG);
  // console.log('tni', '$다음이미지', $nextIMG);
  // console.log('tni', '이전 인덱스', prevIndex);
  // console.log('tni', '이미지인덱스', IMGindex);
  // console.log('tni', '다음인덱스', nextIndex);
  hide($currentIMG, currIMGindex);
  appear($nextIMG, nextImgIndex);
  prevImgIndex = currIMGindex;
  currIMGindex = nextImgIndex;
  nextImgIndex = currIMGindex !== imgNumber ? currIMGindex + 1 : 1;
  changeNoticeIMG();
}
$previousBtn.addEventListener('click', toPreviousIMG);
$nextBtn.addEventListener('click', toNextIMG);

changeNoticeIMG();

/* 메인 끝 */
