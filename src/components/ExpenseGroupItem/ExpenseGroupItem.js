import React from 'react';
import { Link } from 'react-router-dom';


const ExpenseGroupItem = (props) => {
    return (
        <div>
            <Link to={`/groupDashboard/${props.data.group_id}`}>
                <span>{props.data.group_name}</span>
            </Link>
        </div>
    )
}
export default ExpenseGroupItem;
