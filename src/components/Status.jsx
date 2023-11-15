import React, { useEffect, useState } from 'react'

const Status = (props) => {
    const [groupedData, setGroupedData] = useState([]);

    const status = ["Backlog", "Todo", "In progress", "Done", "Canceled"]

    const ordering = props.ordering;

    useEffect(() => {
        if (props.data && props.data.tickets) {
            const groupedTickets = {};
            status.forEach((a)=>{
                if (!groupedTickets[a]) {
                    groupedTickets[a] = [];
                }
            })
            const groupTicketsByStatus = () => {
                props.data.tickets.forEach((ticket) => {
                    const { status } = ticket;
                    if (!groupedTickets[status]) {
                        groupedTickets[status] = [];
                    }
                    groupedTickets[status].push(ticket);
                });
                Object.keys(groupedTickets).forEach((status) => {
                    groupedTickets[status].sort((a, b) => {
                      if (ordering === "priority") {
                        return b.priority - a.priority;
                      } else if (ordering === "title") {
                        return a.title.localeCompare(b.title);
                      } else {
                        return 0;
                      }
                    });
                  });

                return groupedTickets;
            };
            setGroupedData(groupTicketsByStatus());
        }
    }, [props.data.tickets, ordering]);
    return (
        <div className='status'>
            {groupedData &&
                Object.keys(groupedData).map((status) => (
                    <div key={status}>
                        <h3>{status}</h3>
                        <ul>
                            {groupedData[status].map((ticket) => (
                                <li key={ticket.id}>{ticket.title}</li>
                            ))}
                        </ul>
                    </div>
                ))}
        </div>
    )
}

export default Status
