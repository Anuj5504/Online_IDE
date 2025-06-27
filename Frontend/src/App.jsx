import './App.css'
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';
import Workspace from './pages/Workspaces';
import EditorPage from './pages/EditorPage';


function App() {

  return (
    <div >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workspaces" element={<Workspace/>}/>
        <Route path="/signin" element={<SignInPage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/workspace/:id" element={<EditorPage/>}/>
      </Routes>
    </div>
  )
}

export default App
