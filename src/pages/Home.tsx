import BlogComponent from '../components/BlogComponent';
import CategoryComponent from '../components/CategoryComponent';
import HeroComponent from '../components/HeroComponent';
import NavBar from '../components/NavBar';

const Home = () => {
  return (
    <div className="bg-slate-50 text-black dark:bg-[#212529] dark:text-white">
      <NavBar />
      <HeroComponent />
      <CategoryComponent />
      <BlogComponent />
    </div>
  );
};

export default Home;
