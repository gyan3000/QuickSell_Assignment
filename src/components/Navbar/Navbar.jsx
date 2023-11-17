import React, { useState } from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onStateChange }) => {
  const [isDisplay, setDisplay] = useState(false);
  const [grouping, setGrouping] = useState("Priority")
  const [ordering, setOrdering] = useState("Title");
  const navigate = useNavigate();

  function handleGrouping(e) {
    e.preventDefault();
    setGrouping(e.target.value);
    if (e.target.value === "Priority") {
      navigate("/")
    } else {
      navigate(e.target.value.toLowerCase())
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const target = e.target.value;
    setOrdering(target);
    onStateChange(target.toLowerCase());
  }

  const toggleDisplay = () => {
    setDisplay(!isDisplay);
  };

  return (
    <div className='nav'>
      <div className='nav-item'>
        <div className="dropdown" onClick={toggleDisplay}>
          <i class="fa-solid fa-sliders"></i>
          <div>
            Display
          </div>
          <i class="fa-solid fa-caret-down"></i>
        </div>
        {isDisplay && (
          <div className='dropdown-content'>
            <div className='dropdown-item'>
              Grouping
              <select value={grouping} onChange={handleGrouping}>
                <option>Priority</option>
                <option>Status</option>
                <option>User</option>
              </select>
            </div>

            <div className='dropdown-item'>
              Ordering
              <select value={ordering} onChange={handleSubmit}>
                <option>Title</option>
                <option>Priority</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
