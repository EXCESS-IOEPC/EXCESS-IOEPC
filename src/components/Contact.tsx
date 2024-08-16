"use client";

import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 50,
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }, 
};

const iframeVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 },
};

const divVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const About = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <motion.section
      className="bg-gray-100"
      variants={containerVariants}
      initial="hidden"
      animate={isLoading ? "hidden" : "visible"}
    >
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
        <motion.div
          className="max-w-2xl lg:max-w-4xl mx-auto text-center"
          variants={childVariants}
        >
          <motion.h2
            className="text-3xl font-extrabold text-primaryBlue"
            variants={textVariants}
            transition={{ duration: 0.6 }}
          >
            Visit Us
          </motion.h2>
          <motion.p
            className="mt-4 text-md text-offBlack"
            variants={textVariants}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We value your input and are eager to assist you. Get in touch with us today!
          </motion.p>
        </motion.div>
        <motion.div
          className="mt-16 lg:mt-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="rounded-lg overflow-hidden"
              variants={iframeVariants}
              transition={{ duration: 0.8, type: "spring", stiffness: 70 }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1348.338294616256!2d87.29291177150257!3d26.792692998930214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19b606ce89f9%3A0x7423e72f8e139e05!2sPurwanchal%20Engineering%20Campus(ERC)!5e0!3m2!1sen!2snp!4v1722341790284!5m2!1sen!2snp"
                width="100%" height="480" loading="lazy"
              />
            </motion.div>
            <motion.div
              className="max-w-full mx-auto rounded-lg overflow-hidden"
              variants={divVariants}
              transition={{ duration: 0.8, type: "spring", stiffness: 70 }}
            >
              <motion.div
                className="px-6 py-4"
                variants={childVariants}
                transition={{ duration: 0.5 }}
              >
                <motion.h3
                  className="text-lg text-primaryBlue"
                  variants={textVariants}
                  transition={{ duration: 0.6 }}
                >
                  Our Address
                </motion.h3>
                <motion.p
                  className="mt-1 text-sm text-offBlack"
                  variants={textVariants}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  56700, Gangalal Marga-Tinkune, Dharan-8 <br />
                  Sunsari Koshi Province, Nepal
                </motion.p>
              </motion.div>
              <motion.div
                className="border-t border-primaryBlue px-6 py-4"
                variants={childVariants}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <motion.h3
                  className="text-lg text-primaryBlue"
                  variants={textVariants}
                  transition={{ duration: 0.6 }}
                >
                  Mail
                </motion.h3>
                <motion.p
                  className="mt-1 text-sm text-offBlack"
                  variants={textVariants}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  xtech@ioepc.edu.np
                </motion.p>
                <motion.p
                  className="mt-1 text-sm text-offBlack"
                  variants={textVariants}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  excessnepal@ioepc.edu.np
                </motion.p>
              </motion.div>
              <motion.div
                className="border-t border-primaryBlue px-6 py-4"
                variants={childVariants}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <motion.h3
                  className="text-lg text-primaryBlue"
                  variants={textVariants}
                  transition={{ duration: 0.6 }}
                >
                  Contact
                </motion.h3>
                <motion.p
                  className="mt-1 text-sm text-offBlack"
                  variants={textVariants}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Mahesh Chaudhary: +977 9809574797
                </motion.p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;
