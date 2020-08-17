'use strict';
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';

/* ......................................................................................... */
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
  //console.log('Clicked element: ', clickedElement);
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .post.active');
  //console.log(activeArticles);
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  //console.log(articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
}

/* ......................................................................................... */
/* Generating a list of titles */
function generateTitleLinks(customSelector = ''){

  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  //console.log(titleList);

  /* [DONE] for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  //console.log(optArticleSelector + customSelector);
  //let html = '';
  for(let article of articles) {
    /* [DONE] get the article id */
    const articleId = article.getAttribute('id');
    //console.log(articleId);
    /* [DONE] find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    //console.log(articleTitle);
    /* get the title from the title element */
    /* [DONE] create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    //console.log(linkHTML);
    /* [DONE] insert link into titleList */
    titleList.insertAdjacentHTML('beforeend', linkHTML);
  }
  //console.log(html);

  const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();

const firstLink = document.querySelector('.list.titles li:first-of-type');
//console.log(firstLink.children[0]);
firstLink.children[0].classList.add('active');

/* ......................................................................................... */
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
    for (let tag of articleTagsArray) {
    /* [DONE] generate HTML of the link */
      const tagHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      console.log(tagHTML);
      /* [DONE] add generated code to html variable */
      html = html + tagHTML + (' ');
      /* END LOOP: for each tag */
    }
    //console.log(html);
    /* [DONE] insert HTML of all the links into the tags wrapper */
    tagsWrapper.insertAdjacentHTML('beforeend', html);
    /* END LOOP: for every article: */
  }

}
generateTags();

/* ......................................................................................... */
function tagClickHandler(event){
  /* [DONE] prevent default action for this event */
  event.preventDefault();
  //console.log(event);
  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  //console.log(clickedElement);
  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  //console.log(href);
  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* [DONE] find all tag links with class active */
  const tagActives = document.querySelectorAll('a.active[href^="#tag-"]');
  //console.log(tagActives); // !!! wyswietla wartość "NodeList []"" !!!
  /* [DONE] START LOOP: for each active tag link */
  for (const tagActive of tagActives){
    //console.log('test');
    /* [DONE] remove class active */
    tagActive.classList.remove('active');
    //console.log(tagActive);
  /* END LOOP: for each active tag link */
  }
  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  //console.log(tagLinks);
  /* START LOOP: for each found tag link */
  for (const tagLink of tagLinks){
    /* [DONE] add class active */
    tagLink.classList.add('active');
    //console.log(tagLink);
  /* END LOOP: for each found tag link */
  }
  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

const allTagLinks = document.querySelectorAll('.post-tags a');
//console.log(allTagLinks);
for(let eachTagLink of allTagLinks){
  eachTagLink.addEventListener('click', tagClickHandler);
}

/* ......................................................................................... */
function addClickListenersToTags(){
  /* [DONE] find all links to tags */
  const linksToTags = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */
  for (const linkToTag of linksToTags){
    /* [DONE] add tagClickHandler as event listener for that link */
    linkToTag.addEventListener('click', tagClickHandler);
    //console.log(linkToTag);
  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

/* ......................................................................................... */
/* Generating a list of authors */
function generateAuthors(){
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  //console.log(articles);
  /* [DONE] START LOOP: for every article: */
  for (let article of articles){
    /* [DONE] find author wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    //console.log(authorWrapper);
    /* [DONE] make html variable with empty string */
    let html = '';
    /* [DONE] get author from data-autor attribute */
    const authorTags = article.getAttribute('data-author');
    //console.log(authorTags);
    /* [DONE] replace ' ' with '_'  in author name */
    const authorName = authorTags.replace(' ', '_');
    //console.log(authorName);
    /* [DONE] generate HTML of the link */
    const authorLink = '<a href="#author_' + authorName + '"> by: ' + authorTags + '</a>';
    //console.log(authorLink);
    /* [DONE] add generated code to html variable */
    html = html + authorLink;
    //console.log(html);
    /* [DONE] insert HTML of all the links into the tags wrapper */
    authorWrapper.insertAdjacentHTML('beforeend', html);
    /* [OK] END LOOP: for every article: */
  }
}

generateAuthors();

/* ......................................................................................... */
const authorClickHandler = function(event){
  /* [DONE] prevent default action for this event */
  event.preventDefault();
  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* [DONE] make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author_', '');
  const authorWithout_ = author.replace('_', ' ');
  //console.log(authorWithout_);
  /* [DONE] find all author links with class active */
  const authorActives = document.querySelectorAll('a.active[href^="#author"]');
  //console.log(authorActives); // !!! wyswietla wartość "NodeList []"" !!!
  /* [DONE] START LOOP: for each active author link */
  for (let authorDeactive of authorActives){
    /* [DONE] remove class active */ 
    authorDeactive.classList.remove('active');
    //console.log(authorDeactive); // wyswietla sie po drugim kliknieciu i wykonuje trzykrotnie; 
    /* END LOOP: for each active author link */
  }
  /* [DONE] find all author links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll('article[href="' + href + '"]');
  //console.log(authorLinks);
  /* START LOOP: for each found author link */
  for (let authorLink of authorLinks){
    /* [DONE] add class active */
    authorLink.classList.add('active');
    //console.log(authorLink);
    /* END LOOP: for each found author link */
  }
  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + authorWithout_ + '"]');
  //console.log(generateTitleLinks);
};
  
const Auhtors = document.querySelectorAll('.post-author a');
//console.log('autorzy: :', Auhtors);
for(let author of Auhtors){
  author.addEventListener('click', authorClickHandler);
  //console.log(author);
}

/* ......................................................................................... */
function addClickListenersToAuthors(){
  /* [DONE] find all links to author */
  const linksToAuthors = document.querySelectorAll('a[href^="#author"]');
  //console.log(linksToAuthors);
  /* START LOOP: for each link */
  for (const linkToAuthor of linksToAuthors){
    /* [DONE] add tagClickHandler as event listener for that link */
    linkToAuthor.addEventListener('click', authorClickHandler);
    //console.log(linkToAuthor);
    /* END LOOP: for each link */
  }
}

addClickListenersToAuthors();