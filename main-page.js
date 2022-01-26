const $criteria = document.querySelector('#search-criteria');
const $searchBtn = document.querySelector('#search-btn');
const $subNav = document.querySelector('#sub-nav');
const $$navItems = document.querySelectorAll('.nav-item');
let criteria;

// 검색 기준 변경
function changeCategory() {
  criteria = this.value;
}
$criteria.addEventListener('change', changeCategory);

// 검색 버튼 클릭
function onClickSearchBtn() {
  return;
}
$searchBtn.addEventListener('click', onClickSearchBtn);

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
