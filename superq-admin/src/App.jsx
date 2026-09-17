import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Layout } from '@/components/Layout';
import { Login } from '@/pages/Login';
import { Board } from '@/pages/Board';
import { ReportProblem } from '@/pages/ReportProblem';
import { Triage } from '@/pages/Triage';
import { WaitingOnYou } from '@/pages/WaitingOnYou';
import { TicketDetail } from '@/pages/TicketDetail';

function Protected({ children }) {
  const { session, loading } = useAuth();
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-slate-500">
        Loading…
      </div>
    );
  }
  if (!session) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        element={
          <Protected>
            <Layout />
          </Protected>
        }
      >
        <Route path="/" element={<Board />} />
        <Route path="/report" element={<ReportProblem />} />
        <Route path="/triage" element={<Triage />} />
        <Route path="/decide" element={<WaitingOnYou />} />
        <Route path="/t/:reference" element={<TicketDetail />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
