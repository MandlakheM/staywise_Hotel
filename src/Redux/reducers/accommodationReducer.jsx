const initialState = {
  places: [
    {
      id: "1",
      accomName: "Double deluxe suite",
      price: "R1500",
      rating: "5 star",
      address: "jhb, prince street",
      images: [],
    },
    {
      id: "2",
      accomName: "Penthouse deluxe",
      price: "R5000",
      rating: "5 star",
      address: "cpt, vilakazi street",
      images: [],
    },
    {
      id: "3",
      accomName: "Single suite",
      price: "R1000",
      rating: "5 star",
      address: "vaal, cassandra avenue",
      images: [],
    },
  ],
};

const accommodationReducer = (state = initialState, action) => {
  switch (action.type){
    case 'CREATE_ACCOMMODATION':
    console.log('created accom listing', action.accom)
  }
  return state;
};

export default accommodationReducer;
