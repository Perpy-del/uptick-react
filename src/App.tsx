import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUpPage from './pages/Register';
import LoginPage from './pages/Login';
import Blog from './pages/Blog';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from './components/ui/toaster';
import UptickContextProvider from './contexts/UptickContext';
import BlogPost from './pages/BlogPost';
import NewPost from './pages/NewPost';
import EditPost from './pages/EditPost';

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <UptickContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/create-post" element={<NewPost />} />
            <Route path="/edit/:id" element={<EditPost />} />
          </Routes>
        </UptickContextProvider>
        <Toaster />
      </ThemeProvider>
    </>
  );
}

export default App;
