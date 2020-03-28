import * as ACTIONS from '../actions/ActionTypes'

const formState = {
    payments :[]
}

const FormReducer = ( state = formState, action) => {
    switch(action.type) {
        case ACTIONS.ADD_FORM_ADDITIONAL_PAYMENT: {
            return {
                ...state,
                payments:[ ...state.payments, action.payment]
            }    
        }
        case ACTIONS.REMOVE_FORM_ADDITIONAL_PAYMENT: {

            return {
                ...state,
                payments: state.payments.filter(val => val._id!== action.index)
            }

        }
        case ACTIONS.FETCH_FORM_ADDITIONAL_PAYMENTS:{

            return {
                state
            }
        }
        default: 
            return state
    }
}

export default FormReducer