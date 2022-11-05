import { plotData as plotData } from "./js/plotData.js";
import { plotContinent, chartIt } from "./js/chartJS.js";

export const continentContainer = document.querySelector(".btnContainer");
export const africaBtn = document.querySelector(".africa");
export const americasBtn = document.querySelector(".americas");
export const asiaBtn = document.querySelector(".asia");
export const europeBtn = document.querySelector(".europe");
export const oceaniaBtn = document.querySelector(".oceania");

africaBtn.addEventListener("click", plotContinent);
americasBtn.addEventListener("click", plotContinent);
asiaBtn.addEventListener("click", plotContinent);
europeBtn.addEventListener("click", plotContinent);
oceaniaBtn.addEventListener("click", plotContinent);
export const btnContainer = document.querySelector(".cBtnContainer");

const main = async () => {
    await chartIt();
};
main();
