// @flow strict

import React, {Component} from 'react';
import IdleTimerContainer from './IdleTimerContainer';
// import {Modal} from 'react-bootstrap';
import Modal from 'react-modal';
import ImageUploader from 'react-images-upload';
import pic from '../images/maxresdefault.jpg';

Modal.setAppElement('#root');
class Home extends Component {
    constructor(){
        super()
        this.state={
            ToastHeader:"Logged In",
            ToastBody:"WElcome to the innovation",
            visible:false,
            profileImage:{},
            profileVisible:false
        }
        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }
     componentDidMount(){
      let myheaders = {
        "email": localStorage.getItem("email")  
      }
    fetch('http://192.168.0.106:8080/api/user/upload',
    {
      method:"GET",
      headers: myheaders
    })
    .then((response) => response.blob())
    .then(image => {
      console.log(image)
      if(image.type === "image/jpeg"){
      this.setState({profileImage:URL.createObjectURL(image),
                     profileVisible :true}) 
      }
    })
    .catch((error) => console.log("error", error));
    
     }
     
    showModal(){
        this.setState({
          visible: true
        });
      };
    
      handleOk(e){
        console.log(this.state.profileImage)
        this.setState({
          visible: false
        });
      };
    
      handleCancel(e){
        this.setState({
          visible: false
        });
      };
      onDrop(profileImage) {
        console.log(profileImage);
        this.setState({
            profileImage: URL.createObjectURL(profileImage[0]),
            profileVisible :true
        });
        let formdata = new FormData(); 
        formdata.append('email', localStorage.getItem("email"));
        formdata.append('photo', profileImage[0]);

        fetch('http://192.168.0.106:8080/api/user/upload',
        {
          method:"POST",
          body:formdata
        })
        .then(response => response.json())
        .catch((error) => {
          console.log(error)
        })
    }
    render() {
        return (
            <div>  
        <Modal title="Select the Profile pic" isOpen={this.state.visible}>
            <h2>Select the Profile Picture</h2>
            {/* <input type="file" scr={this.state.profileImage}></input> */}
            <ImageUploader
                withIcon={true}
                buttonText='Choose images'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
            />
            <button onClick={this.handleOk}>ok</button>
            <button onClick={this.handleCancel}>Close</button>    
        </Modal>
              
                <IdleTimerContainer />
                <div>
                <figure className="snip1376">
                <button className="Pbutton" onClick={this.showModal}>
                {/* <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample17.jpg" alt="sample17" /> */}
                    {
                this.state.profileVisible === true ?
                <img src={this.state.profileImage} alt="Preview" /> :
                <img src={pic} alt="sample17" />
            
    }  
  </button>
  <figcaption>
        <h2>{localStorage.getItem("name")}</h2>
    <p>I'm looking for something that can deliver a 50-pound payload of snow on a small feminine target. Can you suggest something? Hello? </p>
    <div class="icons">
      <a href="#"><i class="ion-social-reddit-outline"></i></a>
      <a href="#"> <i class="ion-social-twitter-outline"></i></a>
      <a href="#"> <i class="ion-social-vimeo-outline"></i></a>
    </div>
  </figcaption>
</figure>
</div>
  </div>
        );
    }
}

export default Home;