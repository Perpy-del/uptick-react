import { createContext, useEffect, useState } from 'react';
import { useToast } from '../components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authenticatedRequest, BASE_URL } from '../lib/utils';
// import { BASE_URL } from '../lib/utils';

export const UptickContext = createContext<any>({});

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  token: string;
  id: string;
  userId: string;
  tokenExpiredAt: string;
  updatedAt: string;
  createdAt: string;
}

export interface BlogInterface {
  _id: string;
  blogId: string;
  title: string;
  slug: string;
  author: string;
  body: string;
  is_featured: boolean;
  category: string;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
}

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(50),
});

const signUpFormSchema = z.object({
  firstName: z.string().min(3).max(50),
  lastName: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(6).max(50),
  confirmPassword: z.string(),
});

const UptickContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [signUpLoading, setSignUpLoading] = useState<boolean>(false);
  const [blogLoading, setBlogLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [signUpError, setSignUpError] = useState<any>(null);
  const [user, setUser] = useState<User | null>(null);
  const [blogs, setBlogs] = useState<Array<any>>([]);
    
  useEffect(() => {
    getAllBlogs()
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const signUpForm = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function loginSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/signin`, {
        email: values.email,
        password: values.password,
      });
      const token = response.data.data.token;
      localStorage.setItem('authToken', token);
      setUser(response.data);

      toast({
        description: 'Login successful',
      });
      form.reset();
      navigate('/blog');
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  async function signUpSubmit(values: z.infer<typeof signUpFormSchema>) {
    try {
      setSignUpLoading(true);
      await axios.post(`${BASE_URL}/create-user`, {
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password,
        confirmPassword: values.confirmPassword,
      });
      toast({
        description: 'Account created successfully',
      });
      signUpForm.reset();
      navigate('/login');
    } catch (error) {
      console.error('Signup failed', error);
      setSignUpError(error);
    } finally {
      setSignUpLoading(false);
    }
  }

  async function getAllBlogs() {
    setBlogLoading(true);
    try {
      const response = await authenticatedRequest('GET', '/posts');
      console.log(response.data);
      if (response.data) {
        setBlogs(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setBlogLoading(false);
    }
  }

  async function getBlog (identifier: string) {
    setBlogLoading(true);
    try {
      const response = await authenticatedRequest('GET', `/posts/${identifier}`);
      console.log(response.data);
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setBlogLoading(false);
    }
  }

  function logout() {
    setUser(null);
    navigate('/login');
  }

  return (
    <UptickContext.Provider
      value={{
        loginSubmit,
        loading,
        error,
        form,
        user,
        logout,
        signUpForm,
        signUpSubmit,
        signUpLoading,
        signUpError,
        getAllBlogs,
        getBlog,
        blogLoading,
        blogs,
      }}
    >
      {children}
    </UptickContext.Provider>
  );
};

export default UptickContextProvider;
