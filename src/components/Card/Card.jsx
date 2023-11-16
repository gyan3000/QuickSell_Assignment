import React from 'react';
import './Card.css';

export default function Card(props) {
    const id = props.ticket.id;
    const tag = props.ticket.tag[0];
    const title = props.ticket.title;
    const user = props.user;
    const priority_icon = ["fa-solid fa-ellipsis", "fa-solid fa-signal", "fa-solid fa-signal", "fa-solid fa-signal", "fa-solid fa-exclamation"]
    const status_icon = {
        "Backlog": "fa-solid fa-layer-group",
        "Todo": "fa-regular fa-circle",
        "In progress": "fa-solid fa-circle-half-stroke",
        "Done": "fa-solid fa-circle-check",
        "Canceled": "fa-solid fa-circle-xmark"
    };

    function truncateTitle(title) {
        const maxLength = 20;
        return title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
    }

    return (
        <div>
            <div className="card" title={title}>
                <div className="header">
                    <div className="id">{id}</div>
                    <div className="profile-img">
                        <div className='name'>{user.name && user.name.charAt(0)}</div>
                        {user.available ? (
                            <div className="dot green-dot"></div>
                        ) : (
                            <div className="dot fade-dot"></div>
                        )}
                    </div>
                </div>
                <div className="title">
                    <i className={status_icon[props.ticket.status]}></i>
                    {truncateTitle(title)}
                </div>
                <div className="bottom">
                    <i className={priority_icon[props.ticket.priority]}></i>
                    <div className="tag">
                        <div className="tag-dot"></div>
                        {tag}
                    </div>
                </div>
            </div>
        </div>
    );
}
