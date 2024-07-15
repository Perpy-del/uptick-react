import { ArrowRight } from 'lucide-react';

const CategoryComponent = () => {
  return (
    <div className='flex px-5 md:px-10 lg:px-20 gap-10 pb-10'>
      <div className='flex border border-gray-200 dark:border-gray-700 shadow rounded-md justify-between'>
        <div className='p-5 w-[60%]'>
          <h3 className='text-[18px] font-bold text-blue-500 pb-3'>World</h3>
          <h2 className='text-3xl font-serif font-medium'>Featured post</h2>
          <span className='text-slate-500 block pb-2'>Nov 12</span>
          <p className='pb-5 text-[18px]'>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. 
          </p>
          <div className="flex gap-2 items-center text-blue-500 hover:gap-3 cursor-pointer transition-all transform duration-300 hover:text-blue-300">
            <span className='font-medium'>Continue reading</span>
            <ArrowRight size={18} />
          </div>
        </div>
        <div className='w-[200px] bg-slate-300 dark:bg-slate-500 flex items-center justify-center text-[18px] font-medium rounded-tr-md rounded-br-md'>Thumbnail</div>
      </div>
      <div className='flex border border-gray-200 dark:border-gray-700 shadow rounded-md justify-between'>
        <div className='p-5 w-[60%]'>
          <h3 className='text-[18px] font-bold text-green-500 pb-3'>Design</h3>
          <h2 className='text-3xl font-serif font-medium'>Post title</h2>
          <span className='text-slate-500 block pb-2'>Nov 12</span>
          <p className='pb-5 text-[18px]'>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. 
          </p>
          <div className="flex gap-2 items-center text-green-500 hover:gap-3 cursor-pointer transition-all transform duration-300 hover:text-green-300">
            <span className='font-medium'>Continue reading</span>
            <ArrowRight size={18} />
          </div>
        </div>
        <div className='w-[200px] bg-slate-300 dark:bg-slate-500 flex items-center justify-center text-[18px] font-medium rounded-tr-md rounded-br-md'>Thumbnail</div>
      </div>
    </div>
  );
};

export default CategoryComponent;
