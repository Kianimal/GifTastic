var buttonList = [];

var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=iOVspgT4s9daQGKag345gmCFIKM39WRV";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
    });