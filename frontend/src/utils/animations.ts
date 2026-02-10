import { Variants } from "framer-motion";

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
  }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

export const cardHover: Variants = {
  rest: { scale: 1, y: 0, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" },
  hover: { 
    scale: 1.05, 
    y: -15,
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
    transition: { 
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
};

export const bounceHover: Variants = {
  rest: { y: 0 },
  hover: { 
    y: [0, -10, 0],
    transition: { 
      duration: 0.6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const floating: Variants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};


export const modalVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.9,
    transition: { duration: 0.2 }
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
  }
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
  }
};
