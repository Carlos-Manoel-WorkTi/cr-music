
import React, { useEffect, useState } from 'react';

interface AudioVisualizerProps {
  isPlaying: boolean;
  className?: string;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ isPlaying, className = '' }) => {
  const [bars, setBars] = useState<number[]>(Array(20).fill(0));

  useEffect(() => {
    if (!isPlaying) {
      setBars(Array(20).fill(0));
      return;
    }

    const interval = setInterval(() => {
      setBars(prev => prev.map(() => Math.random() * 100 + 10));
    }, 150);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className={`flex items-end justify-center space-x-1 h-16 ${className}`}>
      {bars.map((height, index) => (
        <div
          key={index}
          className="audio-visualizer-bar w-1 transition-all duration-150 ease-out"
          style={{
            height: isPlaying ? `${height}%` : '4px',
            animationDelay: `${index * 0.1}s`
          }}
        />
      ))}
    </div>
  );
};

export default AudioVisualizer;
