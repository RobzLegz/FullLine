export interface Category {
  id: number;
  title: string;
  icon: string;
  color: string;
  images: any[];
  description: string;
}

export const categories = [
  {
    id: 1,
    title: "Confidence",
    icon: "/assets/icons/confidence.png",
    color: "#FF0043",
    images: [],
    description:
      "Full trust; belief in the powers, trustworthiness, or reliability of a person or thing: We have every confidence in their ability to succeed. belief in oneself and one's powers or abilities; self-confidence; self-reliance; assurance",
  },
  {
    id: 2,
    title: "Goal",
    icon: "/assets/icons/goal.png",
    color: "#FFC300",
    images: [],
    description:
      "Intention, intent, purpose, design, aim, end, object, objective, goal mean what one intends to accomplish or attain",
  },
  {
    id: 3,
    title: "Purpose",
    icon: "/assets/icons/purpose.png",
    color: "#D249D2",
    images: [],
    description:
      "The reason for which something is done or created or for which something exists.",
  },
  // {
  //   id: 4,
  //   title: "Harmony",
  //   icon: "/assets/icons/harmony.png",
  //   color: "",
  // images: [],
  //   description: "",
  // },
  // {
  //   id: 5,
  //   title: "Happiness",
  //   icon: "/assets/icons/happiness.png",
  //   color: "",
  // images: [],
  //   description: "",
  // },
  // {
  //   id: 6,
  //   title: "Awareness",
  //   icon: "/assets/icons/awareness.png",
  //   color: "",
  // images: [],
  //   description: "",
  // },
];
