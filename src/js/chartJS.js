import { getData } from "./getData.js";
import { continents } from "./arrangeData.js";
import { btnContainer } from "../app.js";
export let myChart = "";

export const plotContinent = (event) => {
    const input = event.target;
    myChart.destroy();
    if (input.matches(".btn")) {
        switch (input.textContent) {
            case "Africa":
                btnContainer.replaceChildren();
                btnContainer.appendChild(continents.Africa.contentContainer);
                preparingForChart(continents.Africa);
                break;
            case "Americas":
                btnContainer.replaceChildren();
                btnContainer.appendChild(continents.Americas.contentContainer);
                preparingForChart(continents.Americas);
                break;
            case "Asia":
                btnContainer.replaceChildren();
                btnContainer.appendChild(continents.Asia.contentContainer);
                preparingForChart(continents.Asia);
                break;
            case "Europe":
                btnContainer.replaceChildren();
                btnContainer.appendChild(continents.Europe.contentContainer);
                preparingForChart(continents.Europe);
                break;
            case "Oceania":
                btnContainer.replaceChildren();
                btnContainer.appendChild(continents.Oceania.contentContainer);
                preparingForChart(continents.Oceania);
                break;
            default:
                break;
        }
    } else if (input.matches(".btnCity")) {
    }
};

export function preparingForChart(obj) {
    let dataArr = [];
    let labelsArr = [];
    if (obj.countryNumPlot) {
        dataArr = obj.countryNumPlot;
        labelsArr = obj.countryNamePlot;
    } else {
        dataArr = obj.countryNumPlot;
        labelsArr = obj.countryNamePlot;
    }

    chartIt(dataArr, labelsArr);
}

export const chartIt = async (dataPlot, xLabels) => {
    await getData();
    const yPopNum = [];
    const data = {
        labels: xLabels,
        datasets: [
            {
                label: "Population Number",
                backgroundColor: "rgb(255, 99, 132,0.5)",
                borderColor: "rgb(255, 99, 132,0.5)",
                data: dataPlot,
            },
        ],
    };
    const config = {
        type: "line",
        fill: false,
        data: data,
        options: {},
    };

    myChart = new Chart(document.getElementById("chart"), config);
};
