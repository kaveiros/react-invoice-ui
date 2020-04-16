import * as ACTIONS from './ActionTypes'
import axios from 'axios'
const baseUrl = "http://localhost:3000/"

export const addPayment =(payment)=> {

    return {
        
            type : ACTIONS.ADD_FORM_ADDITIONAL_PAYMENT,
            payment: payment
        
    }

}

export const removePayment =(index)=> {

    return {
        
            type : ACTIONS.REMOVE_FORM_ADDITIONAL_PAYMENT,
            index : index
        
    }

}

export const fetchPayments = () => {
    
    return {
        type: ACTIONS.FETCH_FORM_ADDITIONAL_PAYMENTS
    }
}

// export const savePayment = (payment) => {

//     return (dispatch) => {
//         console.log("Inside actionsCreator")
//         console.log(payment)
//     }
// }

export const savePayment = (payment)  => {
    return dispatch => {
       //dispatch(setIsLoading());
    
        axios.post(baseUrl + "invoice/create", payment)
        .then(response => {
            const invoices = response.data
            console.log("Created")
            console.log(invoices)
            //dispatch(setInvoices(invoices))
    
        }).catch(error=> {
            console.log(error)
           // dispatch(hasApiError(error.message))
    
        })   
    }
}