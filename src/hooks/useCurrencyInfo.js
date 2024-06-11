import { useEffect, useState } from "react";

function useCurrencyInfo(from, to) {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(`https://api.frankfurter.app/latest?from=${from}&to=${to}`)
            .then((response) => response.json())
            .then((response) => setData(Number(response.rates[to])))
            .catch((error) => console.error("Error fetching data:", error));
    }, [from, to]);

    console.log(data);

    return data;
}

export default useCurrencyInfo;
