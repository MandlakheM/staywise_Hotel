import { CREATE_ACCOMMODATION } from "../actionTypes/actionType";

export const createAccommodation = (accom) => {
    return {
      type: CREATE_ACCOMMODATION,
      accom, 
    };
  };
  

  export const createAccom = (accom) => {
    return (dispatch) => {
      dispatch(createAccommodation(accom));
    };
  };
  
