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
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useUptickHook } from '../hooks/useUptickHook';

const LoginFormComponent = () => {
  const { loginSubmit, loading, error, form } = useUptickHook();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(loginSubmit)} className="space-y-2">
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
        <Button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </Button>
        {error && (
          <p className="text-sm text-red-500">
            Error submitting form: {error.data.error}
          </p>
        )}
      </form>
    </Form>
  );
};

export default LoginFormComponent;
