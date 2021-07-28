import React ,{ useState } from 'react';
import './Post.css';
import Avatar from "@material-ui/core/Avatar";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import TelegramIcon from '@material-ui/icons/Telegram';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';


function Post( { username,caption,imgUrl }){

  const[like,setLike] = useState(false);
  const[likecount,setLikecount] = useState(0);

  const handleDoubleClick = () => {
      if(like){
        setLike(false);
        setLikecount(likecount-1);
      }else{
        setLike(true);
        setLikecount(likecount+1);
      }
  }

	return(
       <div className = "post">

         <div className = "post_header">
           <div className = "post_header_icon">
              <Avatar style = {{ height:'25px',width:'25px'}} />
              <h5>{ username }</h5 >
           </div>
           <div>
              <MoreVertIcon />
           </div>        
          </div>

          <div className="post_img">
            <img className="img" src= { imgUrl } onDoubleClick = {() => handleDoubleClick()} alt="" />
          </div>

          <div>
            <div className="post_footer">  
             <div>

             {like ? (
               <FavoriteIcon className = "post_footer_left_icon favourite" onClick = {() => {setLike(false);setLikecount(likecount-1);}} />):(  
               <FavoriteBorderIcon className = "post_footer_left_icon " onClick = {() => {setLike(true);setLikecount(likecount+1);}} />)}

               <CommentIcon className = "post_footer_left_icon" />
               <TelegramIcon className = "post_footer_left_icon"/>
             </div>
             <div>
               <BookmarkBorderIcon className = "post_footer_right_icon"/>
             </div>
           </div>

           <h5 className="likes"> { likecount } likes</h5>

           <div className="post_footer_text">
              <h5>{ username }</h5>
              <p>{ caption }</p>
           </div>

           <div className = "footer_comment">
            <Avatar style = {{ height:'25px',width:'25px'}} />
            <span>Add a commment...</span>
           </div>
          </div>

       </div> 
	);
}

export default Post;