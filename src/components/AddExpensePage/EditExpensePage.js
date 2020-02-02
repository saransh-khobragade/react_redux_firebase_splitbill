import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from '../ExpenseForm/ExpenseForm';
import { startEditExpense } from '../../actions/expenses';

const EditExpensePage = (props) =>{
    return(
        <div>
            <ExpenseForm   expense={props.expense}
                onSubmit={(expense)=>{
                    props.startEditExpense(props.expense.id,expense)
                    props.history.push('/')
                }}  
            />
                
        </div>  
    )
}
const mapStateToProps = (state,props) =>{
    return {
        expense: state.expenses.find((expense)=>expense.id === props.match.params.id)
    }
}
const mapDispatchToProps = (dispatch, props) => ({
    startEditExpense:(id,expense)=>dispatch(startEditExpense(id,expense)),
    startRemoveExpense:(id)=>dispatch(startEditExpense(id))
})
export default connect(mapStateToProps,mapDispatchToProps)(EditExpensePage);