'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '../components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form';
import { Input } from '../components/ui/input';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Dispatch } from '@reduxjs/toolkit';
import { signup } from '../uptickBlogStore/authSlice';
import { useToast } from './ui/use-toast';
import { useNavigate } from 'react-router-dom';

const formSchema = z.object({
  firstName: z.string().min(3).max(50),
  lastName: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(6).max(50),
  confirmPassword: z.string(),
});

const RegisterFormComponent = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch: Dispatch<any> = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { loading, error } = useSelector((state: any) => state.auth);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { reset } = form;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await dispatch(
        signup({
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          password: values.password,
          confirmPassword: values.confirmPassword,
        })
      ).unwrap();
      toast({
        description: 'Account created successfully',
      });
      reset();
      navigate('/login');
    } catch (error) {
      console.error('Signup failed', error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name:</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name:</FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email:</FormLabel>
              <FormControl>
                <Input placeholder="johndoe@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password:</FormLabel>
              <FormControl>
                <div className="relative flex items-center">
                  <Input
                    placeholder="******"
                    {...field}
                    type={showPassword ? 'text' : 'password'}
                  />
                  <span
                    className="absolute right-4 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password:</FormLabel>
              <FormControl>
                <div className="relative flex items-center">
                  <Input
                    placeholder="******"
                    {...field}
                    type={showConfirmPassword ? 'text' : 'password'}
                  />
                  <span
                    className="absolute right-4 cursor-pointer"
                    onClick={toggleConfirmPassword}
                  >
                    {showConfirmPassword ? (
                      <Eye size={16} />
                    ) : (
                      <EyeOff size={16} />
                    )}
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </Button>
        {error && (
          <p className="text-sm text-red-500">
            Error submitting the form: {error.data.error}
          </p>
        )}
      </form>
    </Form>
  );
};

export default RegisterFormComponent;
