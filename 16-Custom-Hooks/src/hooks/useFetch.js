import { useRef, useState, useCallback, useEffect } from 'react';

export function useFetch(fetchfn,initialvalue){
    
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState();
    const [fetchedData, setFetchedData] = useState(initialvalue)
    
    useEffect(() => {
        async function fetchData() {
          setIsFetching(true);
          try {
            const places = await fetchfn();
            setFetchedData(places);
          } catch (error) {
            setError({ message: error.message || 'Failed to fetch user places.' });
          }
    
          setIsFetching(false);
        }
    
        fetchData();
      }, [fetchfn]);

      return{
        isFetching,
        error,
        fetchedData
      }
}