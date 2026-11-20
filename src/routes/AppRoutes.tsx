import React from "react";
import { Routes, Route } from "react-router-dom";
import { DetailsScreen } from "../pages/DetailsScreen";
import { ChatScreen } from "../pages/ChatScreen";

interface AppRoutesProps {
  homeElement: React.ReactElement;
}

export const AppRoutes: React.FC<AppRoutesProps> = ({ homeElement }) => {
  return (
    <Routes>
      <Route path="/" element={homeElement} />
      <Route path="/details" element={<DetailsScreen />} />
      <Route path="/details/:categoria/:id" element={<DetailsScreen />} />
      <Route path="/details/:id" element={<DetailsScreen />} />
      <Route path="/chat" element={<ChatScreen />} />
    </Routes>
  );
};