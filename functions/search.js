const functions = require("firebase-functions");
const admin = require("firebase-admin");
const algoliasearch = require("algoliasearch");
const config = require("./config");

const ALGOLIA_APP_ID = config.algolia.app_id;
const ALGOLIA_ADMIN_KEY = config.algolia.admin_key;
const ALGOLIA_INDEX_NAME = config.algolia.index_name;

exports.addFirestoreDataToAlgolia = functions.https.onRequest(
  (request, response) => {
    var arr = [];
    admin
      .firestore()
      .collection("products")
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          let product = doc.data();
          product.objectID = doc.id;
          arr.push(product);
        });

        var client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
        var index = client.initIndex(ALGOLIA_INDEX_NAME);

        return index
          .saveObjects(arr)
          .then((context) => {
            return response.status(200).send(context);
          })
          .catch((err) => response.status(402).send(err));
      })
      .catch((err) => {
        response.status(402).send(err);
      });
  }
);

exports.onProductCreated = functions.firestore
  .document("products/{productId}")
  .onCreate((snap, context) => {
    const product = snap.data();
    product.objectID = context.params.productId;
    var client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
    var index = client.initIndex(ALGOLIA_INDEX_NAME);
    return index.saveObject(product);
  });

exports.onProductUpdated = functions.firestore
  .document("products/{productId}")
  .onUpdate((change, context) => {
    const newData = change.after.data();
    newData.objectID = context.params.productId;
    var client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
    var index = client.initIndex(ALGOLIA_INDEX_NAME);
    return index.partialUpdateObject(newData);
  });

exports.onProductDeleted = functions.firestore
  .document("products/{productId}")
  .onDelete((snap, context) => {
    var client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
    var index = client.initIndex(ALGOLIA_INDEX_NAME);
    return index.deleteObject(context.params.productId);
  });
