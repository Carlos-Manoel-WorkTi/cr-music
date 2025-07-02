
import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Heart, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

interface Song {
  id: string;
  title: string;
  artist: string;
  duration: string;
}

interface MiniPlayerProps {
  currentSong: Song;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number[];
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onVolumeChange: (value: number[]) => void;
  onTimeChange: (value: number[]) => void;
}

const MiniPlayer: React.FC<MiniPlayerProps> = ({
  currentSong,
  isPlaying,
  currentTime,
  duration,
  volume,
  onPlay,
  onPause,
  onNext,
  onPrevious,
  onVolumeChange,
  onTimeChange
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="fixed bottom-0 left-0 right-0 glass-effect border-t border-purple-500/30 z-50">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          {/* Song Info */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center border border-purple-500/30">
              <Play size={16} className="text-purple-400" />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-medium truncate text-sm">{currentSong.title}</h4>
              <p className="text-xs text-muted-foreground truncate">{currentSong.artist}</p>
            </div>
            <Button variant="ghost" size="sm" className="rounded-full w-8 h-8 p-0">
              <Heart size={14} />
            </Button>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onPrevious}
              className="rounded-full w-8 h-8 p-0"
            >
              <SkipBack size={16} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={isPlaying ? onPause : onPlay}
              className="rounded-full w-10 h-10 p-0 bg-purple-500/20 hover:bg-purple-500/30"
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onNext}
              className="rounded-full w-8 h-8 p-0"
            >
              <SkipForward size={16} />
            </Button>
          </div>

          {/* Progress */}
          <div className="hidden md:flex items-center gap-2 flex-1 max-w-xs">
            <span className="text-xs text-muted-foreground min-w-0">
              {formatTime(currentTime)}
            </span>
            <Slider
              value={[currentTime]}
              max={duration}
              step={1}
              onValueChange={onTimeChange}
              className="flex-1"
            />
            <span className="text-xs text-muted-foreground min-w-0">
              {formatTime(duration)}
            </span>
          </div>

          {/* Volume */}
          <div className="hidden lg:flex items-center gap-2 max-w-32">
            <Volume2 size={16} className="text-muted-foreground" />
            <Slider
              value={volume}
              max={100}
              step={1}
              onValueChange={onVolumeChange}
              className="flex-1"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MiniPlayer;
