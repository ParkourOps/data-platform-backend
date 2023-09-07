import admin from "firebase-admin"
import { getFirestore } from "firebase-admin/firestore"
import { getAuth } from "firebase-admin/auth"
import serviceAccountCredentials from "../data-platform-c3a1e-firebase-adminsdk-a0ha1-0cb5e06897.json"

const app = admin.initializeApp({
    credential: admin.credential.cert({
        projectId: serviceAccountCredentials.project_id,
        clientEmail: serviceAccountCredentials.client_email,
        privateKey: serviceAccountCredentials.private_key
    })
});

const auth = getAuth(app);

const firestore = getFirestore(app);
firestore.settings({ignoreUndefinedProperties: true});

export default {
    firestore,
    auth
};

export { UserRecord } from "firebase-admin/auth";
