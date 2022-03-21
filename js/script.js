document.addEventListener('DOMContentLoaded', function () {
  const content = document.getElementById('content');
  const selectElement = document.querySelector('.selection')






  selectElement.addEventListener('change', function (event) {
    console.log(event.target.value);
    let category = event.target.value;
    content.innerHTML = '';

    $.ajax({
      method: 'GET',
      url: `https://api.nytimes.com/svc/topstories/v2/${category}.json?api-key=ZUL0U1pMKIvzUnE4phUsABtv44ByJAKF`
    })

      .done(
        function (data) {
          // get data from Ajax call
          console.log('data', data);



          function checkForImage(item) {
            if (item.multimedia && item.multimedia.length && item.multimedia[0].url) {
              return true;
            } else {
              return false;
            }
          }

          //Only get articles with image
          //Only get 12 max articles
          const articlesWithImages = data.results
            .filter(checkForImage)
            .slice(0, 12);

          console.log('articlesWithImages', articlesWithImages)


          //build thumbnails
          for (let i = 0; i < articlesWithImages.length; i++) {
            //console.log("for loop")


            const link = document.createElement('a');
            link.href = articlesWithImages[i].url;
            link.classList.add('grid-item')

            const thumb = document.createElement('div');
            // a string with url('{variable name}')
            thumb.style.backgroundImage = `url(${articlesWithImages[i].multimedia[0].url})`;
            thumb.classList.add('image');


            const text = document.createElement('p');
            text.innerText = articlesWithImages[i].abstract;
            text.classList.add('ptext')

            thumb.append(text);
            link.append(thumb);

            // text.classList.add("content-container");
            content.append(link);


          }





          // // //adding classes to elements
          // const linkClass = document.getElementById('content');
          // linkClass.classList.add('news');






          // item.classList.add("content-container");
          // document.getElementById('content').appendChild(item, text, link);





        }); // end ajax
  });   // end addevent listener change
});   // end on DOM

