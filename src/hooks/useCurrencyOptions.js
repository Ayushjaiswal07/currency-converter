import { useEffect, useState } from "react";

function useCurrencyOptions (){
    const [currencies, selectCurrencies] = useState([]);

    const option = async() =>{
    
            try {
                const res = await fetch(`https://api.frankfurter.app/currencies`);
                const data = await res.json();
        
                selectCurrencies(Object.keys(data))
                
            } 
            catch (error) {
                console.log("Error: ", error);
            }
    }

    useEffect(()=>{
        option()
    },[])

    return currencies

}

export default useCurrencyOptions;