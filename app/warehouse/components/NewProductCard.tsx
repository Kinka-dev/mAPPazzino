import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";

type Props = {
  onClose: () => void;
};

export const NewProductCard: React.FC<Props> = ({ onClose }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.iconButton}>
          <Text>🗑</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {
            // TODO: comandi vocali
          }}
        >
          <Text>🎧</Text>
        </TouchableOpacity>
      </View>

      <TextInput placeholder="Nome articolo" style={styles.input} />

      <TouchableOpacity
        style={styles.photoPlaceholder}
        onPress={() => {
          // TODO: scegli foto / scatta
        }}
      >
        <Text>📷 Aggiungi foto</Text>
      </TouchableOpacity>

      {/* Picker categoria */}
      <TouchableOpacity
        style={styles.input}
        onPress={() => {
          // TODO: apri picker categorie + nuova categoria
        }}
      >
        <Text style={styles.inputText}>Seleziona categoria…</Text>
      </TouchableOpacity>

      {/* Quantità */}
      <View style={styles.row}>
        <Text style={styles.label}>Quantità</Text>
        <View style={styles.qtyRow}>
          <TouchableOpacity style={styles.qtyButton}>
            <Text>-</Text>
          </TouchableOpacity>
          <Text style={styles.qtyValue}>0</Text>
          <TouchableOpacity style={styles.qtyButton}>
            <Text>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TextInput
        placeholder="Prezzo"
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput placeholder="Posizione" style={styles.input} />
      <TextInput placeholder="Fornitore" style={styles.input} />
      <TextInput
        placeholder="Descrizione"
        style={[styles.input, styles.inputMultiline]}
        multiline
      />
    </View>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  iconButton: {
    padding: 4,
  },
  input: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 8,
    backgroundColor: "#FAFAFA",
  },
  inputText: {
    fontSize: 12,
    color: "#757575",
  },
  photoPlaceholder: {
    height: 80,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FAFAFA",
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
  inputMultiline: {
    minHeight: 80,
    textAlignVertical: "top",
  },
});
