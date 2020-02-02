import moment from 'moment';

const getVisibleExpenses = (expenses,{text,sortBy,startDate,endDate})=>{
    return expenses.filter((expense)=>{
        const createAtMoment = moment(expense.createdAt)
        const startDateMatch = startDate ? startDate.isSameOrBefore(createAtMoment,'day'):true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(createAtMoment,'day'):true;

        const textMatch = expense.des.toLowerCase().includes(text.toLowerCase());
        return textMatch && startDateMatch && endDateMatch;
    }).sort((a,b)=>{
        if(sortBy==='date'){
            return a.createdAt < b.createdAt?-1:1;
        }else if(sortBy==='amount'){
            return a.amount<b.amount?-1:1;
        }
    })
}

export default getVisibleExpenses;