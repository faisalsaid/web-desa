'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Hammer, Wrench, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MaintenanceMode = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground p-4 overflow-hidden">
      {/* Background Decorative Circles */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="z-10 flex flex-col items-center text-center max-w-2xl">
        {/* Animated Icon Group */}
        <div className="relative mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="text-primary"
          >
            <Settings size={80} strokeWidth={1.5} />
          </motion.div>

          <motion.div
            initial={{ x: -20, y: 20 }}
            animate={{ x: 0, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute -bottom-2 -left-4 p-2 bg-background border border-border rounded-xl shadow-lg"
          >
            <Hammer size={24} className="text-primary" />
          </motion.div>

          <motion.div
            initial={{ x: 20, y: 20 }}
            animate={{ x: 0, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="absolute -top-2 -right-4 p-2 bg-background border border-border rounded-xl shadow-lg"
          >
            <Wrench size={24} className="text-primary" />
          </motion.div>
        </div>

        {/* Text Content */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
        >
          Sedang Dalam <span className="text-primary">Pemeliharaan</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-muted-foreground text-lg mb-8 max-w-md"
        >
          Kami sedang meningkatkan sistem untuk memberikan pengalaman yang lebih
          baik. Kami akan segera kembali dalam waktu dekat.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button variant="default" size="lg" className="gap-2">
            <Mail size={18} />
            Hubungi Admin
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.location.reload()}
          >
            Coba Segarkan Halaman
          </Button>
        </motion.div>

        {/* Progress bar simulation */}
        <motion.div
          className="w-full max-w-xs bg-secondary h-1.5 mt-12 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.div
            className="bg-primary h-full"
            initial={{ width: '0%' }}
            animate={{ width: '70%' }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        </motion.div>
        <p className="text-xs text-muted-foreground mt-2 uppercase tracking-widest font-medium">
          {/* Estimasi Selesai: 2 Jam */}
        </p>
      </div>
    </div>
  );
};

export default MaintenanceMode;
