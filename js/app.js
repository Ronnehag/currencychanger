

(function () {
    // Initialize the app, starts the interval timer, 
    // fetches API data and stores in localstorage.
    // Program will work towards the localstorage, the API will be updated in the background once / hour.
    fetchData.init();

    // CACHED DOM
    const fromCurrencyInput = document.querySelector("#currencyFrom");
    const toCurrencyInput = document.querySelector("#currencyTo");
    const dropdownList = document.querySelector("#countries");

    let selectedFrom;
    let selectedTo;

    // EVENTLISTENERS
    fromCurrencyInput.addEventListener("change", calculateValues);

    // Fills the search input's dropdown list with values from all countries
    // Data is fetched from localstorage
    (function fillDropDown() {
        const { currencies } = fetchData.getCountries();
        for (var prop in currencies) {
            let temp = `
            <option value="${currencies[prop]}" data-id="${prop}"></option>`
            dropdownList.innerHTML += temp;
        }
    })();

    // Gets the selected value-id from the datalist;
    function calculateValues(){
        let val = this.value;
        let id = document.querySelector(`#countries option[value='${val}']`).getAttribute("data-id");
        if(this.getAttribute("id") === "currencyFrom"){
            selectedFrom = id;
        } else{
            selectedTo = id;
        }
    }


})();


