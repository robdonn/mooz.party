import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';

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

const MOOZ_APP_VERSION = process.env.MOOZ_APP_VERSION;

export const Settings = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-slate-300"
        >
          <SettingsIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Application Version (pre-release): {MOOZ_APP_VERSION}
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">Content</div>
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
