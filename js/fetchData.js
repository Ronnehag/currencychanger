
const fetchData = (function () {
    const storage = window.localStorage;

    const getCountryJSON = () => {
        if (storage.getItem("countryList") != null) {
            return JSON.parse(storage.getItem("countryList"));
        }
        else {
            fetchCountryList().then(() => {
                return JSON.parse(storage.getItem("countryList"));
            });
        }
    }

    async function getCountryName(name){
        let alpha2Code = name.substr(0,2);
        try{
            let res = await fetch(`https://restcountries.eu/rest/v2/alpha/${alpha2Code}`);
            let data = res.json();
            return data;
        }
        catch(err){
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
        getCountryName : getCountryName
    }

})();


