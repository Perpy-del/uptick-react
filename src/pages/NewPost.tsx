import BlogFormComponent from '../components/BlogFormComponent';
import NavBar from '../components/NavBar';

const NewPost = () => {
  return (
    <div className="bg-slate-50 text-black dark:bg-[#212529] dark:text-white">
      <NavBar activeCategory={undefined} setActiveCategory={undefined} />
      <div className="px-5 md:px-10 lg:px-20 pb-10">
        <div className="pt-10 pb-5 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-5xl font-semibold font-serif pb-2">
            New Blog Post
          </h1>
          <p className="font-light text-black dark:text-gray-400 pb-5">
            Fill the form to create a new blog post
          </p>
        </div>
        <BlogFormComponent />
      </div>
    </div>
  );
};

export default NewPost;
