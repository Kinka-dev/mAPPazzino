import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

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
  item: Item;
  isSelected: boolean;
  isMultiSelect: boolean;
  onToggleSelect: () => void;
  // TODO: onDelete, onEdit, onDuplicate, onQuantityChange, ecc.
};

export const WarehouseItemCard: React.FC<Props> = ({
  item,
  isSelected,
  isMultiSelect,
  onToggleSelect,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={isMultiSelect ? onToggleSelect : undefined}
      style={[
        styles.card,
        isSelected && styles.cardSelected,
        isEditing && styles.cardEditing,
      ]}
    >
      {!showDescription ? (
        <View>
          <View style={styles.cardHeader}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => {
                // TODO: alert elimina
              }}
            >
              <Text>🗑</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => {
                // toggle edit / salva
                setIsEditing((prev) => !prev);
              }}
            >
              <Text>{isEditing ? "💾" : "✏️"}</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.name}>{item.name}</Text>

          {item.photoUri && (
            <Image source={{ uri: item.photoUri }} style={styles.photo} />
          )}

          <Text style={styles.category}>{item.category}</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Quantità</Text>
            <View style={styles.qtyRow}>
              <TouchableOpacity
                style={styles.qtyButton}
                onPress={() => {
                  // TODO: -1 e salva
                }}
              >
                <Text>-</Text>
              </TouchableOpacity>
              <Text style={styles.qtyValue}>{item.quantity}</Text>
              <TouchableOpacity
                style={styles.qtyButton}
                onPress={() => {
                  // TODO: +1 e salva
                }}
              >
                <Text>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {item.price != null && (
            <Text style={styles.field}>Prezzo: {item.price} €</Text>
          )}
          {item.position && (
            <Text style={styles.field}>Posizione: {item.position}</Text>
          )}
          {item.supplier && (
            <Text style={styles.field}>Fornitore: {item.supplier}</Text>
          )}

          <View style={styles.cardFooter}>
            <TouchableOpacity
              onPress={() => setShowDescription(true)}
              style={styles.descButton}
            >
              <Text style={styles.descText}>Descrizione →</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.duplicateButton}
              onPress={() => {
                // TODO: duplica card
              }}
            >
              <Text>🔁 Duplica</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View>
          <Text style={styles.field}>Descrizione:</Text>
          <Text style={styles.descriptionText}>
            {item.description || "Nessuna descrizione"}
          </Text>

          <View style={styles.descFooter}>
            <TouchableOpacity
              onPress={() => setShowDescription(false)}
              style={styles.backButton}
            >
              <Text>↑ Torna alla card</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#FFFFFF",
  },
  cardSelected: {
    borderColor: "#4A90E2",
  },
  cardEditing: {
    backgroundColor: "#F9F9F9",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  iconButton: {
    padding: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: "400",
    marginBottom: 8,
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#F0F0F0",
  },
  category: {
    fontSize: 12,
    color: "#757575",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    color: "#616161",
  },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  qtyButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  qtyValue: {
    marginHorizontal: 8,
  },
  field: {
    fontSize: 12,
    color: "#616161",
    marginBottom: 4,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  descButton: {},
  descText: {
    fontSize: 12,
    color: "#1A73E8",
  },
  duplicateButton: {},
  descriptionText: {
    fontSize: 12,
    color: "#424242",
    marginTop: 4,
  },
  descFooter: {
    marginTop: 12,
    alignItems: "flex-end",
  },
  backButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});
