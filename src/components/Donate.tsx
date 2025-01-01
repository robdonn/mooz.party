import React from 'react';
import { Coffee, Heart } from 'lucide-react';

import { Button } from './ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

export const Donate = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-slate-300"
        >
          <Heart />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Enjoying Mooz Party?</DialogTitle>
          <DialogDescription>
            Please consider supporting the project or donating to my favourite
            charity.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col md:flex-row items-center space-x-2 gap-4">
          <div className="flex flex-col items-center space-x-2 gap-4">
            <Button asChild type="button" variant="default">
              <a href="https://ko-fi.com/robdonn" target="_blank">
                <Coffee /> Support the app
              </a>
            </Button>
          </div>
          <div className="flex w-full md:w-0 md:h-full items-center md:flex-col md:space-y-4 space-x-4">
            <div className="flex-grow border-t md:border-t-0 md:border-r md:ml-4 border-gray-300"></div>
            <span className="text-gray-500">or</span>
            <div className="flex-grow border-t md:border-t-0 md:border-r border-gray-300"></div>
          </div>
          <div className="flex flex-col  items-center space-x-2 gap-4">
            <img
              src="/static/oscars-kids-logo.webp"
              alt="Oscar's Kids"
              className="max-w-[70%]"
            />
            <Button asChild type="button" variant="default">
              <a href="https://oscarskids.ie/donate/" target="_blank">
                <Heart /> Donate to Oscar's Kids
              </a>
            </Button>
          </div>
        </div>
        <DialogFooter className="sm:justify-center">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
