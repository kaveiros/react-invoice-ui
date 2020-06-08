import React, { useEffect, useState } from 'react'
import { Alert, Input } from 'reactstrap'
import PaginatedTable from './PaginatedTable'
import axios from 'axios'
import Pagination from './Pagination'



const Rtable = () => {

    const baseUrl = "http://localhost:3000/"

    const [invoices, setInvoices] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [pages, setPages] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [page, setPage] = useState(1)





    useEffect(() => {

        const fetcthInvoices = async () => {
            console.log("Current page is  : " + currentPage)
            setLoading(true)
            axios.get(baseUrl + "invoice/all/" + currentPage)
                .then(response => {
                    const data = response.data
                    setInvoices(data.invoices)
                    setPages(data.pages)
                    setPage(data.currentPage)
                    setLoading(false)
                }).catch(error => {
                    setLoading(false)
                    setError(error.message)

                })
        }
        fetcthInvoices();


    }, [currentPage])



    
    const nextPage = () => {
        setCurrentPage(currentPage + 1)
        console.log("Current page is  : " + currentPage)
       
    }

    const prevPage = () => {
        setCurrentPage(currentPage - 1)
        if(currentPage === 1) {
            setCurrentPage(1)
        }
        console.log("Current page is  : " + currentPage)
    }  


    let component
    if (loading) {
        component = <Alert color="dark">
            <p>Loading.....</p>
        </Alert>

    }
    if (error != '') {
        component = <Alert color="danger">
        <p>An error has occcured</p>
    </Alert>
    }
    else {

        component = <PaginatedTable invoices={invoices} />
    }



    return (
        <div>
            <div>
                <ul className="pagination text-center">
                    <li key={1} className="active"><button onClick={prevPage}>Previous</button></li>
                    <li key={2} className="disabled"><Input bsSize="sm" value={page +"\\" + pages} readOnly={true}/></li>
                    <li key={3} className="active"><button onClick={nextPage}>Next</button></li>
                </ul>
            </div>
            {component}
        </div>
    )

}


export default Rtable 