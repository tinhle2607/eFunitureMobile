import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { CustomTable, CustomPagination } from "../../components";
import { StatusGraph } from "../../helper";

const statusMapping = {
  1: "Pending",
  2: "In Progress",
  3: "Completed",
  4: "Cancelled",
};

const statusGraph = new StatusGraph();
statusGraph.addEdge(1, 2);
statusGraph.addEdge(2, 3);
statusGraph.addEdge(2, 4);

const App = () => {
  const [data, setData] = useState([
    { id: 1, name: "Item 1", description: "Description 1", status: 1 },
    { id: 2, name: "Item 2", description: "Description 2", status: 2 },
  ]);
  const PAGE_SIZE = 10; // Số lượng items trên mỗi trang
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [totalPages, setTotalPages] = useState(1); // Tổng số trang

  useEffect(() => {
    // Tính tổng số trang dựa trên dữ liệu
    setTotalPages(Math.ceil(data.length / PAGE_SIZE));
  }, [data]);
  const currentData = () => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    return data.slice(startIndex, endIndex);
  };
  useEffect(() => {
    setData(currentData());
  }, [currentPage]);

  const onUpdateStatus = (id, newStatus) => {
    const newData = data.map((item) => {
      if (item.id === id) {
        return { ...item, status: newStatus };
      }
      return item;
    });
    setData(newData);
  };

  return (
    <View style={styles.container}>
      <CustomTable
        data={currentData()} // Sử dụng dữ liệu của trang hiện tại
        statusGraph={statusGraph}
        onUpdateStatus={onUpdateStatus}
        statusMapping={statusMapping}
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
