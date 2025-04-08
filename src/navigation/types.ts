import { NavigationProp } from "@react-navigation/native";
import { StackScreenProps as BaseStackScreenProps } from "@react-navigation/stack";

export type BottomTabParamList = {
  Home: undefined;
  Projects: undefined;
  MyProposals: undefined;
};

export type StackParamList = {
  Root: undefined;
  SignInScreen: undefined;
  SignUpScreen: undefined;
  PreOnboardingScreen: undefined;
  OnboardingScreen: undefined;
  NotFoundScreen: undefined;
};

export type ScreenProps<Screen extends keyof StackParamList> =
  BaseStackScreenProps<StackParamList, Screen>;

export type StackNavigationProps = NavigationProp<StackParamList>;

export type ScreenFC<Screen extends keyof StackParamList> = React.FC<
  ScreenProps<Screen>
>;
