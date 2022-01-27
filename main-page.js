const $criteria = document.querySelector('#search-criteria');
const $searchInput = document.querySelector('#search-input');
const $searchBtn = document.querySelector('#search-btn');
const $subNav = document.querySelector('#sub-nav');
const $$navItems = document.querySelectorAll('.nav-item');
let criteria;
let search;

/* 헤더 시작 */
// 검색 버튼 클릭 (검색 기준 및 검색 내용 저장)
function onClickSearchBtn() {
  criteria = $criteria.value;
  search = $searchInput.value;
}
$searchBtn.addEventListener('click', onClickSearchBtn);
$searchInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    onClickSearchBtn();
    event.preventDefault();
  }
});

// visability 변경 (클래스만으로도 바뀌도록 수정할 것)
function activate($target) {
  $target.classList.add('is-acitve');
  $target.style.visibility = 'visible';
}
function deactivate($target) {
  $target.classList.remove('is-acitve');
  $target.style.visibility = 'hidden';
}
for (let $navItem of $$navItems) {
  $navItem.addEventListener('mouseover', function() {
    activate($subNav);
    activate(this.querySelector('.nav-sub-list'));
  });
  $navItem.addEventListener('mouseout', function() {
    deactivate($subNav);
    deactivate(this.querySelector('.nav-sub-list'));
  });
}
/* 헤더 끝 */

/* 메인 시작 */
const $notice = document.querySelector('#notice');
const $$noticeIMG = document.querySelectorAll('#notice .notice-img');
const $previousBtn = document.querySelector('#notice #previous');
const $nextBtn = document.querySelector('#notice #next');
const imgNumber = $$noticeIMG.length;
let interval;
let prevIndex = imgNumber;
let IMGindex = 1;
let nextIndex = IMGindex + 1;

function hide($target) { $target.classList.add('is-hidden'); }
function appear($target) { $target.classList.remove('is-hidden'); }

function changeNoticeIMG() {
  interval = setInterval(() => {
    prevIndex = IMGindex;
    IMGindex = nextIndex;
    nextIndex = IMGindex !== imgNumber ? IMGindex + 1 : 1;
    const $currentIMG = document.querySelector(`#notice #img${IMGindex}`);
    const $prevIMG = document.querySelector(`#notice #img${prevIndex}`);
    // console.log('cn', '$커런트이미지', $currentIMG);
    // console.log('cn', '$이전이미지', $prevIMG);
    // console.log('cn', '이전 인덱스', prevIndex);
    // console.log('cn', '이미지인덱스', IMGindex);
    // console.log('cn', '다음인덱스', nextIndex);
    hide($prevIMG);
    appear($currentIMG);
  }, 2500);
}
function toPreviousIMG() {
  clearInterval(interval);
  const $currentIMG = document.querySelector(`#notice #img${IMGindex}`);
  const $prevIMG = document.querySelector(`#notice #img${prevIndex}`);
  // console.log('tpi', '$커런트이미지', $currentIMG);
  // console.log('tip', '$이전이미지', $prevIMG);
  // console.log('tpi', '이전 인덱스', prevIndex);
  // console.log('tpi', '이미지인덱스', IMGindex);
  // console.log('tpi', '다음인덱스', nextIndex);
  hide($currentIMG);
  appear($prevIMG);
  nextIndex = IMGindex;
  IMGindex = prevIndex;
  prevIndex = IMGindex !== 1 ? IMGindex - 1 : imgNumber; 
  changeNoticeIMG();
}
function toNextIMG() {
  clearInterval(interval);
  const $currentIMG = document.querySelector(`#notice #img${IMGindex}`);
  const $nextIMG = document.querySelector(`#notice #img${nextIndex}`);
  // console.log('tni', '$커런트이미지', $currentIMG);
  // console.log('tni', '$다음이미지', $nextIMG);
  // console.log('tni', '이전 인덱스', prevIndex);
  // console.log('tni', '이미지인덱스', IMGindex);
  // console.log('tni', '다음인덱스', nextIndex);
  hide($currentIMG);
  appear($nextIMG);
  prevIndex = IMGindex;
  IMGindex = nextIndex;
  nextIndex = IMGindex !== imgNumber ? IMGindex + 1 : 1;
  changeNoticeIMG();
}

$previousBtn.addEventListener('click', toPreviousIMG);
$nextBtn.addEventListener('click', toNextIMG);

changeNoticeIMG();

/* 메인 끝 */
