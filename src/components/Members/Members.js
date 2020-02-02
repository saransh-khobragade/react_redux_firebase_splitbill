import React from 'react';
import Headers from '../Header/Header'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateGroupMember,updateMembers } from '../../actions/groups'
class Members extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name:''
        };
        this.onSubmit=this.onSubmit.bind(this)
    };
    onSubmit(e){
        e.preventDefault()
        this.props.dispatch(updateGroupMember(this.props.match.params.id,this.state.name,(err,result)=>{
            if(err){

            }else{
                this.props.dispatch(updateMembers(this.props.live_user.user,this.props.live_user.name,this.props.live_user.userGroupList))
            }
        }))
    }
    render(){
        return (
            <div>
                <Headers/>
                <Link to="/groups">Groups</Link>
                <h3>Members list</h3>
                {
                    this.props.live_user.userGroupList.filter((x)=>{
                        if(x.group_id===this.props.match.params.id){
                            return x
                        }else{
                            return null
                        }
                    })[0].members.map((y)=>{
                        return <div key={y.name}>{y.name}</div>
                    })
                }
                <br/>
                <form onSubmit={this.onSubmit}>
                        <input
                            type="text"
                            autoFocus
                            placeholder="Enter member email"
                            value={this.state.name}
                            onChange = {(e) => this.setState({name:e.target.value})}
                        />
                        <button>Add member</button>
                </form>
    
            </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return{
        live_user:state.live_user
    };
};
export default connect(mapStateToProps)(Members);
