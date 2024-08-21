import EventForm from '../components/EventForm';
import { useRouteLoaderData} from 'react-router-dom';

function EditEventPage() {
    const data = useRouteLoaderData('event-detail');
    //console.log("1",data); // This should now log the correct data object with an 'event' property
    return <EventForm event={data.event} method='patch'/>;
}


export default EditEventPage;