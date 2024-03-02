import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { CustomTable, CustomPagination } from "../../components";
import { StatusGraph } from "../../helper";
import { Appointment } from "../../interface";
import { AppointmentService } from "../../service";

const statusMapping = {
  1: "Pending",
  2: "Waiting",
  3: "Completed",
  4: "Cancelled",
};

const statusGraph = new StatusGraph();
statusGraph.addEdge(2, 4);
statusGraph.addEdge(1, 4);

const App = ({ navigation }) => {
  const columns = [
    { id: "nameStaff", label: "Tên nhân viên ", type: "text" },
    { id: "description", label: "Mô tả", type: "text" },
    { id: "status", label: "Trạng thái", type: "select" },
  ];
  const [data, setData] = useState<Appointment[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async () => {
    const totalPages = await AppointmentService.getTotalPages();
    setTotalPages(totalPages);
    const response = await AppointmentService.getAppointmentsByPage(
      currentPage
    );
    setData(response);
  };
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const onUpdateStatus = (id, newStatus) => {
    AppointmentService.updateAppointmentStatus(id, newStatus);
    fetchData();
  };
  const viewDetail = (id) => {
    navigation.navigate("AppointmentDetail", { itemId: id });
  };

  return (
    <View style={styles.container}>
      <CustomTable
        columns={columns}
        data={data}
        statusGraph={statusGraph}
        onUpdateStatus={onUpdateStatus}
        statusMapping={statusMapping}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
});

export default App;
