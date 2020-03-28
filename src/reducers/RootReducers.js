import {combineReducers} from 'redux'
import InvoiceReducer from './InvoiceReducer'
import NavBarReducer from './NavBarReducer'
import FormReducer from './FormReducer'

const RootReducer = combineReducers({
    InvoiceReducer:InvoiceReducer,
    NavBarReducer:NavBarReducer,
    FormReducer:FormReducer
})

export default RootReducer