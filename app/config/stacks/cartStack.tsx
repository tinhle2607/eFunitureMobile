import { Cart } from "../../../screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const CartStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Cart" component={Cart} options={{ title: "Cart" }} />
    </Stack.Navigator>
  );
};
export default CartStackNavigator;
