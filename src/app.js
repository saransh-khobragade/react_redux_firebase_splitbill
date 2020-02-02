import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import AppRouter from './components/AppRouter/AppRouter'

import {startSetExpenses} from './actions/expenses'
import {setFilter} from './actions/filter'

import './firebase/firebase'

import getVisibleExpenses from './selectors/expenses'

const store = configureStore()

// store.dispatch(addExpense({des:'Water Bill',amount:200,createdAt:1000}))
// store.dispatch(addExpense({des:'Gas Bill',amount:100,createdAt:8000}))
// store.dispatch(addExpense({des:'Cook',amount:300,createdAt:4000}))
// store.dispatch(addExpense({des:'Petrol',amount:800,createdAt:100}))

//store.dispatch(setFilter({text:'bill'}))


const state = store.getState()

const visibleExpense = getVisibleExpenses(state.expenses,state.filter)
console.log(visibleExpense)

const jsx =(                    //used to wrap reducer around whole app
    <Provider store={store}>
        <AppRouter />
    </Provider>
)

// ReactDOM.render(<h4>Loading</h4>,document.getElementById('root'));

// store.dispatch(startSetExpenses()).then(()=>{
//     ReactDOM.render(jsx,document.getElementById('root'));
// })

//localhost
ReactDOM.render(jsx,document.getElementById('root'));

