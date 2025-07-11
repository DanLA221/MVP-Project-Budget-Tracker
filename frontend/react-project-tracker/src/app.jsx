import { Routes, Route } from 'react-router';
import Home from './Pages/Home';
import CreateProject from './Pages/CreateProject';
import EditProject from './Pages/EditProject';
import ProjectDetail from './Pages/ProjectDetail';
import About from './Pages/About';
import Layout from './Components/Layout';
import Signup from './Pages/Signup';
import Login from './Pages/login';
import Dashboard from './Pages/Dashboard';
import ProtectedRoute from './Components/ProtectedRoute';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="about" element={<About />} />
        {/* Protected routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/create" element={<ProtectedRoute><CreateProject /></ProtectedRoute>} />
        <Route path="/projects/:projectId" element={<ProtectedRoute><ProjectDetail /></ProtectedRoute>} />
        <Route path="/edit/:projectId" element={<ProtectedRoute><EditProject /></ProtectedRoute>} />
      </Route>
    </Routes>
  );
};

export default App;
