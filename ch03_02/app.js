// ajax : 네트워크 너머에 데이터를 가져오는 도구
// XHR : XMLHttpRequest약자

const container = document.getElementById('root');
const ajax = new XMLHttpRequest();
// new XMLHttpRequest()가 반환한 결과 값을 ajax 라는 변수에다가 저장한다.
// xml에대한 다양한 기능 https://developer.mozilla.org/ko/docs/Web/API/XMLHttpRequest
const content = document.createElement('div');
const NEWS_URL = 'http://api.hnpwa.com/v0/news/1.json';
// url은 변경될수 있기때문에 따로 빼두는 것이 좋다.
const CONTENT_URL = 'http://api.hnpwa.com/v0/item/@id.json'
// 실제 클릭했을때 값을 넣어줘야하기 때문에 id 값은 마킹만 해둔다. @id 마킹에는 여러가지 방법이 있다.

function getData(url) {
  ajax.open('GET', url, false)
  // 2번째 주소에대한 데이터를 요청하고 false 는 동기적으로 쓴다는 것을 의미한다.
  ajax.send();
  // 데이터를 가져온다.  

  return JSON.parse(ajax.response)
}

function newsFeed() {
  const newsFeed = getData(NEWS_URL);
  // json파일을 데이터를 객체로 바꿔준다.
  // ajax.response 안에는 데이터가 담겨있다.
  const newsList = [];

  newsList.push('<ul>')
  for(let i = 0; i < 10; i++) {
    newsList.push(`
      <li>
        <a href="#${newsFeed[i].id}">
          ${newsFeed[i].title} (${newsFeed[i].comments_count})
        </a>
      </li>
      `);
  };
  
  newsList.push('</ul>')
  container.innerHTML = newsList.join('');
}

function newsDetail() {
  const id = this.location.hash.substr(1);

  const newsContent = getData(CONTENT_URL.replace('@id', id));

  container.innerHTML = `
    <h1>${newsContent.title}</h1>

    <div>
      <a href="#">목록으로</a>
    </div>
  `;
}

function router() {
  const routePath = location.hash;

  if(routePath === '') {
    newsFeed();
  } else {
    newsDetail();
  }
}
window.addEventListener('hashchange', router);

router();
