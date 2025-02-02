'use client';

import { ModeToggle } from '../components/mode-toggle';
import { useNavigate } from 'react-router-dom';
import LoginFormComponent from '../components/LoginFormComponent';

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-50 text-black dark:bg-[#212529] dark:text-white h-screen flex flex-col justify-center w-screen">
      <div className="w-full px-5 md:px-0 md:w-2/3 lg:w-1/3 mx-auto">
        <h1 className="pb-4 text-3xl font-serif font-bold">Uptick</h1>
        <h2 className="text-2xl font-semibold pb-2">Please sign in</h2>
        <LoginFormComponent />
        <h3>
          Don't have an account?{' '}
          <span
            onClick={() => navigate('/signup')}
            className="cursor-pointer text-blue-600 font-medium hover:font-bold hover:text-blue-500"
          >
            Register
          </span>
        </h3>
      </div>
      <ModeToggle />
    </div>
  );
};

export default LoginPage;
