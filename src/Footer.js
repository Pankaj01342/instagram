import React from 'react';
import './Footer.css';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Avatar from "@material-ui/core/Avatar";

function Footer(){
	return(
		<div className = "main_footer">
        <div className = "footer">
           <HomeIcon />
           <SearchIcon />
           <VideoLibraryIcon />
           <FavoriteBorderIcon />
           <Avatar style = {{height:'25px',width:'25px'}} />
        </div>
        </div>
	);
}

export default Footer;