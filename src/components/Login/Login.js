import React from 'react';
import { Link } from 'react-router-dom';
import {searchUser,addUser} from '../../actions/users'
import { connect } from 'react-redux'

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email:'saransh98@gmail.com',
            password:'12345'
        };
        this.checkUser=this.checkUser.bind(this)
        
    }
    checkUser(){
        this.props.dispatch(searchUser({'email':this.state.email,'password':this.state.password},(err,userObj)=>{
            if(err){
                console.log('err')
            }else{
                this.props.dispatch(addUser(userObj))
                this.props.history.push('/groups')
            }
        }));
    }
    render(){
        return (
            <div>
                <h1>Login</h1>
                <input type="text" placeholder="Email" value={this.state.email} onChange = {(e) => this.setState({email:e.target.value})}/>
                <input type="text" placeholder="Password" value={this.state.password} onChange = {(e) => this.setState({password:e.target.value})}/>
                <button onClick={this.checkUser} >Login</button>
                <button>
                    <Link to={`/signup`}>
                        Sign Up
                    </Link>
                </button>
            </div>
        )
    }
}

export default connect()(Login);
