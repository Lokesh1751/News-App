const API_KEY = "b3be9c6f734b42168d0b5d4eceab99f4";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchnews("India"));
async function fetchnews(query) {
  const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = await res.json();
  console.log(data);
  binddata(data.articles);
}
function binddata(articles) {
  const cardscontainer = document.getElementById("card-container");
  const newscardtemp = document.getElementById("template-news-card");
  cardscontainer.innerHTML = "";
  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const cardClone = newscardtemp.content.cloneNode(true);
    filldata(cardClone, article);
    cardscontainer.appendChild(cardClone);
  });
}
function filldata(cardClone, article) {
  const newsimg = cardClone.querySelector("#news-img");
  const newstitle = cardClone.querySelector("#news-title");
  const newssrc = cardClone.querySelector("#news-source");
  const newsdesc = cardClone.querySelector("#news-desc");
  newsimg.src = article.urlToImage;
  newstitle.innerHTML = article.title;
  newsdesc.innerHTML = article.description;
  const date = new Date(article.publishedAt);
  newssrc.innerHTML = article.source.name + ": " + date;
  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url);
  });
}
let currselnav = null;
function onnavitemclick(id) {
  fetchnews(id);
  const navitem = document.getElementById(id);
  currselnav?.classList.remove("active");
  currselnav = navitem;
  currselnav.classList.add("active");
}
const se = document.getElementById("sb");
const newsinp = document.getElementById("news-input");
se.addEventListener("click", () => {
  const que = newsinp.value;
  fetchnews(que);
  currselnav?.classList.remove("active");
  currselnav = null;
});
function reload() {
  window.location.reload();
}
