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
import { useUptickHook } from '../hooks/useUptickHook';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { useNavigate } from 'react-router-dom';

const BlogFormComponent = () => {
  const navigate = useNavigate();
  const { blogForm, blogPostSubmit, newBlogLoading } = useUptickHook();

  return (
    <Form {...blogForm}>
      <form
        onSubmit={blogForm.handleSubmit(blogPostSubmit)}
        className="space-y-2"
      >
        <FormField
          control={blogForm.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title:</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={blogForm.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content:</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={blogForm.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author:</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={blogForm.control}
          name="thumbnail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thumbnail:</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={blogForm.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category:</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Category:</SelectLabel>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Consumer Services">
                        Consumer Services
                      </SelectItem>
                      <SelectItem value="Basic Industries">
                        Basic Industries
                      </SelectItem>
                      <SelectItem value="Health Care">Health Care</SelectItem>
                      <SelectItem value="BioTech">BioTech</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={blogForm.control}
          name="isFeatured"
          render={({ field }) => (
            <FormItem className="flex gap-3 items-center py-2">
              <FormControl>
                <input type="checkbox" {...field} />
              </FormControl>
              <FormLabel>Featured Post</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <Button
            variant={'destructive'}
            className="w-64"
            onClick={() => navigate('/blog')}
          >
            Cancel
          </Button>
          <Button className="w-64" type="submit" disabled={newBlogLoading}>
            {newBlogLoading ? 'Loading...' : 'Submit'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BlogFormComponent;
