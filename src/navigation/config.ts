import * as Linking from "expo-linking";
import {
  LinkingOptions,
  createNavigationContainerRef,
} from "@react-navigation/native";
import * as Constants from "expo-constants";
import { StackParamList } from "./types";

export const urlPrefix = Linking.createURL("");

export const navigationRef = createNavigationContainerRef<StackParamList>();

export const linking: LinkingOptions<StackParamList> = {
  enabled: true,

  prefixes: [urlPrefix, `https://${Constants.default.name}}.com`],

  // Custom function to get the URL which was used to open the app
  async getInitialURL() {
    // First, you may want to do the default deep link handling
    // Check if app was opened from a deep link
    const url = await Linking.getInitialURL();

    if (url !== null) {
      return url;
    }
  },

  // Custom function to subscribe to incoming links
  subscribe(listener) {
    const onReceiveURL = ({ url }: { url: string }) => listener(url);

    // Listen to incoming links from deep linking
    const linkingSubscription = Linking.addEventListener("url", onReceiveURL);

    return () => {
      // Clean up the link event listeners
      linkingSubscription.remove();
    };
  },

  config: {
    screens: {
      Root: {
        screens: {
          Home: "home",
        },
      },
      OnboardingScreen: "onboarding",
      SignInScreen: "sign-in",
      NotFoundScreen: "*",
    },
  },
};
