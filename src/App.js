import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";
import SkillPage from "./pages/SkillPage";
import UnSkillPage from "./pages/UnSkillPage";
import ArtisanPage from "./pages/Artisanpage";
import CustomerRequestPage from "./pages/CustomerRequestPage";
import ListPage from "./pages/ListPage";
import HistoryPage from "./pages/HistoryPage";
import LocationPage from "./pages/locationPage";
import MyHistoryPage from "./pages/MyHistoryPage";
import AuthGuard from "./guard/auth";
import AdminGuard from "./guard/admin";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer position="top-right" limit={1} />
        <Routes>
          <Route path="/" element={<Index />}>
            <Route index element={<LocationPage />} />
            <Route path="skill" element={<SkillPage />} />
            <Route path="unSkill" element={<UnSkillPage />} />
            <Route path="artisan" element={<ArtisanPage />} />
            <Route path="customer" element={<CustomerRequestPage />} />
            <Route
              path="/dashboard"
              element={
                <AuthGuard>
                  <ListPage />
                </AuthGuard>
              }
            ></Route>
            <Route
              path="/dashboard/history"
              element={
                <AdminGuard>
                  <HistoryPage />
                </AdminGuard>
              }
            ></Route>
            <Route
              path="/dashboard/history/myrecord"
              element={
                <AuthGuard>
                  <MyHistoryPage />
                </AuthGuard>
              }
            ></Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
