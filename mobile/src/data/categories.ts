import { FullLineImage } from "../types/image";

export interface Category {
  id: number;
  title: string;
  icon: any;
  color: string;
  images: FullLineImage[];
  height: number;
  description: string;
}

export const categories = [
  {
    id: 1,
    title: "Confidence",
    icon: require("../../assets/icons/confidence.png"),
    color: "#FF0043",
    images: [],
    height: 0,
    description:
      "Full trust; belief in the powers, trustworthiness, or reliability of a person or thing: We have every confidence in their ability to succeed. belief in oneself and one's powers or abilities; self-confidence; self-reliance; assurance",
  },
  {
    id: 2,
    title: "Goal",
    icon: require("../../assets/icons/goal.png"),
    color: "#FFC300",
    images: [],
    height: 0,
    description:
      "Intention, intent, purpose, design, aim, end, object, objective, goal mean what one intends to accomplish or attain",
  },
  {
    id: 3,
    title: "Purpose",
    icon: require("../../assets/icons/purpose.png"),
    color: "#D249D2",
    images: [],
    height: 0,
    description:
      "The reason for which something is done or created or for which something exists.",
  },
  {
    id: 4,
    title: "Harmony",
    icon: require("../../assets/icons/harmony.png"),
    color: "#FE76A8",
    images: [],
    height: 0,
    description: "",
  },
  {
    id: 5,
    title: "Happiness",
    icon: require("../../assets/icons/happiness.png"),
    color: "#FFCE00",
    images: [],
    height: 0,
    description: "",
  },
  {
    id: 6,
    title: "Awareness",
    icon: require("../../assets/icons/awareness.png"),
    color: "#5098D2",
    images: [],
    height: 0,
    description: "",
  },
];
