import React from "react";

const Login = ({ login }) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
    <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-80 text-center">
      <h1 className="text-3xl font-extrabold mb-6 text-blue-400">ST Robot Team</h1>
      <p className="mb-4 text-gray-300">เข้าสู่ระบบด้วยบัญชี Google ของคุณ</p>
      <button
        onClick={login}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all"
      >
        Login with Google
      </button>
    </div>
  </div>
);

export default Login;
