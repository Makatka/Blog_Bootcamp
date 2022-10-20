'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  authorListLink: Handlebars.compile(document.querySelector('#template-authorList-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tagCloud-link').innerHTML),
};




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
    author: '.post-author',
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

    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
    html += linkHTML;
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
    const tags = article.dataset.tags.split(' ');
    let HTML = '';

    for (let tag of tags) {
      const linkHTMLData = {id: tag, title: tag};
      const linkHTML = templates.tagLink(linkHTMLData);
      HTML += linkHTML;

      if(!allTags.hasOwnProperty(tag)){
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
    tagsWrapper.innerHTML = HTML;
  }
  const tagLists = document.querySelectorAll(select.listOf.tags);

  for(let tagList of tagLists){
    const tagsParams = calculateTagsParams(allTags);
    const allTagsData = {tags: []};


    for (let tag in allTags) {

      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });
    }
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
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
    const authorWrapper = article.querySelector(select.article.author);
    const author = article.dataset.author;
    const authorName = author.replace('_', ' ');
    const linkHTMLData = {id: author, title: authorName, image:`../images/${author}.jpeg`};

    console.log(author);

    if(!allAuthors.hasOwnProperty(author)){
      allAuthors[author] = 1;
    } else {
      allAuthors[author]++;
    }

    authorWrapper.innerHTML = templates.authorLink(linkHTMLData);
  }

  const authorList = document.querySelector(select.listOf.authors);

  const allAuthorsData = {authors: []};

  for (let author in allAuthors) {

    allAuthorsData.authors.push({
      author: author,
      count: allAuthors[author],
      authorName: author.replace('_', ' '),
      image: `../images/${author}.jpeg`
    });

  }

  authorList.innerHTML =templates.authorListLink(allAuthorsData);
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