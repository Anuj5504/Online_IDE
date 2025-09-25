import './App.css'
import { Routes, Route, Link } from 'react-router-dom';
import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';
import Workspace from './pages/Workspaces';
import EditorPage from './pages/EditorPage';
import HomePage from './pages/HomePage';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSession } from './redux/slice/userSlice';
import SettingsPage from './components/Settings';


function App() {
  const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getSession());
    }, []);
  return (
    <div >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/workspaces" element={<Workspace/>}/>
        <Route path="/signin" element={<SignInPage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/workspace/:id" element={<EditorPage/>}/>
        <Route path="/settings" element={<SettingsPage/>}/>
      </Routes>
    </div>
  )
}

export default App
