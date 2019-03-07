

const fetchData = (function () {

    // Local storage values
    let currencyValues;
    let countryValues;

    const storeInLocal = function () {

    }

    const getFromLocal = function (val) {
        if(val === "countries"){
            return countryValues;
        } else{
            return currencyValues;
        }
    }

    const fetchCountryList = function () {
        const _url = "http://www.apilayer.net/api/list?access_key=2ac1611a2dfc48d014d02f69297a99c8&format=1";
        return async function () {
            try {
                let res = await fetch(_url);
                let data = await res.json();
                return data;
            } catch (err) {
                console.log(err);
            }
        }
    }

    const fetchCurrencyData = function () {
        const _url = "http://www.apilayer.net/api/live?access_key=2ac1611a2dfc48d014d02f69297a99c8&format=1";
        return async function () {
            try {
                let res = await fetch(_url);
                let data = await res.json();
                return data;
            } catch (err) {
                console.log(err);
            }
        }
    }
    return {
        fetchCountries: fetchCountryList,
        fetchCurrencyData: fetchCurrencyData,
        getFromLocal: getFromLocal

    }

})();
