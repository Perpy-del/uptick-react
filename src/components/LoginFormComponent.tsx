'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
import { useToast } from "../components/ui/use-toast"

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(50),
});

const LoginFormComponent = () => {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      description: "Account created successfully"
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default LoginFormComponent;
