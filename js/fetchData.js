
const fetchData = (function () {
    const storage = window.localStorage;

    function detectmob() {
        if (navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)
        ) {
            return true;
        }
        else {
            return false;
        }
    }
    const getCountryJSON = () => {

        if (detectmob()) {
            fetchMobile().then(val => {
                return val;
            });
        } else {
            if (storage.getItem("countryList") != null) {
                return JSON.parse(storage.getItem("countryList"));
            }
            else {
                fetchCountryList().then(() => {
                    return JSON.parse(storage.getItem("countryList"));
                });
            }
        }


    }

    async function getCountryName(name) {
        let alpha2Code = name.substr(0, 2);
        try {
            let res = await fetch(`https://restcountries.eu/rest/v2/alpha/${alpha2Code}`);
            let data = res.json();
            return data;
        }
        catch (err) {
            console.log(err);
        }
    }

    async function fetchMobile() {
        const _url = `https://api.exchangeratesapi.io/latest`;
        try {
            let res = await fetch(_url);
            let data = await res.json();
            return data
        } catch (err) {
            console.log(err);
        }
    }




    async function fetchCountryList() {
        const _url = `https://api.exchangeratesapi.io/latest`;
        try {
            let res = await fetch(_url);
            let data = await res.json();
            storage.setItem("countryList", JSON.stringify(data));
        } catch (err) {
            console.log(err);
        }
    }

    async function fetchCurrencyData(fromCountry, toCountry) {
        const _url = `https://api.exchangeratesapi.io/latest?base=${fromCountry}&symbols=${toCountry}`;
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
        fetchCurrency: fetchCurrencyData,
        getCountryName: getCountryName
    }

})();


