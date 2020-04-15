import React, { Component } from 'react'
import {Grid} from 'semantic-ui-react'
import MessagesContainer from './MessagesContainer'
import InputContainer from './InputContainer'
import './ChatPage.css'
import axios from 'axios'
import openSocket from 'socket.io-client'
export default class ChatPage extends Component {
    constructor(props){
        super(props);
        this.state={
            messages:[],
            socket: openSocket("http://localhost:8080")
        }

        this.state.socket.on("new-message",(message)=>{
            let currentMessages=this.state.messages;
            currentMessages.push(message);
            this.setState({
                messages:currentMessages
            })
        })
    }
    componentDidMount(){
      axios.get("http://localhost:8080/api/message").then(res=>{
        //  console.log(res.data)
      this.setState({messages:res.data.message})
     
    }
      ).catch(err=>console.log(err))
    }
    render() {
        return (
            <Grid>
                <Grid.Column width={4} />
                <Grid.Column width={8} >
                    <Grid.Row className="message-container" >
         
                        {this.state.messages.length>0 ?
                        
                        <MessagesContainer messages={this.state.messages}></MessagesContainer>
                        :<div>No Message</div>}
                    </Grid.Row>
                    <Grid.Row>
                        <InputContainer handleSubmit={this.handleSubmit}></InputContainer>
                    </Grid.Row>
                </Grid.Column>
                <Grid.Column width={4} />

            </Grid>
        )
    }

    handleSubmit=(sender,content)=>{
        const message={
            sender:sender,
            content:content
        }
        axios.post('http://localhost:8080/api/message',message).then(this.state.socket.emit("new-message",message)).catch(err=>console.log(err))
    }
}
