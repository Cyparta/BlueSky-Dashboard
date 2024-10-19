import {useEffect, useState} from "react";


const UseUpdate = (path , body) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const updateData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://yes-cab-jmsuf.ondigitalocean.app${path}`, {
                    method: "PATCH",
                    body: body,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Token 412fa2b99ddc70b98e8ec47e775d2cc7094184fd`
                    },
                });
                const data = await response.json();
                setData(data);
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        };
        updateData();
    }, [path]);


    return {data, loading, error};
}


export default UseUpdate;
