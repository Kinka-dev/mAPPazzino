import * as FileSystem from 'expo-file-system/legacy';
import { addProduct, updateProductQuantity, deleteProduct } from './database';
import { MutationEvent } from './mutationLog';


export async function loadLocalMutationLog() {
  const uri = FileSystem.cacheDirectory + "mutationLog.json";
  const exists = await FileSystem.getInfoAsync(uri);
  if (!exists.exists) return [];
  const content = await FileSystem.readAsStringAsync(uri);
  return JSON.parse(content);
}

export async function loadRemoteMutationLog() {
  const uri = FileSystem.cacheDirectory + "mutationLog_remote.json";
  const exists = await FileSystem.getInfoAsync(uri);
  if (!exists.exists) return [];
  const content = await FileSystem.readAsStringAsync(uri);
  return JSON.parse(content);
}

function findNewEvents(
  localLog: MutationEvent[],
  remoteLog: MutationEvent[]
): MutationEvent[] {
  const localIds = new Set(localLog.map((e: MutationEvent) => e.id));
  return remoteLog.filter((e: MutationEvent) => !localIds.has(e.id));
}

async function applyEvent(event: MutationEvent): Promise<void> {
  if (event.type === "create") {
    await addProduct(event.payload.name, event.payload.quantity);
  }

  if (event.type === "update") {
    await updateProductQuantity(event.payload.id, event.payload.quantity);
  }

  if (event.type === "delete") {
    await deleteProduct(event.payload.id);
  }
}

export async function applyMutationsToDatabase(): Promise<number> {
  const localLog: MutationEvent[] = await loadLocalMutationLog();
  const remoteLog: MutationEvent[] = await loadRemoteMutationLog();

  const newEvents: MutationEvent[] = findNewEvents(localLog, remoteLog);

  console.log("Eventi nuovi da applicare:", newEvents.length);

  for (const event of newEvents) {
    await applyEvent(event);
  }

  return newEvents.length;
}




