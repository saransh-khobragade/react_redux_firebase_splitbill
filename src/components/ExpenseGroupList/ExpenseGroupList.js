import React from 'react';
import ExpenseGroupItem from '../ExpenseGroupItem/ExpenseGroupItem'
import OneToOne from '../OneToOne/OneToOne'
import { addGroup } from '../../actions/groups'
import { updateUser } from '../../actions/users'
import { connect } from 'react-redux'
import Headers from '../Header/Header'


class ExpenseGroupList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name:''
        };
        this.onSubmit=this.onSubmit.bind(this)
    };
    onSubmit(e){
        e.preventDefault();
        if(!this.state.name){
            this.setState(()=>({ error:'Please enter something'}));
        }else{
            this.props.dispatch(addGroup({groupName:this.state.name,username:this.props.live_user.name,admin:this.props.live_user.user},()=>{
                this.props.dispatch(updateUser(this.props.live_user.user,this.props.live_user.name))
                this.setState({name:''})
            }));
        }
    }
    render(){
        return(
            <div>
                <Headers/>
                {this.state.error && <p>{this.state.error}</p>} 
                <h2>You owe</h2>
                <OneToOne/>
                <h1>Groups</h1>
                <form onSubmit={this.onSubmit}>
                    <input
                        type="text"
                        autoFocus
                        placeholder="Enter Group Name"
                        value={this.state.name}
                        onChange = {(e) => this.setState({name:e.target.value})}
                    />
                    <button>Add group</button>
                    {   this.props.live_user.userGroupList.map((group) => {
                            return <ExpenseGroupItem key={group} data={group} />
                    })}
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
export default connect(mapStateToProps)(ExpenseGroupList);
