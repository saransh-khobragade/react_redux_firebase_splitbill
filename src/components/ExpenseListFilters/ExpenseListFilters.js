import React from 'react'
import { connect } from 'react-redux'
import { setFilter, sortByDate,sortByAmount,setStartDate,setEndDate } from '../../actions/filter'
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

class ExpenseListFilters extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            calendarFocused:null
        };
        this.onDateChange=this.onDateChange.bind(this)
        this.onFocusChange=this.onFocusChange.bind(this)
    };
    onDateChange = ({startDate,endDate})=>{
        this.props.dispatch(setStartDate(startDate))
        this.props.dispatch(setEndDate(endDate))
    }
    onFocusChange = ( calendarFocused ) =>{
        this.setState((state,prev)=>{
            return {
                calendarFocused:calendarFocused
            }
        })
    }
    render(){
        return(
            <div>
                <input type="text" value={this.props.filter.text} placeholder="Search bills" onChange={(e)=>{
                    this.props.dispatch(setFilter({"text":e.target.value}));
                }}/>
                <select
                    value={this.props.filter.sortBy}
                    onChange={(e)=>{
                        if(e.target.value==='date'){
                            this.props.dispatch(sortByDate({'sortBy':'date'}));
                        }else if(e.target.value==='amount'){
                            this.props.dispatch(sortByAmount({'sortBy':'amount'}));
                        }
                    }}>
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
        
                </select>
                <DateRangePicker
                    startDateId="startDate"
                    endDateId="endDate"
                    startDate={this.props.filter.startDate}
                    endDate={this.props.filter.endDate}
                    onDatesChange={this.onDateChange}
                    focusedInput={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    showClearDates={true}
                    numberOfMonths={1}
                    isOutsideRange={()=>false}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        filter:state.filter
    };
};

export default connect(mapStateToProps)(ExpenseListFilters);