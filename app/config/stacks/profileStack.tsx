import {
  Profile,
  ToRecieve,
  ToShip,
  Process,
  ContactList,
  Order,
  VoucherList,
  SettingAccount,
} from "../../../screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ title: "Profile" }}
      />
      <Stack.Screen
        name="ToShip"
        component={ToShip}
        options={{ title: "To Ship" }}
      />
      <Stack.Screen
        name="ToReceive"
        component={ToRecieve}
        options={{ title: "To Receive" }}
      />
      <Stack.Screen
        name="Process"
        component={Process}
        options={{ title: "Process" }}
      />
      <Stack.Screen
        name="ContactList"
        component={ContactList}
        options={{ title: "Contact list" }}
      />
      <Stack.Screen
        name="Order"
        component={Order}
        options={{ title: "Order" }}
      />
      <Stack.Screen
        name="VoucherList"
        component={VoucherList}
        options={{ title: "Voucher List" }}
      />
      <Stack.Screen
        name="SettingAccount"
        component={SettingAccount}
        options={{ title: "Setting Account" }}
      />
    </Stack.Navigator>
  );
};
export default ProfileStackNavigator;
