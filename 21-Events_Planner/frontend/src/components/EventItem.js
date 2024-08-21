import { Link,useSubmit} from 'react-router-dom';

import classes from './EventItem.module.css';


function EventItem({ event }) {

  const submit = useSubmit();
  console.log("Event from EventItem",event);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const proceed = window.confirm("Are you sure?");
    if (proceed) {
      submit(null, { method: "delete" });
    }
    
  };

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link 
          to="edit" 
          style={{
            backgroundColor: '#ffba08',
            color: 'black',
            padding: '10px 20px',
            borderRadius: '5px',
            textDecoration: 'none',
            margin: '0 10px'
          }}
        >
          Edit
        </Link>
        <button 
          onClick={handleSubmit} 
          style={{
            backgroundColor: 'red',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
            margin: '0 10px'
          }}
        >
          Delete
        </button>
        <Link 
          to="../" 
          style={{
            backgroundColor: '#0077b6',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            textDecoration: 'none',
            margin: '0 10px'
          }}
        >
          Go Back
        </Link>
      </menu>
    </article>
  );
}

export default EventItem;