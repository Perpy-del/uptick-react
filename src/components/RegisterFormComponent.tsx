'use client';

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
import { useUptickHook } from '../hooks/useUptickHook';

const RegisterFormComponent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signUpForm, signUpSubmit, signUpLoading, signUpError } = useUptickHook();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  }

  return (
    <Form {...signUpForm}>
      <form onSubmit={signUpForm.handleSubmit(signUpSubmit)} className="space-y-2">
        <FormField
          control={signUpForm.control}
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
          control={signUpForm.control}
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
          control={signUpForm.control}
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
          control={signUpForm.control}
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
          control={signUpForm.control}
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
        <Button type="submit" disabled={signUpLoading}>
          {signUpLoading ? 'Loading...' : 'Submit'}
        </Button>
        {signUpError && (
          <p className="text-sm text-red-500">
            Error submitting the form: {signUpError.data.error}
          </p>
        )}
      </form>
    </Form>
  );
};

export default RegisterFormComponent;
