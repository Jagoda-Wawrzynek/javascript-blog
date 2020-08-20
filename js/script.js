'use strict';
const templates = {
  articleOfLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagOfLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorOfLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-cloud-tag-link').innerHTML),
  authorListLink: Handlebars.compile(document.querySelector('#template-authors-list-link').innerHTML)
};

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optArticleAuthorList = '.authors';

/* ......................................................................................... */
/* View article */
function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .post.active');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
}

/* ......................................................................................... */
/* Generating a list of titles */
function generateTitleLinks(customSelector = ''){

  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  /* [DONE] for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  for(let article of articles) {
    /* [DONE] get the article id */
    const articleId = article.getAttribute('id');
    /* [DONE] find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /* [DONE] create HTML of the link */
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleOfLink(linkHTMLData);
    /* [DONE] insert link into titleList */
    titleList.insertAdjacentHTML('beforeend', linkHTML);
  }
  const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();

const firstLink = document.querySelector('.list.titles li:first-of-type');
firstLink.children[0].classList.add('active');

/* ......................................................................................... */
function calculateTagsParams(tags){
  const params = {
    max : 0,
    min : 999999
  };
  for (let tag in tags) {
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }
    if(tags[tag] < params.min){
      params.min = tags[tag];
    }
  }
  return params;
}
function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);

  return classNumber;
}

/* ......................................................................................... */
/* adding tags to the article */
function generateTags(){
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
    /* [DONE] find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    /* [DONE] make html variable with empty string */
    let html = '';
    /* [DONE] get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    /* [DONE] split tags into array */
    const articleTagsArray = articleTags.split(' ');
    for (let tag of articleTagsArray) {
      /* [DONE] generate HTML of the link */
      const tagHTMLData = {tag: tag};
      const linkHTML = templates.tagOfLink(tagHTMLData);
      /* [DONE] add generated code to html variable */
      html = html + linkHTML + (' ');
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]){
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
    /* [DONE] insert HTML of all the links into the tags wrapper */
    tagsWrapper.insertAdjacentHTML('beforeend', html);
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);
  /* [NEW] create variable for all ilinks HTML code */
  const tagsParams = calculateTagsParams(allTags);
  const allTagsData = {tags: []};
  for (let tag in allTags){
    /* [NEW] generate code of a link and add it to allTagsHTML */
    allTagsData.tags.push({
      tag: tag,
      tagCount: allTags[tag],
      className: optCloudClassPrefix + calculateTagClass(allTags[tag], tagsParams)
    });
  } 
  /* [NEW] add html from allTagsHTML to tagList */
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
}

generateTags();

/* ......................................................................................... */
function tagClickHandler(event){
  /* [DONE] prevent default action for this event */
  event.preventDefault();
  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* [DONE] find all tag links with class active */
  const tagActives = document.querySelectorAll('a.active[href^="#tag-"]');
  /* [DONE] START LOOP: for each active tag link */
  for (const tagActive of tagActives){
    /* [DONE] remove class active */
    tagActive.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for (const tagLink of tagLinks){
    /* [DONE] add class active */
    tagLink.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

const allTagLinks = document.querySelectorAll('.post-tags a');
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
  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

/* ......................................................................................... */
/* Generating a list of authors */
function generateAuthors(){
  /* [NEW] create a new variable allAuthors with an empty object */
  let allAuthors = {};
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles){
    /* [DONE] find author wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    /* [DONE] make html variable with empty string */
    let html = '';
    /* [DONE] get author from data-autor attribute */
    const authorTags = article.getAttribute('data-author');
    /* [DONE] replace ' ' with '_'  in author name */
    const authorName = authorTags.replace(' ', '_');
    /* [DONE] generate HTML of the link */
    const authorHTMLData = {authorTags : authorTags};
    const authorlinkHTML = templates.authorOfLink(authorHTMLData);
    /* [DONE] add generated code to html variable */
    html = html + authorlinkHTML;
    /* [NEW] check if this link is NOT already in allAuthots */
    if(!allAuthors[authorName]){
      /* [NEW] add authorTag to allAuthors object */
      allAuthors[authorName] = 1;
    } else {
      allAuthors[authorName]++;
    }
    /* [DONE] insert HTML of all the links into the tags wrapper */
    authorWrapper.insertAdjacentHTML('beforeend', html);
  }
  /* [NEW] find list of authors in right column */
  const authorList = document.querySelector(optArticleAuthorList);
  const allAuthorData = {authors: []};
  for (let authorTags in allAuthors){
    allAuthorData.authors.push({
      authorTags: authorTags,
      authorCount: allAuthors[authorTags]
    });
  } 
  /* [NEW] add html from allAuthorHTML to authorList */
  authorList.innerHTML = templates.authorListLink(allAuthorData);
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
  /* [DONE] find all author links with class active */
  const authorActives = document.querySelectorAll('a.active[href^="#author"]');
  for (let authorDeactive of authorActives){
    /* [DONE] remove class active */ 
    authorDeactive.classList.remove('active');
  }
  /* [DONE] find all author links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll('article[href="' + href + '"]');
  for (let authorLink of authorLinks){
    /* [DONE] add class active */
    authorLink.classList.add('active');
  }
  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + authorWithout_ + '"]');
};
  
const Auhtors = document.querySelectorAll('.post-author a');
for(let author of Auhtors){
  author.addEventListener('click', authorClickHandler);
}

/* ......................................................................................... */
function addClickListenersToAuthors(){
  /* [DONE] find all links to author */
  const linksToAuthors = document.querySelectorAll('a[href^="#author"]');
  for (const linkToAuthor of linksToAuthors){
    /* [DONE] add tagClickHandler as event listener for that link */
    linkToAuthor.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();