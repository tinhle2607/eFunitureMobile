import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Item, Order, Status } from "../../interface";
import { OrderService } from "../../service";
import { CustomTable, ObjectDetail } from "../../components";
import { useNavigation } from "@react-navigation/native";
const initalOrder: Order = {
  address: "?",
  amount: 0,
  id: "",
  pay: 0,
  status: 0,
};
interface Props {
  idContact: string;
}
const OrderProcessScreen: React.FC<Props> = ({ idContact }) => {
  const navigation = useNavigation();
  const columnsItem = [
    { id: "image", label: "Ảnh", type: "image" },
    { id: "name", label: "Tên sản phẩm", type: "text" },
    { id: "price", label: "Giá trị", type: "text" },
    { id: "quantity", label: "Số lượng", type: "text" },
  ];

  const [dataItem, setDataItem] = useState<Item[]>([]);
  const viewDetail = (id: string) => {
    navigation.navigate(`StatusOderProcessing`, { idItem: id });
  };
  const fetchData = async () => {
    const response = await OrderService.getItemOrder(idContact);
    setDataItem(response);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View>
      <CustomTable
        columns={columnsItem}
        data={dataItem}
        viewDetail={viewDetail}
      />
    </View>
  );
};

export default OrderProcessScreen;
