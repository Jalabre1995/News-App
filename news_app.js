var button = document.getElementById('button');
var url = 'http://newsapi.org/v2/top-headlines?' +
'country=us&' +
'apiKey=5b70edca1d034d86b9a94213f1344c61';
var req = new Request(url);
fetch(req)
.then(function(response) {
    console.log(response.json());
})




