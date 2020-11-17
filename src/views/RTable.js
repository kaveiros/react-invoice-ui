import React, { useEffect, useState } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Dropdown from 'react-bootstrap/Dropdown'
import PaginatedTable from './PaginatedTable'
import Container from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'
import axios from 'axios'
import ReactPaginate from 'react-paginate'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Nav } from 'react-bootstrap'


const Rtable = () => {

    const baseUrl = "http://localhost:3000/"
    const headers = {"Content-Type": "application/json"}
    const [searchParams, setSearchParams] = useState()

    const [invoices, setInvoices] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [pages, setPages] = useState(1)
    const [page, setPage] = useState(1)

    const [currentPage, setCurrentPage] = useState(1)
    const [dropdownUIValue, setDropDownUIValue] = useState("Αναζήτηση")
    const [dropdownValue, setDropDownValue] = useState()
    const [searchTerm, setSearchTerm] = useState("")






    useEffect(() => {

        const fetcthInvoices = async () => {
            console.log("Current page is  : " + currentPage)
            setLoading(true)
            axios.post(baseUrl + "invoice/all/" + currentPage, searchParams, headers)
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

    }, [currentPage, searchParams])

    const handlePage = (evnt) => {
        console.log(evnt.selected)
        setCurrentPage(evnt.selected)
    }

    const searchInvoices = (evn) => {
        evn.preventDefault()
        setSearchParams({
            dropDownValue: dropdownValue,
            searchTerm: searchTerm
        })
        console.log(searchParams)
        if (evn.keyCode === 13) {
            console.log(evn.target.value)

        }
    }

    const dropSelection = (event) => {
        switch(event) {
            case "afm":
                setDropDownUIValue("ΑΦΜ")
                setDropDownValue("afm")
                break
            case "name":
                setDropDownUIValue("Όνομα")
                setDropDownValue("name")
                break
            case "billNumber":
                setDropDownUIValue("Τιμολόγιο")
                setDropDownValue("billNumber")
                break
            default:
                setDropDownUIValue("Αναζήτηση")
                setDropDownValue("name")
                break

        }
        console.log(event)
    }

    const handleSearchChange = (chg) => {
        setSearchTerm(chg.target.value)
        console.log(chg.target.value)
    } 

    const handleBlur = (blurEvent) => {
        if(blurEvent.target.value.length === 0) {
            setDropDownUIValue("Αναζήτηση")
            setSearchParams({})
        }
    }


    let component
    if (loading) {
        component = <Alert color="dark">
            <p>Loading.....</p>
        </Alert>

    }
    if (error !== '') {
        component = <Alert color="danger">
            <p>An error has occcured</p>
        </Alert>
    }
    else {

        component = <PaginatedTable invoices={invoices} />
    }



    return (
        <Container>
            <Navbar>
                <Nav.Item>
                    <Dropdown onSelect={dropSelection}>
                        <Dropdown.Toggle>
                            {dropdownUIValue}
                    </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="afm">ΑΦΜ</Dropdown.Item>
                            <Dropdown.Item eventKey="name">Όνομα</Dropdown.Item>
                            <Dropdown.Item eventKey="billNumber">Αριθμό τιμολογίου</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav.Item>
                <Nav.Item>
                    <Form inline onSubmit={searchInvoices}>
                        <Form.Control type="text" onChange={handleSearchChange} onBlur={handleBlur} placeholder="κείμενο ή αριθμός" className="mr-sm-2" />
                        <Button variant="outline-info" type="submit">Search</Button>
                    </Form>
                </Nav.Item>
            </Navbar>
            <ReactPaginate
                previousLabel={'πίσω'}
                nextLabel={'μπροστά'}
                breakLabel={'...'}
                pageCount={pages}
                initialPage={0}
                disableInitialCallback={true}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePage}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                containerClassName={'pagination'}
                previousLinkClassName={'page-link'}
                nextLinkClassName={'page-link'}
                disabledClassName={'page-item disabled'}
                activeClassName={'page-item active'} />

            {component}
        </Container>)

}


export default Rtable 