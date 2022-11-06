import "./card.css";
import Heart from "../../imgs/heart.png";
import HeartFilled from "../../imgs/heartFilled.png";
import Comment from "../../imgs/comment.png";
import Share from "../../imgs/share.png";
import Info from "../../imgs/info.png";
import { useState } from "react";

function Card({ post, socket, user }) {
  const [liked, setLiked] = useState(false);
  const handleNotification = (type) => {
    setLiked(true);
    socket.emit("sendNotification", {
      senderName: user,
      recieverName: post.username,
      type,
    });
  };
  return (
    <div className='card'>
      <div className='info'>
        <img src={post.userImg} alt='userImg' className='userImg' />
        <span>{post.fullname}</span>
      </div>
      <img src={post.postImg} className='postImg' alt='postImg' />
      <div className='interaction'>
        {liked ? (
          <img src={HeartFilled} alt='heartFilled' className='cardIcon' />
        ) : (
          <img
            src={Heart}
            alt='heart'
            className='cardIcon'
            onClick={() => handleNotification(1)}
          />
        )}
        <img
          src={Comment}
          alt='comment'
          className='cardIcon'
          onClick={() => handleNotification(2)}
        />
        <img
          src={Share}
          alt='shared'
          className='cardIcon'
          onClick={() => handleNotification(3)}
        />
        <img src={Info} alt='info' className='cardIcon infoIcon' />
      </div>
    </div>
  );
}

export default Card;
