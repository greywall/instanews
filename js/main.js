$(function() {
  $("#article-select").on("change", function() {
    $(".loader-container-appear").show();
    console.log("changed");
    const selected = $(this).val();
    if (selected === "") {
      $(".loader-container-appear").hide();
      $("#article-content").html("");

      return;
    }

    loadArticles(selected);
  });


  function loadArticles(selected) {
    $.ajax({
      method: "get",
      url: `https://api.nytimes.com/svc/topstories/v2/${selected}.json?api-key=SuyqPBLEaZeA2ccThYAa6TIJ5jA35kOj`
    })
      .done(function(data) {
        console.log(data);

        const results = data.results;

        const filteredArray = results
          .filter(function(article) {
            return article.multimedia[4] !== undefined;
          })
          .slice(0, 12);

        console.log(filteredArray);


        $("#article-content").html("");

        $.each(filteredArray, function(index, value) {
          // console.log(value.name);

          const abstract = value.abstract;

          console.log(value.multimedia[4]);
          $("#article-content").append(
            `<a class="article-link" href="${value.short_url}">
            <article class="grid-cell" id="grid-cell-${index}" style="background: url(${
              value.multimedia[4].url
            }) center/cover">
                      <div class="article-title-container"> 
                      <p class="article-title-text">${value.title}</p>
                  </div> 
                    <div class="article article-div"> 
                       <p class="article-abstract">${abstract}</p>
                    </div> 
                   </article>
                   </a>`
          );
        });
      })
      .fail(function() {
        console.log("something is really messed up");
        $("#article-content").html("");
        $("#article-content").append(
          `<p>We were unable to get information at this time. Please check back later.</p>`
        );
      })
      .always(function() {
        $(".loader-container-appear").hide();
        console.log("This will always appear after a selection change.");
      });
  }

  $('.article-link').on('click', function(){
    $('.article-title-text').css.hide();
 });





}); //End of Document Ready
