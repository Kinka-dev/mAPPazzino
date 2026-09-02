import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

type Props = {
  isMultiSelect: boolean;
  onToggleMultiSelect: () => void;
  onNewProduct: () => void;
  onSaveAll: () => void;
};

export const WarehouseBottomBar: React.FC<Props> = ({
  isMultiSelect,
  onToggleMultiSelect,
  onNewProduct,
  onSaveAll,
}) => {
  return (
    <View style={styles.bar}>
      <TouchableOpacity style={styles.button} onPress={onNewProduct}>
        <Text style={styles.buttonText}>Nuovo prodotto</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={onToggleMultiSelect}>
        <Text style={styles.buttonText}>
          {isMultiSelect ? "Esci da selezione multipla" : "Selezione multipla"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonPrimary} onPress={onSaveAll}>
        <Text style={styles.buttonPrimaryText}>Salva modifiche</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#E0E0E0",
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  buttonText: {
    fontSize: 12,
  },
  buttonPrimary: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#1A73E8",
  },
  buttonPrimaryText: {
    fontSize: 12,
    color: "#FFFFFF",
  },
});
