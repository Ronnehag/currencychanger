

const fetchData = () => {

    // Local storage values
    let currencyValues;

    function storeInLocal(){

    }

    function getFromLocal(){

    }

    function fetchCountryList(){
        const _url = "http://www.apilayer.net/api/list?access_key=2ac1611a2dfc48d014d02f69297a99c8&format=1";
        return async function(){
            try{
                let res = await fetch(_url);
                let data = await res.json();
                return data;
            } catch(err){
                console.log(err);
            }
        }
    }

    function fetchCurrencyData(){
        const _url = "http://www.apilayer.net/api/live?access_key=2ac1611a2dfc48d014d02f69297a99c8&format=1";
        return async function(){
            try{
                let res = await fetch(_url);
                let data = await res.json();
                return data;
            } catch(err){
                console.log(err);
            }
        }
    }    
}