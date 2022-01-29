/* 헤더 시작 */

const $criteria = document.querySelector('#search-criteria');
const $searchInput = document.querySelector('#search-input');
const $searchBtn = document.querySelector('#search-btn');
const $subNav = document.querySelector('#sub-nav');
const $$navItems = document.querySelectorAll('.nav-item');
let criteria;
let search;

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
