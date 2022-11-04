const Xlabels = ["January", "February", "March", "April", "May", "June"];

const data = {
    labels: Xlabels,
    datasets: [
        {
            label: "Population Number",
            backgroundColor: "rgb(255, 99, 132,0.5)",
            borderColor: "rgb(255, 99, 132,0.5)",
            data: [2000000, 4000000, , , , ,],
        },
    ],
};

const config = {
    type: "bar",
    data: data,
    options: {},
};

export const myChart = new Chart(document.getElementById("chart"), config);
