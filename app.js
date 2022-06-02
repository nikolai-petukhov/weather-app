const inputCity = document.getElementById("input-city");
const citySearchResultList = document.getElementById("city-search-result-list");
const cityName = document.getElementById('city');

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'spott.p.rapidapi.com',
        'X-RapidAPI-Key': '81a70c67e7mshc44b5ef854ad79cp16ff8ajsn5ae74e797d14'
    }
};
const requestString = `https://spott.p.rapidapi.com/places/autocomplete?q=${inputCity.value}`;

async function citiesAPIRequest(city) {
    try {
        let response = await fetch(`https://spott.p.rapidapi.com/places/autocomplete?q=${city}`, options);
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

function createCitySearchResultListItem(cityName) {
    const citySearchResultListItem = document.createElement('li');
    citySearchResultListItem.classList.add('city-search-result-list-item');
    citySearchResultListItem.textContent = cityName;
    citySearchResultListItem.addEventListener('click', () => console.log(cityName));
    citySearchResultList.append(citySearchResultListItem);
}

inputCity.addEventListener('keypress', () => {
    citiesAPIRequest(inputCity.value).then(data => {
        citySearchResultList.innerHTML = '';
        data.forEach(city => {
            createCitySearchResultListItem(city.name);
        });
    });
});

inputCity.addEventListener('keydown', (event) => {
    if (inputCity.value !== '' && event.key === 'Backspace') {
        citiesAPIRequest(inputCity.value).then(data => {
            citySearchResultList.innerHTML = '';
            data.forEach(city => {
                createCitySearchResultListItem(city.name);
            });
        });
    }
    if (!inputCity.value) {
        citySearchResultList.innerHTML = '';
    }
});