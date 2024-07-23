import NavBar from '../components/NavBar';
// import { recentPosts, RecentPostsInterface } from '../data';
import { useUptickHook } from '../hooks/useUptickHook';
import { BlogInterface } from '../contexts/UptickContext';
import { dateFormatter } from '../lib/utils';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
// import { BlogInterface } from '../contexts/UptickContext';

const Blog = () => {
  const navigate = useNavigate();
  const { blogs, blogLoading } = useUptickHook();

  const lastBlog = blogs[blogs.length - 1];

  if (blogLoading) {
    <div className='flex items-center justify-center text-lg font-bold'>
      <h1>Loading</h1>
    </div>
  }

  return (
    <div className="bg-slate-50 text-black dark:bg-[#212529] dark:text-white">
      <NavBar />
      <Button className='ml-5 md:ml-10 lg:ml-20 w-52' onClick={() => navigate('/create-post')}>Create New Post</Button>
      <div className="py-10 px-5 md:px-10 lg:px-20 border-gray-200 dark:border-gray-700">
        <h1 className="text-5xl font-semibold font-serif pb-2">
          {lastBlog?.title}
        </h1>
        <p className="font-light text-gray-400 pb-5">
          {dateFormatter(lastBlog?.createdAt)} by{' '}
          <span className="cursor-pointer font-normal text-blue-400 underline hover:text-blue-300">
            {lastBlog?.author}
          </span>
        </p>
        <p>
          {lastBlog?.body}
        </p>
      </div>
      <div className="px-5 md:px-10 lg:px-20">
        <h2 className="font-serif font-medium text-3xl italic pb-3">
          Recent posts
        </h2>
        <div>
          {blogs.map((blog: BlogInterface, index: number) => {
            return (
              <div
                key={index}
                className="py-5 border-t border-gray-300 dark:border-gray-700 flex gap-4 items-center justify-center cursor-pointer"
                onClick={() => {
                  navigate(`/blog/${blog.blogId}`)
                }}
              >
                <div className="w-[100px] h-[100px] bg-gray-300 dark:bg-gray-600"></div>
                <div className="w-2/3">
                  <h3 className="font-semibold font-serif">{blog.title}</h3>
                  <p className="text-sm text-gray-400">{dateFormatter(blog.createdAt)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Blog;
