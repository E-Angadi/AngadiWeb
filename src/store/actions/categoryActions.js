export const createCategory = (category) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    var fileID;
    firestore
      .collection("categories")
      .add({
        title: category.title,
        imageURL: "",
        createdAt: new Date(),
      })
      .then((resp) => {
        fileID = resp.id;
        var storageRef = firebase
          .storage()
          .ref()
          .child("categoryImages/" + fileID);

        return storageRef.putString(category.imageData, "data_url");
      })
      .then((snapshot) => {
        return snapshot.ref.getDownloadURL();
      })
      .then((downloadURL) => {
        firestore
          .collection("categories")
          .doc(fileID)
          .update({ imageURL: downloadURL });
      })
      .then(() => {
        dispatch({ type: "CREATE_CATEGORY", category });
      })
      .catch((err) => {
        dispatch({ type: "CREATE_CATEGORY_ERR", err });
      });
  };
};

export const updateCategoryTitle = (category) => {
  return (dispatch, getState, { getFirestore, getFirebase }) => {
    const firestore = getFirestore();
    firestore
      .collection("categories")
      .doc(category.id)
      .update({ title: category.title })
      .then(() => {
        dispatch({ type: "UPDATE_CATEGORY_TITLE", category });
      })
      .catch((err) => {
        dispatch({ type: "UPDATE_CATEGORY_TITLE_ERR", err });
      });
  };
};

export const updateCategoryImage = (category, imageData) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    var storageRef = firebase
      .storage()
      .ref()
      .child("categoryImages/" + category.id);
    storageRef
      .putString(imageData, "data_url")
      .then((snapshot) => {
        return snapshot.ref.getDownloadURL();
      })
      .then((downloadURL) => {
        return firestore
          .collection("categories")
          .doc(category.id)
          .update({ imageURL: downloadURL });
      })
      .then(() => {
        dispatch({ type: "UPDATE_CATEGORY_IMAGE", category });
      })
      .catch((err) => {
        dispatch({ type: "UPDATE_CATEGORY_IMAGE_ERR", err });
      });
  };
};

export const deleteCategory = (category) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    firestore
      .collection("categories")
      .doc(category.id)
      .delete()
      .then(() => {
        var imageRef = firebase
          .storage()
          .ref()
          .child("categoryImages/" + category.id);
        return imageRef.delete();
      })
      .then(() => {
        dispatch({ type: "DELETE_CATEGORY", category });
      })
      .catch((err) => {
        dispatch({ type: "DELETE_CATEGORY_ERR", err });
      });
  };
};
