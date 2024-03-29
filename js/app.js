(function () {
    // Initialize the app
    // fetches API data and stores in localstorage.
    // Program will work towards the localstorage, the API will be updated in the background once per hour.
    fetchData.init();

    // CACHED DOM
    const fromCurrencyInput = document.querySelector("#currencyFrom");
    const toCurrencyInput = document.querySelector("#currencyTo");
    const dropdownList = document.querySelector("#countries");
    const confirmButton = document.querySelector("#calculate");
    const amountFrom = document.querySelector("#amountFrom");
    const resultField = document.querySelector("#amountTo");
    const flagFrom = document.querySelector("#flagFrom");
    const flagTo = document.querySelector("#flagTo");
    const clearButton = document.querySelector("#clear");

    // Private variables that holds current selected ID's
    // changes values through the event listeners.
    let selectedFrom;
    let selectedTo;

    // EVENTLISTENERS
    fromCurrencyInput.addEventListener("change", storeSelectedId);
    toCurrencyInput.addEventListener("change", storeSelectedId);
    confirmButton.addEventListener("click", doCalculation);
    clearButton.addEventListener("click", clearApp);

    // Fills the search input's dropdown list with values from all countries
    // Data is fetched from localstorage
    (async function fillDropDown() {
        const { rates, base } = fetchData.getCountries();
        for (var prop in rates) {
            let { currencies } = await fetchData.getCountryName(prop);
            let [{name}] = currencies;
            let temp = `
            <option value="${name}" data-id="${prop}" data-alph="${prop.substr(0, 2)}"></option>`
            dropdownList.innerHTML += temp;
        }
        // API fetches base values as EUR so has to add EUR manually
        let eu =
        `<option value="Euro" data-id="${base}" data-alph="${base.substr(0, 2)}"></option>`
        dropdownList.innerHTML += eu;
    })();

    // Gets the selected value-id from the datalist, stores it in the private local variable.
    function storeSelectedId() {
        if(this.value === ""){
            if(this.getAttribute("id") === "currencyFrom"){
                flagFrom.innerHTML = "";
            } else{
                flagTo.innerHTML = "";
            }            
            return;
        }
        let val = this.value;
        let id = document.querySelector(`#countries option[value='${val}']`).getAttribute("data-id");
        let flagId = document.querySelector(`#countries option[value='${val}']`).getAttribute("data-alph");
        if (this.getAttribute("id") === "currencyFrom") {
            selectedFrom = id;
            let img = `<img src="https://www.countryflags.io/${flagId}/flat/24.png"/>`
            flagFrom.innerHTML = img;
        } else {
            selectedTo = id;
            let img = `<img src="https://www.countryflags.io/${flagId}/flat/24.png"/>`
            flagTo.innerHTML = img;
        }
    }

    function clearApp(){
        fromCurrencyInput.value = "";
        toCurrencyInput.value = "";
        flagFrom.innerHTML = "";
        flagTo.innerHTML = "";
        amountFrom.value = "";
        resultField.value = "";
    }


    // Get current changevalues for selected countries
    async function doCalculation() {
        const { rates } = await fetchData.fetchCurrency(selectedFrom, selectedTo);
        const valueFrom = amountFrom.value;
        let amount = valueFrom * rates[selectedTo];
        resultField.value = amount;
    }


})();


