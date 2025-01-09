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
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { useRules } from '../hooks/useRules';
import { ParentalVerification } from './ParentalVerification';

const MOOZ_APP_VERSION = process.env.MOOZ_APP_VERSION;

export const Settings = () => {
  const {
    allowCustomMembers,
    setAllowCustomMembers,
    showWelcome,
    setShowWelcome,
  } = useRules();
  const [parentalControlPassed, setParentalControlPassed] =
    React.useState(false);

  return (
    <Dialog
      onOpenChange={() => {
        setParentalControlPassed(false);
        showWelcome();
      }}
    >
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
        <div className="flex items-center space-x-2">
          {!parentalControlPassed ? (
            <ParentalVerification
              onSuccess={() => setParentalControlPassed(true)}
            />
          ) : (
            <ul className="w-full flex flex-col gap-3">
              <li className="flex items-center w-full justify-between">
                <Label htmlFor="allow-custom">
                  Allow uploading custom party members
                </Label>
                <Switch
                  id="allow-custom"
                  checked={allowCustomMembers}
                  onCheckedChange={(value) => setAllowCustomMembers(value)}
                />
              </li>
              <li className="flex items-center w-full justify-between">
                <Label htmlFor="hide-welcome">Hide welcome message</Label>
                <Switch
                  id="hide-welcome"
                  checked={showWelcome()}
                  onCheckedChange={(value) => setShowWelcome(value)}
                />
              </li>
            </ul>
          )}
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
