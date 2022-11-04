import { getData } from "./getData";

export const chartIt = async () => {
    const dataPlot = await getData();
    const xLabels = dataPlot;
    const yPopNum = [];
    const data = {
        labels: xLabels,
        datasets: [
            {
                label: "Population Number",
                backgroundColor: "rgb(255, 99, 132,0.5)",
                borderColor: "rgb(255, 99, 132,0.5)",
                data: yPopNum,
            },
        ],
    };
    const config = {
        type: "line",
        fill: false,
        data: data,
        options: {},
    };

    const myChart = new Chart(document.getElementById("chart"), config);
};
