export const createProduct = (product) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    var fileID;
    const imageData = product.imageData;
    delete product.imageData;
    firestore
      .collection("products")
      .add({
        ...product,
        imageURL: "",
      })
      .then((resp) => {
        fileID = resp.id;
        var storageRef = firebase
          .storage()
          .ref()
          .child("productImages/" + fileID);
        return storageRef.putString(imageData, "data_url");
      })
      .then((snapshot) => {
        return snapshot.ref.getDownloadURL();
      })
      .then((downloadURL) => {
        firestore
          .collection("products")
          .doc(fileID)
          .update({ imageURL: downloadURL });
      })
      .then(() => {
        dispatch({ type: "CREATE_PRODUCT", product });
      })
      .catch((err) => {
        dispatch({ type: "CREATE_CATEGORY_ERR", err });
      });
  };
};
