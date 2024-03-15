import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Item, Order, Status } from "../../interface";
import { OrderService, TransactionService } from "../../service";
import { CustomTable, ObjectDetail } from "../../components";

const initalTransaction = {
  type: "?",
  from: "?",
  to: "?",
  amount: "?",
  balanceRemain: "?",
  description: "?",
};
const TransactionDetailScreen = ({ route }) => {
  const { itemId } = route.params;
  const transFields = [
    { key: "type", label: "Loại Giao dịch", type: "text" },
    { key: "from", label: "Nguồn", type: "text" },
    {
      key: "to",
      label: "Tới",
      type: "text",
    },
    { key: "amount", label: "Giá trị", type: "text" },
    { key: "balanceRemain", label: "Số dư", type: "text" },
    { key: "description", label: "Nội dung", type: "text" },
  ];
  const [transaction, setTransaction] = useState(initalTransaction);
  const fetchtTransaction = async () => {
    const response = await TransactionService.getTransactionById(itemId);
    setTransaction(response);
  };
  useEffect(() => {
    fetchtTransaction();
  }, []);
  return (
    <View>
      <ObjectDetail fields={transFields} data={transaction} />
    </View>
  );
};

export default TransactionDetailScreen;
