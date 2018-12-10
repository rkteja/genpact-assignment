import { GET_EMPLOYEE_DATA, CLEAR_EMPLOYEE_DATA } from "../actionTypes";

const initialState = {
  employeeData: {}
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EMPLOYEE_DATA: {
      return {
        ...state,
        employeeData: action.response
      };
    }
    case CLEAR_EMPLOYEE_DATA: {
      return {
        ...state,
        employeeData: {}
      };
    }
    default: {
      return state;
    }
  }
};

export default appReducer;
