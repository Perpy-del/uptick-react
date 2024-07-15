import { ModeToggle } from './mode-toggle';
import { Search } from 'lucide-react';
import { Button } from './ui/button';
import { categoriesData } from '../data';

const NavBar = () => {
  return (
    <div className="px-5 md:px-10 lg:px-20 pb-2">
      <div className="h-[70px] flex items-center justify-between">
        <a href="" className='text-[#6C757D] underline hover:text-[#6C757D]/80'>Subscribe</a>
        <h1 className='font-serif text-4xl font-semibold'>Uptick Blog</h1>
        <div className="flex items-center gap-3">
          <div className="cursor-pointer">
            <Search />
          </div>
          <Button>Sign up</Button>
        </div>
      </div>
      <div className="h-11 border-t border-b flex items-center justify-between mb-5">
        {categoriesData.map((category, index) => (
          <h3 key={index}>{category}</h3>
        ))}
      </div>
      <ModeToggle />
    </div>
  );
};

export default NavBar;
