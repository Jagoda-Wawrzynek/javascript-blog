'use strict';
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';


/* View article */
function titleClickHandler(event){
  console.log('Link was clicked!');
  console.log(event);
  event.preventDefault();
  const clickedElement = this;

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  console.log('Clicked element: ', clickedElement);
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .post.active');
  console.log(activeArticles);
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
}

/* Generating a list of titles */
function generateTitleLinks(){

  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  console.log(titleList);

  /* [DONE] for each article */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(optArticleSelector);
  let html = '';
  for(let article of articles) {
    /* [DONE] get the article id */
    const articleId = article.getAttribute('id');
    console.log(articleId);
    /* [DONE] find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log(articleTitle);
    /* get the title from the title element */
    /* [DONE] create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);
    /* [DONE] insert link into titleList */
    titleList.insertAdjacentHTML('beforeend', linkHTML);
  }
  console.log(html);

  const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();

const firstLink = document.querySelector('.list.titles li:first-of-type');
console.log(firstLink.children[0]);
firstLink.children[0].classList.add('active');

/* adding tags to the article */
function generateTags(){
/* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
  /* START LOOP: for every article: find tags wrapper */
    /* [DONE] find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    console.log(tagsWrapper);
    /* [DONE] make html variable with empty string */
    let html = '';
    console.log(html);
    /* [DONE] get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);
    /* [DONE] split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);
    /* [DONE] START LOOP: for each tag */
    for (let articleTags of articleTagsArray) {
    /* generate HTML of the link */
      const linkHTML = '<li><a href="#' + articleTags + '"><span>';
      console.log(linkHTML);
      /* add generated code to html variable */
      html = html + linkHTML;
      /* END LOOP: for each tag */
    }
    /* [DONE] insert HTML of all the links into the tags wrapper */
    tagsWrapper.insertAdjacentHTML('beforeend', html);
    /* END LOOP: for every article: */
  }
  console.log(html);

  const tags = document.querySelectorAll('.titles a');
  for(let tag of tags){
    tag.addEventListener('click', titleClickHandler);
  }
}

const tagList = document.querySelector(optArticleTagsSelector);

generateTags();