import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ user, logout }) => {
  const navigate = useNavigate();

  return (
    
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold mb-2 text-blue-400">Welcome, {user.username}</h1>
        <p className="text-gray-300 mb-4">Email: {user.email}</p>
        <div className="flex gap-4 mb-6">
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow-sm transition-all"
          >
            Logout
          </button>

          {user.role === "admin" && (
            <button
              onClick={() => navigate("/admin")}
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg shadow-sm transition-all"
            >
              Go to Admin
            </button>
          )}
        </div>

        <hr className="my-6 border-gray-700" />

        <h2 className="text-xl font-semibold mb-2 text-gray-200">📂 Code ล่าสุด</h2>
        <a
          href="#"
          className="text-blue-400 underline hover:text-blue-300 transition-colors"
        >
          Download File (ยังไม่เชื่อม Firebase Storage)
        </a>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-200">📅 Event ที่กำลังจะมาถึง</h2>
        <ul className="list-disc list-inside text-gray-300">
          <li>⚡ WRO รอบชิงแชมป์ประเทศไทย – 12/09/2025 - 14/09/2025</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
