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

export const setInvoices = (data) =>{
    return {
        type: ActionTypes.LOAD_INVOICES_SUCCESS,
        invoices:data.invoices,
        loading: false,
        pages: data.pages,
        currentPage : data.currentPage
    }
} 

export const setSingleInvoice = (invoice) => {
    return {
        type: ActionTypes.LOAD_INVOICE_DETAILS,
        invoice: invoice,
        loading:false
    }
}

export const loadInvoices = (page)  => {
    return dispatch => {
        console.log("Clicked")
       dispatch(setIsLoading());
    
        axios.get(baseUrl + "invoice/all/" + page)
        .then(response => {
            const data = response.data
            dispatch(setInvoices(data))
    
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
           // console.log("got response for sngle invoire....")
            //console.log(response.data)
            dispatch(setSingleInvoice(response.data))
        }).catch(error => {
            dispatch(hasApiError(error.message));
        })
    }
}