import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { CustomPagination, CustomTable } from "../../components";
import { Transaction } from "../../interface";
import { TransactionService } from "../../service";

const TransactionPages = ({ navigation }) => {
  const columns = [
    { id: "from", label: "Nguồn", type: "text" },
    { id: "to", label: "Nhận", type: "text" },
    { id: "Amount", label: "Giá trị ", type: "text" },
    { id: "date", label: "Ngày", type: "text" },
    { id: "context", label: "nội dung ", type: "text" },
    { id: "BalanceRemain", label: "Số dư tiện thời điểm", type: "text" },
  ];
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Transaction[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async () => {
    const totalPages = await TransactionService.getTotalPages();
    setTotalPages(totalPages);
    const response = await TransactionService.getTransactionsByPage(
      currentPage
    );
    setData(response);
  };
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  return (
    <View style={styles.container}>
      <CustomTable columns={columns} data={data} />
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

export default TransactionPages;
