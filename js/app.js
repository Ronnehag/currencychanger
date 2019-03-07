

(function() {

    // Initialize the app, starts the interval timer, fetches API data and stores in localstorage.
    fetchData.init();

    // EVENT HANDLERS
    const fromCurrencyInput = document.querySelector("#currencyFrom");
    const toCurrencyInput = document.querySelector("#currencyTo");
    const dropdownList = document.querySelector("#countries");

    function fillDropDown(){
        const countries = fetchData.getFromLocal("countries");
    }
    


})();


