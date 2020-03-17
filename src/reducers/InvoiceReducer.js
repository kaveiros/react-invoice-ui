import * as Actions from '../actions/ActionTypes'
// const initialState = [
//     {
//         "_id" : "5e30bd6fd1b25a2978170dfe",
//         "afm" : 123423,
//         "name" : "foo",
//         "billNumber" : 123,
//         "remainingAmount" : 500,
//         "paymentDates" : [],
//         "__v" : 0
//     },
//     {
//         "_id" : "5e30beca21a7251528d1ebff",
//         "afm" : 55,
//         "name" : "foo",
//         "billNumber" : 123,
//         "billDate" : "2020-01-15T00:00:00.000Z",
//         "remainingAmount" : 500,
//         "paymentDates" : [],
//         "__v" : 0
//     }
// ]

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

        default:
            return state
    }

}

export default InvoiceReducer