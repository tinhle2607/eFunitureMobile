import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ObjectDetail, CustomDropdown } from "../../components";
import { Contact } from "../../interface";
import { ContactService } from "../../service";
import { StatusGraph } from "../../helper";
import OrderProcessScreen from "./OrderProcessing";

const initalContact: Contact = {
  id: "",
  date: "",
  title: "",
  description: "",
  value: 0,
  pay: 0,
  status: 1,
};

const ContactDetail = ({ route }) => {
  const { itemId } = route.params;
  const statusContactListing = {
    1: "Pending",
    2: "Cancelled",
    3: "Accept",
    4: "Require again",
  };
  const statusGraph = new StatusGraph();
  statusGraph.addEdge(1, 2);
  statusGraph.addEdge(1, 3);
  statusGraph.addEdge(1, 4);
  const ContactFields = [
    { key: "title", label: "Tiêu đề", type: "text" },
    { key: "description", label: "Nội dung", type: "text" },
    {
      key: "date",
      label: "Ngày",
      type: "text",
    },
    { key: "value", label: "Giá trị", type: "text" },
    { key: "pay", label: "Trả trước", type: "text" },
  ];
  const [Contact, setContact] = useState<Contact>(initalContact);
  const fetchContact = async () => {
    const response = await ContactService.getContactById(itemId);
    setContact(response);
  };
  useEffect(() => {
    fetchContact();
  }, []);
  const onUpdateStatus = (ContactID: string, newStatus: number) => {
    ContactService.updateStatus(ContactID, newStatus);
    fetchContact();
  };
  const nextStatusOptions = statusGraph
    .getNextStates(Contact.status)
    .map((status) => statusContactListing[status]);

  return (
    <View>
      <ObjectDetail fields={ContactFields} data={Contact} />
      <CustomDropdown
        key={Contact.id}
        currentValue={statusContactListing[Contact.status]}
        options={nextStatusOptions}
        onSelect={(selectedValue) => {
          const newStatus = parseInt(
            Object.keys(statusContactListing).find(
              (key) => statusContactListing[key] === selectedValue
            ) || "0",
            10
          );
          onUpdateStatus(Contact.id, newStatus);
        }}
      />
      <OrderProcessScreen idContact={itemId} />
    </View>
  );
};

export default ContactDetail;
