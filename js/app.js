

(function () {
    // Initialize the app, starts the interval timer that
    // fetches API data and stores in localstorage.
    // Program will work towards the localstorage, the API will be updated in the background once per hour.
    fetchData.init();

    // CACHED DOM
    const fromCurrencyInput = document.querySelector("#currencyFrom");
    const toCurrencyInput = document.querySelector("#currencyTo");
    const dropdownList = document.querySelector("#countries");
    const confirmButton = document.querySelector("#calculate");

    let selectedFrom;
    let selectedTo;

    // EVENTLISTENERS
    fromCurrencyInput.addEventListener("change", storeSelectedId);
    toCurrencyInput.addEventListener("change", storeSelectedId);
    confirmButton.addEventListener("change", doCalculation);

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

    // Gets the selected value-id from the datalist, stores it in the private local variable.
    function storeSelectedId(){
        let val = this.value;
        let id = document.querySelector(`#countries option[value='${val}']`).getAttribute("data-id");
        if(this.getAttribute("id") === "currencyFrom"){
            selectedFrom = id;
        } else{
            selectedTo = id;
        }
        console.log(selectedFrom, selectedTo);
    }

    function doCalculation(){
        const values = fetchData.getCurrency();
    }


})();


