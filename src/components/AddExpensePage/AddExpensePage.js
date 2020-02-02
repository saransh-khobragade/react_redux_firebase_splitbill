import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from '../ExpenseForm/ExpenseForm';
import { startAddExpense } from '../../actions/expenses';
import Headers from '../Header/Header'
import { Link } from 'react-router-dom';


const AddExpensePage = (props) =>{
    return(
        <div>
            <Headers/>
            <Link to="/groups">Groups</Link>

            <h2>Add Group Expense</h2>

            <ExpenseForm
                onSubmit={(expense)=>{
                    props.dispatch(startAddExpense(expense));
                    props.history.push(`/groupDashboard/${props.match.params.id}`);     //When router is ready use it,every back press will go to /
                }}
                group_id={props.match.params.id}
            />
        </div>  
    ) 
}
// const mapDispatchToProps = (dispatch) =>{
//     startAddExpense:(expense)=>dispatch(startAddExpense(expense))
// };

//export default connect(undefined,mapDispatchToProps)(AddExpensePage);
export default connect()(AddExpensePage);