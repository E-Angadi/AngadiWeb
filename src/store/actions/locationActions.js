export const writeLocations = (pincodes) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    var data = pincodes.join();
    firestore
      .collection("locations")
      .doc("1")
      .set({
        locations: data,
      })
      .then(() => {
        dispatch({ type: "WRITE_LOCATIONS", data });
      })
      .catch((err) => {
        dispatch({ type: "WRITE_LOCATIONS_ERR", err });
      });
  };
};

export const openCheckDialog = () => {
  return (dispatch) => dispatch({ type: "OPEN_PINCODE_DIALOG" });
};

export const closeCheckDialog = () => {
  return (dispatch) => dispatch({ type: "CLOSE_PINCODE_DIALOG" });
};
