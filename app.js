const inputCity = document.getElementById("input-city");
const citySearchResultList = document.getElementById("city-search-result-list");
const citySearchResultListItems = document.querySelectorAll('city-search-result-list-item');
const cityName = document.getElementById('city');


const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'spott.p.rapidapi.com',
        'X-RapidAPI-Key': '81a70c67e7mshc44b5ef854ad79cp16ff8ajsn5ae74e797d14'
    }
};
const requestString = `https://spott.p.rapidapi.com/places/autocomplete?q=${inputCity.value}`;

inputCity.addEventListener('keypress', (event) => {
    fetch(`https://spott.p.rapidapi.com/places/autocomplete?q=${inputCity.value}`, options)
        .then(response => response.json())
        .then(response => {
            const data = JSON.parse(JSON.stringify(response));
            citySearchResultList.innerHTML = '';
            data.forEach(city => {
                citySearchResultList.insertAdjacentHTML('beforeend',
                `
                    <li class="city-search-result-list-item">${city.name}</i>
                `);
            });
        })
        .catch(err => console.error(err));
});

inputCity.addEventListener('keydown', (event) => {
    if (inputCity.value !== '' && event.key === 'Backspace') {
        fetch(`https://spott.p.rapidapi.com/places/autocomplete?q=${inputCity.value}`, options)
            .then(response => response.json())
            .then(response => {
                const data = JSON.parse(JSON.stringify(response));
                citySearchResultList.innerHTML = '';
                data.forEach(city => {
                    citySearchResultList.insertAdjacentHTML('beforeend',
                    `
                        <li class="city-search-result-list-item">${city.name}</li>
                    `);
                });
            })
            .catch(err => console.error(err));
    }
    if (!inputCity.value) {
        citySearchResultList.innerHTML = '';
    }
});

// citySearchResultListItems.forEach(resultItem => {
//     resultItem.addEventListener('click', (event) => {
//             console.log('sds');
//         //cityName.innerText = resultItem.value;
        
//     });
// });