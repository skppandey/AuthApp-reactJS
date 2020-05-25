import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Toastpop from './Toast';
import Toast from 'react-bootstrap/Toast';
import ToastHeader from 'react-bootstrap/ToastHeader';
import ToastBody from 'react-bootstrap/ToastBody'


class About extends Component {
    constructor(){
        super()
        this.state = {
          contact:"",
          hobby:"",
          sports:"",
          disabled:"",
          loginError:false,
          loginMessage:"",
          toast:false
        }
        this.onSave = this.onSave.bind(this);
    }
    componentDidMount(){
        let myheaders = {
            "Content-Type": "application/json", 
            "auth-token": JSON.parse(localStorage.getItem("auth")),
            "email": localStorage.getItem("email")  
          }
        fetch('http://192.168.0.106:8080/api/user/details',
        {
          method:"GET",
          headers: myheaders
        })
        .then(response => response.json())
        .then(responseJson => { 
          this.setState({contact: responseJson.contact,
            hobby: responseJson.hobby, 
            sports: responseJson.sports,
            disabled : true,
            loginError: false,
            toast:false})
          }
        )
    }
    onSave(){
      let myheaders = {
        "Content-Type": "application/json", 
        "auth-token": JSON.parse(localStorage.getItem("auth")),
        "email": localStorage.getItem("email")
      }
      let body ={
        name: localStorage.getItem("name"),
        username:localStorage.getItem("username"),
        email:localStorage.getItem("email"),
        contact:this.state.contact,
        hobby:this.state.hobby,
        sports:this.state.sports
      }
    fetch('http://192.168.0.106:8080/api/user/details',
    {
      method:"POST",
      headers: myheaders,
      body:JSON.stringify(body)
    })
    .then(response => {
      if(response.status === 200){
        this.setState({loginError:false});
        this.setState({disabled:true});
        this.setState({toast:true})
        this.setState({loginMessage:"Details added successfully"})}
        else{
          this.setState({loginError:true})
          this.setState({loginMessage:"Something went wrong"})
        }     
    })
    }
    render() {
        return (
            <div>
              <div>
          <Toast onClose={() => {this.setState({toast:false})}} show={this.state.toast} delay={3000} autohide>
          <Toast.Header>
            <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
            <strong className="mr-auto">{this.state.loginMessage}</strong>
          </Toast.Header>
          <Toast.Body>please refresh</Toast.Body>
        </Toast>
        </div>
        <div>
              <label>Name     :</label> 
              <input type="text" value={localStorage.getItem("name")} 
              disabled = "disabled" ></input> <br />
              <label>Use Name :</label> 
              <input type="text" value={localStorage.getItem("username")}
              disabled = "disabled"></input> <br />
              <label>Email    :</label> 
              <input type="text" value={localStorage.getItem("email") } 
               disabled = "disabled"></input> <br />
              <label>Contact  :</label>
              <input type="text" value={this.state.contact} onChange={(e) => this.setState({contact:e.target.value})}
              disabled = {(this.state.disabled)? "disabled" : ""}></input> <br />
              <label>Hobby    :</label> 
              <input type="text" value={this.state.hobby} onChange={(e) => this.setState({hobby: e.target.value})}
              disabled = {(this.state.disabled)? "disabled" : ""}></input> <br />
              <label>Sports   :</label> 
              <input type="text" value={this.state.sports} onChange={(e) => this.setState({sports: e.target.value})}
              disabled = {(this.state.disabled)? "disabled" : ""}></input> <br />
              <button onClick={this.onSave} disabled = {(this.state.disabled)? "disabled" : ""}>Save Details</button>
              <button onClick={() => this.setState({disabled:false})} >Edit Details</button>
              <button onClick={() => this.setState({disabled:true})} >Cancel</button>
              </div>
            </div>
        );
    }
}

export default About;