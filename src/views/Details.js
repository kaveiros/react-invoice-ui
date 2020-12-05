import React, { useEffect, useState } from 'react'

import InvoiceService from '../services/InvoiceService'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Link, useParams } from 'react-router-dom'
import "react-datetime/css/react-datetime.css"
import Alert from 'react-bootstrap/Alert'
import CardDeck from 'react-bootstrap/CardDeck'

const Details = () => {

    const initialState = {
        afm: '',
        billDate: '',
        billNumber: '',
        name: '',
        mainAmount: '',
        additionalPayments: []
    }
    const params = useParams()
    const [detailsData, setDetailsData] = useState(initialState)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    let _id = params.id

    useEffect(() => {
        setLoading(true)
        InvoiceService.getInvoice(_id)
            .then(response => {
                setDetailsData({
                    afm: response.data.afm,
                    billDate: response.data.billDate,
                    billNumber: response.data.billNumber,
                    name: response.data.name,
                    mainAmount: response.data.mainAmount,
                    additionalPayments: response.data.additionalPayments
                })
                setLoading(false)
            })
            .catch(error => {
                setError(true)
            })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <Card>
            { error && <Alert variant="danger">
                <p>Σφάλμα ανάκτησης τιμολογίου</p>
            </Alert>

            }
            {
                loading &&
                <Alert variant="dark">
                    <p>Φορτώνει.....</p>
                </Alert>

            }
            <Card.Header>Ονομα εταιρίας: {detailsData.name}</Card.Header>
            <Card.Body>
                <Card.Title>ΑΦΜ: {detailsData.afm}</Card.Title>
                <Card.Subtitle>Αριθμός τιμολογίου: {parseInt(detailsData.billNumber)}</Card.Subtitle>
                <Card.Text>Ποσό:{detailsData.mainAmount}</Card.Text>
                <Card.Text>Τελευταια πληρωμη: {new Date(detailsData.billDate).toDateString()}</Card.Text>
                {
                    detailsData.additionalPayments.map((d, idx) =>
                        <CardDeck key={idx}>
                            <Card>
                                <Card.Header>Επιπλέον πληρωμές</Card.Header>
                                <Card.Text>Ποσό: {d.amount}</Card.Text>
                                <Card.Text>Ημερομηνία: {new Date(d.date).toDateString()}</Card.Text>
                            </Card>
                        </CardDeck>)
                }
                <Button variant="success" as={Link} to={"/new"}>Νέο τιμολόγιο</Button>
                <Button variant="secondary" as={Link} to={"/all"}>Πίσω</Button>
            </Card.Body>
        </Card>
    )
}

export default Details 