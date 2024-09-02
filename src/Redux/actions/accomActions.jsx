export const createAccom = (accom) => {
    return (dispatch, getAccomList) => {

        dispatch({type: 'CREATE_ACCOMMODATION', accom})
    }
};
