export const configs = {};

configs.title = "E Angadi";
configs.description = "Buy Online from Angadi | All payment options available";

configs.aboutus =
  "E Angadi is a easy to deploy e commerce application with all payment options, specially designed for Indian user space";

configs.contactInfo = {
  email: "example@gmail.com",
  watsappNum: "9999999999",
  androidAppLink: "#",
  iosAppLink: "#",
};

// Buttons, Icons, Some Imp text color
configs.primary = "#215273";
// Heade/Toolbar color
configs.secondary = "#E1F5FE";
// Footer color
configs.footer = "#c5c5c5";
// view all button
configs.viewall = "#900325";

configs.razorpay = {
  key_id: "rzp_test_lxD9jsRSbpBOAz",
};

configs.algolia = {
  app_id: process.env.REACT_APP_ALGOLIA_APP_ID,
  search_only_key: process.env.REACT_APP_ALGOLIA_SEARCH_ONLY_KEY,
};

// max cards in single pagination
configs.maxPageCards = 20;
// max categories on category bar below header
configs.maxCategoriesOnBar = 16;
// max categories on category box
configs.maxCategoriesInBox = 16;

// Open Pincodes check dialog when user clicks on "Add to my cart" button when the cart is empty
configs.openPincodeEmptyCart = false;

// Firebase functions base_url
configs.functionsURL =
  "https://us-central1-angadi-6266d.cloudfunctions.net/payment";

configs.usingAlgoliaFree = true;
