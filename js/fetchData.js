

const fetchData = (function () {

    const storage = window.localStorage;

    const getCountryJSON = () => {
        return JSON.parse(storage.getItem("countryList"));
    }
    const getCurrencyDataJSON = () => {
        return JSON.parse(storage.getItem("currencyValues"));
    }

    async function fetchCountryList() {
        const _url = "http://www.apilayer.net/api/list?access_key=2ac1611a2dfc48d014d02f69297a99c8&format=1";
        try {
            let res = await fetch(_url);
            let data = await res.json();
            storage.setItem("countryList", JSON.stringify(data));
        } catch (err) {
            console.log(err);
        }
        setTimeout(fetchCountryList, 1000 * 60 * 60);
    }

    async function fetchCurrencyData() {
        const _url = "http://www.apilayer.net/api/live?access_key=2ac1611a2dfc48d014d02f69297a99c8&format=1";
        try {
            let res = await fetch(_url);
            let data = await res.json();
            storage.setItem("currencyValues", JSON.stringify(data));
        } catch (err) {
            console.log(err);
        }
        setTimeout(fetchCurrencyData, 1000 * 60 * 60);
    }


    const init = () => {
        fetchCountryList();
        fetchCurrencyData();
    }

    return {
        init: init,
        getCountries: getCountryJSON,
        getCurrency: getCurrencyDataJSON
    }

})();
