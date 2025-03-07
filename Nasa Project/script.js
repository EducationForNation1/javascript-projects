const imagesContainer = document.querySelector('.images-container');
const saveConfirmed = document.querySelector('.save-confirmed')
const loader = document.querySelector('loader');
const resultsNav = document.getElementById('resultsNav');
const favoritesNav = document.getElementById('favoritesNav')
// NASA API
const  count = 10
const apiKey = 'DEMO_KEY';
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultArray = []


function showContent(page){
    window.scrollTo({top:0, behavior:'instant'});
    loader.classList.add('hidden');
    if(page==='results'){
        resultsNav.classList.remove('hidden');
        favoritesNav.classList.add('hidden')
    }
}

function createDOMNodes(page){
    // Load ResultArray or Favorites
    const currentArray = page==='results'?resultArray: Object.values(favorites)
    currentArray.forEach((result)=>{
        // card Container
        const card = document.createElement('div');
        card.classList.add('card')
        // Link
        const link = document.createElement('a');
        link.href = result.hdurl;
        link.title = 'view Full Image';
        link.target = '_blank';

        // image
        const image = document.createElement('img');
        image.src = result.url;
        image.alt = 'Nasa Picture of the Day';
        image.loading = 'lazy';
        image.classList.add('card-img-top');

        // card body
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        // card Title
        const cardTitle = document.createElement('h4');
        cardTitle.classList.add('card-title');

        // Save Text
        const saveText = document.createElement('p');
        saveText.classList.add('clickable');
        if(page==='results'){
            saveText.textContent = 'Add To Favorites';
            saveText.setAttribute('onclick', `saveFavorite('${result.url}')`);
        }else{
            saveText.textContent = 'Remove Favorites';
            saveText.setAttribute('onclick', `removeFavorite('${result.url}')`);
        }
        // card text
        const cardText =  document.createElement('p');
        cardText.textContent = result.explanation;

        // Footer Container
        const footer = document.createElement('small');
        footer.classList.add('text-muted');

        // Date
        const date = document.createElement('strong');
        date.textContent = result.date;

        // copyright
        const copyrightResult = result.copyright === 'undefined' ? '' : result.copyright;
        const copyright = document.createElement('span');
        copyright.textContent = `${copyrightResult}`;

        // append
        footer.append(date,copyright);
        cardBody.append(cardTitle,saveText,cardText,footer)
        link.appendChild(image)
        card.append(link, cardBody);
        imagesContainer.appendChild(card);
    })
}

function updateDOM(page){
    // Get Favorites from localStorage
    if(localStorage.getItem('nasaFavorites')){
        favorites = JSON.parse(localStorage.getItem('navaFavorites'));
    }

    // Reset DOM , Create DOM Nodes show Content
    imagesContainer.textContent = '';
    createDOMNodes(page);
    // showContent(page);
}

// Get 10 images from NASA api
async function getNasaPictures(){
  try {
    const response =  await fetch(apiUrl);
    resultArray = await response.json()
    console.log(resultArray)
    updateDOM('results');
  } catch (error) {
    console.log(error.message)
  }

}

// Add result to ravorites
function saveFavorite(itemUrl){
    // Loop Through results array to select Favorite
    resultArray.forEach((item)=>{
        if(item.url.includes(itemUrl) && !favorites[itemUrl]){
            favorites[itemUrl] = item;
            // Show save Confimation for 2 seconds
            saveConfirmed.hidden = false;
            setTimeout(()=>{
                saveConfirmed.hidden = true;
            },2000)
            // set Favorites in localStorage
            localStorage.setItem('nasaFavorites', JSON.stringify(favorites))
        }
    })
}

// Remove Item from Favorites
function removeFavorite(itemUrl){
    if(favorites[itemUrl]){
        delete favorites[itemUrl];
        // set favorites in localstorage
        localStorage.setItem('nasaFavorites',JSON.stringify(favorites))
        updateDOM('favorites')
    }
}

// On Load
getNasaPictures()