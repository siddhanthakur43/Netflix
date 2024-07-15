import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react'
import { auth } from '../../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../../utils/userSlice';
import { NETFLIX_LOGO, SUPPORTED_LANGUAGES } from '../../constant/constant';
import { toggleisGptSearchView } from '../../utils/gptSlice';
import { changePreferredLanguage } from '../../utils/appConfigSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, gpt } = useSelector((store) => store);
  const { showGptSearch } = gpt;
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
  const handleGptSearchClick = () => {
    dispatch(toggleisGptSearchView())
  };
  const handleLanguageChnage = (e) => {
    console.log(e.target.value);
    dispatch(changePreferredLanguage(e.target.value));
  };

  return (
    <>
      <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col justify-between md:flex-row'>
        <div>
          <img alt='logo' className='w-44 mx-auto md:mx-0' src={NETFLIX_LOGO} />
        </div>
        {
          user && (<div className='flex'>
            {
              showGptSearch &&
              (
                <select className='m-4 px-4 bg-gray-900 text-white' onChange={handleLanguageChnage}>
                  {
                    SUPPORTED_LANGUAGES.map(lang =>
                      <option key={lang.identifier} value={lang.identifier}>
                        {lang.name}
                      </option>
                    )
                  }
                </select>
              )
            }
            <button
              onClick={handleGptSearchClick}
              className='px-2 py-1 m-4 bg-white bg-gradient-to-r font-semibold from-black rounded-md opacity-45 text-white'>
              {showGptSearch ? 'HomePage' : 'GPT Search'}
            </button>
            <img className='h-10 w-10 mt-4' alt='userlogo' src={user?.photoURL} />
            <button className='font-bold text-white p-2' onClick={handleLogout}>Sign Out</button>
          </div>)}
      </div>
    </>
  )
}

export default Header