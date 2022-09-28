'use strict';


const links = document.querySelectorAll('.titles a');
const articles = document.querySelectorAll('.articles');

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

    /* get 'href' attribute from the clicked link */
    const articleHref = this.getAttribute('href');

    /* find the correct article using the selector (value of 'href' attribute) */
    const currentArticle = document.querySelector(articleHref);

    /* add class 'active' to the correct article */
    currentArticle.classList.add('active');
}


for(let link of links){
    link.addEventListener('click', titleClickHandler);
}