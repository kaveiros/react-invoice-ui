import * as Actions from '../actions/ActionTypes'
import { act } from 'react-dom/test-utils'

const initialState = {
    invoices:[],
    loading: false,
    error:''
    
}

const InvoiceReducer = (state = initialState, action) => {
    switch(action.type) {
        case Actions.LOAD_INVOICES_LOADING:
            return {
                ...state,
                loading:true
            }
        case Actions.LOAD_INVOICES_SUCCESS:{
            return {
                ...state,
                invoices:action.invoices,
                loading:false
            }
        }
        case Actions.LOAD_INVOICES_ERROR:{
            return{
                ...state,
                loading:action.loading,
                error:action.error
                
            }
        }
        case Actions.LOAD_INVOICE_DETAILS:{
            return {
                ...state,
                invoices:action.invoice,
                loading:action.loading,
                error:action.error,
                loading:false
            }
        }

        default:
            return state
    }

}

export default InvoiceReducer