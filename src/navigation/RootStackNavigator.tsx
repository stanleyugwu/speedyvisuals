import { createStackNavigator } from "@react-navigation/stack";

import { StackParamList } from "./types";
import { useSession, useSettings } from "@/providers";
import { BottomTabNavigator } from "./BottomTabNavigator";

import NotFoundScreen from "@/screens/NotFoundScreen";
import {
  OnboardingScreen,
  PreOnboardingScreen,
  SignInScreen,
  SignUpScreen,
} from "@/screens";

const Stack = createStackNavigator<StackParamList>();

export function RootNavigator() {
  const settings = useSettings();
  const { session } = useSession();

  const isAuthenticated = !!session;
  const initialScreen: keyof StackParamList = isAuthenticated
    ? "Root"
    : settings.onboarded
    ? "SignInScreen"
    : "PreOnboardingScreen";

  return (
    <Stack.Navigator
      initialRouteName={initialScreen}
      screenOptions={{ headerShown: false }}
    >
      {isAuthenticated ? (
        <Stack.Screen name="Root" component={BottomTabNavigator} />
      ) : (
        <Stack.Group>
          <Stack.Screen name="Root" component={BottomTabNavigator} />
          <Stack.Screen
            name="PreOnboardingScreen"
            component={PreOnboardingScreen}
          />
          <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
          <Stack.Screen name="SignInScreen" component={SignInScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        </Stack.Group>
      )}

      <Stack.Screen
        name="NotFoundScreen"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
}
