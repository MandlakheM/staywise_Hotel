import { CREATE_ACCOMMODATION, CREATE_ACCOMMODATION_FAILED } from "../actionTypes/actionType";

export const createAccommodation = (accom) => {
  return {
    type: CREATE_ACCOMMODATION,
    accom,
  };
};

export const createAccom = (accom) => {
  return (dispatch, { getFirebase, getFireStore }) => {
    const firestore = getFireStore();
    firestore
      .collection("accommodationList")
      .add({
        ...accom,
        creator: "me",
        createdAt: new Date(),
      })
      .then(() => {
        dispatch(createAccommodation(accom));
      })
      .catch((error) => {
        dispatch({type: 'CREATE_ACCOMMODATION_FAILED', error})
      });
  };
};
