import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";

type Item = {
  id: string;
  name: string;
  photoUri?: string;
  quantity: number;
  position?: string;
};

type Props = {
  items: Item[];
  isMultiSelect: boolean;
  selectedItems: string[];
  onChangeSelectedItems: (ids: string[]) => void;
};

export const WarehouseTableView: React.FC<Props> = ({
  items,
  isMultiSelect,
  selectedItems,
  onChangeSelectedItems,
}) => {
  const toggleSelect = (id: string) => {
    if (!isMultiSelect) return;
    if (selectedItems.includes(id)) {
      onChangeSelectedItems(selectedItems.filter((x) => x !== id));
    } else {
      onChangeSelectedItems([...selectedItems, id]);
    }
  };

  if (items.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>
          Nessun articolo corrisponde ai criteri di ricerca.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerCell}>ID</Text>
        <Text style={styles.headerCell}>Foto</Text>
        <Text style={styles.headerCell}>Nome</Text>
        <Text style={styles.headerCell}>Quantità</Text>
        <Text style={styles.headerCell}>Posizione</Text>
        <Text style={styles.headerCell}>Azioni</Text>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View
            style={[
              styles.row,
              index % 2 === 1 && styles.rowAlt,
              selectedItems.includes(item.id) && styles.rowSelected,
            ]}
          >
            <Text style={styles.cell}>{item.id}</Text>

            <View style={styles.cell}>
              {item.photoUri ? (
                <Image source={{ uri: item.photoUri }} style={styles.photo} />
              ) : (
                <Text>📷</Text>
              )}
            </View>

            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{item.quantity}</Text>
            <Text style={styles.cell}>{item.position || "-"}</Text>

            <View style={styles.cellActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => {
                  // TODO: apri card in edit
                }}
              >
                <Text>✏️</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => {
                  // TODO: alert elimina
                }}
              >
                <Text>🗑</Text>
              </TouchableOpacity>

              {isMultiSelect && (
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => toggleSelect(item.id)}
                >
                  <Text>{selectedItems.includes(item.id) ? "☑" : "☐"}</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
  },
  headerRow: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#E0E0E0",
  },
  headerCell: {
    flex: 1,
    fontSize: 12,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    paddingVertical: 8,
  },
  rowAlt: {
    backgroundColor: "#FAFAFA",
  },
  rowSelected: {
    backgroundColor: "#E6F4FE",
  },
  cell: {
    flex: 1,
    fontSize: 12,
  },
  cellActions: {
    flex: 1,
    flexDirection: "row",
    gap: 4,
  },
  actionButton: {
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  photo: {
    width: 32,
    height: 32,
    borderRadius: 4,
    backgroundColor: "#F0F0F0",
  },
  list: {
    paddingBottom: 80,
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    color: "#9E9E9E",
    fontSize: 14,
  },
});
