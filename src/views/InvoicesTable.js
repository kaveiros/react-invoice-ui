import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Alert, Table, Spinner, Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import * as ApiActions from '../api/ApiActions'
import { Link } from 'react-router-dom'


class InvoicesTable extends Component {

    constructor(){
        super()
        this.state = {
            items: [], //Customer Debt Items,
            pageItems: [],
            page: 0,
            pageSize: 1000

        }
    }


    componentDidMount() {
       this.props.onLoadInvoices()
      // this.setState({pageItems: this.props.onLoadInvoices().slice(0, this.state.pageSize)})
        
    }

    componentDidUpdate() {
        
    }

    render() {
        const { loading,  invoices } = this.props;


        if (!loading) {

            const pages = Math.ceil(invoices.length / this.state.pageSize);
            const arrayOfPages = new Array(pages).fill("")
            console.log(arrayOfPages.fill(' '))
            const paginationItems = arrayOfPages.map((i, index) => 
                <PaginationItem key={index} active={this.state.page === index}>
              <PaginationLink tag="button" onClick={() => this.setState({page: index })}>{index}</PaginationLink> 
             </PaginationItem>
    
            )

            
            // this.setState({pageItems: invoices.slice(0, this.state.pageSize)})

            return (


                <div>
                    <Table>
                        <thead>
                            <tr>
                                <th>ΑΦΜ</th>
                                <th>Όνομα</th>
                                <th>Αρ. Τιμολογίου</th>
                                <th>Υπόλοιπο</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.invoices.map((data, index) =>
                                    <tr key={index}>
                                        <td><Link to={"/details/" + data._id}>{data.afm}</Link></td>
                                        <td>{data.name}</td>
                                        <td>{data.billNumber}</td>
                                        <td>{data.mainAmount}</td>

                                    </tr>
                                )}


                        </tbody>
                    </Table>
                    <nav>
                        <Pagination>
                            <PaginationItem onClick={() => this.setState(prev => ({ page: prev.page - 1 }))}>
                                <PaginationLink>
                                    Back
                                </PaginationLink>
                            </PaginationItem>
                            {paginationItems}
                            <PaginationItem onClick={() => this.setState(prev => ({ page: prev.page + 1 }))}>
                                <PaginationLink next tag="button">
                                    Next
                                </PaginationLink>
                                
                            </PaginationItem>
                        </Pagination>
                    </nav>
                </div>
            )

        }
        else {

            return (
                <Alert>
                    <div>
                        <Spinner type="grow" color="primary" />
                        <Spinner type="grow" color="secondary" />
                        <Spinner type="grow" color="success" />
                        <Spinner type="grow" color="danger" />
                        <Spinner type="grow" color="warning" />
                        <Spinner type="grow" color="info" />
                        <Spinner type="grow" color="light" />
                        <Spinner type="grow" color="dark" />
                    </div>
                </Alert>
            )


        }

    }

}

const mapStateToProps = (state) => {

    return {
        invoices: state.InvoiceReducer.invoices,
        loading: state.InvoiceReducer.loading,
        error: state.InvoiceReducer.error
    }
}

const mapDispatchToProps = dispatch => {
    return {

        onLoadInvoices: () => dispatch(ApiActions.loadInvoices())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(InvoicesTable)
