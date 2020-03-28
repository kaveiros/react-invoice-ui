import * as ACTIONS from './ActionTypes'

export const setIsOpen = () => {
    return {
        type: ACTIONS.OPEN_SIDEBAR,
        isOpen: true
    }
}

export const setIsClosed = () => {
    return {
        type: ACTIONS.CLOSE_SIDEBAR,
        isOpen: false
    }
}

export const fetchState = () => {
    return {
        type: ACTIONS.FETCH_SIDEBAR
    }
}