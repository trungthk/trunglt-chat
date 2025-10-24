import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import ChatPage from "../pages/ChatPage";
import SettingsPage from "../pages/SettingsPage";
import ChannelsPage from "../pages/ChannelsPage";
import GroupsPage from "../pages/GroupsPage";
import NotificationsPage from "../pages/NotificationsPage";
import NotFoundPage from "../pages/NotFoundPage";
import { useSelector } from "react-redux";

const AppRoutes: React.FC = () => {
  const token = useSelector((state: any) => state.auth.accessToken);
  
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/settings"
        element={token ? <SettingsPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/channels"
        element={token ? <ChannelsPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/groups"
        element={token ? <GroupsPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/notifications"
        element={token ? <NotificationsPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/"
        element={token ? <ChatPage /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
