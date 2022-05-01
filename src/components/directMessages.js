import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import checkLogin from '../utils/checkLogin';
import DMCollection from './collection.DMs';

export default class directMessages extends Component {
  constructor(props) {
    super(props);
    this.state = { blocked: undefined, messages: undefined};
  }
  
  componentDidMount() {
      
      let token = checkLogin();
      
      if (!(token == null)) {
        this.setState({ loggedIn: true });

        axios.post('https://my-food-saver.herokuapp.com/api/getUser/getUserData',{token: token})
          .then(res => {
              const ID = res.data._id
              axios.post('https://my-food-saver.herokuapp.com/api/directMessage/load_DMs', {ID:ID})
                .then(result=>{
                  this.setState({messages: result})
                  console.log(this.state.messages)
                })

          });
        
      }
  }

  render() {
    const { isLoading, messages } = this.state;
    if (isLoading) {
      return <img class="rounded mx-auto d-block" src="/images/LOADING.gif"/>;
    } 

    return (
    <div class="container">
        <br />
        <br />
        <h3> Your DMs </h3>
        <DMCollection messages={messages} />
        <br />
        <br />

    </ div>
    );
  }
  
}