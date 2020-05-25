import React, {useState,useRef, useEffect} from 'react';
import IdleTimer from 'react-idle-timer';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function IdleTimerContainer(props) {
    

    const[isLoggedIn, setIsLoggedIn] = useState(true);
    const [modalIsOpen, setmodalIsOpen] = useState(false)
    const idleTimerRef = useRef(null);
    const sessionTimeoutRef = useRef(null);
    const user = localStorage.getItem("email");
    const onIdle = () => {
       setmodalIsOpen(true);
       sessionTimeoutRef.current = setTimeout(logOut, 50000);
    }
    const stayActive = () => {
        setmodalIsOpen(false)
        clearTimeout(sessionTimeoutRef.current);
        console.log('user is active')
    }
    const logOut = () => {
        setmodalIsOpen(false)
        setIsLoggedIn(false)
        localStorage.setItem("auth", null)
        localStorage.setItem("email", null)
        localStorage.setItem("name", null)
        localStorage.setItem("username", null)
        clearTimeout(sessionTimeoutRef.current);  
        console.log('user is logged out')
    }
  return (
    <div>
        {
            isLoggedIn ? <div><h2>Hello</h2><p2>You are Logged In</p2></div> : <h2>Logged Out</h2>
        }
        <Modal isOpen={modalIsOpen}>
            <h2>YOu have been idle for a while</h2>
            <p2>You will be logged out soon</p2>
            <button onClick={logOut}>Log me out</button>
            <button onClick={stayActive}>Keep me alive</button>    
        </Modal>
       <IdleTimer ref={idleTimerRef} timeout={5 * 5000} onIdle={onIdle}></IdleTimer>
    </div>
  );
}


export default IdleTimerContainer
