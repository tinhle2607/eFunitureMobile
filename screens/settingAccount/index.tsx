import { View, Text, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { UpdateObject } from "../../components";
import { Account } from "../../interface";
import { AuthService } from "../../service";

const initialData: Account = {
  dateOfBird: "", // Fixed typo
  email: "",
  gender: "",
  id: "",
  name: "",
  password: "",
  phoneNumber: "",
  userName: "",
};

const SettingAccount = () => {
  const fields = [
    { key: "name", label: "Tên", type: "text" },
    { key: "dateOfBird", label: "Ngày sinh", type: "text" },
    {
      key: "gender",
      label: "Giới tính",
      type: "select",
      options: [
        { label: "Nam", value: "male" },
        { label: "Nữ", value: "female" },
        { label: "Khác", value: "orther" },
      ],
    },
    { key: "phoneNumber", label: "Số điện thoại", type: "text" },
    { key: "email", label: "Email", type: "text" },
  ];

  const [data, setData] = useState<Account>(initialData);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const response = await AuthService.getCurrentUser();
    setData(response);
    setIsLoading(false);
  };
  const handleUpdate = (updatedData) => {
    AuthService.updateUser(
      updatedData.name,
      updatedData.dateOfBird,
      updatedData.gender,
      updatedData.phoneNumber,
      updatedData.email
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View>
      <UpdateObject
        fields={fields}
        initialData={data}
        onUpdate={handleUpdate}
      />
    </View>
  );
};

export default SettingAccount;
