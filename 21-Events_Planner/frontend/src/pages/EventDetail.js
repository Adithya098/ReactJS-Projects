import { json, redirect, useRouteLoaderData } from 'react-router-dom';

import EventItem from '../components/EventItem';

function EventDetailPage() {
  const data = useRouteLoaderData('event-detail');
  console.log('data1',data);
  return <EventItem event={data.event} />;
}

export default EventDetailPage;

export async function loader({ request, params }) {
  const id = params.eventId;

  const response = await fetch('http://localhost:8080/events/' + id);

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch details for selected event.' },
      {
        status: 500,
      }
    );
  } else {
    console.log('Error Response',response);
    return response;
  }
}

export async function action({params,request}) {
  console.log("params",params);
  const id = params.eventId;
  const response = await fetch('http://localhost:8080/events/' + id,{method:request.method });
  if (!response.ok) {
    throw json(
      { message: 'Could not delete event.' },
      {
        status: 500,
      }
    ); 
  }
  return redirect('/events');
}