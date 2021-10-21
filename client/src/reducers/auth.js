import { actionTypes } from '../actionTypes/actionTypes.js'

const authReducer = (state = { authData : null }, action) => {
  switch (action.type) {

    case actionTypes.AUTH:
        localStorage.setItem('profile', JSON.stringify({ ...action?.data}));

        return {...state, authData : action?.data}

      break;

    case actionTypes.LOGOUT :
        localStorage.clear()
        return { ...state, authData : null }
    default:
      return state
  }
}

export default authReducer;
