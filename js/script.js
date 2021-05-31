'use strict';

function titleClickHandler(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');

  /*[DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');
    for(let activeLink of activeLinks){
        activeLink.classList.remove('active');
    }

  /*[DONE] add class 'active' to the clicked link */

    clickedElement.classList.add('active');

  /*[DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts article.active');
    for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }

  /*[DONE] get 'href' attribute from the clicked link */

    let articleId = clickedElement.getAttribute('href');
    console.log(articleId);

  /*[DONE] find the correct article using the selector (value of 'href' attribute) */

    let chosenArticle = document.getElementById(articleId);

  /*[DONE] add class 'active' to the correct article */

    chosenArticle.classList.add('active');
}

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(){
console.log("Działa");
  /*[DONE] remove contents of titleList */
  const titleList = document.querySelector('.titles');
  // titleList.innerHTML = '';
  // /*[DONE] for each article */
  const articles = document.querySelectorAll('.post');
  for(let article of articles){

    /*[DONE] get the article id */
    const articleId = article.getAttribute('id');

    /*[DONE] find the title element */
    /*[DONE] get the title from the title element */
    const articleTitle = article.querySelector('.post-title').innerHTML;

    /* create HTML of the link */

    /* insert link into titleList */
  }

}

generateTitleLinks();