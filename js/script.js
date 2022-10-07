'use strict';

const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';




function titleClickHandler(e) {
  e.preventDefault();

  const activeLinks = document.querySelectorAll('a.active');
  const activeArticles = document.querySelectorAll('article.post.active');


  /* [DONE] remove class 'active' from all article links  */
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  this.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */
  const articleHref = this.getAttribute('href');

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const currentArticle = document.querySelector(articleHref);


  /* [DONE] add class 'active' to the correct article */
  currentArticle.classList.add('active');

  currentArticle.scrollIntoView({behavior: 'smooth', block: 'end'});
}

function generateTitleLinks(customSelector = ''){

  const titles = document.querySelectorAll(optTitleListSelector);
  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  let html = '';

  /* [DONE] for each article */

  for (let article of articles) {

    /* [DONE] get the article id */
    const articleId = article.getAttribute('id');

    /* [DONE] find the title element and get the title */
    const articleTitle = article.querySelector(optTitleSelector).textContent;

    /*  [DONE] create HTML of the link */
    const linkHtml = `<li><i class="fa-solid fa-angle-right"></i><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;

    /* [DONE] insert link into titleList */
    html += linkHtml;
  }

  for (let title of titles) {
    title.innerHTML = html;
    const links = title.querySelectorAll('a');

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  }
}

function generateTags() {

  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* [DONE] START LOOP: for every article: */
  for (let article of articles) {

    /* [DONE] find tags wrapper */
    const tagsWrapper = article.querySelector('.tag-list');

    /* [DONE] make html variable with empty string */
    let html = '';

    /* [DONE] get tags from data-tags attribute */
    const tags = article.dataset.tags;

    /* [DONE] split tags into array */
    const articleTagsArray = tags.split(' ');

    /* [DONE] START LOOP: for each tag */
    for (let i = 0 ; i < articleTagsArray.length ; i++) {

      /* [DONE] generate HTML of the link */
      html += `<li><a href="#tag-${articleTagsArray[i]}">#${articleTagsArray[i]}</a></li>`;
    }

    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;

    /*  END LOOP: for each tag */
  }

  /* END LOOP: for every article: */
}

function tagClickHandler(e){
  /* [DONE] prevent default action for this event */
  e.preventDefault();

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = e.target;

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* [DONE] find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for (let activeTagLink of activeTagLinks) {

    /* [DONE] remove class active */
    activeTagLink.classList.remove('active');

    /* END LOOP: for each active tag link */
  }

  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
  const TagLinks = document.querySelectorAll(`a[href="${href}"]`);

  /* START LOOP: for each found tag link */
  for (let TagLink of TagLinks) {

    /* add class active */
    TagLink.classList.add('active');

    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function generateAuthors() {
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* [DONE] START LOOP: for every article: */
  for (let article of articles) {

    /* [DONE] find author wrapper */
    const authorWrapper = article.querySelector('.post-author-wrapper');

    /* [DONE] get authors from data-author attribute */
    const author = article.dataset.author;

    authorWrapper.innerHTML = `<a href="#author-${author}">${author.replace('_', ' ')}</a>`;
  }
}

function addClickListenersToAuthors() {
  const authorLinks = document.querySelectorAll('.post-author-wrapper a');
  const authorsLinks = document.querySelectorAll('.authors a');

  for (let link of authorLinks) {
    link.addEventListener('click', authorClickHandler);
  }

  for (let link of authorsLinks) {
    link.addEventListener('click', authorClickHandler);
  }
}

function authorClickHandler(e) {

  e.preventDefault();

  const clickedElement = e.target;
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', '');
  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  const authorLinks = document.querySelectorAll(`a[href="${href}"]`);

  for (let link of activeAuthorLinks) {
    link.classList.remove('active');
  }

  for (let link of authorLinks) {
    link.classList.add('active');
  }

  generateTitleLinks('[data-author~="' + author + '"]');
}

function addClickListenersToTags(){
  /* [DONE] find all links to tags */
  const tagLinks = document.querySelectorAll('.tag-clouds .tag-list a');

  /* [DONE] START LOOP: for each link */
  for (let tagLink of tagLinks) {

    /* [DONE] add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
  }
  /* END LOOP: for each link */
}

function generateTagsNumber () {
  const tagsList = document.querySelectorAll('.tag-clouds a[href^="#tag-"]');
  const articles = document.querySelectorAll(optArticleSelector);
  let tagsArray = [];

  for (let article of articles) {

    const articleTags = article.dataset.tags.split(' ');
    tagsArray = tagsArray.concat(articleTags);
  }

  for (let tag of tagsList) {

    const href = tag.getAttribute('href');
    const tagName = href.replace('#tag-', '');
    const tagMatches = document.querySelectorAll(`[data-tag*=${tagName}]`);

    let tagMatchesNumber = 0;

    for (let i = 0; i < tagsArray.length; i++) {
      tagsArray[i].includes(tagName) ? tagMatchesNumber++ : 1;
    }

    for (let tag of tagMatches) {
      tag.innerText = tagMatchesNumber;
    }
  }
}

generateAuthors();
generateTags();
generateTagsNumber();
addClickListenersToTags();
addClickListenersToAuthors();
generateTitleLinks();