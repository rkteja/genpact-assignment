import { GET_EMPLOYEE_DATA, CLEAR_EMPLOYEE_DATA } from "./actionTypes";

// actions
const getEmployeeDataAction = (data) => ({
  type: GET_EMPLOYEE_DATA,
  response: data
});

export const clearEmployeeDataAction = () => ({
  type: CLEAR_EMPLOYEE_DATA
})

//methods
export const getEmployeeData = (payload) => {
  return (dispatch) => {
    fetch(payload.url)
      .then((data) => data.json())
      .then((data) => dispatch(getEmployeeDataAction(data)));
  }
}
