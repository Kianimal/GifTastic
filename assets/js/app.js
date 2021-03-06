//Array to hold button labels
var buttonList = ["Apex Legends",
                  "PUBG",
                  "Fortnite",
                  "Destiny 2",
                  "Escape From Tarkov",
                ];
//Variables to hold dynamically generated content
var urlStill = []; // Holds all URLs for still images
var urlAnim = [];  // Holds all URLs for GIFs
var idCounter = 0; // A unique numerical ID for all images starting at 0
var limit = 10;     // The default limit of GIFs to display

//Initial button loadout on pageload
createButtons(buttonList);

//Function to render buttons from buttonList array
function createButtons(arr) {
  $("#btnWrap").empty();
  for(i=0; i<arr.length; i++){
    var btnDiv = $("<button>");
    btnDiv.attr("class","btnMenu");
    btnDiv.text(arr[i]);
    var content = document.getElementById("btnWrap");
    $(content).append(btnDiv);
  }
};

//Functionality for the clear display button
$("#clearBtn").click(function(){
  $("#imgContainer").empty();
});

//Functionality for form submission and button re-creation
$("form").submit(function(event){
  buttonList.push($("#gameEntry").val());
  createButtons(buttonList);
  event.preventDefault();
  this.reset();
});

function changeLimit(event){
  var newLimit = event.value;
  limit = newLimit;
  console.log(limit);
};

//Functionality to animate GIF
$(document).on("click",".gif",function(){
  if($(this).prop("rating") == "PG-13" || $(this).prop("rating") == "R") {    
    $(this).toggleClass("img-blur",false);
  };
  
  if($(this).prop("animated") == false){
    $(this).prop("animated",true);
    console.log($(this).attr("id"));
    console.log($(this).prop("animated"));
    var id = $(this).attr("id");
    $(this).attr("src",urlAnim[id]);
    animated = true;
  }
  else{
    if($(this).prop("rating") == "PG-13" || $(this).prop("rating") == "R") {    
      $(this).toggleClass("img-blur",true);
    };
    $(this).prop("animated",false);
    console.log($(this).prop("animated"));
    var id = $(this).attr("id");
    $(this).attr("src",urlStill[id]);
    animated = false;
  };
});

// Functionality for menu buttons to append GIFs
$(document).on("click",".btnMenu",function(){
  var searchTerm = this.innerText;
  searchTerm = searchTerm.toLowerCase().trim().split(' ').join('+');
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=iOVspgT4s9daQGKag345gmCFIKM39WRV";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var content = document.getElementById("imgContainer");
    for(i=0;i<limit;i++){
      urlStill[idCounter] = response.data[i].images["480w_still"].url;
      urlAnim[idCounter] = response.data[i].images.fixed_height.url;
      var rating = response.data[i].rating.toUpperCase();
      $(content).append("<div class='gifWrap'><img id='"+idCounter+"' class='gif' src ='" + urlStill[idCounter] + 
                        "'><br><p class='rating'>Rating: " + rating + "</p></div>");
      if(rating == "PG-13" || rating == "R"){
        $("#"+idCounter).toggleClass("img-blur");
      }
      $("#"+idCounter).prop("animated",false);
      $("#"+idCounter).prop("rating",rating);
      idCounter++;
    }
    console.log(response);
  });
});