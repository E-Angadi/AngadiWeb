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
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![E Angadi](/images/s1.png)](https://eangadi-a2aa8.web.app/)

AngadiWeb is an e-commerce application built with an intention to help small and medium bussinesses to deploy there own e-commerce soltuion within no time.

<b>Special Features of AngadiWeb:</b>

- All payment options( Debit card / Credit card / Many Indian wallets) are available which are powered by [Razorpay](https://razorpay.com/)
- Cash on Delivery option is also available.
- Highly Secure.
- A functional Dashboard which supports several use cases.
- Forget about the server because everything here is on [Firebase](https://firebase.google.com/).
- Completely configurable.
- Deliverable location control.
- Guest user login is also available.
- Efficiently designed to reduce the firebase billing.

### Built With

- [React Js](https://reactjs.org/)
- [Material UI](https://material-ui.com/)
- [Firebase](https://firebase.google.com/)
- [Razorpay](https://razorpay.com/)
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
3. Open [firebase console](https://console.firebase.google.com/u/0/) with your Google account logged in and create a new project. Upgrade the project plan from spark to blaze by setting up your billing account. follow the instructions [here](https://docs.firerun.io/getting-started/upgrading-from-the-firebase-spark-plan-to-the-blaze-plan-tled).
4. Hit on the firestore tab in the left drawer in the firebase console and create the firestore database with security rules in test mode. Follow this [guide](https://firebase.google.com/docs/firestore/quickstart#create).

5. Similarly, setup Authentication with Email/Password and Anonymous mode enabled. Also setup functions and storage with no changes made.

6. Click on the web icon in project overview and create a web project with hosting enabled. and copy the Firebase SDK snippet in config mode from project settings. Replace these configs with the dummy ones below in `src/config/firebaseConfig.js`
   ```JS
    export var firebaseConfig = {
      apiKey: "AIzaSyAXvJpxppxmWraxxxxxxxxxx",
      authDomain: "yourconfigs.firebaseapp.com",
      projectId: "yourconfigs",
      storageBucket: "yourconfigs.appspot.com",
      messagingSenderId: "217752987550",
      appId: "1:111111111111:web:111111111111111111",
    };
   ```
7. Create a Razorpay account and generate the `key_id` and `key_secret` in test mode. Follow the guide [here](https://razorpay.com/docs/payment-gateway/dashboard-guide/settings/api-keys/). Paste this `key_id` in `src/config/configs.js` and both the keys in `functions/index.js` in the variable `rz_key`

8. Complete the remaining changes with `src/config/configs.js` file like colors, title, description, etc.

9. Replace the `public/imgs/logo.png` with your logo and if possible `public/favicon.ico` with your favicon

10. Move to the terminal / powershell, run the command below. Allow the firebase CLI to access your project
    ```sh
    firebase login
    ```
11. Initialize firebase, select the options
    - Use existing project
    - Select your project (Which you created in step 3)
    - Select firebase functions and hosting
    - Use JavaScript as language in functions and use Eslint
    - Don't override any files
    - Install firebase functions dependencies
    - Yes for Single Page Application (SPA)
    - Use `build` as public dist
    ```sh
    firebase init
    ```
12. Create your Admin Account

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

13. To test your application, run the command below in the terminal / powershell. open `http://localhost:3000/` in your browser.
    ```sh
    npm start
    ```
14. open Sign In page from header or `http://localhost:3000/signin` and enter your admin email address and password to signin. Open your dashboard at `http://localhost:3000/dashboard`. Open the Locations tab in the dashboard and add few deliverable locations pincode. Now open the home page and check the colors and logo.

15. Run the command below to deploy firebase functions which are essential for payments. copy functions url obtained after successully deploying functions. Paste that URL in `src/config/configs.js` file as value of functionsURL field.
    ```sh
    firebase deploy --only functions
    ```
16. Build the application running the command below. This will create a production code in `build` folder
    ```sh
    npm run-script build
    ```
17. Run the command below to host your site. you will obtain the hosted site URL after successfully hosting site. You can get the same link in the hosting tab of your firebase console.
    ```sh
    firebase deploy --only hosting
    ```
18. Run the command below to enforce security
    ```sh
    firebase deploy --only firestore:rules
    ```
19. Open the hosted site after 10-15 mins, signin with your admin email address and password. Add few categories and products as explained in the <a href="#usage">Usage</a> Section.

20. Now test the application by placing an order by adding few products into the cart with admin account and normal account. You should see those placed orders in your dashboard. You should also see payment received in your razorpay dashboard.

21. If step 20 is successful and if your razorpay verification process is completed before, generate the `key_id` and `key_secret` in live mode and replace those with test mode keys which we placed in step 7. Also setup the payment capturing setting in your razorpay dashboard if need for your bussiness.

22. Now build the project again as explained in step 16 and host it as explained in step 17. Your Deployment is successful.

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
