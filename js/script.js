document.addEventListener('DOMContentLoaded', function () {
  const getNews = document.getElementById('get-topstories');
  const selectElement = document.querySelector('.selection');

  selectElement.addEventListener('change', function (event) {
    //const news = document.querySelector('.news');
    console.log(event.target.value);
    let category = event.target.value;
    $.ajax({
      method: 'GET',
      url: 'https://api.nytimes.com/svc/topstories/v2/' + category + '.json?api-key=ZUL0U1pMKIvzUnE4phUsABtv44ByJAKF'
    })
      .done(function (data) {
        console.log(data);

        const item = document.createElement('div');
        item.style.backgroundImage = `url(${data.results[0].multimedia[0].url})`;
        item.classList.add("content-container")
        document.getElementById('content').appendChild(item);


      })
    data.forEach(element => {

    });

  }




  });


});

