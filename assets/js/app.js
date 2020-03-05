var buttonList = ["Apex Legends",
                  "PUBG",
                  "Fortnite",
                  "Destiny 2",
                  "Escape From Tarkov",
                ];

var reqCount = 10;
var btnSubmit = document.getElementById("btnSubmit");
var urlStill = [];
var urlAnim = [];
var idCounter = 0;

//Function to render buttons from buttonList array
function createButtons(arr) {
  $("#btnWrap").empty();
  for(i=0; i<arr.length; i++){
    var btnDiv = $("<div>");
    btnDiv.attr("class","btnMenu");
    btnDiv.text(arr[i]);
    var content = document.getElementById("btnWrap");
    $(content).append(btnDiv);
  }
}

//Initial button loadout on pageload
createButtons(buttonList);

//Functionality for form submission and button re-creation
$("form").submit(function(event){
  buttonList.push($("#gameEntry").val());
  createButtons(buttonList);
  event.preventDefault();
  this.reset();
});

//Functionality to animate GIF
$(document.body).on("click",".gif",function(){
  console.log($(this).attr("id"));
  var id = $(this).attr("id");
  $(this).attr("src",urlAnim[id]);
});

// Functionality for menu buttons to append GIFs
$(document.body).on("click",".btnMenu",function(){
  var searchTerm = this.innerText;
  searchTerm = searchTerm.toLowerCase().trim().split(' ').join('+');
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=iOVspgT4s9daQGKag345gmCFIKM39WRV";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var content = document.getElementById("imgContainer");
    for(i=0;i<reqCount;i++){
      urlStill[idCounter] = response.data[i].images["480w_still"].url;
      urlAnim[idCounter] = response.data[i].images.fixed_height.url;
      var rating = response.data[i].rating.toUpperCase();
      $(content).append("<div class='gifWrap'><img id='"+idCounter+"' class='gif' src ='" + urlStill[idCounter] + 
                        "'><br><p class='rating'>Rating: " + rating + "</p></div>");
      idCounter++;
    }
    console.log(response);
  });
});

// // var queryURL = "https://api.giphy.com/v1/gifs/?" +  + "&api_key=iOVspgT4s9daQGKag345gmCFIKM39WRV";

//     $.ajax({
//       url: queryURL,
//       method: "GET"
//     }).then(function(response) {
//       var content = document.getElementById("btnContainer");
//       var stillImg = response.data[0].images.original_still.url;
//       // $(content).append("<img src ='" + stillImg + "'>");
    // });