// IMC DATA
const data = [
    {
        min: 0,
        max: 18.4,
        classification: "Menor que 18,5",
        info: "Magreza",
        obesity: "0",
    },
    {


        min: 18.5,
        max: 24.9,
        classification: "Entre 18,5 e 24,9",
        info: "Normal",
        obesity: "0",
    },
    {
        min: 25,
        max: 29.9,
        classification: "Entre 25,0 e 29,9",
        info: "Sobrepeso",
        obesity: "I",
    },
    {
        min: 30,
        max: 39.9,
        classification: "Entre 30,0 e 39,9",
        info: "Obesidade",
        obesity: "II",
    },
    {
        min: 40,
        max: 99,
        classification: "Maior que 40,0",
        info: "Obesidade grave",
        obesity: "III",
    },
];

// Seleção de elementos
const imcTable = document.querySelector("#imc-table");

const heightInput = document.querySelector("#height");
const weightInput = document.querySelector("#weight");
const ageinput = document.querySelector("#age")
const nameinput = document.querySelector("#name")
const calcBtn = document.querySelector("#calc-btn");
const clearBtn = document.querySelector("#clear-btn");

const calcContainer = document.querySelector("#calc-container");
const resultContainer = document.querySelector("#result-container");

const imcNumber = document.querySelector("#imc-number span");
const imcInfo = document.querySelector("#imc-info span");
const ageinfo = document.querySelector("#age-info span")
const nameinfo = document.querySelector("#name-info span")

const backBtn = document.querySelector("#back-btn");

// Funções
function createTable(data) {
    data.forEach((item) => {
        const div = document.createElement("div");
        div.classList.add("table-data");

    });
}

function validDigits(text) {
    return text.replace(/[^0-9,]/g, "");
}

function calcImc(height, weight) {
    const imc = (weight / (height * height)).toFixed(1);
    return imc;
}

function cleanInputs() {
    heightInput.value = "";
    weightInput.value = "";
    ageinput.value = "";
    nameinput.value = "";
    imcNumber.className = "";
    imcInfo.className = "";
}

function showOrHideResults() {
    calcContainer.classList.toggle("hide");
    resultContainer.classList.toggle("hide");
}

// Init
createTable(data);

// Eventos
[heightInput, weightInput, ageinput].forEach((el) => {
    el.addEventListener("input", (e) => {
        const updatedValue = validDigits(e.target.value);

        e.target.value = updatedValue;
    });
});

calcBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const weight = +weightInput.value.replace(",", ".");
    const height = +heightInput.value.replace(",", ".");


    console.log(weight, height);

    if (!weight || !height) return;

    const imc = calcImc(height, weight);
    let info;

    data.forEach((item) => {
        if (imc >= item.min && imc <= item.max) {
            info = item.info;
        }
    });

    if (!info) return;

    imcNumber.innerText = imc;
    imcInfo.innerText = info;
    ageinfo.innerText = ageinput.value; //revisar
    nameinfo.innerText = nameinput.value; //revisar

    switch (info) {
        case "Magreza":
            imcNumber.classList.add("low");
            imcInfo.classList.add("low");
            break;
        case "Normal":
            imcNumber.classList.add("good");
            imcInfo.classList.add("good");
            break;
        case "Sobrepeso":
            imcNumber.classList.add("low");
            imcInfo.classList.add("low");
            break;
        case "Obesidade":
            imcNumber.classList.add("medium");
            imcInfo.classList.add("medium");
            break;
        case "Obesidade grave":
            imcNumber.classList.add("high");
            imcInfo.classList.add("high");
            break;
    }

    showOrHideResults();
});

clearBtn.addEventListener("click", (e) => {
    e.preventDefault();

    cleanInputs();
});

backBtn.addEventListener("click", (e) => {
    cleanInputs();
    showOrHideResults();
});