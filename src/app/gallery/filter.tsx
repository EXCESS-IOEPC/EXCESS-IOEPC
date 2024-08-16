"use client";
import React, { useState, useEffect } from 'react';
import '@/src/app/gallery/gallery.css';
import '@/src/app/globals.css';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Filter({ initialSearch }: { initialSearch: string }) {
  const filters = [
    "CS50xNepal", "CLI Training", "XTech 1.0", "XTech 3.0", "XTech  4.0", 
    "Robotics Workshop", "Hardware Hackathon", "Handover Ceremony", 
    "Python Training", "IOT Training", "Web Scraping", "Libre Office"
  ];

  const [tagName, setTagName] = useState(initialSearch ?? "");
  const router = useRouter();

  useEffect(() => {
    setTagName(initialSearch);
  }, [initialSearch]);

  // Animation variants
  const filterVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        delay: index * 0.1
      },
    }),
  };

  return (
    <div className="gallery-menu">
      <motion.button
        className={`text-sm active ${!tagName ? 'gallery-active' : ''}`}
        initial="hidden"
        animate="visible"
        variants={filterVariants}
        custom={0} // index for delay
        onClick={(e) => {
          e.preventDefault();
          router.replace("/gallery");
          router.refresh();
        }}
      >
        All
      </motion.button>
      {filters.map((filter, index) => (
        <motion.button
          key={filter}
          className={`text-sm active ${filter === tagName ? 'gallery-active' : ''}`}
          initial="hidden"
          animate="visible"
          variants={filterVariants}
          custom={index + 1} // index for delay
          onClick={(e) => {
            e.preventDefault();
            router.replace(`/gallery/?filter=${encodeURIComponent(filter)}`);
            router.refresh();
          }}
        >
          {filter}
        </motion.button>
      ))}
    </div>
  );
}
