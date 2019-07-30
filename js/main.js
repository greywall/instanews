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

  // }).done(function(data){
  // console.log(data.results);

  //     const results = data.results;
  //     // $.each()
  //     //append your article template
  //     // $.each(results, function(index,value) {
  //     // try template springs <article> <p>${abstract}</p></article>
  //     // })

  // }).fail(function(err){
  //     console.log(err)
  // }).always(function(){
  //     console.log('always runs');

  // });

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

        // const imageArticle = .each(data.results.multimedia[4]).filter(=== "");
        // const results = data.results.slice(0, 12)};

        // const results =  filter(data.results.multimedia[4] = ).data.results.slice(0, 12)};

        // if (data.results.multimedia[4] != "") {
        //   const results = data.results.slice(0, 12);
        // }

        $("#article-content").html("");

        $.each(filteredArray, function(index, value) {
          // console.log(value.name);

          const abstract = value.abstract;

          console.log(value.multimedia[4]);
          $("#article-content").append(
            `<li class="article-li">
                <a href="${value.short_url}">
                <div class="grid-cell" id="grid-cell-${index}" style="background: linear-gradient(rgba(0,0,0,0.0), rgba(0,0,0,0.0)), url(${
              value.multimedia[4].url
            }) center/cover">
                   <div class="article-div">  
                    <article class="article"> 
                       <p class="article-abstract">${abstract}</p>
                    </article>  
                    </div>
                   </div>
                   </a>
              </li>`
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
}); //End of Document Ready
