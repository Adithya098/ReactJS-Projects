import { useLoaderData,json } from 'react-router-dom';
import EventsList from '../components/EventsList';

function EventsPage() {
  const data = useLoaderData();
  const events = data.events;
  //console.log(events);
  // if (data.isError) {
  //   return (<p>{data.message}</p>);
  // }
  return <EventsList events={events} />;
}

export default EventsPage;

export async function EventLoader() {
  const response = await fetch('http://localhost:8080/events');
  
  if (!response.ok) {
    // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }),
    // {status: 500});
    throw json(   { message: 'Could not fetch events.' },   {     status: 500,   }, );
  }
  const data = await response.json();
  return { events: data.events };
}


  /*
  import { useEffect, useState } from 'react';

  const [isLoading, setIsLoading] = useState(false);
  const [fetchedEvents, setFetchedEvents] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchEvents() {
      setIsLoading(true);
      const response = await fetch('http://localhost:8080/events');

      if (!response.ok) {
        setError('Fetching events failed.');
      } else {
        const resData = await response.json();
        setFetchedEvents(resData.events);
      }
      setIsLoading(false);
    }

    fetchEvents();
  }, []);
  
  return (
    <>
      <div style={{ textAlign: 'center' }}>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </div>
      {!isLoading && fetchedEvents && <EventsList events={fetchedEvents} />}
    </>
  );
  */