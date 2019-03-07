

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
    const amountFrom = document.querySelector("#amountFrom");
    const resultField = document.querySelector("#amountTo");

    // Private variables that holds current ID's
    let selectedFrom;
    let selectedTo;

    // EVENTLISTENERS
    fromCurrencyInput.addEventListener("change", storeSelectedId);
    toCurrencyInput.addEventListener("change", storeSelectedId);
    confirmButton.addEventListener("click", doCalculation);

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
    }

    async function doCalculation(){
        // Regex to check match ends with from country
        const regexFrom = new RegExp(selectedFrom + "$");
        const regexTo = new RegExp(selectedTo + "$");
        console.log(selectedFrom, selectedTo);
        const res = await fetchData.fetchCurrency(selectedFrom, selectedFrom, selectedTo);
        console.log(res);

        let valueFrom;
        let valueTo;
        for(var key in quotes){
            // Returera USDSEK
            if(key.match(regexFrom)){
                valueFrom = quotes[key];
            }
            if(key.match(regexTo)){
                valueTo = quotes[key];
            }
        }
        
        console.log(valueFrom, valueTo); // SEK 9.xxxx

        // valueFROM är valda landet SEK, valueFROM blir 9.xxxx kr
        // USDTOSEK blir input / 9.xxxxx så får man ut dollarvärdet
        // sen kör man USDto selectedTO value och printar ut det i inputen

    }


})();


