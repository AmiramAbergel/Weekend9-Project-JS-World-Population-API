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
                console.dir(continents.Africa.contentContainer);
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
                btnContainer.replaceChildren();
                break;
        }
    } else if (input.matches(".countryBtn")) {
        console.dir(input.parentElement);
        let matchName = input.parentElement.className;
        let structName = matchName.charAt(0).toUpperCase() + matchName.slice(1);
        console.log(structName);
        const matchCountry = continents[structName].totalData.find(
            (element) => {
                return element[input.textContent];
            }
        );

        if (matchCountry) {
            preparingForChart(matchCountry.cities);
        }
    } else {
    }
};

export function preparingForChart(obj) {
    let dataArr = [];
    let labelsArr = [];
    if (obj.countryNumPlot) {
        dataArr = obj.countryNumPlot;
        labelsArr = obj.countryNamePlot;
    } else {
        dataArr = obj.cityNumPlot;
        labelsArr = obj.cityNamePlot;
    }

    chartIt(dataArr, labelsArr);
}

export const chartIt = async (dataPlot = [], xLabels = []) => {
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
        options: {
            animation: {
                onComplete: function (animation) {
                    this.options.animation.onComplete = null;
                    let firstSet = animation.chart.config.data.datasets[0].data,
                        dataSum = firstSet.reduce(
                            (accumulator, currentValue) =>
                                accumulator + currentValue,
                            0
                        );

                    if (typeof firstSet !== "object" || dataSum === 0) {
                        document.getElementById("no-data").style.display =
                            "block";
                        document.getElementById("chart").style.display = "none";
                    } else {
                        document.getElementById("no-data").style.display =
                            "none";
                        document.getElementById("chart").style.display =
                            "block";
                    }
                },
            },
        },
    };

    myChart = new Chart(document.getElementById("chart"), config);
};
