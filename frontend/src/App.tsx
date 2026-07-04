import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/Layout';
import { Landing } from './pages/Landing';
import { FounderLogin } from './pages/login/FounderLogin';
import { EmployeeLogin } from './pages/login/EmployeeLogin';
import { MissionInput } from './pages/MissionInput';
import { LiveActivity } from './pages/LiveActivity';
import { Agents } from './pages/Agents';
import { Analytics } from './pages/Analytics';
import { Documents } from './pages/Documents';
import { ApprovalCenter } from './pages/ApprovalCenter';
import { Settings } from './pages/Settings';
import { EmployeeMonitoring } from './pages/EmployeeMonitoring';
import { EmployeeDetail } from './pages/EmployeeDetail';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<Landing />} />
          
          {/* Login Pages */}
          <Route path="/login/founder" element={<FounderLogin />} />
          <Route path="/login/employee" element={<EmployeeLogin />} />
          
          {/* Founder Dashboard Routes */}
          <Route path="/founder" element={<Layout />}>
            <Route index element={<Navigate to="/founder/dashboard" replace />} />
            <Route path="dashboard" element={
              <ProtectedRoute requiredRole="founder">
                <MissionInput />
              </ProtectedRoute>
            } />
            <Route path="activity" element={
              <ProtectedRoute requiredRole="founder">
                <LiveActivity />
              </ProtectedRoute>
            } />
            <Route path="agents" element={
              <ProtectedRoute requiredRole="founder">
                <Agents />
              </ProtectedRoute>
            } />
            <Route path="analytics" element={
              <ProtectedRoute requiredRole="founder">
                <Analytics />
              </ProtectedRoute>
            } />
            <Route path="documents" element={
              <ProtectedRoute requiredRole="founder">
                <Documents />
              </ProtectedRoute>
            } />
            <Route path="approvals" element={
              <ProtectedRoute requiredRole="founder">
                <ApprovalCenter />
              </ProtectedRoute>
            } />
            <Route path="settings" element={
              <ProtectedRoute requiredRole="founder">
                <Settings />
              </ProtectedRoute>
            } />
            <Route path="employees" element={
              <ProtectedRoute requiredRole="founder">
                <EmployeeMonitoring />
              </ProtectedRoute>
            } />
            <Route path="employees/:id" element={
              <ProtectedRoute requiredRole="founder">
                <EmployeeDetail />
              </ProtectedRoute>
            } />
          </Route>
          
          {/* Employee Dashboard Routes */}
          <Route path="/employee" element={<Layout />}>
            <Route index element={<Navigate to="/employee/dashboard" replace />} />
            <Route path="dashboard" element={
              <ProtectedRoute requiredRole="employee">
                <EmployeeDetail />
              </ProtectedRoute>
            } />
            <Route path="activity" element={
              <ProtectedRoute requiredRole="employee">
                <LiveActivity />
              </ProtectedRoute>
            } />
            <Route path="agents" element={
              <ProtectedRoute requiredRole="employee">
                <Agents />
              </ProtectedRoute>
            } />
            <Route path="analytics" element={
              <ProtectedRoute requiredRole="employee">
                <Analytics />
              </ProtectedRoute>
            } />
            <Route path="documents" element={
              <ProtectedRoute requiredRole="employee">
                <Documents />
              </ProtectedRoute>
            } />
            <Route path="approvals" element={
              <ProtectedRoute requiredRole="employee">
                <ApprovalCenter />
              </ProtectedRoute>
            } />
            <Route path="settings" element={
              <ProtectedRoute requiredRole="employee">
                <Settings />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
