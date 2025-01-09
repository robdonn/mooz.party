import React from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { ChevronRight } from 'lucide-react';

export const Welcome = () => {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome to Mooz Party!</DialogTitle>
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
        <DialogFooter>
          <Button onClick={() => setIsOpen(false)}>
            Start Playing <ChevronRight />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
