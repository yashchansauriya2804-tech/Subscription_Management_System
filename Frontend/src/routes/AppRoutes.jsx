import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

import HomePage from '../pages/HomePage'
import AdminLayout from '../components/layout/AdminLayout'
import CustomerLayout from '../components/layout/CustomerLayout'
import StaffLayout from '../components/layout/StaffLayout'
import LoginPage from '../pages/auth/login'
import RegisterPage from '../pages/auth/register'
import ForgetPasswordPage from '../pages/auth/forgetPassword'
import AdminDashboardPage from '../pages/admin/dashboard'
import AdminCustomersPage from '../pages/admin/customers'
import AdminPlanPage from '../pages/admin/plan'
import AdminProductsPage from '../pages/admin/products'
import AdminSubscriptionPage from '../pages/admin/subscription'
import AdminInvoicePage from '../pages/admin/invoice'
import AdminPaymentPage from '../pages/admin/payment'
import AdminAnalyticsPage from '../pages/admin/analytics'
import AdminDiscountPage from '../pages/admin/discount'
import AdminStaffPage from '../pages/admin/staff'
import CustomerDashboardPage from '../pages/customer/dashboard'
import CustomerPlansPage from '../pages/customer/explorePlans'
import CustomerInvoicePage from '../pages/customer/myInvoice'
import CustomerProfilePage from '../pages/customer/myProfile'
import CustomerSubscriptionPage from '../pages/customer/mySubscription'
import CustomerPaymentMethodPage from '../pages/customer/paymentMethod'
import StaffDashboardPage from '../pages/staff/dashboard'
import StaffSubscriptionPage from '../pages/staff/subscription'
import StaffInvoicePage from '../pages/staff/invoice'
import StaffCustomerPage from '../pages/staff/customer'

function ProtectedRoute({ role, children }) {
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (role && user?.role !== role) {
    return <Navigate to={user ? `/${user.role}/dashboard` : '/login'} replace />
  }

  return children
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgetPasswordPage />} />

      <Route
        path="/admin/*"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout>
              <Routes>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboardPage />} />
                <Route path="customers" element={<AdminCustomersPage />} />
                <Route path="plans" element={<AdminPlanPage />} />
                <Route path="products" element={<AdminProductsPage />} />
                <Route path="subscriptions" element={<AdminSubscriptionPage />} />
                <Route path="invoices" element={<AdminInvoicePage />} />
                <Route path="payments" element={<AdminPaymentPage />} />
                <Route path="analytics" element={<AdminAnalyticsPage />} />
                <Route path="discounts" element={<AdminDiscountPage />} />
                <Route path="staff" element={<AdminStaffPage />} />
              </Routes>
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/customer/*"
        element={
          <ProtectedRoute role="customer">
            <CustomerLayout>
              <Routes>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<CustomerDashboardPage />} />
                <Route path="plans" element={<CustomerPlansPage />} />
                <Route path="invoices" element={<CustomerInvoicePage />} />
                <Route path="profile" element={<CustomerProfilePage />} />
                <Route path="subscriptions" element={<CustomerSubscriptionPage />} />
                <Route path="payment-methods" element={<CustomerPaymentMethodPage />} />
              </Routes>
            </CustomerLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/staff/*"
        element={
          <ProtectedRoute role="staff">
            <StaffLayout>
              <Routes>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<StaffDashboardPage />} />
                <Route path="customers" element={<StaffCustomerPage />} />
                <Route path="subscriptions" element={<StaffSubscriptionPage />} />
                <Route path="invoices" element={<StaffInvoicePage />} />
              </Routes>
            </StaffLayout>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
