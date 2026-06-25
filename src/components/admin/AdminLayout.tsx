import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Sidebar from './Sidebar';
import toast from 'react-hot-toast';

export default function AdminLayout() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/admin/login');
    }
  }, [user, loading, navigate]);

  const handleLogout = async () => {
    await signOut();
    toast.success('Berhasil logout');
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="animate-spin w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar onLogout={handleLogout} />
      <div className="flex-1 lg:ml-64">
        <header className="bg-white border-b border-gray-200 pl-14 lg:pl-6 pr-4 py-3 lg:py-4 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-base lg:text-lg font-bold text-gray-900">Admin Panel</h1>
            <p className="text-[10px] lg:text-xs text-gray-500 truncate max-w-[160px] lg:max-w-none">{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-xs lg:text-sm text-red-600 hover:text-red-700 font-medium"
          >
            Logout
          </button>
        </header>
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
