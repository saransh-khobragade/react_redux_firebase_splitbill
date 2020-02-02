const expensesReducerDefaultState=[]
const expenseReducer = (state = expensesReducerDefaultState,action)=>{
    switch (action.type){
        case 'ADD_EXPENSE':
            return [...state,action.expense];
        case 'REMOVE_EXPENSE':
            return state.filter((x)=>{
                return x.id!==action.id?true:false
            })
        case 'EDIT_EXPENSE':
            return state.map((expense)=>{
                if(expense.id===action.id){
                    return {
                        ...expense,
                        ...action.updates
                    }
                }
                else return expense
            })
        case 'SET_EXPENSES':
            return action.expenses;
        default:
            return state;
    }
}

export default expenseReducer;