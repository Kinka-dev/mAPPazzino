import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";

type Props = {
  searchQuery: string;
  onChangeSearch: (v: string) => void;
  categories: string[];
  selectedCategory: string | null;
  onChangeCategory: (c: string | null) => void;
  onAddCategory: () => void;
  onSortPress: () => void;
};

export const WarehouseFilters: React.FC<Props> = ({
  searchQuery,
  onChangeSearch,
  categories,
  selectedCategory,
  onChangeCategory,
  onAddCategory,
  onSortPress,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={searchQuery}
        onChangeText={onChangeSearch}
        placeholder="Cerca articoli..."
        style={styles.search}
      />

      <View style={styles.row}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.pillsRow}
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.pill,
                selectedCategory === cat && styles.pillActive,
              ]}
              onPress={() =>
                onChangeCategory(selectedCategory === cat ? null : cat)
              }
            >
              <Text
                style={[
                  styles.pillText,
                  selectedCategory === cat && styles.pillTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.pillAdd} onPress={onAddCategory}>
            <Text style={styles.pillText}>+</Text>
          </TouchableOpacity>
        </ScrollView>

        <TouchableOpacity style={styles.sortButton} onPress={onSortPress}>
          <Text style={styles.sortText}>Ordina per</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  search: {
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    paddingHorizontal: 12,
    backgroundColor: "#FAFAFA",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pillsRow: {
    flexGrow: 0,
  },
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginRight: 8,
  },
  pillActive: {
    backgroundColor: "#E6F4FE",
    borderColor: "#B3D7FF",
  },
  pillText: {
    fontSize: 12,
  },
  pillTextActive: {
    color: "#1A73E8",
  },
  pillAdd: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  sortButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  sortText: {
    fontSize: 12,
  },
});
