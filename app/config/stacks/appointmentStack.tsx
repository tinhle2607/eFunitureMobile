import { useFocusEffect } from "@react-navigation/native";
import {
  AppointmentList,
  AppointmentDetailScreen,
  Login,
} from "../../../screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useCallback, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();
const CartStackNavigator = ({ navigation }) => {
  const [user, setUser] = useState(null);
  useFocusEffect(
    useCallback(() => {
      const fetch = async () => {
        const storedUser = await AsyncStorage.getItem("user");
        setUser(storedUser);
      };
      fetch();
    }, [])
  );
  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen
            name="Appointment"
            component={AppointmentList}
            options={{ title: "AppointmentList" }}
          />
          <Stack.Screen
            name="AppointmentDetail"
            component={AppointmentDetailScreen}
            options={{ title: "Appointment Screen" }}
          />
        </>
      ) : (
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Login" }}
        />
      )}
    </Stack.Navigator>
  );
};
export default CartStackNavigator;
