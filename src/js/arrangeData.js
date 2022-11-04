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
        [cityObj.city]: {
            cityName: cityObj.city,
            cityPopulation: res,
        },
    };
    return city;
};
export const traverseCityData = (citiesArr, continentsObj) => {
    //console.dir(citiesArr);
    for (let i = 0; i < citiesArr.length; i++) {
        const cityObj = citiesArr[i];
        let city = constructCityFromData(cityObj);
        //console.dir(city);
        for (const key in continentsObj) {
            let con = continentsObj[key];
            //console.dir(con);
            const matchCountry = con.find((element) => {
                return element[city.country];
            });
            if (matchCountry) {
                matchCountry.cities.push(city);
                //console.dir(matchCountry);
            }
        }
    }
};
export const traverseContinents = (continentsObj) => {
    // const continentsKeys = Object.keys(continentsObj);
    // continentsKeys.forEach(conElement => {
    //     let countriesArr = continentsObj[conElement]
    //     let objKeys = Object.keys(countriesArr);
    //     objKeys.forEach(countryObj => {
    //         countriesArr[countryObj].
    //     });
    // });
};

export const traverseCountryData = (continentsObj, countriesObj) => {
    const keys = Object.keys(countriesObj);
    keys.forEach((element) => {
        let country = constructCountryFromData(countriesObj[element]);
        //console.log(countriesObj[element].region);
        //console.dir(continentsObj[countriesObj[element].region]);
        let check = countriesObj[element].region;
        let f = continentsObj[countriesObj[element].region];
        f.push(country);
        //console.dir(check);
    });
};
