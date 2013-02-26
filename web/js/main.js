
App.populator('Perez1', function (page, article) {

  //Pull in content from PerezHilton.com
  feedParser.getArticles(function (articles){
    articleData = articles;
    index = articleData[index].index; 
    addContent();
  });

  var addContent = function () {
    $(page).find('headline').clickable(); 
    $(page).find('#headline').text(articleData[index].title);
    $(page).find('#story').append(articleData[index].content);
  
    // Replacing the default image with the article image
    // var imgs = new Image();
    // imgs.src = article.img;
    // $(page).find('#image').replaceWith(imgs);

    // Send the article via Kik
    $(page).find('#kik-it').on('click', function () {
      //Removing the HTML from the brief description
      var artBrief = articleData[index].description;
      var foobar = $('<div />').html(artBrief);
      var summary = foobar.find('p').text() || artBrief;

      cards.kik.send({
          title    : articleData[index].title        ,
          text     : summary                        ,
          pic      : 'img/perez.jpg'                 ,
          big      : false                           ,       
      });
    });

    // Tapping headline goes to full article on perezhilton.com
    $(page).find('#headline').on('click', function () {
      cards.browser.open(articleData[index].link); 
    });

    // Tapping image also goes to full article on perezhilton.com
    // $(imgs).on('click', function () {
    //   cards.browser.open(articleData[index].link); 
    // });

    // If on the first article in the list, remove "Back" button
    if (articleData[index].index === 0){
      $(page).find('#Back').remove(); 
    }

    //If at the 10th article "Next" becomes "Go Home" returns to article 0
    var length = articleData.length; 
    var len = length - 1;
    if (articleData[index].index === len){
      $(page).find('#Next').remove(); 
      $(page).find('#Back').replaceWith('<div class="app-button" id="home">New Stories</div>');
      
      index = 0;
      console.log(index);
      $(page).find('#home').on('click', function () {
        App.load('Perez1', articleData[index]);
      });
    }

    else{
      // Otherwise go to the next article
      $(page).find('#Next').on('click', function () {
        index++;
        console.log(index);
        App.load('Perez1', articleData[index]);
      });

      //Otherwise handle "back"
      $(page).find('#Back').on('click', function () {
        //This will automatically go to the previous page if "back" is clicked
      });
    }
  }
});

// Defining some global variables
var articleData = [];
var index = 0;

// First app.load
App.load('Perez1', articleData[0]);

// For the future "preview" page
App.populator('PerezPreview', function (page, articleData) {
  //App.load('Perez1', articleData);
});

try {
  App.restore();
}
catch (err) {
  //App.load('home');
}