/// created a variable to hold the total number of news articles
let totalNews = 0;

//Increment if the query was successful have it start at 0.

let randomNewsCount = 0;

// Query the top articles right here
$.ajax({
    url: 'https://newsapi.org/v2/top-headlines?country=us&apiKey=5b70edca1d034d86b9a94213f1344c61',
    method: 'GET'
}).then(function(response) {
    totalNews = response.count;
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



//Use the News Api for the articles 
function queryNews(news) {
    $.ajax({
        url:'https://newsapi.org/v2/everything?q=' + news + '&apiKey=5b70edca1d034d86b9a94213f1344c61',
        mwthod: 'GET'
    }).then(function(response) {
        $('#news-header').text("Here is" + response.articles.length + 'news related to ' + news);
    })
}