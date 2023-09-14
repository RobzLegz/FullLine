import {
  cat1,
  cat2,
  cat3,
  cat4,
  cat5,
  cat6,
} from "../../test/generateImages";

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
    images: [...cat1],
    height: 0,
    description:
      "Share your moments of triumph and self-assurance with the Confidence category. This is the place to showcase your achievements, breakthroughs, and instances where you pushed past your comfort zone. Whether it's acing a presentation, overcoming a fear, or simply feeling empowered.",
  },
  {
    id: 2,
    title: "Goal",
    icon: require("../../../assets/icons/goal.png"),
    color: "#FFC956",
    images: [...cat2],
    height: 0,
    description:
      "Have a dream or a goal you're striving for? The Goal category is where you can document your journey towards success. Share your progress, milestones, and the steps you're taking to reach your aspirations. Celebrate both big wins and small victories.",
  },
  {
    id: 3,
    title: "Purpose",
    icon: require("../../../assets/icons/purpose.png"),
    color: "#6A6FF1",
    images: [...cat3],
    height: 0,
    description:
      "Finding your purpose in life can be a profound and fulfilling experience. In the Purpose category, share moments that align with your passions, values, and meaningful endeavors. This can include volunteering, engaging in a hobby you're passionate about, or contributing to a cause that holds a special place in your heart.",
  },
  {
    id: 4,
    title: "Harmony",
    icon: require("../../../assets/icons/harmony.png"),
    color: "#FE76A8",
    images: [...cat4],
    height: 0,
    description:
      "Life is full of moments that bring balance, tranquility, and a sense of serenity. Use the Harmony category to showcase images that capture the beauty of nature, peaceful moments, or instances where you've found harmony within yourself or with others.",
  },
  {
    id: 5,
    title: "Happiness",
    icon: require("../../../assets/icons/happiness.png"),
    color: "#C994DC",
    images: [...cat5],
    height: 0,
    description:
      "Spread joy and positivity with the Happiness category. Share pictures of heartwarming moments, laughter with friends, family gatherings, or any experience that brings a smile to your face.",
  },
  {
    id: 6,
    title: "Awareness",
    icon: require("../../../assets/icons/awareness.png"),
    color: "#FF814B",
    images: [...cat6],
    height: 0,
    description:
      "The Awareness category is all about being present and mindful. Share images that remind you to be aware of your surroundings, emotions, and the world. This could include pictures from mindfulness practices, meditation, or moments of self-reflection that lead to a deeper understanding of yourself and the world around you.",
  },
];
