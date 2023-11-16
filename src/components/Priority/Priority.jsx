import React, { useEffect, useState } from 'react'
import Card from '../Card/Card';
import './Priority.css'

const Priority = (props) => {
    const tickets = props.data.tickets;
    const users = props.data.users;
    const ordering = props.ordering;
    const [groupedData, setGroupedData] = useState([]);
    const priority = [0, 1, 2, 3, 4];
    const priority_label = ["No Priority", "Low", "Medium", "High", "Urgent"]
    const priority_icon = ["fa-solid fa-ellipsis", "fa-solid fa-signal", "fa-solid fa-signal", "fa-solid fa-signal", "fa-solid fa-exclamation"]


    useEffect(() => {
        if (tickets) {
            const groupedTickets = {};
            priority.forEach((a) => {
                if (!groupedTickets[a]) {
                    groupedTickets[a] = [];
                }
            })
            const groupTicketsByPriority = () => {
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
            {Object.keys(groupedData).map((priority) => (
                <div key={priority} className="priority-column">
                    <div className="head">
                        <div className="head-left">
                            <i className={priority_icon[priority]}></i>
                            <div>{priority_label[priority]}</div>
                            <div className='length'>{groupedData[priority].length}</div>
                        </div>
                        <div className="head-right">
                            <i className="fa-solid fa-plus"></i>
                            <i className="fa-solid fa-ellipsis"></i>
                        </div>
                    </div>

                    <div className="cards">
                        {groupedData[priority].map((ticket) => (
                            <React.Fragment key={ticket.id}>
                                {users
                                    .filter((user) => user.id === ticket.userId)
                                    .map((user) => (
                                        <Card key={ticket.id} ticket={ticket} user={user} />
                                    ))}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Priority
