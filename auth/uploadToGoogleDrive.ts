import * as FileSystem from 'expo-file-system/legacy';

export async function uploadToGoogleDrive(accessToken: string) {
  const fileUri = FileSystem.cacheDirectory + 'mutationLog.json';
  const fileContent = await FileSystem.readAsStringAsync(fileUri);

  const metadata = {
    name: "mutationLog.json",
    mimeType: "application/json"
  };

  const boundary = "KarinaBoundary";

  const body =
    "--" + boundary + "\r\n" +
    "Content-Type: application/json; charset=UTF-8\r\n\r\n" +
    JSON.stringify(metadata) + "\r\n" +
    "--" + boundary + "\r\n" +
    "Content-Type: application/json\r\n\r\n" +
    fileContent + "\r\n" +
    "--" + boundary + "--";

  const response = await fetch(
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
    {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + accessToken,
        "Content-Type": "multipart/related; boundary=" + boundary
      },
      body
    }
  );

  const json = await response.json();
  console.log("Upload OK:", json);

  return json;
}
