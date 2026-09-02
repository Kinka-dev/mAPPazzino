import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type Props = {
  title: string;
  viewMode: "cards" | "table";
  onToggleView: () => void;
};

export const WarehouseHeader: React.FC<Props> = ({
  title,
  viewMode,
  onToggleView,
}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity onPress={onToggleView} style={styles.toggleButton}>
        <Text style={styles.toggleText}>
          {viewMode === "cards" ? "Vista tabella" : "Vista cards"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "300", // Josefin Sans light
  },
  toggleButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  toggleText: {
    fontSize: 12,
  },
});
