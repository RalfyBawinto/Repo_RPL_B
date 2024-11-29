import React from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <html>
      <head>
        <title>Login Page</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        />
      </head>
      <body className="bg-gray-100 flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
          <h1 className="text-2xl font-bold text-center mb-2">Management System</h1>
          <h2 className="text-2xl font-bold text-center mb-6">Lab TI UNSRAT</h2>
          <h3 className="text-lg font-semibold text-center mb-4">LOGIN</h3>
          <form>
            <div className="mb-4">
              <input
                type="text"
                placeholder="username"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                placeholder="password"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800"
              >
                Login
              </button>
            </div>
            <div className="text-center">
              <a href="#" className="text-blue-600 hover:underline">
                Forgot Password?
              </a>
            </div>
          </form>
        </div>
      </body>
    </html>
  );
}