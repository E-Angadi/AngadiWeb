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
        units: "",
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
          dispatch({ type: "LOAD_CATEGORIES", categories });
        });
    }
  };
};

const deSerializeItems = (units) => {
  const items = [];
  if (!units) return items;
  const citems = units.split("|");
  citems.forEach((c) => {
    const sc = c.split(";");
    if (sc.length === 2)
      items.push({ title: sc[0], visibility: sc[1] === "1" });
  });
  return items;
};

const serializeItems = (items) => {
  var cart = [];
  items.forEach((item) => {
    let data = item.title + ";";
    if (item.visibility) {
      data += "1";
    } else {
      data += "0";
    }
    cart.push(data);
  });
  return cart.join("|");
};

const removeUnitItem = (items, idx) => {
  if (idx > -1) {
    items.splice(idx, 1);
    return items;
  } else return [];
};

export const addUnitToCategory = (categoryId, unit) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("categories")
      .doc(categoryId)
      .get()
      .then((doc) => {
        let data = doc.data();
        let units = deSerializeItems(data.units);
        let index = units.findIndex((u) => u.title === unit);
        if (index < 0) {
          units.push({ title: unit, visibility: true });
        }
        return serializeItems(units);
      })
      .then((units) => {
        return firestore.collection("categories").doc(categoryId).update({
          units: units,
        });
      })
      .then(() => {
        dispatch({ type: "ADDED_NEW_UNIT", categoryId: categoryId });
      })
      .catch((err) => {
        dispatch({ type: "ERR_ADDING_NEW_UNIT", err: err });
      });
  };
};

export const removeUnit = (categoryId, idx) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("categories")
      .doc(categoryId)
      .get()
      .then((doc) => {
        let data = doc.data();
        let units = deSerializeItems(data.units);
        return serializeItems(removeUnitItem(units, idx));
      })
      .then((units) => {
        return firestore.collection("categories").doc(categoryId).update({
          units: units,
        });
      })
      .then(() => {
        dispatch({ type: "REMOVED_UNIT", categoryId: categoryId });
      })
      .catch((err) => {
        dispatch({ type: "ERR_REMOVING_UNIT", err: err });
      });
  };
};

export const changeVisibility = (visibility, unit, categoryId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("products")
      .where("categoryId", "==", categoryId)
      .where("unit", "==", unit)
      .get()
      .then((res) => {
        let batch = firestore.batch();
        res.docs.forEach((doc) => {
          const docRef = firestore.collection("products").doc(doc.id);
          batch.update(docRef, { visibility: visibility });
        });
        return batch.commit();
      })
      .then(() => {
        dispatch({ type: "UPDATED_ALL_PRODUCTS" });
      })
      .catch((err) => {
        dispatch({ type: "ERR_UPDATED_ALL_PRODUCTS", err: err });
      });
  };
};
