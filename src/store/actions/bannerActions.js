export const createBanner = (imageData) => {
  return (dispatch, getState, { getFirestore, getFirebase }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    var fileId;
    firestore
      .collection("banners")
      .add({ imageURL: "", mobileImageURL: "", link: imageData.link })
      .then((resp) => {
        fileId = resp.id;
        var storageRef = firebase
          .storage()
          .ref()
          .child("bannerImages/large/" + fileId);
        return storageRef.putString(imageData.imageData, "data_url");
      })
      .then((snapshot) => {
        return snapshot.ref.getDownloadURL();
      })
      .then((downloadURL) => {
        firestore
          .collection("banners")
          .doc(fileId)
          .update({ imageURL: downloadURL });
      })
      .then(() => {
        var storageRef = firebase
          .storage()
          .ref()
          .child("bannerImages/mobile/" + fileId);
        return storageRef.putString(imageData.mobileImageData, "data_url");
      })
      .then((snapshot) => {
        return snapshot.ref.getDownloadURL();
      })
      .then((downloadURL) => {
        firestore
          .collection("banners")
          .doc(fileId)
          .update({ mobileImageURL: downloadURL });
      })
      .then(() => {
        dispatch({ type: "CREATE_BANNER", imageData });
      })
      .catch((err) => {
        dispatch({ type: "CREATE_BANNER_ERR", err });
      });
  };
};

export const deleteBanner = (image) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    firestore
      .collection("banners")
      .doc(image.id)
      .delete()
      .then(() => {
        var imageRef = firebase
          .storage()
          .ref()
          .child("bannerImages/large/" + image.id);
        return imageRef.delete();
      })
      .then(() => {
        var imageRef = firebase
          .storage()
          .ref()
          .child("bannerImages/mobile/" + image.id);
        return imageRef.delete();
      })
      .then(() => {
        dispatch({ type: "DELETE_BANNER", image });
      })
      .catch((err) => {
        dispatch({ type: "DELETE_BANNER_ERR", err });
      });
  };
};

export const closeSnackbar = () => {
  return (dispatch, getState) => {
    dispatch({ type: "CLOSE_SNACKBAR_BANNER" });
  };
};
