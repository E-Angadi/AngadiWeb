export const createCategory = (category) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    var fileID;
    firestore
      .collection("categories")
      .add({
        title: category.title,
        description: category.description,
        imageURL: "",
        bannerImageURL: "",
        createdAt: new Date(),
      })
      .then((resp) => {
        fileID = resp.id;
        var storageRef = firebase
          .storage()
          .ref()
          .child("categoryImages/images/" + fileID);

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
        var storageRef = firebase
          .storage()
          .ref()
          .child("categoryImages/banners/" + fileID);

        return storageRef.putString(category.bannerImageData, "data_url");
      })
      .then((snapshot) => {
        return snapshot.ref.getDownloadURL();
      })
      .then((downloadURL) => {
        firestore
          .collection("categories")
          .doc(fileID)
          .update({ bannerImageURL: downloadURL });
      })
      .then(() => {
        dispatch({ type: "CREATE_CATEGORY", category });
      })
      .catch((err) => {
        dispatch({ type: "CREATE_CATEGORY_ERR", err });
      });
  };
};

export const updateCategoryText = (category) => {
  return (dispatch, getState, { getFirestore, getFirebase }) => {
    const firestore = getFirestore();
    firestore
      .collection("categories")
      .doc(category.id)
      .update({ title: category.title, description: category.description })
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
      .child("categoryImages/images/" + category.id);
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

export const updateCategoryBannerImage = (category, imageData) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    var storageRef = firebase
      .storage()
      .ref()
      .child("categoryImages/banners/" + category.id);
    storageRef
      .putString(imageData, "data_url")
      .then((snapshot) => {
        return snapshot.ref.getDownloadURL();
      })
      .then((downloadURL) => {
        return firestore
          .collection("categories")
          .doc(category.id)
          .update({ bannerImageURL: downloadURL });
      })
      .then(() => {
        dispatch({ type: "UPDATE_CATEGORY_BANNER_IMAGE", category });
      })
      .catch((err) => {
        dispatch({ type: "UPDATE_CATEGORY_BANNER_IMAGE_ERR", err });
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
          .child("categoryImages/images/" + category.id);
        return imageRef.delete();
      })
      .then(() => {
        var imageRef = firebase
          .storage()
          .ref()
          .child("categoryImages/banners/" + category.id);
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

export const closeSnackbar = () => {
  return (dispatch, getState) => {
    dispatch({ type: "CLOSE_SNACKBAR_CATEGORY" });
  };
};

export const disableSubmit = () => {
  return (dispatch, getState) => {
    dispatch({ type: "DISABLE_SUBMIT_CATEGORY" });
  };
};

export const loadCategories = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    console.log("load categories called");
    var state = getState();
    if (state.category.categories.length === 0) {
      firestore
        .collection("categories")
        .get()
        .then((snapshot) => {
          return snapshot.docs.map((doc) => {
            var data = doc.data();
            return { id: doc.id, ...data };
          });
        })
        .then((categories) => {
          console.log(categories);
          dispatch({ type: "LOAD_CATEGORIES", categories });
        });
    }
  };
};
