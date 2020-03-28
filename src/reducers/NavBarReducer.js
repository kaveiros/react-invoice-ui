import * as ACTIONS from '../actions/ActionTypes'

const initialState = {
    isOpen : true
}

const NavBarReducer = ( state = initialState, action) => {
    switch(action.type) {
        case ACTIONS.OPEN_SIDEBAR: {
            return {
                isOpen: true
            }    
        }
        case ACTIONS.CLOSE_SIDEBAR: {
            return{
                isOpen: false
            }
        }
        case ACTIONS.FETCH_SIDEBAR: {
            return{
                state
            }
        }
        default :
        return state
    }

}

export default NavBarReducer;