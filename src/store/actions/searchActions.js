import algoliasearch from "algoliasearch";
import { configs } from "../../config/configs";

const ALGOLIA_APP_ID = configs.algolia.app_id;
const ALGOLIA_SEARCH_ONLY_KEY = configs.algolia.search_only_key;
const algolia = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_ONLY_KEY);

export const searchingTrue = () => {
  return (dispatch, getState) => {
    dispatch({ type: "SEARCHING_TRUE" });
  };
};

export const searchingFalse = () => {
  return (dispatch, getState) => {
    dispatch({ type: "SEARCHING_FALSE" });
  };
};

const changeHitsID = (hits) => {
  var i;
  for (i = 0; i < hits.length; i++) {
    hits[i].id = hits[i].objectID;
    delete hits[i].objectID;
  }
  return hits;
};

export const search = (query) => (dispatch, getState) => {
  dispatch({ type: "SEARCHING_TRUE" });
  let index = algolia.initIndex("products");
  try {
    index
      .search(query, {
        hitsPerPage: 50,
      })
      .then((content) => {
        return dispatch({
          type: "SEARCHING_FALSE",
          hits: changeHitsID(content.hits),
        });
      })
      .catch((err) => dispatch({ type: "SEARCHING_FALSE", err: err }));
  } catch (err) {
    dispatch({ type: "SEARCHING_FALSE", err: err });
    console.log(err);
  }
};
