import React from 'react';
import { CheckedState } from '@radix-ui/react-checkbox';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { ChevronRight } from 'lucide-react';
import { Checkbox } from './ui/checkbox';
import { useRules } from '../hooks/useRules';

export const Welcome = () => {
  const {
    showWelcomeMessage,
    setShowWelcomeMessage,
    showWelcomeMessageLoading,
  } = useRules();
  const [isOpen, setIsOpen] = React.useState(showWelcomeMessage);
  const [dontShowAgain, setDontShowAgain] = React.useState<CheckedState>(false);

  React.useEffect(() => {
    setIsOpen(showWelcomeMessage);
  }, [showWelcomeMessageLoading]);

  if (!showWelcomeMessage) {
    return null;
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setIsOpen(false);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome to Mooz Party!</DialogTitle>
          <VisuallyHidden>
            <DialogDescription>
              Mooz Party is a <b>pretend</b> video chat app for kids to have fun
              imaginary conversations with their toys, friends or some of our
              pre-made characters.
            </DialogDescription>
          </VisuallyHidden>
        </DialogHeader>
        <div>
          <p>
            Mooz Party is a <b>pretend</b> video chat app for kids to have fun
            imaginary conversations with their toys, friends or some of our
            pre-made characters.
          </p>
          {/* Safety information */}
          <h2 className="text-l font-bold mt-4">Safety Information</h2>
          <p>
            Online safety is our number one priority. All of our features have
            been built to be available offline and no content is ever uploaded
            to the internet.
          </p>
          <p>
            Parental controls are available in the settings menu to disable some
            features that you may not want your child to use.
          </p>
        </div>
        <DialogFooter className="sm:justify-between gap-4">
          <div className="flex items-center space-x-2 justify-center">
            <Checkbox
              id="terms"
              onCheckedChange={setDontShowAgain}
              checked={dontShowAgain}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Don't show again
            </label>
          </div>
          <Button
            onClick={() => {
              setShowWelcomeMessage(!dontShowAgain as boolean);
              setIsOpen(false);
            }}
          >
            Start Playing <ChevronRight />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
