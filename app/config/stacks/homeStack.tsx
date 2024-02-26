import {
  Home,
  Login,
  Register,
  AppointmentBooking,
  ProductScreen,
} from "../../../screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{}} />
      <Stack.Screen name="Login" component={Login} options={{}} />
      <Stack.Screen name="Register" component={Register} options={{}} />
      <Stack.Screen
        name="Appointment"
        component={AppointmentBooking}
        options={{}}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductScreen}
        options={{}}
      />
    </Stack.Navigator>
  );
};
export default HomeStackNavigator;
