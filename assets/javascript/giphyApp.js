$(document).ready(function () {
      var topics = ["Subaru", "Honda", "Toyota", "Lexus", "BMW", "GTR"];

      function createBtns() {
            for (var i = 0; i < topics.length; i++) {
                  var createBtn = $("<button>");
                  createBtn.addClass("gif-Btn");
                  createBtn.text(topics[i]);
                  $("#butt-container").append(createBtn);
            }

            $(".gif-Btn").click(function () {
                  $("#img-container").empty();
                  giphyImgs($(this).text());
            });
      }

      function addBtn(userInput) {
            if (userInput == "") {
                  return false;
            } else
            if (topics.indexOf(userInput) === -1) {
                  topics.push(userInput);
                  $("#butt-container").empty();
                  createBtns();
            }
      }

      function giphyImgs(userInput) {
            $.ajax({
                  url: "https://api.giphy.com/v1/gifs/search?api_key=hI2EPXn3R4h849UjyPwLQ5Q7ZwPFvDI9&q=" + userInput + "&limit=10&offset=0&rating=pg-13&lang=en",
                  method: "GET"
            }).then(function (response) {
                  response.data.forEach(function (element) {
                        var newDiv = $("<div>");
                        newDiv.addClass("gif-box");
                        newDiv.addClass("grid-img");
                        var newGif = $("<img src = " + element.images.fixed_height_still.url + ">");
                        newGif.addClass("gif");
                        newGif.attr('state', 'still');
                        newGif.attr('data-still', element.images.fixed_height_still.url);
                        newGif.attr("data-animate", element.images.fixed_height.url);
                        newDiv.append(newGif);
                        $("#img-container").append(newDiv);

                        newDiv.append("<figcaption>Rating: " + element.rating.toUpperCase() + "</figcaption>");

                        console.log("Rating: " + element.rating.toUpperCase());
                        console.log("IMG URL : " + JSON.stringify(element.images.fixed_height_still));

                  });


                  $(".gif").click(function () {
                        if ($(this).attr("state") === "still") {
                              $(this).attr("state", "animated");
                              $(this).attr("src", $(this).attr("data-animate"));
                        } else {
                              $(this).attr("state", "still");
                              $(this).attr("src", $(this).attr("data-still"));
                        }
                  });
            });
      }





      createBtns();
      $("#submit").click(function () {
            event.preventDefault();
            addBtn($("#btn-text").val().trim());
            $("#btn-text").val("");
      });
});