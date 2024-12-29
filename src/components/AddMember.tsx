import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from './ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './ui/drawer';
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { usePartyMembers } from '../hooks/usePartyMembers';
import { useForm } from 'react-hook-form';
import { Input } from './ui/input';

export const AddMember = () => {
  const { addMember } = usePartyMembers();
  const form = useForm({
    defaultValues: {
      name: '',
    },
  });

  const handleOnSubmit = (data: { name: string }) => {
    addMember(data.name);
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="default"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full"
        >
          <Plus />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Add Party Member</DrawerTitle>
            <DrawerDescription>
              Add a preset member or upload your own.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleOnSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Member name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit">Add member</Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </form>
            </Form>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
