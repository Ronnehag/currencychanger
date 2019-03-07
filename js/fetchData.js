

const fetchData = (function () {

    const storage = window.localStorage;

    const getCountryJSON = () => {
        return JSON.parse(storage.getItem("countryList"));
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
    }

    async function fetchCurrencyData(base, country1, country2) {
        const _url = `https://api.exchangeratesapi.io/latest?base=${base}&symbols=${country1},${country2}`;
        try {
            let res = await fetch(_url);
            let data = await res.json();
            return data;
        } catch (err) {
            console.log(err);
        }
    }


    const init = () => {
        fetchCountryList();
    }

    return {
        init: init,
        getCountries: getCountryJSON,
        fetchCurrency: fetchCurrencyData
    }

})();
