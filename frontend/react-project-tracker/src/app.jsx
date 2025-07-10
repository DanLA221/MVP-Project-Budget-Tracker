import { Routes, Route } from 'react-router';
import Home from './Pages/Home';
import CreateProject from './Pages/CreateProject';
import EditProject from './Pages/EditProject';
import ProjectDetail from './Pages/ProjectDetail';
import About from './Pages/About';
import Layout from './Components/Layout';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="/create" element={<CreateProject />} />
        <Route path="/projects/:projectId" element={<ProjectDetail />} />
        <Route path="/edit/:projectId" element={<EditProject />} />
      </Route>
    </Routes>
  );
};

export default App;
