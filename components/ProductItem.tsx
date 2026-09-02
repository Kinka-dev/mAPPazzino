import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { Product } from "../db/database";

type Props = {
  item: Product;
  onUpdate: (id: number, qty: number) => void;
  onDelete: (id: number) => void;
};

export function ProductItem({ item, onUpdate, onDelete }: Props) {
  const [localQty, setLocalQty] = useState(item.quantity.toString());

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ fontSize: 18 }}>{item.name}</Text>

      <TextInput
        value={localQty}
        onChangeText={setLocalQty}
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 8,
          marginVertical: 8,
          width: 100,
        }}
      />

      <Button
        title="Aggiorna quantità"
        onPress={() => onUpdate(item.id, parseInt(localQty, 10))}
      />

      <View style={{ height: 8 }} />

      <Button
        title="Elimina prodotto"
        color="red"
        onPress={() => onDelete(item.id)}
      />
    </View>
  );
}
