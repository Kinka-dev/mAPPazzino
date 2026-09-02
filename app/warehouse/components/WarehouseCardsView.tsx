import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { WarehouseItemCard } from "./WarehouseItemCard";
import { NewProductCard } from "./NewProductCard";

type Item = {
  id: string;
  name: string;
  photoUri?: string;
  category: string;
  quantity: number;
  price?: number;
  position?: string;
  supplier?: string;
  description?: string;
};

type Props = {
  items: Item[];
  isMultiSelect: boolean;
  selectedItems: string[];
  onChangeSelectedItems: (ids: string[]) => void;
  isNewProductMode: boolean;
  onExitNewProductMode: () => void;
};

export const WarehouseCardsView: React.FC<Props> = ({
  items,
  isMultiSelect,
  selectedItems,
  onChangeSelectedItems,
  isNewProductMode,
  onExitNewProductMode,
}) => {
  const toggleSelect = (id: string) => {
    if (!isMultiSelect) return;
    if (selectedItems.includes(id)) {
      onChangeSelectedItems(selectedItems.filter((x) => x !== id));
    } else {
      onChangeSelectedItems([...selectedItems, id]);
    }
  };

  const renderItem = ({ item }: { item: Item }) => (
    <WarehouseItemCard
      item={item}
      isSelected={selectedItems.includes(item.id)}
      isMultiSelect={isMultiSelect}
      onToggleSelect={() => toggleSelect(item.id)}
      // TODO: onDelete, onEdit, onDuplicate, onQuantityChange, ecc.
    />
  );

  const data = isNewProductMode ? ["__new__", ...items] : items;

  if (items.length === 0 && !isNewProductMode) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>
          Nessun articolo corrisponde ai criteri di ricerca.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) =>
        typeof item === "string" ? item : (item as Item).id
      }
      renderItem={({ item }) =>
        typeof item === "string" && item === "__new__" ? (
          <NewProductCard onClose={onExitNewProductMode} />
        ) : (
          renderItem({ item: item as Item })
        )
      }
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingBottom: 80, // spazio per bottom bar
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
