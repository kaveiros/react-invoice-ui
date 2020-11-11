import React from 'react';
import { Table } from 'reactstrap'
import { Link } from 'react-router-dom'

const PaginatedTable = (props) => {

    return (
        <Table>
            <thead>
                <tr>
                    <th>ΑΦΜ</th>
                    <th>Όνομα</th>
                    <th>Αρ. Τιμολογίου</th>
                    <th>Ποσό</th>
                </tr>
            </thead>
            <tbody>
                {props.invoices.map((data, i) =>
                    <tr key={i}>
                        <td><Link to={"/details/" + data._id}>{data.afm}</Link></td>
                        <td>{data.name}</td>
                        <td>{data.billNumber}</td>
                        <td>{data.mainAmount}</td>
                    </tr>
                )}
            </tbody>
        </Table>

    )


}

export default PaginatedTable