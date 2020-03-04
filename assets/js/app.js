var buttonList = ["Apex Legends",
                  "PUBG",
                  "Fortnite",
                  "Destiny 2",
                  "Escape From Tarkov",
                ];

function createButtons(arr) {
  $("#btnWrap").empty();
  for(i=0; i<arr.length; i++){
    var btnDiv = $("<div>");
    btnDiv.attr("class","btnMenu");
    btnDiv.text(arr[i]);
    var content = document.getElementById("btnWrap");
    $(content).append(btnDiv);
    clicked = document.getElementsByClassName("btnMenu");
  }
}

createButtons(buttonList);

var btnSubmit = document.getElementById("btnSubmit");

$("form").submit(function(event){
  console.log("BTN SUBMIT WORKS");
  buttonList.push($("#gameEntry").val());
  createButtons(buttonList);
  event.preventDefault();
  this.reset();
});

var clicked;

$(document.body).on("click",".btnMenu",function(){
  console.log(this.innerText);
  var searchTerm = this.innerText;
  searchTerm = searchTerm.toLowerCase().trim().split(' ').join('+');
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=iOVspgT4s9daQGKag345gmCFIKM39WRV";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var content = document.getElementById("imgContainer");
    var stillImg = response.data[0].images.fixed_width_still.url;
    $(content).append("<img src ='" + stillImg + "'>");
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