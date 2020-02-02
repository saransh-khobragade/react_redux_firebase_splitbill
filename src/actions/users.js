import database from '../firebase/firebase'
import {getGroup} from '../actions/groups'

export const addUser =(userobj)=>({
    type:'ADD_USER',
    live_user:userobj
});

export const startAddUser = (userData ={},callback)=>{
    return (dispatch) => {
        const{
            name='',
            email='',
            password=''
        } = userData;
        const user = { name,email,password };
        database.ref('users').push(user).then((ref)=>{
            callback()
        })
    }
}

export const searchUser = (user={},callback) => {
    return (dispatch) => {
        return database.ref('users').orderByChild('email').equalTo(user.email).on("value", function(snapshot) {
            for(let a in snapshot.val()){
                if(snapshot.val()[a].password===user.password){
                    const username=snapshot.val()[a].name
                    
                    dispatch(getGroup(a,(err,groupList)=>{
                        dispatch(addUser({user:a,name:username,userGroupList:groupList}))
                        callback(null,{user:a,name:username,userGroupList:groupList})
                        return
                    }))
                    //callback(null,a)
                }
            }
        });
    }
}

export const updateUser = (userkey,username,callback)=>{
    return (dispatch)=>{
        dispatch(getGroup(userkey,(err,groupList)=>{
            dispatch(addUser({user:userkey,name:username,userGroupList:groupList}))
            //callback(null,{user:a,name:username,userGroupList:groupList})
            return
        }))
    }
}