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
    const articles = document.querySelectorAll('.post');
    const titleList =  document.querySelector('ul.list.titles');
    console.log('wykonanie funkcji generującej linki')

    let html = '';

    /* for each article */

    for(let article of articles){

        /* get the article id */
        const articleId = article.getAttribute('id');

        /* find the title element and get the title */
        const articleTitle = article.querySelector('.post-title').textContent;

        /*  create HTML of the link */
        const linkHtml = `<li><i class="fa-solid fa-angle-right"></i><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;




        /* insert link into titleList */
        html += linkHtml;
    }

    titleList.innerHTML = html;

    const links = titleList.querySelectorAll('a');

    for(let link of links ){
        link.addEventListener('click', titleClickHandler);
    }
}


generateTitlelinks();