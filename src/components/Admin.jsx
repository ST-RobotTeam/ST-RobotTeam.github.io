import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { collection, doc, setDoc, addDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";

function Admin({ user }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("member");
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");

  // เพิ่มสมาชิก ใช้ email เป็น document id
  const addMember = async () => {
    if (!email || !username) return alert("กรุณากรอก Email และ Username");

    try {
      await setDoc(doc(db, "members", email), {
        username,
        role,
        email
      });
      alert("เพิ่มสมาชิกเรียบร้อย!");
      setEmail(""); setUsername(""); setRole("member");
    } catch (err) {
      console.error(err);
      alert("เกิดข้อผิดพลาด");
    }
  };

  // เพิ่ม Event ใหม่
  const addEvent = async () => {
    if (!eventTitle || !eventDate) return alert("กรุณากรอกชื่อและวันที่ Event");

    try {
      await addDoc(collection(db, "events"), {
        title: eventTitle,
        date: eventDate
      });
      alert("เพิ่ม Event เรียบร้อย!");
      setEventTitle(""); setEventDate("");
    } catch (err) {
      console.error(err);
      alert("เกิดข้อผิดพลาด");
    }
  };

  // Logout
  const logout = () => {
    signOut(auth);
    navigate("/login");
  };

  // ตรวจสอบสิทธิ์ admin
  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-red-500 p-4 text-lg">คุณไม่มีสิทธิ์เข้าหน้านี้</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-blue-400">Admin Panel</h1>

        {/* ปุ่มกลับ Dashboard */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg shadow-sm transition-all"
          >
            ← กลับ Dashboard
          </button>
        </div>

        {/* Form เพิ่มสมาชิก */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-gray-200">➕ เพิ่มสมาชิกใหม่</h2>
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-2 p-2 rounded bg-gray-700 text-gray-200"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Username"
            className="w-full mb-2 p-2 rounded bg-gray-700 text-gray-200"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <select
            className="w-full mb-2 p-2 rounded bg-gray-700 text-gray-200"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </select>
          <button
            onClick={addMember}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-md transition-all"
          >
            เพิ่มสมาชิก
          </button>
        </div>

        {/* Form เพิ่ม Event */}
        <div>
          <h2 className="text-xl font-semibold mb-2 text-gray-200">📅 เพิ่ม Event ใหม่</h2>
          <input
            type="text"
            placeholder="Event Title"
            className="w-full mb-2 p-2 rounded bg-gray-700 text-gray-200"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
          />
          <input
            type="date"
            className="w-full mb-2 p-2 rounded bg-gray-700 text-gray-200"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />
          <button
            onClick={addEvent}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg shadow-md transition-all"
          >
            เพิ่ม Event
          </button>
        </div>

        {/* ปุ่ม Logout */}
        <div className="mt-6">
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow-sm transition-all"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Admin;