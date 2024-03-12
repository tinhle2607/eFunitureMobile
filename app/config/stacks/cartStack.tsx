import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useCallback, useState } from "react";
import { Cart, Login } from "../../../screens";

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
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{ title: "Cart" }}
        />
      ) : (
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Login" }}
        />
      )}

      {/* Other screens in your stack */}
    </Stack.Navigator>
  );
};
export default CartStackNavigator;
