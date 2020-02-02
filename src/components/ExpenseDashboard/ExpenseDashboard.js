import React, { Component } from 'react';
import ExpenseList from '../ExpenseList/ExpenseList'
import ExpenseListFilter from '../ExpenseListFilters/ExpenseListFilters'
import Headers from '../Header/Header'
import { Link } from 'react-router-dom';


const ExpenseDashboard = (props) =>{
    return(
        <div>
            <Headers/>
            <Link to="/groups">Groups</Link>
            <h2>Group Expense Dashboard</h2>
            <Link to={`/members/${ props.match.params.id}`}>Members</Link><br/>
            <Link to={`/addExpense/${ props.match.params.id}`}>Add Expense</Link>
            
            <h3>Expense list</h3>
            <ExpenseListFilter/>
            <ExpenseList/>
        </div>
    )  
};

export default ExpenseDashboard;