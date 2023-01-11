import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BusPass from "./screens/BusPass";
import Home from "./screens/Home";
import Login from "./screens/Login";

import React from "react";
import { useSelector } from "react-redux";
import Profile from "./screens/Profile";

import ForgotPassword from "./screens/ForgotPassword";
import PassList from "./screens/PassList";
import UserInfo from "./screens/UserInfo";
import { navigationRef } from "./RootNavigation";

const NavigationProvider = () => {
  const Stack = createNativeStackNavigator();
  const { isAuth } = useSelector((state) => state.user);
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        {!isAuth ? (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="forgot-password"
              component={ForgotPassword}
              options={{
                headerShown: false,
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="scan-pass"
              component={BusPass}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="pass-list"
              component={PassList}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="user-info"
              component={UserInfo}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="profile"
              component={Profile}
              options={{
                headerShown: false,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationProvider;
