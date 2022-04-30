import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import ReplyPanelBox from './reply-post-box'
import ReplyToPost from './reply-to-post';
import sendDM from './send-DM';
import checkLogin from '../utils/checkLogin';
import axios from 'axios';
import RemovePost from './remove-post';
import { Button } from 'antd';

export default class SocialPanelBox extends Component {
  constructor(props) {
    super(props);
    this.state = { userID: undefined, postID: undefined, postUserID: undefined};
  }
  componentDidMount() {
      
    let token = checkLogin();
    if (!(token == null)) {
      
      axios.post('https://my-food-saver.herokuapp.com/api/getUser/getUserData',{token: token})
        .then(res => {
          console.log(res)
          this.setState({ userID: res.data._id });
            axios.get("https://my-food-saver.herokuapp.com/api/Social_posts/load_posts").then(result => {
              
              this.setState({ posts: result.data});
              console.log(result.data);
              this.setState({postUserID: result.data._id});
              
               });
            });
       
    }
    
}

  render() {
    
    const post = this.props.posts;
    if (post.socialPost.imageLink === null){
      post.socialPost.imageLink = "/images/NO-IMAGE.PNG";
    }
    if (post.socialPost.location === null){
      post.socialPost.location("location not selected");
    }
    
    return (     
        <div class="card">
                <img src={post.socialPost.imageLink} width={400} height={400} class="card-img-top"/>
                <h5 class=" card-text"> {post.socialPost.username} {post.socialPost.entryDate} <sendDM toID={post.socialPost.userID} /> </h5>
                <p >Post: <p class="card-title" style={{fontWeight: 'bold'}}>{post.socialPost.postMessage}</p></p>
                <p >Suggested meet up Location: <p class="card-title" style={{fontWeight: 'bold'}}>{post.socialPost.location}</p></p>
                <ReplyToPost reply={post}/>
                <br></br>
                <RemovePost post={post}/>
                
                
          <h5 class="card-title"> Replies: </h5>
          {post.socialPost.replies.map((data, index) => {
              if (data) {
                return (
                  <>
                  <div key={data} class="list-group">
                    <li class="list-group-item">
                      
                      <ReplyPanelBox reply={data}/>
                      
                    </li>
                  </div>
                  </>
                )	
              }
            else{
              return null
            }
          }) }
        </div> 
        
    );
  }
  
}