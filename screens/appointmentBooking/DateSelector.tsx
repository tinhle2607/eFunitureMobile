import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

interface DateSelectorProps {
  selectedDate?: Date;
  onSelectDate: (date: Date) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  selectedDate,
  onSelectDate,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const dates: Date[] = [];
  for (let i = 1; i <= daysInMonth; i++) {
    dates.push(new Date(currentYear, currentMonth, i));
  }

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const isPastDate = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <View>
      <View style={styles.monthSelector}>
        <TouchableOpacity onPress={handlePreviousMonth}>
          <Text style={styles.monthText}>&lt;</Text>
        </TouchableOpacity>
        <Text style={styles.monthText}>
          {dates[0].toLocaleString("default", { month: "long" })} {currentYear}
        </Text>
        <TouchableOpacity onPress={handleNextMonth}>
          <Text style={styles.monthText}>&gt;</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal style={styles.datesContainer}>
        {dates.map((date, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => !isPastDate(date) && onSelectDate(date)}
            style={[
              styles.dateSlot,
              selectedDate &&
              selectedDate.toDateString() === date.toDateString()
                ? styles.dateSlotSelected
                : {},
              isPastDate(date) ? styles.dateSlotPast : {},
            ]}
          >
            <Text style={styles.dateSlotText}>{date.getDate()}</Text>
            <Text style={styles.dateSlotText}>
              {date.toLocaleString("default", { weekday: "short" })}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  monthSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
  },
  monthText: {
    fontSize: 18,
    color: "#000",
  },
  datesContainer: {
    backgroundColor: "#fff",
  },
  dateSlot: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginHorizontal: 4,
    alignItems: "center",
  },
  dateSlotSelected: {
    backgroundColor: "red",
  },
  dateSlotPast: {
    backgroundColor: "#e0e0e0",
    borderColor: "#ccc",
  },
  dateSlotText: {
    color: "#000",
  },
});

export default DateSelector;
