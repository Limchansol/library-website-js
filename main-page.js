const $criteria = document.querySelector('#search-criteria');
const $searchBtn = document.querySelector('#search-btn');
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