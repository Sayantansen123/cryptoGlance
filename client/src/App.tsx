import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";
import Market from "./pages/Market";
import Transactions from "./pages/Transactions";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";
import { auth,useAuth } from "./lib/firebase";

const queryClient = new QueryClient();

// Mock authentication state - would be handled by Firebase Auth in real implementation
const isLoggedIn = false; // Change to false to test auth flow

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return user ? <Navigate to="/" replace /> : <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
          <Route path="/register" element={<AuthRoute><Register /></AuthRoute>} />

          {/* Protected Routes - Main App Layout */}
          <Route path="/" element={<PrivateRoute><Layout><Dashboard /></Layout></PrivateRoute>} />
          <Route path="/portfolio" element={<PrivateRoute><Layout><Portfolio /></Layout></PrivateRoute>} />
          <Route path="/market" element={<PrivateRoute><Layout><Market /></Layout></PrivateRoute>} />
          <Route path="/transactions" element={<PrivateRoute><Layout><Transactions /></Layout></PrivateRoute>} />
          <Route path="/settings" element={<PrivateRoute><Layout><Settings /></Layout></PrivateRoute>} />

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
