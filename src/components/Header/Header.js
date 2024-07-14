import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react'
import { auth } from '../../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../../utils/userSlice';
import { NETFLIX_LOGO } from '../../constant/constant';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL
          }));
        navigate('/browse')
      } else {
        dispatch(removeUser());
        navigate('/')
      }
    });
    // unsubscribe when component is unmout 
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
      navigate('/error')
    });
  }
  return (
    <>
      <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
        <div>
          <img alt='logo' className='w-44' src={NETFLIX_LOGO} />
        </div>
        {user && (<div className='flex'>
          <img className='h-10 w-10 mt-4' alt='userlogo' src={user?.photoURL} />
          <button className='font-bold text-white p-2' onClick={handleLogout}>Sign Out</button>
        </div>)}
      </div>
    </>
  )
}

export default Header