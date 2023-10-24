export interface FullLineImage {
  src: string;
  date: string;
}

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
    icon: require("../../../assets/icons/confidence.png"),
    color: "#68C8F1",
    images: [],
    height: 0,
    description:
      "Reflect on whether you feel confident in various aspects of your life. Have there been situations where your confidence was lacking? If so, what contributed to this lack of confidence? To improve in this area, consider setting achievable goals, seeking mentorship or support, and working on building self-esteem.",
  },
  {
    id: 2,
    title: "Goal",
    icon: require("../../../assets/icons/goal.png"),
    color: "#FFC956",
    images: [],
    height: 0,
    description:
      "Reflect on the importance of setting and achieving goals in your life. How would reaching more of your goals positively impact you? To improve in this area, set specific, measurable, and time-bound goals. Break them down into smaller steps and create an action plan to work towards them.",
  },
  {
    id: 3,
    title: "Purpose",
    icon: require("../../../assets/icons/purpose.png"),
    color: "#6A6FF1",
    images: [],
    height: 0,
    description:
      "Consider whether you are still aligned with your life's purpose and if you have a clear vision of what that purpose is. If you feel disconnected from your purpose, take time to reevaluate your goals and values. Seek guidance from mentors or explore new interests that align with your sense of purpose.",
  },
  {
    id: 4,
    title: "Harmony",
    icon: require("../../../assets/icons/harmony.png"),
    color: "#FE76A8",
    images: [],
    height: 0,
    description:
      "Assess whether there is a balance and harmony in your life, or if one area dominates your time and energy. To restore harmony, consider time management techniques, setting boundaries, and delegating tasks if necessary. Prioritize a well-rounded life where various aspects receive attention.",
  },
  {
    id: 5,
    title: "Happiness",
    icon: require("../../../assets/icons/happiness.png"),
    color: "#C994DC",
    images: [],
    height: 0,
    description:
      "Examine whether you are dedicating enough time to self-care and activities that bring you happiness. To boost your happiness, prioritize self-care, engage in hobbies and activities you enjoy, and spend time with loved ones. Remember that taking care of your well-being is essential.",
  },
  {
    id: 6,
    title: "Awareness",
    icon: require("../../../assets/icons/awareness.png"),
    color: "#FF814B",
    images: [],
    height: 0,
    description:
      "Think about your level of awareness regarding your surroundings and inner self. Has daily life become so consuming that you've lost touch with what's happening around you or within you? To improve awareness, try mindfulness practices, meditation, or simply setting aside time for self-reflection each day.",
  },
];
