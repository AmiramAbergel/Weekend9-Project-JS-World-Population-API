import { plotContinent } from "./chartJS.js";
export const continents = {
    Africa: {
        countryNamePlot: [],
        countryNumPlot: [],
        totalData: [],
        contentContainer: Object.assign(document.createElement("div"), {
            className: "africa",
        }),
    },
    Americas: {
        countryNamePlot: [],
        countryNumPlot: [],
        totalData: [],
        contentContainer: Object.assign(document.createElement("div"), {
            className: "americas",
        }),
    },
    Asia: {
        countryNamePlot: [],
        countryNumPlot: [],
        totalData: [],
        contentContainer: Object.assign(document.createElement("div"), {
            className: "asia",
        }),
    },
    Europe: {
        countryNamePlot: [],
        countryNumPlot: [],
        totalData: [],
        contentContainer: Object.assign(document.createElement("div"), {
            className: "europe",
        }),
    },
    Oceania: {
        countryNamePlot: [],
        countryNumPlot: [],
        totalData: [],
        contentContainer: Object.assign(document.createElement("div"), {
            className: "oceania",
        }),
    },
    Antarctic: {
        countryNamePlot: [],
        countryNumPlot: [],
        totalData: [],
        contentContainer: Object.assign(document.createElement("div"), {
            className: "africa",
        }),
    },
};

const constructCountryFromData = (countryObj) => {
    const country = {
        countryName: countryObj.name.common.replace(
            /[^\P{L}a-z][^a-z]*/giu,
            ""
        ),
        countryPopulation: countryObj.population,
        [countryObj.name.common.replace(/[^\P{L}a-z][^a-z]*/giu, "")]: {
            countryName: countryObj.name.common.replace(
                /[^\P{L}a-z][^a-z]*/giu,
                ""
            ),
            countryPopulation: countryObj.population,
        },
        cities: { cityNamePlot: [], cityNumPlot: [], totalData: [] },
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
        country: cityObj.country.replace(/[^\P{L}a-z][^a-z]*/giu, ""), // Remove special chars
        cityName: cityObj.city,
        cityPopulation: res,
        [cityObj.city]: {
            cityName: cityObj.city,
            cityPopulation: res,
        },
    };
    return city;
};
export const traverseCityData = (citiesArr, continentsObj) => {
    let res = [];

    for (let i = 0; i < citiesArr.length; i++) {
        const cityObj = citiesArr[i];
        let city = constructCityFromData(cityObj);
        let btn = createBtn(city.cityName);
        btn.classList.add("cityBtn");
        res.push(btn);
        for (const key in continentsObj) {
            let con = continentsObj[key].totalData;
            const matchCountry = con.find((element) => {
                return element[city.country];
            });
            if (matchCountry) {
                matchCountry.cities.cityNamePlot.push(city.cityName);
                matchCountry.cities.cityNumPlot.push(city.cityPopulation);
                matchCountry.cities.totalData.push(city);
            }
        }
    }
};

export const traverseCountryData = (continentsObj, countriesObj) => {
    const keys = Object.keys(countriesObj);
    keys.forEach((element) => {
        let country = constructCountryFromData(countriesObj[element]);
        const matchContinent = continentsObj[countriesObj[element].region];
        const countryNameToPlot = matchContinent.countryNamePlot;
        const countryNumToPlot = matchContinent.countryNumPlot;
        const totalToStore = matchContinent.totalData;
        const container = matchContinent.contentContainer;
        countryNameToPlot.push(country.countryName);
        countryNumToPlot.push(country.countryPopulation);
        totalToStore.push(country);
        const btn = createBtn(country.countryName);
        btn.classList.add("countryBtn");
        container.appendChild(btn);
    });
};

export const createBtn = (name) => {
    const cBtn = document.createElement("button");
    cBtn.textContent = name;
    cBtn.addEventListener("click", plotContinent);
    return cBtn;
};
