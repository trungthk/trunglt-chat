import React, { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { login } from "../features/auth/authSlice";

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(login({ email, password }));
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <form
        onSubmit={submit}
        className="w-full max-w-md p-6 bg-white rounded shadow"
      >
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 mb-3 border rounded"
        />
        <button className="w-full p-2 bg-blue-600 text-white rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
