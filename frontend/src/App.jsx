import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Expenses from "./pages/Expenses";
import Report from "./pages/Report";
import AdminRoute from "./components/AdminRoute";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import AdminExpenses from "./pages/AdminExpenses";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected / App routes with sidebar */}
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />

        <Route
          path="/upload"
          element={
            <Layout>
              <Upload />
            </Layout>
          }
        />

        <Route
          path="/expenses"
          element={
            <Layout>
              <Expenses />
            </Layout>
          }
        />

        <Route
          path="/report"
          element={
            <Layout>
              <Report />
            </Layout>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Layout>
                <Admin />
              </Layout>
            </AdminRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Layout>
                <Admin />
              </Layout>
            </AdminRoute>
          }
        />

        <Route
          path="/admin/expenses"
          element={
            <AdminRoute>
              <Layout>
                <AdminExpenses />
              </Layout>
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
