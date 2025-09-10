import { IconType } from "react-icons";

// this type can be used for both representinnng the api responnnse Game obj
// as well as props for the GameCard

declare global {
  type Game = {
    gameId: number,
    gameName: string
    author: string
    rangeMin: number
    rangeMax: number
    rules: Rule[]
  }


  // same for dis
  type Rule = {
    divisor: number; 
    replacement: string;
  }


  type GameSession = {
    gameSessionId: number
    gameId: number
    gameName: string,
    playerId: number
    playerName: string,
    duration: number
    startTime: Date
    endTime: Date
    scoreCorrect: number
    scoreIncorrect: number
    isDone: boolean,
    answers: Answer[];
  }

  type Answer = {
    answerId: number;
    gameSessionId: number;
    number: number;
    response: string;
    correctResponse: string;
    isCorrect: boolean;
  };

  type RandomNumber = {
    number: number,
    answerId: number
  }
  // used for new game  form, cant reuse the Rule above 
  type FormRule = {
    divisor: number | "",
    replacement: string
  }

  // dont even need a explicit type for these, but keep it for better clarity
  // and consistency, as most other components all have props type
  type CountdownProps = {
    time: number; // seconds
  };
  type NumberProps = {
    number: number | null 
  }
  type StartGameButtonProps = {
    gameId: number;
  }
  type ExperienceCardProps = {
    imageUrl: string,
    company: string,
    role: string,
    time: string,
    description: string[],

  }

  type BreadCrumbLink = {
    text: string;
    href: string;
  };

  type BreadCrumbsProps = {
    links: BreadCrumbLink[]
  }

  type ProjectProps = {
    title: string,
    description: string,
    technologies: string[],
    link: string, // Update with actual link
    isExternal: boolean,
    color: string,
    icon: IconType,
    iconSize: string,
  }
}