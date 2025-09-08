import admin from "firebase-admin";
import { readFileSync } from "fs";

// อ่าน service account key (JSON)
const serviceAccount = JSON.parse(
  readFileSync("./serviceAccountKey.json", "utf8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// กำหนด email และ role ที่ต้องการ
const email = "supanathub@gmail.com"; // เปลี่ยนเป็น email จริง
const role = "admin"; // หรือ "member"

async function setCustomUserRole() {
  try {
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().setCustomUserClaims(user.uid, { role });
    console.log(`Set role "${role}" ให้กับ ${email} เรียบร้อย`);
    process.exit(0);
  } catch (error) {
    console.error("เกิดข้อผิดพลาด:", error);
    process.exit(1);
  }
}

setCustomUserRole();