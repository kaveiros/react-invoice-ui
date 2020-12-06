import React from 'react';
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'

const PaginatedTable = ({invoices}) => {

    return (
        <Table>
            <thead>
                <tr>
                    <th>ΑΦΜ</th>
                    <th>Όνομα</th>
                    <th>Αρ. Τιμολογίου</th>
                    <th>Ποσό</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {invoices.map((data, i) =>
                    <tr key={i}>
                        <td><Link to={"/details/" + data._id}>{data.afm}</Link></td>
                        <td>{data.name}</td>
                        <td>{data.billNumber}</td>
                        <td>{data.mainAmount}</td>
                        <td><Link to={"/edit/" + data._id}>τροποποίηση</Link></td>
                    </tr>
                )}
            </tbody>
        </Table>

    )


}

export default PaginatedTable