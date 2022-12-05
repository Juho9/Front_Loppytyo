
import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import CustomerTrainings from '../components/CustomerTrainings'

export default function CustomerList() {

    const [customers, setCustomers] = React.useState([]);

    
    React.useEffect(() => fetchData(), ([]));

    const fetchData = () => {
        fetch("https://customerrest.herokuapp.com/api/customers")
        .then(response => response.json())
        .then(data => setCustomers(data.content));
    }

    const profileData = (customer, link) => {
        fetch(link, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(res => fetchData())
        .then(err => console.error(err))
    }

    const columns = [
        {
            Header: 'Name',
            accessor: 'lastname',
            aggregate: 'count',
            Aggregated: ({ value }) => `${value} Names`,
            Cell:  row  => row.original ? row.original.lastname + ' ' + row.original.firstname : row.groupByVal
            
        },
        {
            Header: 'Email',
            accessor: 'email'
        },
        {
            Header: 'Phone',
            accessor: 'phone'
        },
        {
            sortable: false,
            filterable: false,
            Cell: row => 
                <CustomerTrainings profileData={profileData} customer={row.original} /> 
        }
    ]



 
    return(
        <div>
            <h2>Customers</h2>
            <div className="Table">
                <ReactTable data={customers} columns={columns} />
            </div>
        </div>
    )
}