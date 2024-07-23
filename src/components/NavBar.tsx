import { Search } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { ModeToggle } from './mode-toggle';
import { useUptickHook } from '../hooks/useUptickHook';
import { toast } from './ui/use-toast';
import { useState } from 'react';

const NavBar = ({
  activeCategory,
  setActiveCategory,
}: {
  activeCategory: any;
  setActiveCategory: any;
}) => {
  const navigate = useNavigate();
  const { user, logout, categoriesData, getCategory, getAllBlogs } =
    useUptickHook();
  const [showButton, setShowButton] = useState<boolean>(false);

  return (
    <div className="px-5 md:px-10 lg:px-20 pb-2">
      <div className="h-[140px] md:h-[70px] flex items-center justify-between">
        <a href="" className="text-[#6C757D] underline hover:text-[#6C757D]/80">
          Subscribe
        </a>
        <h1
          className="font-serif text-2xl lg:text-4xl font-semibold cursor-pointer"
          onClick={() => navigate('/')}
        >
          Uptick
        </h1>
        <div className="flex items-center gap-3">
          <div className="cursor-pointer">
            <Search />
          </div>
          <div className="flex items-center gap-2 flex-col md:flex-row">
            {user ? (
              <p>
                Welcome, {user?.data?.firstName} {user?.data?.lastName}
              </p>
            ) : (
              <Button onClick={() => navigate('/signup')}>Sign up</Button>
            )}
            {user && (
              <Button
                onClick={logout}
                className="text-red-700 dark:text-red-700 font-bold"
              >
                Log out
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="h-11 border-t border-b flex items-center gap-3 md:gap-0 md:justify-between mb-5 overflow-scroll md:overflow-auto">
        {categoriesData.map((category: string, index: number) => (
          <div
            className={`cursor-pointer dark:text-gray-400 text-xs md:text-base hover:text-[17px] hover:dark:text-white transition-all transform duration-300 ${
              activeCategory === category
                ? 'text-green-600 dark:text-green-600'
                : ''
            }`}
            key={index}
            onClick={() => {
              if (user) {
                setActiveCategory(category);
                getCategory(category);
                setShowButton(true);
              } else {
                toast({ description: 'Please login to view blogs' });
              }
            }}
          >
            {category}
          </div>
        ))}
        {showButton && (
          <Button
            onClick={() => {
              getAllBlogs();
              setShowButton(false);
            }}
          >
            Back Home
          </Button>
        )}
      </div>
      <ModeToggle />
    </div>
  );
};

export default NavBar;
