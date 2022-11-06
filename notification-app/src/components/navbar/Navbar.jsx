import "./navbar.css";
import Notification from "../../imgs/notification.png";
import Message from "../../imgs/message.png";
import Settings from "../../imgs/settings.png";
import { useEffect } from "react";
import { useState } from "react";

const Navbar = ({ socket }) => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  const handleRead = () => {
    setNotifications([]);
    setOpen(false);
  };

  useEffect(() => {
    socket.on("getNotification", (data) => {
      setNotifications((prev) => [...prev, data]);
    });
  }, [socket]);

  const displayNotification = ({ senderName, type }) => {
    let action;
    console.log(type);
    if (type === 1) {
      action = "liked";
    } else if (type === 2) {
      action = "commented";
    } else {
      action = "shared";
    }

    return (
      <span className='notification'>{`${senderName} ${action}  your post`}</span>
    );
  };
  return (
    <div className='navbar'>
      <span className='logo'>Socket App</span>
      <div className='iconsContainer'>
        <div className='icon' onClick={() => setOpen(!open)}>
          <img src={Notification} alt='notificationImg' className='iconImage' />

          {notifications.length > 0 && (
            <div className='counter'>{notifications.length}</div>
          )}
        </div>
        <div className='icon' onClick={() => setOpen(!open)}>
          <img src={Message} alt='messageImg' className='iconImage' />
        </div>
        <div className='icon' onClick={() => setOpen(!open)}>
          <img src={Settings} alt='setttingsImg' className='iconImage' />
        </div>
      </div>
      {open && (
        <div className='notifications'>
          {notifications.map((n) => displayNotification(n))}
          <button className='notificationButton' onClick={handleRead}>
            Mark as read
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
