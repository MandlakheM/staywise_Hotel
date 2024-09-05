import { 
    CREATE_ACCOMMODATION, 
    CREATE_ACCOMMODATION_FAILED, 
    FETCH_ACCOMMODATIONS, 
    FETCH_ACCOMMODATIONS_FAILED, 
    UPDATE_ACCOMMODATION, 
    DELETE_ACCOMMODATION 
  } from "../actionTypes/actionType";
  
  export const createAccommodation = (accom) => ({
    type: CREATE_ACCOMMODATION,
    accom,
  });
  
  export const fetchAccommodations = (accommodations) => ({
    type: FETCH_ACCOMMODATIONS,
    accommodations,
  });
  
  export const updateAccommodation = (id, updates) => ({
    type: UPDATE_ACCOMMODATION,
    id,
    updates,
  });
  
  export const deleteAccommodation = (id) => ({
    type: DELETE_ACCOMMODATION,
    id,
  });
  
  export const createAccom = (accom) => {
    return (dispatch, getState, { getFirestore }) => {
      const firestore = getFirestore();
      firestore
        .collection("accommodationList")
        .add({
          ...accom,
          createdAt: new Date(),
        })
        .then(() => {
          dispatch(createAccommodation(accom));
        })
        .catch((error) => {
          dispatch({ type: CREATE_ACCOMMODATION_FAILED, error });
        });
    };
  };
  
  export const fetchAllAccommodations = () => {
    return (dispatch, getState, { getFirestore }) => {
      const firestore = getFirestore();
      firestore
        .collection("accommodationList")
        .get()
        .then((snapshot) => {
          const accommodations = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          dispatch(fetchAccommodations(accommodations));
        })
        .catch((error) => {
          dispatch({ type: FETCH_ACCOMMODATIONS_FAILED, error });
        });
    };
  };
  
  export const editAccom = (id, updates) => {
    return (dispatch, getState, { getFirestore }) => {
      const firestore = getFirestore();
      firestore
        .collection("accommodationList")
        .doc(id)
        .update(updates)
        .then(() => {
          dispatch(updateAccommodation(id, updates));
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
        });
    };
  };
  
  export const removeAccom = (id) => {
    return (dispatch, getState, { getFirestore }) => {
      const firestore = getFirestore();
      firestore
        .collection("accommodationList")
        .doc(id)
        .delete()
        .then(() => {
          dispatch(deleteAccommodation(id));
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    };
  };
  