import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import {
  initDatabase,
  getAllProducts,
  addProduct,
  updateProductQuantity,
  deleteProduct,
  Product,
} from "../db/database";
import { getMutationLog } from "../db/mutationLog";
import {
  saveMutationLogToFile,
  loadMutationLogFromFile,
} from "../db/mutationLog";
import { ProductItem } from "../components/ProductItem";
import { useGoogleLogin } from "../auth/useGoogleLogin";
import { uploadToGoogleDrive } from "../auth/uploadToGoogleDrive";
import {
  downloadFromGoogleDrive,
  saveDownloadedMutationLog,
} from "../auth/downloadFromGoogleDrive";
import { applyMutationsToDatabase } from "../db/applyMutations";
import { router } from "expo-router";

const CLIENT_ID =
  "1037802268782-6busejt1ivrj0emsc1h0nhr5dh6g9943.apps.googleusercontent.com";

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("1");
  const { accessToken, loginWithGoogle } = useGoogleLogin();

  async function loadProducts() {
    const rows = await getAllProducts();
    setProducts(rows);
  }

  useEffect(() => {
    async function start() {
      await initDatabase();
      await loadProducts();
    }
    start();
  }, []);

  async function handleAddProduct() {
    if (!name.trim()) return;

    const qty = parseInt(quantity, 10);
    if (isNaN(qty) || qty <= 0) return;

    await addProduct(name.trim(), qty);

    setName("");
    setQuantity("1");

    await loadProducts();
  }

  async function handleUpdate(id: number, qty: number) {
    await updateProductQuantity(id, qty);
    await loadProducts();
    console.log(getMutationLog());
  }

  async function handleDelete(id: number) {
    await deleteProduct(id);
    await loadProducts();
  }

  return (
    <View style={{ padding: 25, backgroundColor: "#fff" }}>
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          marginTop: 20,
          marginBottom: 12,
        }}
      >
        Magazzino
      </Text>

      <TouchableOpacity
        onPress={() => router.push("/warehouse")}
        style={{ marginTop: 20 }}
      >
        <Text style={{ color: "#1A73E8" }}>Apri Magazzino (debug)</Text>
      </TouchableOpacity>

      {/* Form per aggiungere un prodotto */}
      <View style={{ marginBottom: 20 }}>
        <Text>Nome prodotto</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Es. Resistore 330Ohm"
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 8,
            marginBottom: 8,
          }}
        />

        <Text>Quantità</Text>
        <TextInput
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 8,
            marginBottom: 8,
          }}
        />

        <Button title="Aggiungi prodotto" onPress={handleAddProduct} />
      </View>

      <Button
        title="Salva mutation log"
        onPress={async () => {
          const uri = await saveMutationLogToFile(getMutationLog());
          console.log("File salvato:", uri);

          const log = await loadMutationLogFromFile();
          console.log("Contenuto del file:", log);
        }}
      />

      <Button title="Login con Google" onPress={loginWithGoogle} />

      <Button
        title="Upload su Google Drive"
        onPress={async () => {
          if (!accessToken) {
            console.log("Non sei loggata");
            return;
          }

          await uploadToGoogleDrive(accessToken);
        }}
      />

      <Button
        title="Scarica da Drive"
        onPress={async () => {
          if (!accessToken) {
            console.log("Non sei loggata");
            return;
          }

          const content = await downloadFromGoogleDrive(accessToken);

          if (content) {
            await saveDownloadedMutationLog(content);
          }
        }}
      />

      <Button
        title="Applica mutazioni"
        onPress={async () => {
          const count = await applyMutationsToDatabase();
          console.log("Mutazioni applicate:", count);
          await loadProducts(); // ricarica la lista
        }}
      />

      {/* Lista prodotti */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductItem
            item={item}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        )}
      />
    </View>
  );
}
