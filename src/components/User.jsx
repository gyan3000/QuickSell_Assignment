import React from 'react';

const User = (props) => {
  const users = props.data?.users || [];
  const tickets = props.data?.tickets || [];
  const ordering = props.ordering; 

  return (
    <div className='status'>
      {users.map((usr) => (
        <div key={usr.id}>
          <h2>User Details</h2>
          <p>ID: {usr.id}</p>
          <p>Name: {usr.name}</p>
          <p>Availability: {usr.available ? 'Available' : 'Not Available'}</p>

          <h3>Associated Tickets:</h3>
          <ul>
            {tickets
              .filter((ticket) => ticket.userId === usr.id)
              .sort((a, b) => {
                if (ordering === "priority") {
                  return b.priority - a.priority;
                } else if (ordering === "title") {
                  return a.title.localeCompare(b.title);
                } else {
                  return 0;
                }
              })
              .map((ticket) => (
                <li key={ticket.id}>{ticket.title}</li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default User;
