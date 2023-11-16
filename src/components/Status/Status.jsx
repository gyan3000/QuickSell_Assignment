import React, { useEffect, useState } from 'react'
import './Status.css'
import Card from '../Card/Card'

const Status = (props) => {
    const [groupedData, setGroupedData] = useState([]);
    const users = props.data.users;
    const status = ["Backlog", "Todo", "In progress", "Done", "Canceled"]
    const status_icon = {
        "Backlog": "fa-solid fa-layer-group",
        "Todo": "fa-regular fa-circle",
        "In progress": "fa-solid fa-circle-half-stroke",
        "Done": "fa-solid fa-circle-check",
        "Canceled": "fa-solid fa-circle-xmark"
    };

    const ordering = props.ordering;

    useEffect(() => {
        if (props.data && props.data.tickets) {
            const groupedTickets = {};
            status.forEach((a) => {
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
    }, [props.data, ordering]);
    return (
        <>
            <div className='status'>
                {groupedData && Object.keys(groupedData)?.map((status) => (
                    <div key={status} className="status-column">
                        <div className="head">
                            <div className="head-left">
                                <i className={status_icon[status]}></i>
                                <div>{status}</div>
                                <div className='length'>{groupedData[status].length}</div>
                            </div>
                            <div className="head-right">
                                <i className="fa-solid fa-plus"></i>
                                <i className="fa-solid fa-ellipsis"></i>
                            </div>
                        </div>
                        <div className="cards">
                            {groupedData[status].map((ticket) => (
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
        </>
    )
}

export default Status
