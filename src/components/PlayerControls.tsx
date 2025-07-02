
import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PlayerControlsProps {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onRepeat: () => void;
  onShuffle: () => void;
  isRepeat: boolean;
  isShuffle: boolean;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({
  isPlaying,
  onPlay,
  onPause,
  onNext,
  onPrevious,
  onRepeat,
  onShuffle,
  isRepeat,
  isShuffle
}) => {
  return (
    <div className="flex items-center justify-center space-x-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={onShuffle}
        className={`rounded-full transition-all duration-300 ${
          isShuffle 
            ? 'text-electric-blue-500 glow-effect' 
            : 'text-muted-foreground hover:text-electric-blue-500'
        }`}
      >
        <Shuffle size={20} />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={onPrevious}
        className="rounded-full text-foreground hover:text-electric-blue-500 hover:scale-110 transition-all duration-200"
      >
        <SkipBack size={24} />
      </Button>

      <Button
        onClick={isPlaying ? onPause : onPlay}
        className="rounded-full w-14 h-14 bg-gradient-to-r from-electric-blue-500 to-soft-purple-500 hover:from-electric-blue-600 hover:to-soft-purple-600 transition-all duration-300 shadow-glow-blue animate-pulse-glow"
      >
        {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={onNext}
        className="rounded-full text-foreground hover:text-electric-blue-500 hover:scale-110 transition-all duration-200"
      >
        <SkipForward size={24} />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={onRepeat}
        className={`rounded-full transition-all duration-300 ${
          isRepeat 
            ? 'text-electric-blue-500 glow-effect' 
            : 'text-muted-foreground hover:text-electric-blue-500'
        }`}
      >
        <Repeat size={20} />
      </Button>
    </div>
  );
};

export default PlayerControls;
