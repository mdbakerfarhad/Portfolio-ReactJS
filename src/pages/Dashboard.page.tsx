import { useEffect } from 'react';
import { useUser } from '../context/User.context';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { isDevelopment } from '../utilities/app.utilities';

const Dashboard = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const socketUrl = import.meta.env.VITE_SOCKET_URL;

  // socket initialization
  // Note: Ensure that the server is running and accessible at this URL
  const socket = io(socketUrl, {
    transports: ['websocket'], // Enforce only websocket
    autoConnect: false,
  });

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }
    socket.on('connect', () => {
      if (isDevelopment) console.log('Connected to server:', socket.id);
    });
  }, []);

  const handleLogout = () => {
    logout();
    socket.disconnect();
    if (isDevelopment) console.log('Disconnected from server');
    navigate('/login');
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user?.name}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
