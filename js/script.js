'use strict';

const templates = {
  // eslint-disable-next-line no-undef
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  // eslint-disable-next-line no-undef
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  // eslint-disable-next-line no-undef
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  // eslint-disable-next-line no-undef
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  // eslint-disable-next-line no-undef
  authorListLink: Handlebars.compile(document.querySelector('#template-author-list-link').innerHTML),
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
      tags: 'a[href^=#tag-"]',
      authors: 'a[href^=#author-"]',
    },
  },
  article: {
    tags: '.post-tags .list',
    author: '.post-author',
    title: '.post-title',
  },
  listOf: {
    titles: '.titles',
    tags: '.tags.list',
    authors: '.authors.list',
  },
};



function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;

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

  const articleId = clickedElement.getAttribute('href');

  /*[DONE] find the correct article using the selector (value of 'href' attribute) */

  const chosenArticle = document.querySelector(articleId);

  /*[DONE] add class 'active' to the correct article */

  chosenArticle.classList.add('active');
}

function generateTitleLinks(customSelector = ''){
  /*[DONE] remove contents of titleList */
  const titleList = document.querySelector(select.listOf.titles);
  titleList.innerHTML = '';
  // /*[DONE] for each article */
  const articles = document.querySelectorAll(select.all.articles + customSelector);
  for(let article of articles){

    /*[DONE] get the article id */
    const articleId = article.getAttribute('id');

    /*[DONE] find the title element */
    /*[DONE] get the title from the title element */
    const articleTitle = article.querySelector(select.article.title).innerHTML;

    /*[DONE] create HTML of the link */
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
    /*[DONE] insert link into titleList */
    titleList.insertAdjacentHTML('beforeend', linkHTML);
  }

  const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function calculateTagsParams(tags) {

  /* NEW object that contains max and min tag apperance*/
  const params = {
    max: 0,
    min: 999999
  };

  /* Choosing max and min tag apperances */
  for(let tag in tags){
    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
  }

  return params;
}

function calculateTagClass(count, params){
  const normalizedCount =  count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (opts.tagSizes.count - 1) + 1);
  return classNumber;
}

function generateTags(){
  /* create a new variable allTags with an empty object*/
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(select.all.articles);

  /* START LOOP: for every article: */
  for(let article of articles){

    /* find tags wrapper */
    const tagWrapper = article.querySelector(select.article.tags);

    /* make html variable with empty string */
    let html = ' ';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');

    /* split tags into array */
    const tagsArray = articleTags.split(' ');

    /* START LOOP: for each tag */
    for(let tag of tagsArray){

      /* generate HTML of the link */
      const htmlLinkData = {id: tag, tag: tag};
      const htmlLink = templates.tagLink(htmlLinkData);
      /* add generated code to html variable */
      html+=htmlLink;

      /* chceck if this link is NOT already in allTags */
      // eslint-disable-next-line no-prototype-builtins
      if(!allTags.hasOwnProperty(tag)){
        /* add generated code to allTags object */
        allTags[tag]= 1;
      } else {
        allTags[tag]++;
      }
    /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */
    tagWrapper.insertAdjacentHTML('beforeend', html);

  /* END LOOP: for every article: */
  }
  /* find list of tags in right column */
  const tagList = document.querySelector(select.listOf.tags);

  const tagsParams = calculateTagsParams(allTags);

  /* create variable for all links HTML code */
  const allTagsData = {tags: []};
  /* START LOOP: for each tag in all tags */
  for(let tag in allTags){
  /* generate code of a link and add it to allTagsHTML */

    allTagsData.tags.push({
      id: tag,
      tag: tag,
      count: allTags[tag],
      class: calculateTagClass(allTags[tag], tagsParams)
    });
  /* END LOOP: for each tag in allTags */
  }
  /* add html from allTagsHTML to tagList */
  tagList.innerHTML = templates.tagCloudLink(allTagsData);


}

generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const activeTags = document.querySelectorAll(select.all.authors);
  /* START LOOP: for each active tag link */
  for(let activeTag of activeTags){
  /* remove class active */
    activeTag.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const matchingTags = document.querySelectorAll(href);
  /* START LOOP: for each found tag link */
  for(let matchingTag of matchingTags){
  /* add class active */
    matchingTag.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('.post-tags a');
  /* START LOOP: for each link */
  for(let tagLink of tagLinks){
  /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
  /* fin all links in tagList */
  const tagList = document.querySelectorAll('.tags.list a');

  /* START LOOP: for each link in tag list */
  for(let tagLink of tagList){

    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler );
  }
}

addClickListenersToTags();

function generateAuthors(){
  /* [NEW] create a new variable allAuthors with an empty object*/
  const allAuthors = {};
  /* Get all articles to const */
  const articles = document.querySelectorAll(select.all.articles);

  /* LOOP for all articles */
  for(let article of articles){

    /* Find author wrapper in every article */
    const authorWrapper = article.querySelector(select.article.author);

    /* Get data-authors from each article */
    const articleAuthor = article.getAttribute('data-authors');

    /* Generate html for every author */
    /* Add generated code to variable */
    const authorLinkData = {id: articleAuthor, author: articleAuthor};
    const authorLink = templates.authorLink(authorLinkData);
    /* insert HTML to autohr wrapper */
    authorWrapper.insertAdjacentHTML('beforeend', authorLink);

    /* Check articleAuthor is already in allAuthors and his article count*/
    // eslint-disable-next-line no-prototype-builtins
    if(!allAuthors.hasOwnProperty(articleAuthor)){
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }
  /* END article LOOP */
  }

  /* find authorsList in right column */
  const authorList = document.querySelector(select.listOf.authors);
  /* create variable for all links HTML code */
  const allAuthorsData = {authors: []};
  /* START LOOP: for each author in allAuthors */
  for(let author in allAuthors){
    /* generate code of a link and add it to allAuthorsHTML */
    allAuthorsData.authors.push({
      author: author,
      // eslint-disable-next-line no-undef
      articles: allAuthors[author],
    });
    /* END LOOP: for each tag in allAuthors */
  }
  /* add html from allAuthorsHTML to authorsList */
  authorList.innerHTML = templates.authorListLink(allAuthorsData);
}

generateAuthors();

function authorClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;


  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');


  /* make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author-', '');

  /* find all author links with class active */
  const activeAuthors = document.querySelectorAll(select.all.authors);


  /* START LOOP: for each active author link */
  for(let activeAuthor of activeAuthors){

    /* remove class active */
    activeAuthor.classList.remove('active');

  /* END LOOP: for each active author link */
  }
  /* find all author links with "href" attribute equal to the "href" constant */
  const matchingAuthors = document.querySelectorAll(href);

  /* START LOOP: for each found author link */
  for(let matchingAuthor of matchingAuthors){

    /* add class active */
    matchingAuthor.classList.add('active');

  /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-authors="' + author + '"]');


}

function addClickListenersToAuthors(){
  /* find all links to author */
  const authorLinks = document.querySelectorAll('.post-author a');

  /* find all links to author in author list */
  const authorListLinks = document.querySelectorAll('.list.authors a');
  /* START LOOP: for each link */
  for(let authorLink of authorLinks){
    /* add authorClickHandler for link */
    authorLink.addEventListener('click', authorClickHandler);
  }
  /* START LOOP: for each link */
  for(let authorListLink of authorListLinks){
    /* add authorClickHandler for link */
    authorListLink.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();
