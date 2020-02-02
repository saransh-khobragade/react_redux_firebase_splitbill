import React, { Component } from 'react';
import ExpenseDashboard from '../ExpenseDashboard/ExpenseDashboard'
import AddExpensePage from '../AddExpensePage/AddExpensePage'
import EditExpensePage from '../AddExpensePage/EditExpensePage'
import ExpenseGroupList from '../ExpenseGroupList/ExpenseGroupList'
import Members from '../Members/Members'
import Login from '../Login/Login'
import SignUp from '../SignUp/SignUp'
import PrivateRoute from '../AppRouter/PrivateRoute'

import { BrowserRouter,Route,Switch } from 'react-router-dom';

class AppRouter extends Component {
  render() {
    return (
      <div>        
        <BrowserRouter>
            <Switch>
              <Route path="/" component={ Login } exact={true}/>
              <Route path="/signup" component={SignUp}/>
              <PrivateRoute path="/groups" component={ExpenseGroupList} exact={true}/>
              <PrivateRoute path="/addExpense/:id" component={AddExpensePage} />
              <PrivateRoute path="/members/:id" component={Members} />
              <PrivateRoute path="/edit/:id" component={EditExpensePage} />
              <PrivateRoute path="/groupDashboard/:id" component={ExpenseDashboard} />
              <Route path="/*" component={Login} />
            </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default AppRouter;
