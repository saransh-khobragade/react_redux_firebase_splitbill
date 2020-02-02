const usersReducerDefaultState=[]
const usersReducer = (state = usersReducerDefaultState,action)=>{
    switch (action.type){
        case 'ADD_USER':
            return action.live_user;
        default:
            return state;
    }
}

export default usersReducer;