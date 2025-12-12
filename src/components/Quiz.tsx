import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import bestOfLuckImg from "@/assets/best-of-luck.png";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Paris", "Berlin"],
    correctAnswer: "Paris",
  },
  {
    id: 2,
    question: "What would you probably find in your fridge?",
    options: ["Shoes", "Ice Cream", "Books"],
    correctAnswer: "Ice Cream",
  },
  {
    id: 3,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter"],
    correctAnswer: "Mars",
  },
  {
    id: 4,
    question: "What is 2 + 2?",
    options: ["3", "4", "5"],
    correctAnswer: "4",
  },
];

export const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Last question - show results
      setShowResults(true);
    }
  };

  const handleAnswerChange = (value: string) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: value });
  };

  const handleStartAgain = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / questions.length) * 100);
  };

  const question = questions[currentQuestion];

  // Results Page
  if (showResults) {
    const score = calculateScore();
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4 md:p-8"
        style={{ background: '#F4FDFF' }}
      >
        <div className="text-center animate-fade-in">
          {/* Keep Learning Badge */}
          <div className="inline-block bg-card rounded-lg px-6 py-3 shadow-lg border border-quiz-card-border mb-8">
            <span className="text-foreground font-medium">Keep Learning!</span>
          </div>

          {/* Score Display */}
          <h2
            className="font-heading text-primary mb-4"
            style={{
              fontWeight: 400,
              fontStyle: 'italic',
              fontSize: '60px',
              lineHeight: '24px',
              letterSpacing: '-4px',
              textAlign: 'center'
            }}
          >
            Your Final score is
          </h2>
          <div className="flex items-baseline justify-center gap-2 mt-12">
            <span className="font-heading text-8xl md:text-9xl text-primary">{score}</span>
            <span className="font-heading text-4xl md:text-5xl text-primary">%</span>
          </div>

          {/* Start Again Button */}
          <Button
            onClick={handleStartAgain}
            className="mt-10 text-foreground rounded-lg font-medium hover:opacity-90"
            style={{
              width: '200px',
              height: '50px',
              background: 'linear-gradient(89.72deg, #C6E9F7 0.09%, #E5F8FF 99.91%)',
              border: '1px solid #96E5FF0D'
            }}
          >
            Start Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 md:p-8"
      style={{
        background: 'linear-gradient(107.96deg, #BECFEE 0%, #71C6E2 50%, #D9F4FA 75%, #BECFEE 100%)',
        backdropFilter: 'blur(200px)'
      }}
    >
      {/* Outer gradient container with blur */}
      <div
        className="w-full max-w-4xl rounded-3xl p-4 md:p-6 relative"
        style={{
          background: 'linear-gradient(107.96deg, #BECFEE 0%, #71C6E2 50%, #D9F4FA 75%, #BECFEE 100%)',
          backdropFilter: 'blur(200px)'
        }}
      >
        {/* Best of Luck mascot - bottom left, positioned at inner card border (only on first question) */}
        {currentQuestion === 0 && (
          <div className="absolute bottom-6 left-10 z-10 hidden md:flex flex-col items-center">
            {/* Best of Luck speech bubble */}
            <img
              src={bestOfLuckImg}
              alt="Best of Luck!"
              className="w-28 object-contain mb-1"
            />
            {/* Paw mascot - positioned at the inner card border */}
            <img
              src="/paw.gif"
              alt="Paw mascot"
              className="w-20 h-20 object-contain"
            />
          </div>
        )}

        {/* Inner card */}
        <div className="w-full bg-card/95 backdrop-blur-sm rounded-2xl border border-quiz-card-border shadow-xl p-6 md:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <h1
              className="font-heading text-4xl md:text-5xl lg:text-6xl italic font-bold mb-3 bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(90deg, #15313D 0%, #3CABDA 100%)' }}
            >
              Test Your Knowledge
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Answer all questions to see your results
            </p>
          </div>

          {/* Progress Bar */}
          <div className="flex gap-2 mb-8 justify-center">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 w-16 md:w-24 rounded-full transition-colors ${index <= currentQuestion ? "bg-foreground" : "bg-border"
                  }`}
              />
            ))}
          </div>

          {/* Question Card */}
          <div className="animate-fade-in" key={currentQuestion}>
            <div
              className="rounded-[10px] border border-border mb-6 text-center py-6 px-8"
              style={{ background: 'linear-gradient(to right, #C6E9F7, #E5F8FF)' }}
            >
              <p
                className="text-foreground font-body font-semibold text-center whitespace-nowrap"
                style={{ fontSize: '22px', lineHeight: '24px', letterSpacing: '-0.31px' }}
              >
                {currentQuestion + 1}. {question.question}
              </p>
            </div>

            {/* Options */}
            <RadioGroup
              value={answers[question.id] || ""}
              onValueChange={handleAnswerChange}
              className="flex flex-col gap-3"
            >
              {question.options.map((option, index) => {
                const isSelected = answers[question.id] === option;
                return (
                  <Label
                    key={index}
                    htmlFor={`option-${index}`}
                    className={`flex items-center justify-center p-4 md:p-5 cursor-pointer rounded-lg transition-all ${!isSelected ? "bg-secondary/60 hover:bg-secondary" : ""
                      }`}
                    style={isSelected ? { background: 'linear-gradient(89.72deg, #C6E9F7 0.09%, #E5F8FF 99.91%)' } : {}}
                  >
                    <RadioGroupItem
                      value={option}
                      id={`option-${index}`}
                      className="sr-only"
                    />
                    <span
                      className={`text-center text-foreground transition-colors ${isSelected ? "font-semibold" : ""
                        }`}
                    >
                      {option}
                    </span>
                  </Label>
                );
              })}
            </RadioGroup>
          </div>

          {/* Navigation */}
          <div className="flex justify-end mt-8">
            <div className="flex gap-[10px]">
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="w-[53px] h-[50px] rounded-[10px] border border-border bg-[#E5F8FF] hover:bg-[#d5eef8] disabled:opacity-50"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNext}
                className="w-[53px] h-[50px] rounded-[10px] border border-border bg-[#C6E9F7] hover:bg-[#b6dff0]"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;