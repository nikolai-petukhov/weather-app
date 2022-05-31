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

inputCity.addEventListener('keypress', (event) => {
    fetch(`https://spott.p.rapidapi.com/places/autocomplete?q=${inputCity.value}`, options)
        .then(response => response.json())
        .then(response => {
            const data = JSON.parse(JSON.stringify(response));
            citySearchResultList.innerHTML = '';
            data.forEach(city => {
                const citySearchResultListItem = document.createElement('li');
                citySearchResultListItem.classList.add('city-search-result-list-item');
                citySearchResultListItem.textContent = city.name;
                citySearchResultListItem.addEventListener('click', () => console.log(city.name));
                citySearchResultList.append(citySearchResultListItem);
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
                    const citySearchResultListItem = document.createElement('li');
                    citySearchResultListItem.classList.add('city-search-result-list-item');
                    citySearchResultListItem.textContent = city.name;
                    citySearchResultListItem.addEventListener('click', () => console.log(city.name));
                    citySearchResultList.append(citySearchResultListItem);
                });
            })
            .catch(err => console.error(err));
    }
    if (!inputCity.value) {
        citySearchResultList.innerHTML = '';
    }
});