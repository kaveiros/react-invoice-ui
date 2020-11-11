import React, { useEffect, useState } from 'react'
import {
    Alert, Input, InputGroup, 
    ButtonDropdown,
    InputGroupAddon, Button, DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Container
} from 'reactstrap'
import PaginatedTable from './PaginatedTable'
import axios from 'axios'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
// import {fa-hand-o-right} from '@fortawesome/free-solid-svg-icons'





const Rtable = () => {

    const baseUrl = "http://localhost:3000/"

    const [invoices, setInvoices] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [pages, setPages] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [page, setPage] = useState(1)
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [splitButtonOpen, setSplitButtonOpen] = useState(false);
    const toggleDropDown = () => setDropdownOpen(!dropdownOpen);
    const toggleSplit = () => setSplitButtonOpen(!splitButtonOpen);
    const [searchTerm, setSearchTerm] = useState("")






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
        if (currentPage === 1) {
            setCurrentPage(1)
        }
        console.log("Current page is  : " + currentPage)
    }

    const searchInvoices = (evn) => {
        if (evn.keyCode === 13) {
            console.log(evn.target.value)

        }
    }

    const dropSelection = (event) => {
        console.log(event)
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
            <InputGroup>
                {/* <InputGroupAddon addonType="prepend"><Button><FontAwesomeIcon icon={}></Button></InputGroupAddon>
                <Input />
                <InputGroupAddon addonType="append"><Button>I'm a button</Button></InputGroupAddon> */}
                <ButtonDropdown addonType="append" isOpen={dropdownOpen} toggle={toggleDropDown} onClick={ dropSelection}>
                    <DropdownToggle caret>
                        Αναζήτηση
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem divider />
                        <DropdownItem eventKey="AFM">ΑΦΜ</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem >Όνομα</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem >Αριθμό τιμολογίου</DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
                <Input />
            </InputGroup>
            <div>
                <ul className="pagination text-center">
                    <li key={1} className="active"><button onClick={prevPage}>Prev</button></li>
                    <li key={2} className="disabled"><Input bsSize="sm" value={page + "\\" + pages} readOnly={true} /></li>
                    <li key={3} className="active"><button onClick={nextPage}>Next</button></li>
                    {/* <li><Input onKeyDown={searchInvoices} /></li> */}
                </ul>
            </div>
            {component}
            </Container>    )

}


export default Rtable 