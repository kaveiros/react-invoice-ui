import * as ACTIONS from './ActionTypes'



export const addPayment =(id)=> {

    return {
        
            type : ACTIONS.ADD_FORM_ADDITIONAL_PAYMENT,
            payment: {
                _id :id
            }
        
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