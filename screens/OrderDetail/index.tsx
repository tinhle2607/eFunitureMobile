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
    { key: "amount", label: "Tổng tiền", type: "text" },
    {
      key: "pay",
      label: "Đã trả",
      type: "text",
    },
  ];
  const statusMapping = {
    1: "Pending",
    2: "Waiting",
    3: "Completed",
    4: "Cancelled",
  };
  const StatusColumns = [
    { id: "date", label: "Thời gian", type: "text" },
    {
      id: "status",
      label: "Trạng thái",
      type: "text",
      formatter: (value: number) => statusMapping[value],
    },
  ];
  const [dataItem, setDataItem] = useState<Item[]>([]);
  const [orderStatus, setOrderStatus] = useState<Status[]>([]);
  const [Order, setOrder] = useState<Order>(initalOrder);
  const fetchStatus = async () => {
    const response = await OrderService.getOrderStatus(itemId);
    setOrderStatus(response);
  };
  const fetchtOrder = async () => {
    const response = await OrderService.getOrder(itemId);
    setOrder(response);
  };

  const fetchData = async () => {
    const response = await OrderService.getItemOrder(itemId);
    setDataItem(response);
  };
  useEffect(() => {
    fetchStatus();
    fetchtOrder();
    fetchData();
  }, []);

  return (
    <View>
      <ObjectDetail fields={OrderFields} data={Order} />
      <CustomTable columns={StatusColumns} data={orderStatus} />
      <CustomTable columns={columnsItem} data={dataItem} />
    </View>
  );
};

export default OrderDetailScreen;
