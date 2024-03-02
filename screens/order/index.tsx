import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import {
  ObjectDetail,
  CustomDropdown,
  CustomTable,
  CustomPagination,
} from "../../components";
import { Order } from "../../interface";
import { StatusGraph } from "../../helper";
import { OrderService } from "../../service/";
import { Picker } from "@react-native-picker/picker";

const statusLabels: Record<number, string> = {
  0: "All",
  1: "Pending",
  2: "To Ship",
  3: "Cancel",
  4: "Recieve",
  5: "Refuse to Confirm",
};
const statusGraph = new StatusGraph();

statusGraph.addEdge(1, 3);
const Orderpages = ({ navigation }) => {
  const columns = [
    { id: "address", label: "Địa chỉ", type: "text" },
    { id: "amount", label: "Tổng tiền", type: "text" },
    { id: "pay", label: "Đã trả", type: "text" },
    { id: "status", label: "Trạng thái", type: "select" },
  ];
  const [data, setData] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectStatus, setSelectStatus] = useState(0);
  const fetchData = async () => {
    const totalPages = await OrderService.getTotalPages();
    setTotalPages(totalPages);
    const response = await OrderService.getOrders(currentPage, selectStatus);
    setData(response);
  };
  useEffect(() => {
    fetchData();
  }, [currentPage, selectStatus]);
  const onUpdateStatus = () => {};
  const viewDetail = (id) => {
    navigation.navigate("OrderDetail", { itemId: id });
  };

  return (
    <View>
      <Picker
        selectedValue={selectStatus}
        onValueChange={(itemValue, itemIndex) => setSelectStatus(itemValue)}
        style={{ height: 50, width: 150 }}
      >
        {Object.entries(statusLabels).map(([key, value]) => (
          <Picker.Item key={key} label={value} value={key} />
        ))}
      </Picker>
      <CustomTable
        columns={columns}
        data={data}
        statusGraph={statusGraph}
        onUpdateStatus={onUpdateStatus}
        statusMapping={statusLabels}
        viewDetail={viewDetail}
      />
      <CustomPagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </View>
  );
};
export default Orderpages;
