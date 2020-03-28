import axios from 'axios'
import * as ActionTypes from '../actions/ActionTypes'

const baseUrl = "http://localhost:3000/"

export const setIsLoading = () => {
    
    return {
        type:ActionTypes.LOAD_INVOICES_LOADING,
        loading: true
    }
}

export const hasApiError = (error) => {
    return {
        type: ActionTypes.LOAD_INVOICES_ERROR,
        loading:false,
        error:error
    }
}

export const setInvoices = (invoices) =>{
    return {
        type: ActionTypes.LOAD_INVOICES_SUCCESS,
        invoices:invoices,
        loading: false
    }
} 

export const setSingleInvoice = (invoice) => {
    return {
        type: ActionTypes.LOAD_INVOICE_DETAILS,
        invoice: invoice,
        loading:false
    }
}

export const loadInvoices = ()  => {
    return dispatch => {
       dispatch(setIsLoading());
    
        axios.get(baseUrl + "invoice/all")
        .then(response => {
            console.log("got response from server")
            const invoices = response.data
            console.log(invoices)
            dispatch(setInvoices(invoices))
    
        }).catch(error=> {
            
            dispatch(hasApiError(error.message))
    
        })   
    }
}

export const createNewInvoice = () => {
    return {
        type: ActionTypes.NEW_INVOICE_CREATE
    }
}

export const loadSingleInvoice = (id) => {
    return dispatch => {
        dispatch(setIsLoading());
        axios.get(baseUrl + "invoice/" + id)
        .then(response => {
            console.log("got response for sngle invoire....")
            console.log(response.data)
            dispatch(setSingleInvoice(response.data))
        }).catch(error => {
            dispatch(hasApiError(error.message));
        })
    }
}