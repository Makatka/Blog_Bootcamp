'use strict';

function titleClickHandler(e){
    e.preventDefault();
    console.log('Link was clicked!');
    console.log(e);

    const activeLinks = document.querySelectorAll('.titles a.active');
    const activeArticles = document.querySelectorAll('article.post.active');


    /* [DONE] remove class 'active' from all article links  */
    for(let activeLink of activeLinks){
        activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    this.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
    for(let acitveArticle of activeArticles){
        acitveArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */
    const articleHref = this.getAttribute('href');

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const currentArticle = document.querySelector(articleHref);

    /* [DONE] add class 'active' to the correct article */
    currentArticle.classList.add('active');
}

function generateTitlelinks (){
    const titleListDesktop =  document.querySelector('aside ul.list.titles');
    const titleListMobile =  document.querySelector('main ul.list.titles');
    const articles = document.querySelectorAll('.post');

    let html = '';

    /* [DONE] for each article */

    for(let article of articles){

        /* [DONE] get the article id */
        const articleId = article.getAttribute('id');

        /* [DONE] find the title element and get the title */
        const articleTitle = article.querySelector('.post-title').textContent;

        /*  [DONE] create HTML of the link */
        const linkHtml = `<li><i class="fa-solid fa-angle-right"></i><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;

        /* [DONE] insert link into titleList */
        html += linkHtml;
    }

        titleListDesktop.innerHTML = html;
        titleListMobile.innerHTML = html;

    const linksDesktop = titleListDesktop.querySelectorAll('a');
    const linksMobile = titleListMobile.querySelectorAll('a');

    for(let link of linksDesktop ){
        link.addEventListener('click', titleClickHandler);
    }

    for(let link of linksMobile ){
        link.addEventListener('click', titleClickHandler);
    }
}

generateTitlelinks();