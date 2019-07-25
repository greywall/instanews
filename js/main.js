$(function() {
  $("#article-select").on("change", function() {
    console.log("changed");
    const selected = $(this).val();
    if (selected === "") return;

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
    }).done(function(data) {
      console.log(data);
      const results = data.results.slice(0, 12);

      $("#article-content").html("");

      $.each(results, function(index, value) {
        // console.log(value.name);

        const abstract = value.abstract;
        const imgUrl = value.multimedia[4];
        console.log(value.multimedia[4]);
        $("#article-content").append(`<li>
                        <a href="#">
                            <div class="grid-cell" id="grid-cell-${index}" style="background-image: url(${value.multimedia[4].url})">
                                <div>  
                                <article> 
                                    <p>${abstract}</p>
                                        </article>  
                                        </div>
                                        </div>
                                        </a>
                                        </li>`);
      });
      // .fail(function () {

      // })
      // .always(function () {

      // })
    });
  }
}); //End of Document Ready
