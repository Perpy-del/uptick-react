import BlogComponent from '../components/BlogComponent';
import CategoryComponent from '../components/CategoryComponent';
import HeroComponent from '../components/HeroComponent';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/blog')
    } else {
      navigate('/login');
    }
  })

  return (
    <div className="bg-slate-50 text-black dark:bg-[#212529] dark:text-white">
      <NavBar activeCategory={undefined} setActiveCategory={undefined} />
      <HeroComponent />
      <CategoryComponent />
      <BlogComponent />
    </div>
  );
};

export default Home;
