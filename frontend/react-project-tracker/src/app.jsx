import { Routes, Route } from 'react-router';
import Home from './Pages/Home';
import CreateProject from './Pages/CreateProject';
import EditProject from './Pages/EditProject';
import ProjectDetail from './Pages/ProjectDetail';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreateProject />} />
      <Route path="/projects/:projectId" element={<ProjectDetail />} />
      <Route path="/edit/:projectId" element={<EditProject />} />
    </Routes>
  );
};

export default App;
