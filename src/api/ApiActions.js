import axios from 'axios'
import * as ActionTypes from '../actions/ActionTypes'

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

export const loadInvoices = ()  => {
    return dispatch => {
       dispatch(setIsLoading());
    
        axios.get("http://localhost:3000/invoice/all")
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