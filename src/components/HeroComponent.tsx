const HeroComponent = () => {
  return (
    <div className="px-5 md:px-10 lg:px-20 pb-5">
      <div className="p-5 lg:p-12 bg-slate-300 dark:bg-[#343a40] rounded-lg">
        <h1 className="text-2xl md:text-5xl lg:w-[40%] md:leading-[64px] font-semibold italic font-serif">
          Title of a longer featured blog post
        </h1>
        <p className="lg:w-[40%] py-4 leading-7 text-[18px] font-light">
          Multiple lines of text that form the lede, informing new readers
          quickly and efficiently about what&apos;s most interesting in this
          post&apos;s contents.
        </p>
        <a href="" className="text-lg font-medium hover:underline">Continue reading...</a>
      </div>
    </div>
  );
};

export default HeroComponent;
