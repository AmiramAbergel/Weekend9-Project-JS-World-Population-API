import { fetchData } from "./fetchData.js";
import {
    continents,
    traverseCityData,
    traverseCountryData,
} from "./arrangeData.js";

export const getData = async () => {
    const citiesURL = `https://countriesnow.space/api/v0.1/countries/population/cities`;
    const countryURL = `https://restcountries.com/v3.1/all`;
    const citiesResponse = fetchData(citiesURL);
    const countryResponse = fetchData(countryURL);
    const results2Groups = await Promise.all([citiesResponse, countryResponse]);
    sessionStorage.setItem("cities", JSON.stringify(results2Groups[0]));
    sessionStorage.setItem("country", JSON.stringify(results2Groups[1]));
    const citiesText = sessionStorage.getItem("cities");
    const countryText = sessionStorage.getItem("country");
    const citiesData = JSON.parse(citiesText);
    const countryData = JSON.parse(countryText);

    traverseCountryData(continents, countryData);
    traverseCityData(citiesData.data, continents);
    console.log(continents);

    //
    // const mergeData = results2Groups[0].concat(results2Groups[1]); // arr of objs
    // console.log(mergeData);
    // const users = await extractUserByID(mergeData);
    // console.log(users);
    // const arrangedUsers = arrangeData(users); //Not mandatory(just for practice)
    // return arrangedUsers;
};
