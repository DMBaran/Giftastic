$("#addAnimal").on("click", function(){ 

  event.preventDefault();
  var animal = $("#animal-input").val();
  var btn = $("<button>");
  btn.click(animalGifs);
  btn.attr('data-animal', animal);
  btn.attr('id','label');
  $('#animalButtons').append(btn);
  btn.text(animal);

});

function animalGifs() {

  $('#animals').empty();
    
  var animal = $(this).attr("data-animal");
  
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  })
  .then(function(response) {
    var results = response.data;

    for (var i = 0; i < results.length; i++) {

      if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
        var gifDiv = $("<div class='col-sm-4 item'>");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var personImage = $("<img>");

        personImage.attr('data-state', 'still');

        personImage.attr('data-animate', results[i].images.fixed_height.url);

        personImage.attr('data-still', results[i].images.fixed_height_still.url);

        personImage.attr("src", results[i].images.fixed_height_still.url);
        
        personImage.click(gifState);
        
        gifDiv.append(p);
        gifDiv.append(personImage);

        $("#animals").prepend(gifDiv);

        function gifState() {
          var state = $(this).attr("data-state");

          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
        }
      }             
    }
  })
}

