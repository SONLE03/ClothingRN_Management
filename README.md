## This is a [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli), typescript, nativewind, react native paper, ui kitten...

![react-native](https://github.com/Semester02-UIT-2023-2024/ClothingRN_Management/assets/121101254/319d40b4-2f38-480a-9191-1292ddedeab3) ![nativewind](https://github.com/Semester02-UIT-2023-2024/ClothingRN_Management/assets/121101254/4e38bb0e-b69e-4596-952f-6469e316380f) ![m-icon](https://github.com/Semester02-UIT-2023-2024/ClothingRN_Management/assets/121101254/f72749ac-b593-4f45-b57e-2188155ce3b8) ![ui-kitten](https://github.com/Semester02-UIT-2023-2024/ClothingRN_Management/assets/121101254/6dab98ea-5f67-44e3-a936-ddabe2dce3a8) ![rn-paper](https://github.com/Semester02-UIT-2023-2024/ClothingRN_Management/assets/121101254/3970231e-0a06-4580-88db-d91e3624ea1a)

# Some UI Screens

![image](https://github.com/Semester02-UIT-2023-2024/ClothingRN_Management/assets/121101254/5695032f-3c47-42cd-a3b0-49cd35c56648) ![image](https://github.com/Semester02-UIT-2023-2024/ClothingRN_Management/assets/121101254/5f6ae551-5e9d-4204-8263-ab9645d7e687)  ![image](https://github.com/Semester02-UIT-2023-2024/ClothingRN_Management/assets/121101254/30dbe2c4-7cf6-4c0d-bf1e-af2cca7e77b2) ![image](https://github.com/Semester02-UIT-2023-2024/ClothingRN_Management/assets/121101254/afeb0528-7b95-4ad7-b8e8-a9974a8140bd) ![image](https://github.com/Semester02-UIT-2023-2024/ClothingRN_Management/assets/121101254/835f5376-c65e-48f6-82ba-bf7a35df33b0)


# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Prepare: Change local BASE_URL to compatible with your device
Run this command on CMD to take IPv4 Address, then set it to apiServer in file /api/config.ts

```bash
# cmd
ipconfig
```
For example 

![image](https://github.com/Semester02-UIT-2023-2024/ClothingRN_Management/assets/121101254/15ddefb9-6932-466b-9052-fb1340c10445)
![image](https://github.com/Semester02-UIT-2023-2024/ClothingRN_Management/assets/121101254/c352a6c4-b1c2-4fb0-9576-147a6c9cd9b4)





## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# install node-module first
npm install

# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App (Optional)

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
