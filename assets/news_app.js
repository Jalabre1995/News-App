/// created a variable to hold the total number of news articles
let totalArticles;

//Increment if the query was successful have it start at 0.

let randomNewsCount = 0;

// Query all the articles right here
$.ajax({
    url: 'https://gnews.io/api/v4/top-headlines?token=41781c49fe723df3a38e0aaa430ef5db',
    method: 'GET'
}).then(function(response) {
    totalArticles = response.count;
    prepDisplay();
    ///Show the necessary <divs> and 
    $('#news-search-results').removeClass('d-none');
    $('#total-articles').removeClass('d-none');
    $('#total-articles').text('The database contains ' + response.totalArticles + ' articles. Enjoy! Here are a few examples: ')
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
    let randNum = Math.floor(Math.random() * totalArticles);
    $.ajax({
        url: 'https://gnews.io/api/v4/top-headlines?token=41781c49fe723df3a38e0aaa430ef5db' + randNum,
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

function populateNewsSearchCards(response){
    let newCard = $('<div class="card"');
    $(newCard).attr('id', response.id);
    let cardImage = $('<div class="image"');
    if(response.background_imge === null){
        ///Put a radom placeholder 
    }else{
        $(cardImage).append('<img src="' + response.background_imge + '">');
    }
    newCard.append(cardImage);

    let cardContent = $('<div class="content">');
    let cardHeader = $('<div class-="header">').text(response.name);
    cardContent.append(cardHeader);

    let description = $('<div class="description">');

    let releaseDate = $('<p>').text('Release Date: ' + response.publishedAt);
    description.append(releaseDate);

    let articleId = $('<p>').text('News ID: ' + response.id);
    description.append(source);
    
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

});

function uSearch(title) {
    $.ajax({
        url: "https://gnews.io/api/v4/search?q=example&token=41781c49fe723df3a38e0aaa430ef5db" + name,
        method: 'GET'
    }).then(function(response) {
        for (var i = 0; i < response.totalArticles; i++)
        {
            populateNewsSearchCards(response.results[i]);
        }
    });
}





//Use to populate other articles related to the topic///
function queryNews(name) {
    $.ajax({
        url:'https://gnews.io/api/v4/top-headlines?token=41781c49fe723df3a38e0aaa430ef5db' + name ,
        mwthod: 'GET'
    }).then(function(response) {
        $('#news-header').text("Here is" + response.totalArticles + 'news related to ' + name);

        if(response.totalArticles > 0) {
            ///Loop through all the articles that are given
            for(let i = 0; i < response.totalArticles; i++) {
                //populoate the news results using semantic UI
                let newItem = $('<div class= "item">');
                let itemImage = $('div class= "image">');
                $(itemImage).append('<img src="' + response.totalArticles[i].urlToImage + '">');
                newItem.append(itemImage);

                let itemContent =  $('<div class="content">');
                let itemHeader = $('<div class="header">').text(response.totalArticles[i].title);
                itemContent.append(itemHeader);

                let description = $('<div class="description"');
                $(description).appned($('<p>').text('Published by ' + response.totalArticles[i].source.name + ' at ' + response.totalArticles[i].publishedAt));
                $(description).appedn($('<p>').text(response.articles[i].description))
                itemContent.append(description);
            }
        }
    })
}