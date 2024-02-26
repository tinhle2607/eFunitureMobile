import { AppointmentList } from "../../../screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const CartStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Appointmet"
        component={AppointmentList}
        options={{ title: "AppointmentList" }}
      />
    </Stack.Navigator>
  );
};
export default CartStackNavigator;
