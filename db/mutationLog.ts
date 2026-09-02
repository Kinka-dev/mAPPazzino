import * as FileSystem from 'expo-file-system/legacy';

export type MutationEvent = {
  id: string;            // id unico dell’evento
  type: 'create' | 'update' | 'delete';
  table: 'products';
  payload: any;          // dati della modifica
  timestamp: number;     // quando è avvenuta
  device: string;        // nome del dispositivo (es. Karina)
};

// memoria temporanea degli eventi
let mutationLog: MutationEvent[] = [];

export function getMutationLog() {
  return mutationLog;
}

export function addMutation(event: MutationEvent) {
  mutationLog.push(event);
}

export async function saveMutationLogToFile(mutationLog: MutationEvent[]) {
  const log = JSON.stringify(mutationLog, null, 2);

  const fileUri = FileSystem.cacheDirectory + 'mutationLog.json';

  await FileSystem.writeAsStringAsync(fileUri, log);

  return fileUri;
}

export async function loadMutationLogFromFile() {
  const fileUri = FileSystem.cacheDirectory + 'mutationLog.json';

  const info = await FileSystem.getInfoAsync(fileUri);

  if (!info.exists) {
    return [];
  }

  const content = await FileSystem.readAsStringAsync(fileUri);
  return JSON.parse(content);
}



