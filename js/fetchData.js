

const fetchData = () => {

    // Local storage values
    let currencyValues;

    function storeInLocal(){

    }

    function getFromLocal(){

    }

    function fetchData(){
        const _url = "http://www.apilayer.net/api/live?access_key=2ac1611a2dfc48d014d02f69297a99c8&format=1";
        return async function(){
            let data;
            try{
                let res = await fetch(url);
                data = await res.json();
            } catch(err){
                console.log(err);
            }
            return data;
        }
    }

    
}