import * as AuthSession from "expo-auth-session";
import { useEffect, useState } from "react";

const CLIENT_ID =
  "1037802268782-11ha6pl6defr6789baea4eme0rplias7.apps.googleusercontent.com";

const redirectUri =
  "com.googleusercontent.apps.1037802268782-11ha6pl6defr6789baea4eme0rplias7:/oauthredirect";

const discovery = {
  authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
  tokenEndpoint: "https://oauth2.googleapis.com/token",
};

export function useGoogleLogin() {
const [accessToken, setAccessToken] = useState<string | null>(null);

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: CLIENT_ID,
      redirectUri,
      scopes: ["https://www.googleapis.com/auth/drive.file"],
      responseType: AuthSession.ResponseType.Code,
      usePKCE: true,
    },
    discovery
  );

  console.log("REDIRECT USATO DA EXPO:", redirectUri);

  useEffect(() => {
  async function handleResponse() {
    if (response?.type === "success") {
      console.log("RISPOSTA GOOGLE:", response);

      const tokenResult = await AuthSession.exchangeCodeAsync(
        {
          clientId: CLIENT_ID,
          code: response.params.code,
          redirectUri,
        },
        discovery
      );

      console.log("TOKEN RESULT:", tokenResult);

      setAccessToken(tokenResult.accessToken); // ← ora funziona
    }
  }

  handleResponse();
}, [response]);


  return {
    accessToken,
    loginWithGoogle: () => promptAsync(),
  };
}
