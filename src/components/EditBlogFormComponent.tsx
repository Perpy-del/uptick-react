'use client';

import { useEffect, useContext } from 'react';
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
import { useNavigate, useParams } from 'react-router-dom';
import { UptickContext } from '../contexts/UptickContext';

const EditBlogFormComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBlog } = useContext(UptickContext);
  const { editBlogForm, editPostSubmit, blogPost, newBlogLoading } = useUptickHook();

  useEffect(() => {
    if (id) {
      getBlog(id);
    }
  }, [id]);

  useEffect(() => {
    if (blogPost) {
      editBlogForm.reset({
        title: blogPost.title,
        content: blogPost.body,
        isFeatured: blogPost.is_featured,
        author: blogPost.author,
        category: blogPost.category,
        thumbnail: blogPost.thumbnail,
      });
    }
  }, [blogPost]);

  return (
    <Form {...editBlogForm}>
      <form
        onSubmit={editBlogForm.handleSubmit((values: any) => editPostSubmit(values, id))}
        className="space-y-2"
      >
        <FormField
          control={editBlogForm.control}
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
          control={editBlogForm.control}
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
          control={editBlogForm.control}
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
          control={editBlogForm.control}
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
          control={editBlogForm.control}
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
          control={editBlogForm.control}
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
        <div className='flex gap-2'>
          <Button variant={'destructive'} className="w-64" onClick={() => navigate('/blog')}>Cancel</Button>
          <Button className="w-64" type="submit" disabled={newBlogLoading}>
            {newBlogLoading ? "Loading..." : "Update Post"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditBlogFormComponent;
