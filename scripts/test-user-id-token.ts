import config from "@config";
import axios from "axios";

(async () => {
    const resp = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${config.FIREBASE_SPA_API_KEY}`,
        {
            email: config.TEST_ACCOUNT_EMAIL,
            password: config.TEST_ACCOUNT_PASSWORD,
            returnSecureToken: true
        }
    );
    const idToken = resp.data.idToken;
    console.log("ID Token:", idToken);
})();
