import React, { Component } from 'react'
import {Form,Button} from 'semantic-ui-react'
//import axios from 'axios'
//import openSocket from 'socket.io-client'
export default class InputContainer extends Component {
    constructor(props){
        super(props)
        this.state={
            sender:"",
            content:"",
            messages:[],
          //  socket:openSocket("http://localhost:8080")
        }

        // this.state.socket.on("new-message",(message)=>{
        //     let currentMessages=this.state.messages;
        //     currentMessages.push(message);
        //     this.setState({
        //         messages:currentMessages
        //     })
        // })
    }
    handleSubmit=()=>{
        // const messages={
        //     sender:this.state.sender,
        //     content:this.state.content
        // }
        // axios.post('http://localhost:8080/api/message',messages).then(this.state.socket.emit("new-message",messages)).catch(err=>console.log(err))
        this.props.handleSubmit(this.state.sender,this.state.content)        
        this.setState({sender:"",content:""})
        
    }
    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Input placeholder="name" value={this.state.sender} onChange={(e)=>this.setState({sender:e.target.value})} required></Form.Input>
                <Form.Input required placeholder="Type your Message Here" value={this.state.content} onChange={(e)=>{this.setState({content:e.target.value})}}></Form.Input>
                <Button type="submit">Send</Button>
            </Form>
        )
    }
}
