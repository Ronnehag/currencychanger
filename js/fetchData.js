

const fetchData = (function () {

    const storage = window.localStorage;


    async function updateLocalStorage() {
        setInterval(await fetchCountryList, 1000 * 60 * 60);
        setInterval(await fetchCurrencyData, 1000 * 60 * 60);
    }

    const getCountryJSON = () => {
        return JSON.parse(storage.getItem("countryList"));
    }
    const getCurrencyDataJSON = () => {
        return JSON.parse(storage.getItem("currencyValues"));
    }

    function fetchCountryList() {
        const _url = "http://www.apilayer.net/api/list?access_key=2ac1611a2dfc48d014d02f69297a99c8&format=1";
        return async function () {
            try {
                let res = await fetch(_url);
                let data = await res.json();
                storage.setItem("countryList", JSON.stringify(data));
            } catch (err) {
                console.log(err);
            }
        }
    }

    function fetchCurrencyData() {
        const _url = "http://www.apilayer.net/api/live?access_key=2ac1611a2dfc48d014d02f69297a99c8&format=1";
        return async function () {
            try {
                let res = await fetch(_url);
                let data = await res.json();
                storage.setItem("currencyValues", JSON.stringify(data));
            } catch (err) {
                console.log(err);
            }
        }
    }

    const init = async () => {
        updateLocalStorage();
    }

    return {
        init: init,
        getCountries : getCountryJSON,
        getCurrency : getCurrencyDataJSON
    }

})();
