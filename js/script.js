'use strict';

const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optTagListSelector = '.tags .tag-list';




function titleClickHandler(e) {
  e.preventDefault();

  const activeLinks = document.querySelectorAll('a.active');
  const activeArticles = document.querySelectorAll('article.post.active');


  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  this.classList.add('active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  const articleHref = this.getAttribute('href');
  const currentArticle = document.querySelector(articleHref);


  currentArticle.classList.add('active');
  currentArticle.scrollIntoView({behavior: 'smooth', block: 'end'});
}

function generateTitleLinks(customSelector = ''){

  const titles = document.querySelectorAll(optTitleListSelector);
  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  let html = '';


  for (let article of articles) {
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).textContent;
    const linkHtml = `<li><i class="fa-solid fa-angle-right"></i><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;

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

  const articles = document.querySelectorAll(optArticleSelector);
  let allTags = {};

  for (let article of articles) {

    const tagsWrapper = article.querySelector('.tag-list');
    let html = '';
    const tags = article.dataset.tags.split(' ');

    for (let tag of tags) {

      html += `<li><a href="#tag-${tag}">#${tag}</a></li>`;


      if(!allTags.hasOwnProperty(tag)){
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
    tagsWrapper.innerHTML = html;
  }

  const tagLists = document.querySelectorAll(optTagListSelector);

  for(let tagList of tagLists){
    let allTagsHTML = '';

    for (let tag in allTags) {
      allTagsHTML += `<li><a href="#tag-${tag}">#${tag}</a><span>${allTags[tag]}</span></li>`;
    }
    tagList.innerHTML = allTagsHTML;

  }
}

function tagClickHandler(e){
  e.preventDefault();

  const clickedElement = e.target;
  const href = clickedElement.getAttribute('href');
  const tag = href.replace('#tag-', '');
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  for (let activeTagLink of activeTagLinks) {
    activeTagLink.classList.remove('active');
  }

  const TagLinks = document.querySelectorAll(`a[href="${href}"]`);

  for (let TagLink of TagLinks) {

    TagLink.classList.add('active');
  }

  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function generateAuthors() {
  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles) {
    const authorWrapper = article.querySelector('.post-author-wrapper');
    const author = article.dataset.author;
    authorWrapper.innerHTML = `<a href="#author-${author}">${author.replace('_', ' ')}</a>`;
  }
}
function addClickListenersToAuthors() {
  const authorLinks = document.querySelectorAll('.post-author-wrapper a, .authors a');

  for (let link of authorLinks) {
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
  const tagLinks = document.querySelectorAll('.tag-list a ');

  for (let tagLink of tagLinks) {
    tagLink.addEventListener('click', tagClickHandler);
  }
}



generateAuthors();
generateTags();
addClickListenersToTags();
addClickListenersToAuthors();
generateTitleLinks();