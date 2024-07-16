import { Search } from 'lucide-react';
import { Button } from './ui/button';
import { categoriesData } from '../data';
import { useNavigate } from 'react-router-dom';
import { ModeToggle } from './mode-toggle';

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <div className="px-5 md:px-10 lg:px-20 pb-2">
      <div className="h-[70px] flex items-center justify-between">
        <a href="" className='text-[#6C757D] underline hover:text-[#6C757D]/80'>Subscribe</a>
        <h1 className='font-serif text-2xl lg:text-4xl font-semibold cursor-pointer' onClick={() => navigate('/')}>Uptick</h1>
        <div className="flex items-center gap-3">
          <div className="cursor-pointer">
            <Search />
          </div>
          <Button onClick={() => navigate('/signup')}>Sign up</Button>
        </div>
      </div>
      <div className="h-11 border-t border-b flex items-center gap-3 md:gap-0 md:justify-between mb-5 overflow-scroll md:overflow-auto">
        {categoriesData.map((category, index) => (
          <h3 className='cursor-pointer dark:text-gray-400 hover:text-[17px] hover:dark:text-white transition-all transform duration-300' key={index}>{category}</h3>
        ))}
      </div>
      <ModeToggle />
    </div>
  );
};

export default NavBar;
