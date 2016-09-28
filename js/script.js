
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var location = streetStr + ", " +cityStr;

    $greeting.text("So you want to live in "+location+"?");

    var streetURL = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location='+ location +'&key=AIzaSyC0_1jl9EexudDUw94Db8pIyoRUxyaRJI0';

    $body.append("<img class='bgimg' src='"+streetURL+"'>");
    // YOUR CODE GOES HERE!

    //load NY Times articles

    var nytimesURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q="+cityStr+"&api-key= 7089f31b0c0a4d8788380b208ba624f7";

    $.getJSON(nytimesURL, function( data ) {
        $nytHeaderElem.text("New York Times Articles about "+cityStr);
        var articles = data.response.docs;
        console.log(articles);
        for(var i=0; i<articles.length; i++) {
            $nytElem.append(" <p>"+(i+1)+'. ' +articles[i].snippet+"</p>");
            $nytElem.append("<a href='"+articles[i].web_url+"'>"+articles[i].headline.main+"</a><br>");
        }
        }).error(function(){
            $nytHeaderElem.text("Sorry, We could not load your article!");
  });



    return false;
};

$('#form-container').submit(loadData);
