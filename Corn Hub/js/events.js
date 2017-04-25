/* Good news source (but doesn't work on school computers for some reason) :(
var container = document.getElementById("news");
var source = "the-washington-post";
var API = 'ba7c0aede1d140d7b36a2cccd893e665';
var url = 'https://newsapi.org/v1/articles?source=[src]&sortBy=top&apiKey=' + API;
url = url.replace('[src]', source);
var request = new XMLHttpRequest();
request.open("GET", url);
request.onload = function ()
{
	container.innerHTML = '';
    var data = JSON.parse(request.responseText);
    console.log(data.articles[0].author);
    for(i = 0; i < data.articles.length; i++)
    {
        publish(data.articles[i].title, data.articles[i].author, data.articles[i].url, data.articles[i].description);
    }
   container.insertAdjacentHTML('beforeend', '<p>Powered by <a href="https://newsapi.org" target="_blank">newsapi.org</a></p>');
};
request.send();

function publish(title, author, url, description) // This one even has a description :(
{
    description = description.replace('<a href="' + url + '"', '');
    description = description.replace('</a>', '');
    container.insertAdjacentHTML('beforeend', '<a href=' + url + ' target="_blank"><h4>' + title + '</h4></a>' + '<p>Written by ' + author + '</p>' + '<p>' + description + '</p><br/>');
}*/

// Bad news source (but works on school computers) :(
var container = document.getElementById('news');
var API = '67f3cd5d-fe6c-4ffc-b20a-c9e317a25bad';
var url = 'https://content.guardianapis.com/search?section=[region]&api-key=[api]';

url = url.replace('[api]', API);
url = url.replace('[region]', 'us-news');

var requestUSA = new XMLHttpRequest();
requestUSA.open("GET", url);
requestUSA.onload = function ()
{
	container.innerHTML = ''; // Reset the container
    container.insertAdjacentHTML('beforeend', '<div class="newsNews"><h2><span style="color: #d60020">United</span> <span style="color: #048">States</span> <span style="color: #d60020">News</span></h2>');
    data = JSON.parse(requestUSA.responseText);
    for(i = 0; i < data.response.results.length; i++)
    {
        publish(data.response.results[i].webTitle, 
                capFirst(data.response.results[i].type), 
                data.response.results[i].webUrl,
                container);
        container.insertAdjacentHTML('beforeend', '</span>');
    }
    
    // After I loaded the actual news, load the tech news
    url = url.replace('us-news', 'technology')
    var requestTech = new XMLHttpRequest();
    requestTech.open("GET", url);
    requestTech.onload = function ()
    {
        container.insertAdjacentHTML('beforeend', '<div class="tech"><h2><span style="color: #00d11f">Technology News<span class="typed-cursor">|</span></span></h2>');
        data = JSON.parse(requestTech.responseText);
        for(i = 0; i < data.response.results.length; i++)
        {
            publish(data.response.results[i].webTitle, 
                    capFirst(data.response.results[i].type), 
                    data.response.results[i].webUrl,
                    container);
        }
        container.insertAdjacentHTML('beforeend', '</div>')
    };
    requestTech.send();
};
requestUSA.send();


function publish(title, type, url, container)
{
    container.insertAdjacentHTML('beforeend', '<h3><a href="' + url + '" target="_blank">' + title + '</a> - ' + type + '</h3><br>');
}

function capFirst(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}