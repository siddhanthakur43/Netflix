import React, { useRef, useState } from 'react'
import Header from '../Header/Header'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { checkValidData } from '../../utils/validateData'
import { auth } from '../../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../../utils/userSlice';
import { NETFLIX_BACKGROUND, PROFILE } from '../../constant/constant';

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null)
  const name = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm)
  }

  const handleValidData = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    //Sign In/Sign Up logic
    if (!isSignInForm) {
      //SignUp Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL:  PROFILE 
          }).then(() => {
            const { uid, email, displayName, photoURL } = auth.currentUser;
            dispatch(
              addUser({
                uid: uid,
                email: email,
                displayName: displayName,
                photoURL: photoURL
              }));
          }).catch((error) => {
            setErrorMessage(error.message);
          });
        }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
    else {
      //Sign In Logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + '-' + errorMessage)
        });

    }
  }
  return (
    <div>
      <Header />
      <div className='absolute'>
        <img alt='background' src={NETFLIX_BACKGROUND} />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className='absolute p-12 w-3/12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80'>
        <h1 className='text-3xl font-bold py-4'>{isSignInForm ? "Sign In" : 'Sign Up'}</h1>
        {!isSignInForm && <input
          ref={name}
          type='text'
          placeholder='Full Name'
          className='p-4 my-4 bg-gray-700 bg-opacity-80 w-full rounded-lg'
        />}
        <input
          ref={email}
          type='text'
          placeholder='Email or mobile number'
          className='p-4 my-4 bg-gray-700 bg-opacity-80 w-full rounded-lg'
        />
        <input
          ref={password}
          type='password'
          placeholder='Password'
          className='p-4 my-4 bg-gray-700 bg-opacity-80 w-full rounded-lg'
        />
        <p className='text-red-800 font-bold py-3 text-lg'>{errorMessage}</p>
        <button className='p-2 my-6 bg-red-800 w-full rounded-lg' onClick={handleValidData}>{isSignInForm ? "Sign In" : 'Sign Up'}</button>
        <p className='py-4 cursor-pointer' onClick={toggleSignInForm} > {isSignInForm ? "New to Netflix? Sign Up Now" : 'Already registerd? Sign In Now'}</p>
      </form>
    </div>
  )
}

export default Login