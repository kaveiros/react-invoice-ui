import React, { useEffect, useState } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Dropdown from 'react-bootstrap/Dropdown'
import PaginatedTable from './PaginatedTable'
import Container from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'
import ReactPaginate from 'react-paginate'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Nav } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faSearchDollar } from '@fortawesome/free-solid-svg-icons';
import InvoiceService from '../services/InvoiceService'



const Rtable = () => {

    const [searchParams, setSearchParams] = useState()
    const [invoices, setInvoices] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [pages, setPages] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [dropdownUIValue, setDropDownUIValue] = useState("Αναζήτηση")
    const [dropdownValue, setDropDownValue] = useState()
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {

        const fetcthInvoices = async () => {
            InvoiceService.getAllInvoices(currentPage, searchParams)
                .then(response => {
                    const data = response.data
                    setInvoices(data.invoices)
                    setPages(data.pages)
                    setLoading(false)
                }).catch(error => {
                    setLoading(false)
                    setError(error.message)
                })
        }
        fetcthInvoices();

        // eslint-disable-next-line
    }, [currentPage, searchParams])

    const handlePage = (evnt) => {
        if (evnt.selected !== 0) {
            setCurrentPage(evnt.selected)
        }
    }

    const searchInvoices = (evn) => {
        evn.preventDefault()
        setSearchParams({
            dropDownValue: dropdownValue,
            searchTerm: searchTerm
        })
    }

    const dropSelection = (event) => {
        switch (event) {
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
    }

    const handleSearchChange = (chg) => {
        setSearchTerm(chg.target.value)
    }

    const handleBlur = (blurEvent) => {
        if (blurEvent.target.value.length === 0) {
            setDropDownUIValue("Αναζήτηση")
            setSearchParams({})
        }
    }

    const next = <FontAwesomeIcon icon={faChevronRight} className="mr-2"/>

    const previous = <FontAwesomeIcon icon={faChevronLeft} className="mr-2"/>

    const searchBtn = <FontAwesomeIcon icon={faSearchDollar} className="mr-2"/>


    return (
        <Container>
            {loading && <Alert variant="dark">
                <p>Φορτώνει.....</p>
            </Alert>}
            {error && <Alert variant="danger">
                <p>Σφάλμα στην ανάκτηση τιμολογίων.</p>
            </Alert>}
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
                        <Button variant="outline-info" type="submit">{searchBtn}</Button>
                    </Form>
                </Nav.Item>
            </Navbar>
            <ReactPaginate
                previousLabel={previous}
                nextLabel={next}
                breakLabel={'...'}
                pageCount={pages}
                initialPage={1}
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

            <PaginatedTable invoices={invoices} />
        </Container>)

}


export default Rtable 