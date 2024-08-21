import { useState, useCallback, useEffect } from "react";

async function sendHttpRequest(url, config) {
    const response = await fetch(url, config);
    const resData = await response.json();

    if (!response.ok) {
        throw new Error(resData.message || 'Something went wrong, failed to send request');
    }
    return resData;   
}

export default function useHttp(url, config, initialData) {

    const [data, setData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback(async function sendRequest() {
        setIsLoading(true);
        try {
            const resData = await sendHttpRequest(url, config); // Added await here
            setData(resData);
        } 
        catch (error) {
            setError(error.message || 'Something went wrong!');
        }
        setIsLoading(false);
    }, [url, config]);

    useEffect(() => {
        if (config && (config.method === "GET" || !config.method || !config )) {
            sendRequest() ;
        }    
    }, [sendRequest]); // Removed 'config' from the dependency array as 'sendRequest' already depends on 'url' and 'config'.

    return {
        data,
        isLoading,
        error,
        sendRequest,
    };
}
