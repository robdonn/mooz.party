import React from 'react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Label } from '@radix-ui/react-label';
import { Button } from './ui/button';
import { Recycle } from 'lucide-react';

const questions = [
  { question: 'What is 7 times 6?', answer: '42' },
  {
    question:
      'What is the name of the event where parents talk to teachers about their child’s progress in school?',
    answer: 'Parent-Teacher Meeting',
  },
  { question: 'What is 15 minus 9?', answer: '6' },
  { question: 'What month is Christmas in?', answer: 'December' },
  { question: 'How many hours are there in a day?', answer: '24' },
  { question: 'What is the capital city of France?', answer: 'Paris' },
  {
    question: 'What do you call the meal you eat in the morning?',
    answer: 'Breakfast',
  },
  { question: 'What is 8 plus 5?', answer: '13' },
  { question: 'How many sides does a triangle have?', answer: '3' },
  { question: 'What is 10 divided by 2?', answer: '5' },
];

const randomQuestion = () => {
  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions[randomIndex];
};

export const ParentalVerification: React.FC<{ onSuccess: () => void }> = ({
  onSuccess,
}) => {
  const [currentQuestion, setCurrentQuestion] = React.useState(
    randomQuestion()
  );
  const [userAnswer, setUserAnswer] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      userAnswer.trim().toLowerCase() === currentQuestion.answer.toLowerCase()
    ) {
      onSuccess();
    } else {
      setErrorMessage("Sorry, that's incorrect. Please try again.");
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <Alert>
        <AlertTitle>Parental Verification</AlertTitle>
        <AlertDescription>
          Please answer this question to access the settings
        </AlertDescription>
      </Alert>
      <Label htmlFor="answer" className="font-bold">
        {currentQuestion.question}
      </Label>
      <input
        id="answer"
        type="text"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        placeholder="Your answer"
        className="p-2"
      />
      <div className="flex w-full justify-between">
        <Button
          variant="secondary"
          onClick={() => setCurrentQuestion(randomQuestion())}
        >
          <Recycle /> Different Question
        </Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
      {errorMessage && <p className="text-red-700">{errorMessage}</p>}
    </div>
  );
};
