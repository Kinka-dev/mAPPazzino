import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { WarehouseHeader } from "./components/WarehouseHeader";
import { WarehouseFilters } from "./components/WarehouseFilters";
import { WarehouseBottomBar } from "./components/WarehouseBottomBar";
import { WarehouseCardsView } from "./components/WarehouseCardsView";
import { WarehouseTableView } from "./components/WarehouseTableView";

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

export const WarehouseScreen = () => {
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isMultiSelect, setIsMultiSelect] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isNewProductMode, setIsNewProductMode] = useState(false);

  const items: Item[] = [];
  const filteredItems: Item[] = items;

  return (
    <View style={styles.container}>
      <WarehouseHeader
        title="Magazzino"
        viewMode={viewMode}
        onToggleView={() =>
          setViewMode((prev) => (prev === "cards" ? "table" : "cards"))
        }
      />

      <WarehouseFilters
        searchQuery={searchQuery}
        onChangeSearch={setSearchQuery}
        selectedCategory={selectedCategory}
        onChangeCategory={setSelectedCategory}
        // TODO: categorie reali
        categories={["Tutte", "Categoria A", "Categoria B"]}
        onAddCategory={() => {
          // apri modal nuova categoria
        }}
        onSortPress={() => {
          // apri modal "ordina per"
        }}
      />

      {viewMode === "cards" ? (
        <WarehouseCardsView
          items={filteredItems}
          isMultiSelect={isMultiSelect}
          selectedItems={selectedItems}
          onChangeSelectedItems={setSelectedItems}
          isNewProductMode={isNewProductMode}
          onExitNewProductMode={() => setIsNewProductMode(false)}
        />
      ) : (
        <WarehouseTableView
          items={filteredItems}
          isMultiSelect={isMultiSelect}
          selectedItems={selectedItems}
          onChangeSelectedItems={setSelectedItems}
        />
      )}

      <WarehouseBottomBar
        isMultiSelect={isMultiSelect}
        onToggleMultiSelect={() => {
          setIsMultiSelect((prev) => !prev);
          setSelectedItems([]);
        }}
        onNewProduct={() => {
          setIsNewProductMode(true);
        }}
        onSaveAll={() => {
          // salva tutte le modifiche
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});
