'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className) {
    console.log(data);
    let langs = '';
    Object.keys(data.languages).forEach(key => {
      langs += data.languages[key] + ' ';
    });
  
    let currs = data.currencies[Object.keys(data.currencies)[0]];
    let curr = '';
    Object.keys(currs).forEach(key => {
      curr += currs[key] + ' ';
    });
    const maps = data.maps.googleMaps;
    console.log(maps);
  
    const html = `
        <article class="country ${className}">
            <img class="country__img" src="${data.flags.svg}" />
            <div class="country__data">
                <h3 class="country__name">${data.name.common}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(
                  +data.population / 1000000
                ).toFixed(1)} M</p>
                <p class="country__row"><span>🗣️</span>${langs}</p>
                <p class="country__row"><span>💰</span>${curr}</p>
                <p class="country__row"><span>🗺️</span><a class="maps" href="${maps}">Click for Google Maps</a> </p>
            </div>
        </article>
            `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  };  

const renderError = function(msg){
    console.error(msg);
    countriesContainer.insertAdjacentText('beforeend', msg);
    countriesContainer.style.opacity = 1;
}


///////////////////////////////////////

// const _getCountriesData = function (country) {
//   const request = new XMLHttpRequest();

//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();
//   // console.log(request.responseText);

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     let langs = ''
//     Object.keys(data.languages).forEach(key => {
//         langs += (data.languages[key])+ ' '
//       });

//     let currs = data.currencies[Object.keys(data.currencies)[0]]
//     let curr = ''
//     Object.keys(currs).forEach(key => {

//         curr += (currs[key])+ ' '
//       });

//     const html = `
//     <article class="country">
//         <img class="country__img" src="${data.flags.svg}" />
//         <div class="country__data">
//             <h3 class="country__name">${data.name.common}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(
//               +data.population / 1000000
//             ).toFixed(1)}</p>
//             <p class="country__row"><span>🗣️</span>${langs}</p>
//             <p class="country__row"><span>💰</span>${
//               curr
//             }</p>
//         </div>
//     </article>
//         `;
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };

// _getCountriesData('morocco')
// _getCountriesData('spain')
// _getCountriesData('portugal')


/*
const _getCountryAndNeighbour = function (country) {

    // AJAX call
    const request = new XMLHttpRequest();
  
    request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
    request.send();
    // console.log(request.responseText);
  
    request.addEventListener('load', function () {
      const [data] = JSON.parse(this.responseText);
      console.log(data);
        // call county 1
    rederCountry(data)

    // call neighbour county
    const [neighbour] = data.borders
    console.log(neighbour);

    if(!neighbour) return;
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();
    request2.addEventListener('load', function () {
        const [data2] = JSON.parse(this.responseText)
        console.log(data2);
        rederCountry(data2, 'neighbour')
        
    })
      
    });
  };

_getCountryAndNeighbour('morocco')

setTimeout(() => {
     console.log();
})
*/

// const request = fetch('https://restcountries.com/v3.1/name/tunisia');

// console.log(request);

// const _getCountryData = function(country){
//     fetch(`https://restcountries.com/v3.1/name/${country}`).then(function(response){
//         console.log(response);
//      return response.json()
//     }).then(function(data){
//         console.log(data);
//         renderCountry(data[0])
//     })
// }



// const request = fetch('https://restcountries.com/v3.1/name/tunisia');

// const _getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(
//       response => response.json()
//     )

//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];

//       if (!neighbour) return;

//       console.log(neighbour);
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then(response => response.json())

//     .then(data => {
//       renderCountry(data[0], 'neighbour');
//     })
//     .catch(err => {
//         console.error(`${err} 💣`)
//         renderError(`something went wrong ${err.message}. Try again later`)
// }
//     )
// };

// btn.addEventListener('click', function () {
//   _getCountryData('usa');
// });



// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/
// const whereAmI = function(lat, lng){
//     fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`).then(response => response.json()).then(data => {
//         console.log(data)
//         console.log(`youre in ${data.city}, ${data.country}`);
//         renderCountry('morocco', 'neighbour')

//     }).catch(err => console.error('hahahahah'))
// }

// whereAmI(19.037,72.873)

// const lotteryPromise = new Promise(function(resolve, reject) {
//     if(Math.random >= 0.5) {
//         resolve('You win')
//     }
//     else{reject(new error('you lost'))}
// })

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err ))

// const imgContainer = document.querySelector('.images')

// const createImg = function(imgPath) {
//   return new Promise(function(resolve,reject) {
//     const img = document.createElement('img');
//     img.src = imgPath;
//     img.addEventListener('load', function(){
//       imgContainer.append(img);
//       resolve(img)
//     })
//     img.addEventListener('error', function(){
//       reject(new Error('img not found'))
//     })
//   })
// }

// createImg('img/img-1.jpg').then(img => {console.log('image 1 loaded');}).catch(err =>console.error(err))

const whereAmI = async function(country){
    const res  = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    const [data] = await res.json();
    console.log(data);
    renderCountry(data)

}
whereAmI('portugal', 'neighbour')
whereAmI('morocco')
whereAmI('spain')

console.log('hello async');