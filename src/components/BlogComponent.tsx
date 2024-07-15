import { recentPosts, RecentPostsInterface } from '../data';

const BlogComponent = () => {
  return (
    <div className="px-5 md:px-10 lg:px-20 flex flex-col md:flex-row gap-10">
      <div className='md:w-1/2 w-full'>
        <h1 className="pb-5 text-3xl border-b border-gray-200 dark:border-gray-700 font-semibold font-serif">
          From the firehose
        </h1>
        <div className="pt-10 pb-5 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-5xl font-semibold font-serif pb-2">
            Sample blog post
          </h1>
          <p className="font-light text-gray-400 pb-5">
            January 1, 2021 by{' '}
            <span className="cursor-pointer font-normal text-blue-400 underline hover:text-blue-300">
              Mark
            </span>
          </p>
          <p>
            This blog post shows a few different types of content that&apos;s
            supported and styled with Bootstrap. Basic typography, lists,
            tables, images, code, and more are all supported as expected. This
            is some additional paragraph placeholder content. It has been
            written to fill the available space and show how a longer snippet of
            text affects the surrounding content. We'll repeat it often to keep
            the demonstration flowing, so be on the lookout for this exact same
            string of text.
          </p>
        </div>
        <p className="py-5"></p>
      </div>
      <div className='md:w-[50%] lg:w-[44%]'>
        <div className="p-5 bg-gray-300 dark:bg-gray-600 rounded-md mb-3">
          <h1 className='font-serif font-medium text-3xl pb-3 italic'>About</h1>
          <p>
            Perpetual Meninwa is a software developer who loves to solve critical solutions to technological problems. I love NodeJS, NextJS, Typescript and ExpressJS. Currently learning how microservices work as well as how to use cloud services (AWS and Azure).
          </p>
        </div>
        <div>
          <h2 className='font-serif font-medium text-3xl italic pb-3'>Recent posts</h2>
          <div>
            {recentPosts.map((post: RecentPostsInterface, index: number) => {
              return (
                <div key={index} className="py-5 border-t border-gray-300 dark:border-gray-700 flex gap-4 items-center justify-center">
                  <div className="w-[100px] h-[100px] bg-gray-300 dark:bg-gray-600"></div>
                  <div className='w-2/3'>
                    <h3 className='font-semibold font-serif'>{post.name}</h3>
                    <p className='text-sm text-gray-400'>{post.date}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogComponent;
