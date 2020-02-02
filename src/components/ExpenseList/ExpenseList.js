import React from 'react'
import {connect} from 'react-redux'
import ExpenseListItem from '../ExpenseListItem/ExpenseListItem'
import selectExpnese from '../../selectors/expenses'

const ExpenseList = (props) =>{
    return(
        <div>
            {props.expenses.map((expnese)=>{
                return <ExpenseListItem key={expnese.id} {...expnese}/>
            })}
        </div>
    )
    
};

const mapStateToProps = (state) =>{
    return{
        expenses:selectExpnese(state.expenses,state.filter)
    };
};

export default connect(mapStateToProps)(ExpenseList);