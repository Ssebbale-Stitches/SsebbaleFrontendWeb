import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import OtpVerificationPage from "./pages/OtpVerificationPage";
import DashboardPage from "./pages/DashboardPage";
import OrdersPage from "./pages/OrdersPage";
import BookingsPage from "./pages/BookingsPage";
import SuitHirePage from "./pages/SuitHirePage";
import ProductsPage from "./pages/ProductsPage";
import CustomersPage from "./pages/CustomersPage";
import SupportPage from "./pages/SupportPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/verify-otp" element={<OtpVerificationPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/bookings" element={<BookingsPage />} />
      <Route path="/suit-hire" element={<SuitHirePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/customers" element={<CustomersPage />} />
      <Route path="/support" element={<SupportPage />} />
    </Routes>
  );
}

export default App;