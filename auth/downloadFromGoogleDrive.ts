import * as FileSystem from 'expo-file-system/legacy';

export async function downloadFromGoogleDrive(accessToken: string) {
  // 1️⃣ Cerca il file su Drive
  const searchResponse = await fetch(
    "https://www.googleapis.com/drive/v3/files?q=name='mutationLog.json'",
    {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }
  );

  const searchJson = await searchResponse.json();

  if (!searchJson.files || searchJson.files.length === 0) {
    console.log("Nessun file mutationLog.json trovato su Drive");
    return null;
  }

  const fileId = searchJson.files[0].id;

  // 2️⃣ Scarica il contenuto del file
  const downloadResponse = await fetch(
    `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
    {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }
  );

  const fileContent = await downloadResponse.text();

  console.log("Contenuto scaricato:", fileContent);

  return fileContent;
}

export async function saveDownloadedMutationLog(jsonString: string) {
  const fileUri = FileSystem.cacheDirectory + "mutationLog_remote.json";

  await FileSystem.writeAsStringAsync(fileUri, jsonString);

  console.log("File salvato:", fileUri);

  return fileUri;
}

