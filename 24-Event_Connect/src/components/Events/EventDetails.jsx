import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useQuery,useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

import ErrorBlock from '../UI/ErrorBlock.jsx';
import { fetchEvent,deleteEvent } from '../util/http.js';
import Header from '../Header.jsx';
import { queryClient } from "../util/http.js";
import Modal from '../UI/Modal.jsx';
// import LoadingIndicator from '../UI/LoadingIndicator.jsx';

export default function EventDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id); 
  
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['events',id], // Ensure query key includes the id for caching
    queryFn: ({signal}) => fetchEvent({ signal,id }), // Pass a function reference that calls fetchEvent with the id
  });

  const { mutate, isPending} = useMutation({
    mutationFn : deleteEvent,
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey: ['events '],refetchType:'none'}) ;
      navigate("/events");
    }
  })

  const [isDeleting, setIsDeleting] = useState(false);

  function handleStartDelete() {
    setIsDeleting(true);
  }

  function handleStopDelete() {
    setIsDeleting(false);
  }

  function handleDelete(){
    mutate({id})
  }
  console.log(data);

  let content;

  if (isLoading) {
    content = (
      <div id="event-details-content" className="center">
        <p><b>Fetching Event Details</b></p>
      </div>
    );
  }

  if (isError) {
    content = (
      <div id="event-details-content" className="center">
        <ErrorBlock
          title="Failed to load event"
          message={
            error.info?.message ||
            'Failed to fetch event data, please try again later.'
          }
        />
      </div>
    );
  }

  if (data) {
    const formattedDate = new Date(data.date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    
    let imagelink = "http://localhost:3000/" + data.image;
    content = (
    <article id="event-details">
      <header>
      <h1>{data.title}</h1>
        <nav>
          <button onClick={handleStartDelete}>Delete</button> 
          <Link to="edit">Edit</Link>
        </nav>
      </header>
      <div id="event-details-content">
        <img src = {imagelink} alt="" />
        <div id="event-details-info">
          <div>
            <p id="event-details-location">{data.location}</p>
            <time dateTime={`Todo-DateT$Todo-Time`}>{formattedDate} @ {data.time}</time>
          </div>
          <p id="event-details-description">{data.description}</p>
        </div>
      </div>
    </article>);
  }

  return (
    <>
    {isDeleting && (
      <Modal onClose={handleStopDelete}>
      <h2>Are you sure?</h2>
      <p>Do you really want to delete this event? This action cannot be undone.</p>
      <div className="form-actions">
        {isPending && <p>Deleting... Please wait !</p>}
        {!isPending && (
          <>
          <button onClick={handleStopDelete} className='button-text'>Cancel</button>
          <button onClick={handleDelete} className='button'>Delete</button>
          </>
        )}
      </div>
    </Modal>
    )}
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      {content}
    </>
  );
}
