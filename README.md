<p align="center">
  <a href="https://github.com/E-Angadi/AngadiWeb">
    <img src="images/LOGO2.png" alt="Logo" height="400" width="800" style="border-radius: 2%;">
  </a>

  <h3 align="center">E Angadi</h3>

  <p align="center">
    A fully configurable e-commerce web application with dashboard using Firebase at backend. 
    <br />
    <a href="https://github.com/E-Angadi/AngadiWeb" target="blank"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://eangadi-a2aa8.web.app/">View Demo</a>
    ·
    <a href="https://github.com/E-Angadi/AngadiWeb/issues">Report Bug</a>
    ·
    <a href="https://github.com/E-Angadi/AngadiWeb/issues">Request Feature</a>
    <br/>
    <p align='center' style='font-size: 14px;'>
    Note: Search and Payment functionalities are intentionally disabled on demo version.
    </p>
      <br/>
      <p align='center' style='font-size: 12px;'>Liked our work, wanna buy us a coffee?
      <br/>
      <a href="https://www.buymeacoffee.com/bharathchandra" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="26" width="100" style="border-radius:1px" />
      </p>
      <br/>
  
  </p>

</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites-steps">Prerequisites</a></li>
        <li><a href="#steps-to-deployment">Steps to Deployment</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#all-about-categories">All about categories</a></li>
        <li><a href="#all-about-products">All about products</a></li>
        <li><a href="#all-about-banners">All about banners</a></li>
        <li><a href="#all-about-locations">All about locations</a></li>
        <li><a href="#all-about-orders">All about orders</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![E Angadi](/images/s1.png)](https://eangadi-a2aa8.web.app/)

AngadiWeb is an e-commerce application built with an intention to help small and medium businesses to deploy there own e-commerce solution within no time.

<b>Special Features of AngadiWeb:</b>

- All payment options( Debit card / Credit card / Many Indian wallets) are available which are powered by [Razorpay](https://razorpay.com/)
- Cash on Delivery option is also available.
- Highly Secure.
- A functional Dashboard which supports several use cases.
- Forget about the server because everything here is on [Firebase](https://firebase.google.com/).
- A full-text based search powered by [Algolia](https://www.algolia.com/).
- Completely configurable.
- Deliverable location control.
- Guest user login is also available.
- Efficiently designed to reduce the firebase billing.
- Fully Responsive Design

### Built With

- [React Js](https://reactjs.org/)
- [Material UI](https://material-ui.com/)
- [Firebase](https://firebase.google.com/)
- [Razorpay](https://razorpay.com/)
- [Algolia](https://www.algolia.com/)
- [Redux](https://redux.js.org/)
- [React Redux Firebase](http://react-redux-firebase.com/docs/getting_started)
- [React Redux](https://react-redux.js.org/)
- [Node JS](https://nodejs.org/en/)

<!-- GETTING STARTED -->

## Getting Started

This is a detailed step by step instruction guide to setup your own e-commerce site running without any changes in the code ( except some changes in the config files ). Prerequisites are necessary to setup your app locally, then follow the deployment steps to deployment.

### Prerequisites Steps

- Install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) and [Node js](https://nodejs.org/en/download/)
- Lanuch the terminal or powershell in admin mode and run the commands below.
- npm
  ```sh
  npm install npm@latest -g
  ```
- Firebase tools
  ```sh
  npm install -g firebase-tools
  ```

### Steps to Deployment

1. Select the project location and launch the terminal / powershell. Clone the repo
   ```sh
   git clone https://github.com/E-Angadi/AngadiWeb.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Rename a file named `.env.local.txt` to `.env.local` in root directory.

4. Open [firebase console](https://console.firebase.google.com/u/0/) with your Google account logged in and create a new project. Upgrade the project plan from spark to blaze by setting up your billing account. follow the instructions [here](https://docs.firerun.io/getting-started/upgrading-from-the-firebase-spark-plan-to-the-blaze-plan-tled).
5. Hit on the firestore tab in the left drawer in the firebase console and create the firestore database with security rules in test mode. Follow this [guide](https://firebase.google.com/docs/firestore/quickstart#create).

6. Similarly, setup Authentication with Email/Password and Anonymous mode enabled. Also setup functions and storage with no changes made.

7. Click on the web icon in project overview and create a web project with hosting enabled. and copy the Firebase SDK snippet in config mode from project settings. Copy & paste each of these configs with the dummy ones present in `.env.local`.

   ```sh
    REACT_APP_FIREBASE_API_KEY=your_firebase_apikey
    REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_authDomain
    REACT_APP_FIREBASE_DATABASE_URL=your_firebase_databaseUrl
    REACT_APP_FIREBASE_PROJECT_ID=your_firebase_projectId
    REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storageBucket
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messagingSenderId
    REACT_APP_FIREBASE_APP_ID=your_firebase_appId
   ```

8. Complete the remaining changes with `src/config/configs.js` file like colors, title, description, etc.

9. Replace the `public/imgs/logo.png` with your logo and if possible `public/favicon.ico` with your favicon

10. Move to the terminal / powershell, run the command below. Allow the firebase CLI to access your project
    ```sh
    firebase login
    ```
11. Initialize firebase, select the options

    - Use existing project
    - Select your project (Which you created in step 3)
    - Select firestore, functions and hosting
    - Don't override any files
    - Use JavaScript as language in functions and use Eslint
    - Install firebase functions dependencies
    - Yes for Single Page Application (SPA)
    - Use `build` as public dist

    ```sh
    firebase init
    ```

    if you have worked with mulitple projects, specify firebase before running this command about your current project by using below command

    ```sh
    firebase use your_project_id
    ```

12. Create a Razorpay account and generate the `key_id` and `key_secret` in test mode. Follow the guide [here](https://razorpay.com/docs/payment-gateway/dashboard-guide/settings/api-keys/). Paste this `key_id` in `.env.local` file. Now, copy the following command and replace `"KEY ID"` and `"KEY SECRET"` with your `key_id` & `key_secret` and run it.

    ```sh
      firebase functions:config:set razorpay.key_id="KEY ID" razorpay.key_secret="KEY SECRET"
    ```

13. Create a Algolia account and create a index with name `products`(Case Sensitive). Generate the [API keys](https://www.algolia.com/doc/guides/security/api-keys/). Copy the app_id and search only key and paste it in the `.env.local` file. Your file should look like this with your credentials

    ```sh
      REACT_APP_ALGOLIA_APP_ID=YOUR_APP_ID
      REACT_APP_ALGOLIA_SEARCH_ONLY_KEY=YOUR_SEARCH_ONLY_KEY
      REACT_APP_ALGOLIA_INDEX_NAME=products
    ```

14. Copy the following command and replace "APP ID" and "ADMIN KEY" with your algolia app id & admin key and run it.

    ```sh
        firebase functions:config:set algolia.app_id="APP ID" algolia.admin_key="ADMIN KEY"
    ```

    Go through the steps in algolia, setup your search parameters as `title`, `description` such that, user can search over these two values only. You can adjust other search terms even after adding the products. Now your products data will be in sync with algolia data.

15. Run the command below to deploy firebase functions which are essential for payments. copy functions url obtained after successully deploying functions. Paste that URL in `src/config/configs.js` file as value of <b>functionsURL</b> field.

    ```sh
    firebase deploy --only functions
    ```

16. Create your Admin Account

    - Open the Authentication tab in your firebase console and click on the Add user button. Enter your admin email and password and hit on Add user button.
    - You can witness a user added in the list, copy the User UID of the account you just created from the list.
    - Open the Firestore tab in your console and click on Start Collection button, enter `users` in the Collection ID field and click on next.
    - Paste the UID of the user you just created as Document ID, add the feilds below with exact name, type and values. and hit the save button.
      - isAdmin - boolean - true
      - isGuest - boolean - false
      - pincode - number - 0
      - cart - string - (leave empty)
      - delivery - string - (leave empty)
      - name - string - (your name)
      - pNum - string - (your phone number)

17. To test your application, run the command below in the terminal / powershell. open `http://localhost:3000/` in your browser.
    ```sh
    npm start
    ```
18. open Sign In page from header or `http://localhost:3000/signin` and enter your admin email address and password to signin. Open your dashboard at `http://localhost:3000/dashboard`. Open the Locations tab in the dashboard and add few deliverable locations pincode. Now open the home page and check the colors and logo.

19. Build the application running the command below. This will create a production code in `build` folder
    ```sh
    npm run-script build
    ```
20. Run the command below to host your site. you will obtain the hosted site URL after successfully hosting site. You can get the same link in the hosting tab of your firebase console.
    ```sh
    firebase deploy --only hosting
    ```
21. Run the command below to enforce security and indexes
    ```sh
    firebase deploy --only firestore:rules
    firebase deploy --only firestore:indexes
    ```
22. Open the hosted site after 10-15 mins, signin with your admin email address and password. Add few categories and products as explained in the <a href="#usage">Usage</a> Section.

23. Now test the application by placing an order by adding few products into the cart with admin account and normal account. You should see those placed orders in your dashboard. You should also see payment received in your razorpay dashboard.

24. If step 20 is successful and if your razorpay verification process is completed before, generate the `key_id` and `key_secret` in live mode and replace those with test mode keys which we placed in step 7. Also setup the payment capturing setting in your razorpay dashboard if need for your bussiness.

25. Now build the project again as explained in step 16 and host it as explained in step 17. Your Deployment is successful.

NOTE: some common errors which we encounter while firebase deployment can be resolved by logging out and logging in again by using below commands

```sh
firebase logout
```

and then

```sh
firebase login
```

<!-- USAGE EXAMPLES -->

## Usage

### All about Categories

![All about Categories](/images/cs.png)

<b>Steps to add a category</b>

- Enter the category name and description in the title and description fields
- Click the Add Image button to add a category image, recommended size of 200 px X 200 px. similarly, add a banner image with the size shown the in the default image (1000 X 200).
- Hit on the submit button to create the category, a notification will show up after successfully creating a category.

![All about Categories](/images/cs1.png)

<b>Edit Category Listing</b>

- Search and view all the categories details and title, description, images placed and products count in that category.
- To edit title and description, click on the edit icon beside title and to change the images, click on the image icon at bottom left of images.
- Add new units and use the respective toggle button to change the state of all the products in that category using that unit.
- By visibility, we mean in stock or not. So, if the product visibility is false then it will be shown as Out of Stock in the frontend.

### All about Products

![All about Products](/images/ps.png)

<b>Steps to add a product</b>

- Check ON the Product Visibility switch to make that product visible (In Stock) in the website.
- Check ON the Special Offer switch to make that product visible in top deals swiper in the home page.
- Enter the product title, description, select the category, select the units and enter the value, price, discount percentage, add multiple taxes in percentage / amount form by clicking on add new tax button.
- Add a product image of size 420 px X 420 px by clicking on add image button. After filling all the details about the product, hit the submit button. You will receive a notification about product creation in top right corner.

![All about Products](/images/pms.png)
<b>Update/Delete a Product</b>

- Search product by its name or product id
- Edit the product details by clicking on the edit icon. Edit the the product iage by clciking on the image icon the table row. Same with the delete icon.

## All about Banners

![All about Banners](/images/bs.png)

<b>Steps to add a banner</b>

- Paste the link to which user has to be navigated, when clicked on the banner
- Add banners with size shown in the placeholder images in the form.

<b>Delete a Banner</b>

- Hit the delete icon to delete banner.

## All about Locations

![All about Locations](/images/ls.png)

<b>Steps to add/remove a location</b>

- Enter the deliverable pincode in the pincode field and hit add pincode.
- Remove the pincode by clicking the cross button.

## All about Orders

![All about Locations](/images/os.png)

<b>Manage your orders</b>

- Search the order by it's order id or delivery pincode.
- You will receive all the orders placed in the table. Click on the view button the view all details of the order placed.
- Click on the tick icon after delivery or click on the cross ison to cancel the order.
- If the order is Cash on delivey type it will be displayed in payment type field.

<!-- ROADMAP -->

## Roadmap

See the [open issues](https://github.com/othneildrew/Best-README-Template/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<b>Scope of improvement</b>

- Converting into SSR.
- Improving the search without using algolia.
- Multiple UI options which should be configurable.
- Support for other payment gateways
- Support for SMS or Email providers
- Adding tests and automating it
- Custom Backend.

<!-- LICENSE -->

## License

Distributed under the GNU GPLv3 License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

T Bharath Chandra - t.bharathchandra@gmail.com
