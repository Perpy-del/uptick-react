import NavBar from '../components/NavBar';

const BlogPost = () => {
  return (
    <div className="bg-slate-50 text-black dark:bg-[#212529] dark:text-white">
      <NavBar />
      <div className="md:w-1/2 w-full">
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
    </div>
  );
};

export default BlogPost;
