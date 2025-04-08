// Learn more about createBottomTabNavigator:
// https://reactnavigation.org/docs/bottom-tab-navigator
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useColorScheme } from "react-native";

import { BottomTabParamList } from "./types";
import { useTheme } from "@/providers";
import { HomeScreen } from "@/screens";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export function BottomTabNavigator() {
  const { palette } = useTheme();
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{ tabBarActiveTintColor: palette.primary }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarStyle: { backgroundColor: "#fff" },
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Projects"
        component={() => null}
        options={{
          headerShown: false,
          tabBarStyle: { backgroundColor: "#fff" },
          tabBarIcon: ({ color }) => <TabBarIcon name="person" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="MyProposals"
        component={() => null}
        options={{
          headerShown: false,
          tabBarStyle: { backgroundColor: "#fff" },
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}
