// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage

// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage

// 3. Add a root layout that adds the <MainNavigation> component above all page components

// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from './pages/Home';
import EventsPage from './pages/Events';
import { EventLoader } from './pages/Events';

import EventDetailPage,{loader as EventDetailLoader, action as DeleteEventAction} from './pages/EventDetail';
import RootLayout from './pages/Root';
import NewEventPage from './pages/NewEvent';
import EditEventPage from './pages/EditEvent';
import EventsRootLayout from './pages/EventRoutes';
import ErrorPage from './pages/Error';
import {eventAction as NewEventAction} from './components/EventForm';
import NewsletterPage, { action as newsletterAction } from './pages/Newsletter';


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '', element: <HomePage /> },
      {
        path: 'events',
        element: <EventsRootLayout />,
        children: [
          { index: true, element: <EventsPage />, loader: EventLoader },
          {
            path: ':eventId',
            id: 'event-detail',
            loader: EventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: DeleteEventAction,
              },
              {
                path: 'edit',
                element: <EditEventPage />,
                action: NewEventAction
              },
            ],
          },
          { path: 'new', element: <NewEventPage />, action: NewEventAction },
        ],
      },
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;



/*
<--   This didn't work at all   -->
{
  path: ':eventId',
  loader: EventDetailLoader,
  children: [
    {
      index: true,
      element: <EventDetailPage />,
    },
    { 
      path: 'edit', 
      element: <EditEventPage />, 
      loader: EventDetailLoader // Explicitly run the loader again
    },
  ],
}
*/