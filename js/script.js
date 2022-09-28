'use strict';


const links = document.querySelectorAll('.titles a');

function titleClickHandler(e){
    console.log('Link was clicked!');
    console.log(e);
    const activeLinks = document.querySelectorAll('.titles a.active');
    const activeArticles = document.querySelectorAll('article.post.active');

    /* remove class 'active' from all article links  */
    for(let activeLink of activeLinks){
        activeLink.classList.remove('active');
    }

    /* add class 'active' to the clicked link */

    /* remove class 'active' from all articles */
    for(let acitveArticle of activeArticles){
        acitveArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */

    /* find the correct article using the selector (value of 'href' attribute) */

    /* add class 'active' to the correct article */
}


for(let link of links){
    link.addEventListener('click', titleClickHandler);
}