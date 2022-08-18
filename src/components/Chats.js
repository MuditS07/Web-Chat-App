import React, {useRef, useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../firebase';
import axios from 'axios';

import { useAuth } from '../contexts/AuthContext';

const Chats = () => {

  const history = useHistory();
  const {user} = useAuth();
  const[loading,setLoading]= useState(true);


  const handleLogout = async () =>
  {
     await auth.signOut();

     history.push('/');

  }


const getFile= async (url) => {

  const response= await fetch(url);
  const data =await response.blob();

  return new File ([data], "userPhoto.jpg", { type : 'image/jpeg'})
}


  useEffect(() => {
        if(!user){

          history.push('/');

          return;
        }
        axios.get('https://api.chatengine.io/users/me',{

          headers:{
            "projectID":"1fbbf7d7-13e6-46e2-854f-74ec8d2e6aa1",
            "user-name":user.email,
            "user-secret": user.uid,
          }
        })
        .then(() => {
          setLoading(false);
        })
        .catch(() =>{
          let formdata= new FormData();
          formdata.append('email',user.email);
          formdata.append('username',user.email);
          formdata.append('secret',user.uid);

          getFile(user.photoURL)
          .then((avatar) => {
            formdata.append('avatar',avatar,avatar.name);

            axios.post('https://api.chatengine.io/users/',formdata,
           {headers: { "private-key":"655a5034-541a-48d1-b89d-d573e3c24036"}}

          )
          .then(() =>setLoading(false))
          .catch((error) => console.log(error))
        })
        })

      }, [user, history]);

   return (
     <div className="chats-page">
       <div className="nav-bar">
         <div className="logo-tab">
           UniChat
        </div>
        <div onClick={handleLogout} className="logout-tab">
        logout
        </div>
       </div>
      <ChatEngine
          height="calc(100vh - 66px)"
          projectID="1fbbf7d7-13e6-46e2-854f-74ec8d2e6aa1"
          userName={user.email}
          userSecret={user.uid}

          />
      </div>
   );

}

export default Chats;
