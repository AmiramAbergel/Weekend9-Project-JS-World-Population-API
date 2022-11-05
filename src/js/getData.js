import { fetchData } from "./fetchData.js";
import {
    continents,
    traverseCityData,
    traverseCountryData,
} from "./arrangeData.js";

export const getData = async () => {
    const citiesURL = `https://countriesnow.space/api/v0.1/countries/population/cities`;
    const countryURL = `https://restcountries.com/v3.1/all`;
    const countryCodeURL = `https://countriesnow.space/api/v0.1/countries/iso`;
    const citiesResponse = fetchData(citiesURL);
    const countryResponse = fetchData(countryURL);
    const countryCodeResponse = fetchData(countryCodeURL);
    const results2Groups = await Promise.all([
        citiesResponse,
        countryResponse,
        countryCodeResponse,
    ]);
    sessionStorage.setItem("cities", JSON.stringify(results2Groups[0]));
    sessionStorage.setItem("country", JSON.stringify(results2Groups[1]));
    sessionStorage.setItem("countryCode", JSON.stringify(results2Groups[2]));
    const citiesText = sessionStorage.getItem("cities");
    const countryText = sessionStorage.getItem("country");
    const countryCodeText = sessionStorage.getItem("countryCode");
    const citiesData = JSON.parse(citiesText);
    const countryData = JSON.parse(countryText);
    const countryCodeData = JSON.parse(countryCodeText);
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
