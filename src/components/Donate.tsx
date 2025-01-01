import React from 'react';
import { Heart } from 'lucide-react';

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
            Please consider supporting the project.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center space-x-2">
          <p>
            If you are enjoying Mooz Party, please consider supporting the
            project by buying the author a coffee, or donating to my favourite
            charity.
          </p>
          <img
            src="/static/oscars-kids-logo.webp"
            alt="Oscar's Kids"
            className="max-w-[70%] mb-4"
          />
          <Button asChild type="button" variant="default">
            <a href="https://oscarskids.ie/donate/" target="_blank">
              <Heart />
              Donate to Oscar's Kids
            </a>
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
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
