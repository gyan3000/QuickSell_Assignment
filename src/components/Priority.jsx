import React, { useEffect, useState } from 'react'

const Priority = (props) => {
    const tickets = props.data.tickets;
    const ordering = props.ordering;
    const [groupedData, setGroupedData] = useState([]);

    useEffect(() => {
        if (tickets) {
            const groupTicketsByPriority = () => {
                const groupedTickets = {};
                tickets.forEach((ticket) => {
                    const { priority } = ticket;
                    if (!groupedTickets[priority]) {
                        groupedTickets[priority] = [];
                    }
                    groupedTickets[priority].push(ticket);
                });
                Object.keys(groupedTickets).forEach((priority) => {
                    groupedTickets[priority].sort((a, b) => {
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
            const groupedDataResult = groupTicketsByPriority();
            setGroupedData(groupedDataResult);
        }
    }, [tickets, ordering])

    return (
        <div className='priority'>
            <div>
                <h3>No priority</h3>
                <ul>
                    {groupedData && groupedData[0]?.map((ticket) => (
                        <li key={ticket.id}>{ticket.title}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Urget</h3>
                <ul>
                    {groupedData && groupedData[4]?.map((ticket) => (
                        <li key={ticket.id}>{ticket.title}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>High</h3>
                <ul>
                    {groupedData && groupedData[3]?.map((ticket) => (
                        <li key={ticket.id}>{ticket.title}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Medium</h3>
                <ul>
                    {groupedData && groupedData[2]?.map((ticket) => (
                        <li key={ticket.id}>{ticket.title}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Low</h3>
                <ul>
                    {groupedData && groupedData[1]?.map((ticket) => (
                        <li key={ticket.id}>{ticket.title}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Priority
