export default [
  {
    name: 'Jean-Claude VD',
    image: 'http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQWMg1IluKS3uwtpWLYNquHCVOd0YtGbn4K5rWhoSULCry5_iGOzRX8QwShQBlQrrkKbcz0R5kKfjIsH8c',
    id: 'jcvd',
    actions: [
      {
        name: '!help',
        response: () => '<p class="card-text">Utilisez !eau pour savoir ma citation la plus connue, et !citation pour avoir une citation aleatoire d\'une personne connue.</>'
      },
      {
        name: '!eau',
        response: () => '<img width="100%" src="https://i.makeagif.com/media/1-15-2019/d9VItH.gif" alt="...">'
      },
      {
        name: '!citation',
        response: async () => {
          const response = await fetch('http://api.quotable.io/random');
          if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
          }
          const brut = await response.json();
          return `
                          <div class="card text-bg-light">
                            <h5 class="card-header">
                             ${brut.author}
                            </h5>
                            <div class="card-body">
                              <h5 class="card-title">${brut.dateAdded.split('-').reverse().join('/')}</h5>
                              <p class="card-text">${brut.content}</p>
                            </div>
                          </div>
                        </div>
              `;
        }
      }
    ]
  },
  {
    name: 'Sylvester  S.',
    image: 'http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQilJPpM2-qLEs4sdSpa0vJrQL25iUF7ZvswRwDdP1omuny8UUpqi78bHlZ9Own1v9Wbx1pZ2_6_7fJlZs',
    id: 'stallone',
    actions: [
      {
        name: '!help',
        response: () => '<p class="card-text">Utilisez !filmographie pour avoir ma filmographie, et !rocky pour voir les details de mon chef d\'oeuvre.</p>'
      },
      {
        name: '!filmographie',
        response: () => '<a class="card-text" href="https://www.imdb.com/name/nm0000230/">Mon IMDb.</a>'
      },
      {
        name: '!rocky',
        response: async () => {
          const response = await fetch('http://www.omdbapi.com/?i=tt0075148&apikey=9d5c9f3e');
          if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
          }
          const brut = await response.json();
          return `
                          <div class="card text-bg-light">
                            <h5 class="card-header">
                             ${brut.Title}
                            </h5>
                            <div class="card-body">
                              <h5 class="card-title">Released : ${brut.Released}</h5>
                              <p class="card-text">Synopsis : ${brut.Plot}</p>
                              <p class="card-text">Note : ${brut.imdbRating}/10</p>
                            </div>
                          </div>
                        </div>
              `;
        }
      }
    ]
  },
  {
    name: 'Keanu R.',
    image: 'https://resize-elle.ladmedia.fr/r/625,,forcex/crop/625,804,center-middle,forcex,ffffff/img/var/plain_site/storage/images/personnalites/keanu-reeves/12541462-3-fre-FR/Keanu-Reeves.jpg',
    id: 'reeves',
    actions: [
      {
        name: '!help',
        response: () => '<p class="card-text">Utilisez !cyberpunk pour voir mon personnage dans le jeu du meme nom, et !cocktail pour voir d\'un bon cocktail !</p>'
      },
      {
        name: '!cyberpunk',
        response: () => '<img width="100%" src="https://screenhubweb.files.wordpress.com/2019/06/keanu-reeves-cyberpunk-2077-screenhub-entertainment.jpg?w=1920&h=768&crop=1" alt="...">'
      },
      {
        name: '!cocktail',
        response: async () => {
          const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
          if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
          }
          const brut = await response.json();
          return `
                          <div class="card text-bg-light">
                            <h5 class="card-header">
                             ${brut.drinks[0].strDrink}
                            </h5>
                            <div class="card-body d-flex flex-row">
                              <p class="card-text d-flex">${brut.drinks[0].strInstructions}</p>
                              <img width="40%" src="${brut.drinks[0].strDrinkThumb}" class="rounded-circle img-thumbnail d-flex" alt="...">
                            </div>
                          </div>
                        </div>
              `;
        }
      }
    ]
  }
];
