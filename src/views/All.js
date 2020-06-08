import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Alert, Spinner } from 'reactstrap'
import * as ApiActions from '../api/ApiActions'
import FilterableTable from 'react-filterable-table'

class All extends Component {


    componentDidMount() {
        this.props.onLoadInvoices()
        //console.log(this.props);
    }




    render() {
        // const {error} = this.props


        let fields = [
            { name: 'afm', displayName: "ΑΦΜ", inputFilterable: true, sortable: true },
            { name: 'name', displayName: "Όνομα", inputFilterable: true, exactFilterable: true, sortable: true },
            { name: 'mainAmount', displayName: "Ποσό", inputFilterable: true, exactFilterable: true, sortable: true },
            { name: '_id', displayName: "ID" , render: <a href="#"/>}
        ];





        return (
                <FilterableTable namespace="Invoices"
                    tableClassName="table table-dark"
                    pagerTitles={
                        <li class="page-item">
      <span class="page-link">Previous</span>
    </li>,
                            <li class="page-item">
                            <span class="page-link">Previous</span></li>
                    }
                    //pagerTopClassName="pagination, page-item, page-link" 
                    initialSort="afm"
                    footerTrClassName="page-item"
                    className="container"
                    dataEndpoint="http://localhost:3000/invoice/all"
                    fields={fields}
                    serverErrorMessage={
                        <Alert color="danger">
                            <p>Προέκυψε κάποιο σφάλμα</p>
                        </Alert>}
                    roRecordsMessage={
                        <Alert color="danger">
                            <p>Προέκυψε κάποιο σφάλμα</p>
                        </Alert>}
                    noFilteredRecordsMessage={
                        <Alert color="warning">
                            <p>Δεν βρέθηκαν Τιμολόγια</p>
                        </Alert>}
                    pagerBottomClassName="pagination"
                    loadingMessage={<div>
                        <Spinner type="grow" color="primary" />
                        <Spinner type="grow" color="secondary" />
                        <Spinner type="grow" color="success" />
                        <Spinner type="grow" color="danger" />
                        <Spinner type="grow" color="warning" />
                        <Spinner type="grow" color="info" />
                        <Spinner type="grow" color="light" />
                        <Spinner type="grow" color="dark" />
                    </div>}

                />




            //     <div>

            //     {this.props.error && (

            //         <Alert color="danger">
            //             <p>Error occured fetching invoices</p>
            //         </Alert>
            //     )

            // }
            // {this.props.loading &&
            //     (
            //         <Alert color="dark">
            //             <p>Loading.....</p>
            //         </Alert>
            //     )

            // }

            // {!this.props.invoices &&
            //     (
            //         <Alert color="dark">
            //             <p>Loading.....</p>
            //         </Alert>
            //     )        
            // }
            // {console.log(this.props)}
            // {!error && (
            //     <Table>
            //     <thead>
            //         <tr>
            //             <th>ΑΦΜ</th>
            //             <th>Όνομα</th>
            //             <th>Αρ. Τιμολογίου</th>
            //             <th>Υπόλοιπο</th>
            //         </tr>
            //     </thead>
            //     <tbody>
            //         {
            //             this.props.invoices.map((data, index) =>
            //                 <tr key={index}>
            //                     <td><Link to={"/details/" + data._id}>{data.afm}</Link></td>
            //                     <td>{data.name}</td>
            //                     <td>{data.billNumber}</td>
            //                     <td>{data.mainAmount}</td>

            //                 </tr>
            //             )}


            //     </tbody>
            // </Table>

            // )

            // }




            //     </div>
        )




    }


}



const mapStateToProps = (state) => {

    return {
        invoices: state.InvoiceReducer.invoices,
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {

        onLoadInvoices: () => dispatch(ApiActions.loadInvoices())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(All)