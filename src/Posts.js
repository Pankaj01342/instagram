import react,{ useState,useEffect } from 'react';
import Post from './Post';
import "./Posts.css";
import { db,auth } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ImageUpload from './ImageUpload';


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 300,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Posts() {

  const classes = useStyles();

  const [posts,setPosts] = useState([]);
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [signin,setSignin] = useState(false);
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [user,setUser] = useState(null);
  const [imgUpload,setImgUpload] = useState(false);

   useEffect(() =>{
     db.collection('posts').onSnapshot(snapshot =>{
        setPosts(snapshot.docs.map( doc => doc.data()));
     })
   },[]);

   useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authuser) => {
      if(authuser){
        console.log(authuser);
        setUser(authuser);
      }else{
        setUser(null);
      }
    })

    return() => {
      unsubscribe();
    }

   },[user,username]);

   const signup = (event) => {
    event.preventDefault();

    auth.createUserWithEmailAndPassword(email,password)
    .then((authuser) => {
      return authuser.user.updateProfile({
        displayName : username
      })
    })
    .catch((error) => alert(error.message));

    setUsername('');
    setPassword('');
    setEmail('');
    setOpen(false);
   }

   const signIn = (event) => {
     event.preventDefault();
     auth.signInWithEmailAndPassword(email,password)
     .catch((error) => alert(error.message));
     setSignin(false);
     setPassword('');
     setEmail('');
   }

   const uploadImg = ()=>{
     if(imgUpload){
      setImgUpload(false);
     }
     else{
      setImgUpload(true);
     }
   }

	return(
        <div>
           
           <div className="header">
             <AddBoxIcon className= "add" onClick = { uploadImg } />
             <img className = "header_logo" src="https://www.pngitem.com/pimgs/m/132-1327874_instagram-font-logo-png-transparent-png.png" alt="" />
             <img className = "header-msg" src="https://cdn.iconscout.com/icon/free/png-256/messenger-1867903-1580059.png" alt="" />
           </div>

          <div className = "modal">
            { user ? (
              <button className = "btn" type="button" onClick = {() => auth.signOut()} >
                Logout
              </button>
               ) : (
              <div className = "sign_in">
                <button className = "btn" type="button" onClick={() => setOpen(true)}>
                  SignUp
                </button>
                <button className = "btn" type="button" onClick={() => setSignin(true)}>
                 SignIn
                </button>
              </div>
            )}
          </div>

          { imgUpload ? (
              <div className = "imgUpload">
              { user?.displayName ?  (
                 <ImageUpload username = {user.displayName}/> 
              ):(
                <h3 className = "h3">Sorry you need to login..</h3>
              )}
              </div>
            ):(
              <div></div>
          )}

          <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <div style={modalStyle} className={classes.paper}>
              <form className = "form" action="">
                <img className = "header_logo" src="https://pngimage.net/wp-content/uploads/2018/06/font-instagram-png-2.png" alt="" />
                <input
                   type="text" 
                   placeholder = "username"
                   value = {username}
                   onChange = {(e) => setUsername(e.target.value)}
                />
                
                <input
                   type="text" 
                   placeholder = "email"
                   value = {email}
                   onChange = {(e) => setEmail(e.target.value)}
                />

                <input
                   type="text" 
                   placeholder = "password"
                   value = {password}
                   onChange = {(e) => setPassword(e.target.value)}
                />
                
                <button onClick = { signup } className = "btn" type="submit">
                  SignUp
                </button>

              </form>
            </div>
          </Modal>

          <Modal
            open={signin}
            onClose={() => setSignin(false)}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <div style={modalStyle} className={classes.paper}>
              <form className = "form" action="">
                <img className = "header_logo" src="https://pngimage.net/wp-content/uploads/2018/06/font-instagram-png-2.png" alt="" />
                
                <input
                   type="text" 
                   placeholder = "email"
                   value = {email}
                   onChange = {(e) => setEmail(e.target.value)}
                />

                <input
                   type="text" 
                   placeholder = "password"
                   value = {password}
                   onChange = {(e) => setPassword(e.target.value)}
                />
                
                <button onClick = { signIn } className = "btn" type="submit">
                  SignIn
                </button>

              </form>
            </div>
          </Modal>


          <div className = "app">

          {posts.map(post => (
            <Post 
              username = {post.username}
              imgUrl = {post.imgUrl}
              caption = {post.caption}
            />
          ))}

          </div>
        </div>
	);
}

export default Posts;
