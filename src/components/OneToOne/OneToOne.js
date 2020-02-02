import React from 'react';
import { getAllExpenses } from '../../actions/expenses'
import { connect } from 'react-redux'

class OneToOne extends React.Component {
    constructor(props){
        super(props);
            this.state = {
                one_to_one:[]
        };        
    }
    componentWillMount(){
        getAllExpenses((err,result)=>{
            let shares=[]
            for(let a in result){
                shares.push(result[a].shares)
            }
            
            let expense=[]
            let length 
            
            shares.map((x)=>{
                x.map((y)=>{
                    let index = expense.findIndex((z)=>z.name===y.name)
                    if(index==-1){
                        expense.push({name:y.name,amount:Number(y.amount)})
                    }else{
                        expense[index].amount +=Number(y.amount)
                    }
                })
            })

            const med = expense.reduce((x,y)=>x+Number(y.amount),0)/expense.length
            
            let hisab=[]
            expense.map((x)=>{
                hisab.push(x.amount>med?{name:x.name,take:x.amount-med,give:0}:{name:x.name,take:0,give:med-x.amount})
            })
            
            const max_give = (arr)=>{
                let max = 0,ele={}
                arr.forEach((element,index) => {
                    if(element.give>max){
                        element['index']=index
                        ele = element
                        max=element.give
                    }
                });
                return Object.keys(ele).length===0?{give:0}:ele;
            }
            const max_take = (arr)=>{
                let max = 0,ele={}
                arr.forEach((element,index) => {
                    if(element.take>max){
                        element['index']=index
                        ele = element
                        max = element.take
                    }
                });
                return Object.keys(ele).length===0?{take:0}:ele
            }
            
            let one_to_one=[]
            while(hisab.length>1){
                if(max_give(hisab).give > max_take(hisab).take){
                    console.log(max_give(hisab))
                    one_to_one.push({"from":max_give(hisab).name,"to":max_take(hisab).name,"amount":max_take(hisab).take})
                    hisab[max_give(hisab).index].give = max_give(hisab).give-max_take(hisab).take
                    hisab.splice(max_take(hisab).index,1)
                    //console.log(hisab)
            
                }
                else{
                    
                    console.log(max_take(hisab).take-max_give(hisab).give)
                    one_to_one.push({"from":max_give(hisab).name,"to":max_take(hisab).name,"amount":max_give(hisab).give})
                    hisab[max_take(hisab).index].take = max_take(hisab).take-max_give(hisab).give
                    hisab.splice(max_give(hisab).index,1)
                    //console.log(hisab)
                }
            }
            console.log("ultimate_hisab",one_to_one)
            this.setState(()=>({one_to_one:one_to_one}))
        })
        
    }
    render(){
        return (
            <div>
                {
                    this.state.one_to_one.map((x)=>{
                        return <div>{x.from} owe {x.to} = {x.amount}</div>
                    })
                }
            </div>
        )
    }
}

export default connect()(OneToOne);
