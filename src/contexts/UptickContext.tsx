import { createContext, useState } from 'react';
import { useToast } from '../components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authenticatedRequest, BASE_URL } from '../lib/utils';

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

const blogFormSchema = z.object({
  title: z.string().min(3, 'Title is required').max(50),
  content: z.string().min(3, 'Content is required'),
  isFeatured: z.boolean().optional(),
  author: z.string().min(3, 'Author is required').max(50),
  category: z.string().min(3, 'Category selection is required').max(50),
  thumbnail: z.string().url('Thumbnail must be a valid URL'),
});

const editBlogFormSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  isFeatured: z.boolean().optional(),
  author: z.string().optional(),
  category: z.string().optional(),
  thumbnail: z.string().optional(),
});

const UptickContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [signUpLoading, setSignUpLoading] = useState<boolean>(false);
  const [blogLoading, setBlogLoading] = useState<boolean>(false);
  const [newBlogLoading, setNewBlogLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [signUpError, setSignUpError] = useState<any>(null);
  const [blogError, setBlogError] = useState<any>(null);
  const [user, setUser] = useState<User | null>(null);
  const [blogs, setBlogs] = useState<Array<any>>([]);
  const [blogPost, setBlogPost] = useState<BlogInterface | null>(null)
  const [newBlogPost, setNewBlogPost] = useState<BlogInterface | null>(null)

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

  const blogForm = useForm<z.infer<typeof blogFormSchema>>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: '',
      content: '',
      isFeatured: false,
      author: '',
      category: '',
      thumbnail: '',
    },
  });

  const editBlogForm = useForm<z.infer<typeof editBlogFormSchema>>({
    resolver: zodResolver(editBlogFormSchema),
    defaultValues: {
      title: '',
      content: '',
      isFeatured: false,
      author: '',
      category: '',
      thumbnail: '',
    },
  });

    
  const categories = blogs.map((blog: any) => blog.category);
  const uniqueCategories = new Set(categories);
  const categoriesData: Array<any> = Array.from(uniqueCategories);
  
  function getCategory(category: string) {
    const catBlogs = blogs.filter((blog: any) => blog.category === category);
    console.log(catBlogs)
    setBlogs(catBlogs);
  }

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

  async function blogPostSubmit(values: z.infer<typeof blogFormSchema>) {
    setNewBlogLoading(true);
    try {
      const response = await authenticatedRequest('POST', '/posts/create', {
        title: values.title,
        category: values.category,
        is_featured: values.isFeatured,
        author: values.author,
        thumbnail: values.thumbnail,
        body: values.content
      });
      if (response.data) {
        setNewBlogPost(response.data);
      }
      toast({
        description: 'Blog created successfully',
      });
      blogForm.reset();
      navigate('/blog');
    } catch (error) {
      console.log(error);
      setBlogError(error);
    } finally {
      setNewBlogLoading(false);
    }
  }

  async function editPostSubmit(values: z.infer<typeof editBlogFormSchema>, id: string) {
    setNewBlogLoading(true);
    try {
      await authenticatedRequest('PUT', `/post/${id}`, {
        title: values.title,
        category: values.category,
        is_featured: values.isFeatured,
        author: values.author,
        thumbnail: values.thumbnail,
        body: values.content
      });
      toast({
        description: 'Blog updated successfully',
      });
      editBlogForm.reset();
      navigate('/blog');
    } catch (error) {
      console.log(error);
      setBlogError(error);
    } finally {
      setNewBlogLoading(false);
    }
  }

  async function deletePostSubmit(id: string) {
    setNewBlogLoading(true);
    try {
      await authenticatedRequest('DELETE', `/post/${id}`);
      toast({
        description: 'Blog deleted successfully',
      });
    } catch (error) {
      console.log(error);
      setBlogError(error);
    } finally {
      setNewBlogLoading(false);
    }
  }



  async function getAllBlogs() {
    setBlogLoading(true);
    try {
      const response = await authenticatedRequest('GET', '/posts');
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
      const response = await authenticatedRequest('GET', `/post/${identifier}`);
      if (response.data) {
        setBlogPost(response.data);
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
        signUpSubmit,
        blogPostSubmit,
        loading,
        blogLoading,
        newBlogLoading,
        error,
        signUpError,
        blogError,
        form,
        signUpForm,
        blogForm,
        editBlogForm,
        user,
        logout,
        signUpLoading,
        getAllBlogs,
        getBlog,
        blogs,
        blogPost,
        newBlogPost,
        editPostSubmit,
        deletePostSubmit,
        setBlogs,
        categoriesData,
        getCategory
      }}
    >
      {children}
    </UptickContext.Provider>
  );
};

export default UptickContextProvider;
