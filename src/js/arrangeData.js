export const continents = {
    Africa: [],
    Americas: [],
    Asia: [],
    Europe: [],
    Oceania: [],
    Antarctic: [],
};

const constructCountryFromData = (countryObj) => {
    const country = {
        [countryObj.name.official]: {
            countryName: countryObj.name.official,
            countryPopulation: countryObj.population,
        },
        cities: [],
    };
    return country;
};

const constructCityFromData = (cityObj) => {
    let res = "Unknown";
    if (cityObj.populationCounts) {
        let length = cityObj.populationCounts.length;
        res = cityObj.populationCounts[length - 1].value;
    }
    const city = {
        country: cityObj.country,
        cityPopulation: res,
        [cityObj.city]: {
            cityName: cityObj.city,
            cityPopulation: res,
        },
    };
    return city;
};
export const traverseCityData = (citiesArr, continentsObj) => {
    const xs = [];
    const ys = [];
    for (let i = 0; i < citiesArr.length; i++) {
        const cityObj = citiesArr[i];
        let city = constructCityFromData(cityObj);
        xs.push(city.cityPopulation);
        for (const key in continentsObj) {
            let con = continentsObj[key];
            const matchCountry = con.find((element) => {
                return element[city.country];
            });
            if (matchCountry) {
                matchCountry.cities.push(city);
            }
        }
    }
    return { xs };
};

export const traverseCountryData = (continentsObj, countriesObj) => {
    const xs = [];
    const keys = Object.keys(countriesObj);
    keys.forEach((element) => {
        let country = constructCountryFromData(countriesObj[element]);
        let f = continentsObj[countriesObj[element].region];
        f.push(country);
    });
    return { xs };
};