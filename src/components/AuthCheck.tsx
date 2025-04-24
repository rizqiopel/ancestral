import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthCheckProps {
  children: React.ReactNode;
}

export default function AuthCheck({ children }: AuthCheckProps) {
  const navigate = useNavigate();
  
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate]);
  
  return <>{children}</>;
}