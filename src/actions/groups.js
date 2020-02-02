import database from '../firebase/firebase'
import {addUser} from '../actions/users'

export const addGroup = (groupData ={},callback)=>{
    return (dispatch) => {
        const{
            groupName='',
            username='',
            admin=''
        } = groupData;
        const group = { name:groupName,admin:admin,members:[{userkey:admin,name:username}] };
        database.ref('groups').push(group).then((snap)=>{
            callback();
        });
    }
}

export const getGroup = (userkey,callback)=>{
    return (dispatch) => {
        database.ref('groups').once('value').then((snap)=>{
            const allgroups = snap.val()
            let groupList=[]
            for(let a in allgroups){
                if(allgroups[a].members){
                    for(let b in allgroups[a].members){
                        
                        if(allgroups[a].members[b].userkey===userkey)
                        {
                            groupList.push({group_id:a,group_name:allgroups[a].name,members:allgroups[a].members})
                            break;
                        }

                    }
                } 
            }
            callback(null,groupList)
        });
    }
}

export const updateGroupMember = (groupkey,memberEmail,callback)=>{
    return () => {
        database.ref('groups').once('value').then((snap)=>{
            const allgroups = snap.val()

            database.ref('users').orderByChild('email').equalTo(memberEmail).on("value", function(snap2) {
                
                let userDetail = snap2.val()
                for(let a in userDetail){
                    allgroups[groupkey].members.push({name:userDetail[a].name,userkey:a})
                }

                database.ref(`groups/${groupkey}`).update(allgroups[groupkey]).then((snap)=>{
                    callback(null,null)
                })
            })
            
        });
    }
}

export const updateMembers = (userkey,username,callback)=>{
    return (dispatch)=>{
        dispatch(getGroup(userkey,(err,groupList)=>{
            dispatch(addUser({user:userkey,name:username,userGroupList:groupList}))
            //callback(null,{user:a,name:username,userGroupList:groupList})
            return
        }))
    }
}