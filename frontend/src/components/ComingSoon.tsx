'use client';

/**
 * Coming Soon Component
 *
 * A beautiful coming soon page component used for features under development.
 */

import { motion } from 'framer-motion';
import { Clock, Rocket, Bell } from 'lucide-react';

interface ComingSoonProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export default function ComingSoon({
  title,
  description = 'This feature is currently under development and will be available soon.',
  icon,
}: ComingSoonProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        <div className="card text-center">
          {/* Animated Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-primary to-primary-dark rounded-full mb-6 shadow-2xl"
          >
            {icon || <Rocket className="w-12 h-12 text-secondary" />}
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold text-primary mb-4"
          >
            {title}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 text-lg mb-8 max-w-md mx-auto"
          >
            {description}
          </motion.p>

          {/* Coming Soon Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-secondary/20 rounded-full border-2 border-secondary mb-8"
          >
            <Clock className="w-5 h-5 text-primary" />
            <span className="text-primary font-bold text-lg">Coming Soon</span>
          </motion.div>

          {/* Notify Me Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary inline-flex items-center space-x-2"
          >
            <Bell className="w-5 h-5" />
            <span>Notify Me When Available</span>
          </motion.button>

          {/* Decorative Elements */}
          <div className="mt-12 flex justify-center space-x-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  delay: 0.7 + i * 0.1,
                  duration: 2,
                  repeat: Infinity,
                }}
                className="w-3 h-3 bg-primary rounded-full"
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
