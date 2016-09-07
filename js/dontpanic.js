/*
//Make the background move when the mouse is moving around, 
//kind of annoying with the current implementation, I wanted small movement.
$("body").mousemove(function (event){
    $("body").css({"background-size":backgroundSize(event.pageX) +"%"});
   
});

function backgroundSize(input){
    if (input <= 100){
        return 100
    }
    else
        return (event.pageX);
}
*/
//event.pageX + event.pageY

//Query wikipedia
$("#searchBox").keypress(function(event){
    
    var keycode = (event.keyCode ? event.keyCode : event.which);
    console.log(keycode);

    //Keycode 13 is the enter button
    //When enter is pressed in the searchbox
    if(keycode == '13'){
        clearESC();
        var thisSearch = urlBuilder();
        
        var wikiLink = '<a href="https://en.wikipedia.org/?curid=';

       $.ajax({
            url: thisSearch,
            dataType: 'json',
            type: "GET", 
            headers: {'Api-User-Agent' : 'Example/1.0'},
            success: function(data){
               $(".search").css({'padding-bottom': '0' }) 
               $(".search").css({'transition': 'all 0.6s ease-in-out' }) 
               $("#return").css({'background-color': 'gray'}) 
               var dqp = data.query.pages
               $("#return").prepend("<h1 id='returnHead'> Results for: " +$("#searchBox").val() +"</h1>" )
               for ( var x in dqp){
                  $("#return").append('<p><div class="titles">'  +  wikiLink + dqp[x].pageid  +'" target="_blank">' + dqp[x].title + '<br>' +dqp[x].extract + '</a> </p></div>');
                  if ( dqp[x].hasOwnProperty('extract') ){
                    console.log(dqp[x].extract); 
                  }

                  
                   
                }

            }

       });

    }

});

//IF escape is presseed, clear the search
$(document).keydown(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '27'){
         clearESC();
         $("#searchBox").val(''); 
    }
});



$("#random").hover(function(){
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    $("#random").css("background-color", "#"+randomColor);
    $("#booklook").css("background-color", "transparent");
    $("#booklook").css("box-shadow", "none");
  
    
});
/*The link to the random wikipedia article will get a random background on mouseover*/
$("#random").mouseout(function(){
    $("#random").css("background-color", "transparent");
    $("#booklook").css("background-color", "#304071");
    $("#booklook").css("box-shadow", "1px 1px");
});

//Open a random wikipedia page in a new tab
$("#random").click(function(){
    window.open('https://en.wikipedia.org/wiki/Special:Random', '_blank');
});
function urlBuilder(){
   var uri = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&gsrlimit=10&generator=search&exchars=100&exlimit=10&exintro=1&origin=*&utf8=1&gsrsearch=" 
   
   var search = $("#searchBox").val();
   var fullURL = uri +search;
   return fullURL;
}
//Clear for new search
function clearESC(){
    $("#return").html('');
    $("#return").css({'background-color': 'transparent'});
   
    $(".search").css({'padding-bottom': '350px' }); 
    
}

// /w/api.php?action=query&format=json&prop=extracts&generator=search&exchars=100&exlimit=10&exintro=1&gsrsearch=Chad