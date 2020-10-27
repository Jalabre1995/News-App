/// created a variable to hold the total number of news articles
let totalSources = 0;

//Increment if the query was successful have it start at 0.

let randomNewsCount = 0;

// Query all the sources right here
$.ajax({
    url: 'https://newsapi.org/v2/sources?apiKey=5b70edca1d034d86b9a94213f1344c61',
    method: 'GET'
}).then(function(response) {
    totalSources = response.count;
    prepDisplay();
    ///Show the necessary <divs> and 
    $('#news-search-results').removeClass('d-none');
    $('#total-articles').removeClass('d-none');
    $('#total-articles').text('The Headlines that are shown are ? ' + resposne.count + 'articles. Here are some for you to read and Enjoy!: ')
    getArticles();
});

///Clears the content, where the PrepDisplay is///
function prepDisplay(){
    $('#news-search-results').addClass('d-none');
    $("news-cards").empty();
    $('#main-news-display').addClass('d-none');
    $('#main-news-display').empty();
    $('#news-container').addClass('d-none');
    $('#news').empty();
}

///Get the news articles///
function getNewsArticles(){
    let randNum = Math.floor(Math.random() * totalNews);
    $.ajax({
        url: 'https://newsapi.org/v2/everything?q=' + randNum,
        method: 'Get'
    }).then(function(response){
        populateNewsSearchCards(response);
        randomNewsCount++;
        //call the fucntion until 5 responses are generated
        if (randomNewsCount < 5 ) {
            getNewsArticles();
        }
        ///If we get an 404 error then don't increment the resposne//
    }).fail(function() {
        getNewsArticles();
    });
}
///When the user loades the page, have the div cards populated and loaded

function populateNewsSearchCards(resposne){
    let newCard = $('<div class="card"');
    $(newCard).attr('id', response.id);
    let cardImage = $('<div class="image"');
    if(response.background_imge == null){
        ///Put a radom placeholder 
    }else{
        $(cardImage).append('<img src="' + response.background_imge + '">');
    }
    newCard.append(cardImage);

    let cardContent = $('<div class="content">');
    let cardHeader = $('<div class-="header">').text(response.name);
    cardContent.append(cardHeader);

    let description = $('<div class="description">');

    let releaseDate = $('<p>').text('Release Date: ' + response.realeased);
    description.append(releaseDate);

    let articleId = $('<p>').text('News ID: ' + response.id);
    description.append(articleId);
    
    cardContent.append(description);
    newCard.append(cardContent);

    $('#news-cards').append(newCard);

}

///Using the event handler///
var searchIcon = $("#search-button");
searchIcon.on('click', function(e)
{
    e.preventDefault();
    prepDisplay();
    $('#news-search-results').removeClass('d-none');
    var userInput = $(".searchInput").val();
    uSearch(userInput)

})

function uSearch(title) {
    $.ajax({
        url: "'https://newsapi.org/v2/everything?page_size=5&search=" + title,
        method: 'GET'
    }).then(function(response) {
        for (var i = 0; i < response.results.length; i++)
        {
            populateNewsSearchCards(response.results[i]);
        }
    });
}





//Use the News Api for the articles 
function queryNews(news) {
    $.ajax({
        url:'https://newsapi.org/v2/everything?q=' + news + '&apiKey=5b70edca1d034d86b9a94213f1344c61',
        mwthod: 'GET'
    }).then(function(response) {
        $('#news-header').text("Here is" + response.articles.length + 'news related to ' + news);

        if(response.articles.legnth > 0) {
            ///Loop through all the articles that are given
            for(let i = 0; i < response.articles.length; i++) {
                //populoate the news results using semantic UI
                let newItem = $('<div class= "item">');
                let itemImage = $('div class= "image">');
                $(itemImage).append('<img src="' + response.articles[i].urlToImage + '">');
                newItem.append(itemImage);

                let itemContent =  $('<div class="content">');
                let itemHeader = $('<div class="header">').text(response.articles[i].title);
                itemContent.append(itemHeader);

                let description = $('<div class="description"');
                $(description).appned($('<p>').text('Published by ' + response.articles[i].source.name + ' at ' + response.articles[i].publishedAt));
                $(description).appedn($('<p>').text(response.articles[i].description))
                itemContent.append(description);
            }
        }
    })
}