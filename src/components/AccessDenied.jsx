import React from "react";

const AccessDenied = ({ logout }) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
    <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-80 text-center">
      <h1 className="text-2xl font-bold mb-4 text-red-500">Access Denied</h1>
      <p className="mb-6 text-gray-300">Email ของคุณยังไม่ได้รับอนุญาต</p>
      <button
        onClick={logout}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all"
      >
        Logout
      </button>
    </div>
  </div>
);

export default AccessDenied;
