'use strict';

const opts = {
  tagSizes: {
    count: 5,
    classPrefix: 'tag-size-',
  },
};

const select = {
  all: {
    articles: '.post',
    linksTo: {
      tags: 'a.active[href^="#tag-"]',
      authors: 'a.active[href^="#author-"]',
    },
  },
  article: {
    tags: '.tag-list',
    author: '.post-author-wrapper a',
    title: '.post-title',
  },
  listOf: {
    titles: '.titles',
    tags: '.tags .tag-list',
    authors: '.author-list ul',
  },
};


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

  const titles = document.querySelectorAll(select.listOf.titles);
  const articles = document.querySelectorAll(select.all.articles + customSelector);
  let html = '';

  for (let article of articles) {
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(select.article.title).textContent;
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

function calculateTagsParams(tags){
  const params = {
    min: 999999,
    max: 0,
  };
  for(let tag in tags) {

    params.max = tags[tag] > params.max ? tags[tag] : params.max;
    params.min = tags[tag] < params.min ? tags[tag] : params.min;
  }
  return params;

}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (opts.tagSizes.count - 1) + 1 );

  return `${opts.tagSizes.classPrefix}${classNumber}`;
}

function generateTags() {

  const articles = document.querySelectorAll(select.all.articles);
  let allTags = {};

  for (let article of articles) {
    const tagsWrapper = article.querySelector(select.article.tags);
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

  const tagLists = document.querySelectorAll(select.listOf.tags);

  for(let tagList of tagLists){
    const tagsParams = calculateTagsParams(allTags);
    let allTagsHTML = '';

    for (let tag in allTags) {
      allTagsHTML += `<li><a class="${calculateTagClass(allTags[tag],tagsParams)}" href="#tag-${tag}">#${tag}</a></li>`;
    }
    tagList.innerHTML = allTagsHTML;
  }
}

function tagClickHandler(e){
  e.preventDefault();

  const clickedElement = e.target;
  const href = clickedElement.getAttribute('href');
  const tag = href.replace('#tag-', '');
  const activeTagLinks = document.querySelectorAll(select.all.linksTo.tags);

  for (let activeTagLink of activeTagLinks) {
    activeTagLink.classList.remove('active');
  }

  const TagLinks = document.querySelectorAll(`a[href="${href}"]`);

  for (let TagLink of TagLinks) {

    TagLink.classList.add('active');
  }

  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function generateAuthor() {
  const articles = document.querySelectorAll(select.all.articles);
  let allAuthors = {};

  for (let article of articles) {
    const authorWrapper = article.querySelector('.post-author-wrapper');
    const author = article.dataset.author.replace('_', ' ');

    if(!allAuthors.hasOwnProperty(author)){
      allAuthors[author] = 1;
    } else {
      allAuthors[author]++;
    }
    authorWrapper.innerHTML = `<a href="#author-${author.replace(' ', '_')}">${author}</a>`;
  }
  const authorList = document.querySelector('.author-list ul');

  let allAuthorsHTML = '';

  for (let author in allAuthors) {
    allAuthorsHTML += `<li>
                            <div class="author-image">
                                <span>${allAuthors[author]}</span>
                            </div>
                            <div class="author-info">
                                <a href="#author-${author}" class="post-text">${author}</a>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                            </div>
                         </li>`;
  }
  authorList.innerHTML = allAuthorsHTML;
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
  const activeAuthorLinks = document.querySelectorAll(select.all.linksTo.authors);
  const authorLinks = document.querySelectorAll(`a[href="${href}"]`);

  for (let link of activeAuthorLinks) {
    link.classList.remove('active');
  }

  for (let link of authorLinks) {
    link.classList.add('active');
  }
  generateTitleLinks('[data-author~="' + author.replace(' ', '_') + '"]');
}

function addClickListenersToTags(){
  const tagLinks = document.querySelectorAll('.tag-list a ');

  for (let tagLink of tagLinks) {
    tagLink.addEventListener('click', tagClickHandler);
  }
}

generateAuthor();
generateTags();
addClickListenersToTags();
addClickListenersToAuthors();
generateTitleLinks();