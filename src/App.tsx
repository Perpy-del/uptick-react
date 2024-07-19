import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUpPage from './pages/Register';
import LoginPage from './pages/Login';
import Blog from './pages/Blog';
import { ThemeProvider } from './components/theme-provider';

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
