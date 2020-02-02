import React from 'react';
import { startAddUser } from '../../actions/users'
import {connect} from 'react-redux'
import Headers from '../Header/Header'

class SignUp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name:'saransh',
            email:'saransh98@gmail.com',
            password:'12345'
        };
        this.onSubmit=this.onSubmit.bind(this)
    };
    onSubmit(e){
        e.preventDefault();
        if(!this.state.email || !this.state.password){
            this.setState(()=>({ error:'Please enter something'}));
        }else{
            this.props.dispatch(startAddUser({name:this.state.name,email:this.state.email,password:this.state.password},()=>{
                this.props.history.push('/')
            }))
            
        }
    }
    render(){
            return(
                <div>
                    <Headers/>
                    {this.state.error && <p>{this.state.error}</p>} 
                    <form onSubmit={this.onSubmit}>
                        <input
                            type="text"
                            autoFocus
                            placeholder="Name"
                            value={this.state.name}
                            onChange = {(e) => this.setState({name:e.target.value})}
                        />
                        <input
                            type="text"
                            autoFocus
                            placeholder="Email"
                            value={this.state.email}
                            onChange = {(e) => this.setState({email:e.target.value})}
                        />
                        <input
                            type="text"
                            placeholder="Password"
                            onChange = {(e) => this.setState({password:e.target.value})}
                            value={this.state.password}
                        />
                        <button>Sign up</button>
                    </form>
                </div>
            )
    }
}

export default connect()(SignUp);