import * as Actions from '../actions/ActionTypes'

const initialState = {
    invoices:[],
    invoice:{},
    loading: false,
    error:'',
    pages:0,
    currentPage:0
    
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
                loading: action.loading,
                pages: action.pages,
                currentPage: action.currentPage
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
                invoice:action.invoice,
                loading:action.loading,
                error:action.error
            }
        }
        case Actions.NEW_INVOICE_CREATE: {
            return{
                ...state,
                invoice : null
            }
        }

        default:
            return state
    }

}

export default InvoiceReducer