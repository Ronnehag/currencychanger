

const fetchData = (function () {


    function updateLocalStorage() {
        setInterval(fetchCountryList, 1000 * 60 * 60);
        setInterval(fetchCurrencyData, 1000 * 60 * 60);
    }

    const getFromLocal = function (val) {
        
    }

    const fetchCountryList = function () {
        const _url = "http://www.apilayer.net/api/list?access_key=2ac1611a2dfc48d014d02f69297a99c8&format=1";
        return async function () {
            try {
                let res = await fetch(_url);
                let data = await res.json();
                localStorage.setItem("currencyValues", JSON.stringify(data));
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
                currencyValues = data;
            } catch (err) {
                console.log(err);
            }
        }
    }

    const init = function(){
        updateLocalStorage();
    }

    return {
        fetchCountries: fetchCountryList,
        fetchCurrencyData: fetchCurrencyData,
        getFromLocal: getFromLocal,
        init : init
    }

})();
