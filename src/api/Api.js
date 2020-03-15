import axios from 'axios'

export const LOAD_INVOICES_LOADING = "LOAD_INVOICES_LOADING"
export const LOAD_INVOICES_SUCCESS = "LOAD_INVOICES_SUCCESS"
export const LOAD_INVOICES_ERROR = "LOAD_INVOICES_ERROR"

export const loadInvoices = () => dispatch => {
    dispatch({type:LOAD_INVOICES_LOADING});

    axios.get("http://localhost:3000/invoice/all")
    .then(function(response){
        console.log("got response from server")
        console.log(response)
        //data = response.json()
        dispatch({type:LOAD_INVOICES_SUCCESS, data:response})

    }).catch(function(error){
        console.log(error)
        dispatch({type:LOAD_INVOICES_ERROR, error})

    })



}