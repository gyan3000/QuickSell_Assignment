import React from 'react';
import Card from '../Card/Card';
import './User.css';

const User = (props) => {
  const users = props.data?.users || [];
  const tickets = props.data?.tickets || [];
  const ordering = props.ordering;

  const groupedData = {};
  tickets.forEach((ticket) => {
    const user = users.find((u) => u.id === ticket.userId);
    if (user) {
      if (!groupedData[user.name]) {
        groupedData[user.name] = [];
      }
      groupedData[user.name].push(ticket);
    }
  });

  function sortTickets(tickets, ordering) {
    return tickets.sort((a, b) => {
      if (ordering === 'priority') {
        return b.priority - a.priority;
      } else if (ordering === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  }

  Object.keys(groupedData).forEach((userName) => {
    groupedData[userName] = sortTickets(groupedData[userName], ordering);
  });



  return (
    <div className='user'>
      {Object.keys(groupedData).map((userName) => (
        <div key={userName} className="user-column">
          <div className="user-head">
            <div className="head-left">
              <div className="profile-icon">
                <div className='icon-char'>{userName && userName.charAt(0)}</div>
              </div>
              <div>{userName}</div>
              <div className='length'>{groupedData[userName].length}</div>
            </div>
            <div className="head-right">
              <i className="fa-solid fa-plus"></i>
              <i className="fa-solid fa-ellipsis"></i>
            </div>
          </div>
          <div className="cards">
            {groupedData[userName].map((ticket) => (
              <Card key={ticket.id} ticket={ticket} user={users.find((u) => u.id === ticket.userId)} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default User;
