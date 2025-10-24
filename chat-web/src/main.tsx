import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Add if you have global styles

// Check if root element exists
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found. Make sure there's a div with id='root' in your HTML file.");
}

// Create root and render app with error handling
try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error("Failed to render app:", error);
  
  // Fallback error display
  rootElement.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: center; height: 100vh; font-family: Arial, sans-serif;">
      <div style="text-align: center; padding: 20px;">
        <h1 style="color: #dc2626; margin-bottom: 16px;">Application Error</h1>
        <p style="color: #666; margin-bottom: 16px;">Failed to start the application. Please check the console for more details.</p>
        <button onclick="window.location.reload()" style="padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Reload Page
        </button>
      </div>
    </div>
  `;
}
