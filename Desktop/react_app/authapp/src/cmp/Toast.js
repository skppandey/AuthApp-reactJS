import React ,{useState, useEffect} from "react";
import Toast from 'react-bootstrap/Toast';
import ToastHeader from 'react-bootstrap/ToastHeader';
import ToastBody from 'react-bootstrap/ToastBody'
function Toastpop(props) {
    const [show, setShow] = useState(true);
    const [time, setTime] = useState(0);

console.log(time);
    return (

          <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded mr-2"
                alt=""
              />
              <strong className="mr-auto">{props.ToastHeader}</strong>
              <small></small>
            </Toast.Header>
            <Toast.Body>{props.ToastBody}</Toast.Body>
          </Toast>
    );
}
  export default Toastpop;