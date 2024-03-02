import {
  Profile,
  ContactDetail,
  ContactList,
  OrderPages,
  VoucherList,
  SettingAccount,
  OrderDetailScreen,
  TransactionPages,
  StatusOrderProcessingScreen,
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
        name="Order"
        component={OrderPages}
        options={{ title: "Order" }}
      />
      <Stack.Screen
        name="OrderDetail"
        component={OrderDetailScreen}
        options={{ title: "Order Detail" }}
      />

      <Stack.Screen
        name="ContactDetail"
        component={ContactDetail}
        options={{ title: "ContactDetail" }}
      />
      <Stack.Screen
        name="ContactList"
        component={ContactList}
        options={{ title: "Contact list" }}
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
      <Stack.Screen
        name="Transactions"
        component={TransactionPages}
        options={{ title: "Transaction Screen" }}
      />
      <Stack.Screen
        name="StatusOderProcessing"
        component={StatusOrderProcessingScreen}
        options={{ title: "Status" }}
      />
    </Stack.Navigator>
  );
};
export default ProfileStackNavigator;
