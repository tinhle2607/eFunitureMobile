import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Item, Order, Status } from "../../interface";
import { OrderService } from "../../service";
import { CustomTable, ObjectDetail } from "../../components";
const initalOrder: Order = {
  address: "?",
  amount: 0,
  id: "",
  pay: 0,
  status: 0,
};
const OrderDetailScreen = ({ route }) => {
  const { itemId } = route.params;

  const columnsItem = [
    { id: "image", label: "Ảnh", type: "image" },
    { id: "name", label: "Tên sản phẩm", type: "text" },

    { id: "price", label: "Giá trị", type: "text" },
    { id: "quantity", label: "Số lượng", type: "text" },
  ];
  const OrderFields = [
    { key: "address", label: "Địa chỉ", type: "text" },
    { key: "price", label: "Tổng tiền", type: "text" },
    {
      key: "status",
      label: "Trạng thái",
      type: "text",
      formatter: (value) => statusMapping[value],
    },
    { key: "phoneNumber", label: "Số điện thoại", type: "text" },
    { key: "email", label: "Email", type: "text" },
    { key: "name", label: "tên nhận", type: "text" },
  ];
  const statusMapping = {
    1: "Pending",
    2: "To Ship",
    3: "Cancel",
    4: "Recieve",
    5: "Refuse to Confirm",
  };
  const [dataItem, setDataItem] = useState([]);

  const [Order, setOrder] = useState(initalOrder);

  const fetchtOrder = async () => {
    const response = await OrderService.getOrder(itemId);
    setOrder(response);
  };

  const fetchData = async () => {
    const response = await OrderService.getItemOrder(itemId);
    setDataItem(response);
  };
  useEffect(() => {
    fetchtOrder();
    fetchData();
  }, []);

  return (
    <View>
      <ObjectDetail fields={OrderFields} data={Order} />
      <CustomTable columns={columnsItem} data={dataItem} />
    </View>
  );
};

export default OrderDetailScreen;
