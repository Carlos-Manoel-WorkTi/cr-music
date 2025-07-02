
import React, { useState, useRef, useEffect } from 'react';
import { Bluetooth, Music, Heart, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import AudioVisualizer from '@/components/AudioVisualizer';
import PlayerControls from '@/components/PlayerControls';
import BluetoothPanel from '@/components/BluetoothPanel';
import PlaylistManager from '@/components/PlaylistManager';
import ThemeToggle from '@/components/ThemeToggle';

interface Song {
  id: string;
  title: string;
  artist: string;
  duration: string;
  cover?: string;
}

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(200); // 3:20 em segundos
  const [volume, setVolume] = useState([75]);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setShuffle] = useState(false);
  const [isBluetoothOpen, setIsBluetoothOpen] = useState(false);
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const [currentSong, setCurrentSong] = useState<Song>({
    id: '1',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    duration: '3:20'
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, duration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);
  const handleNext = () => {
    // Implementar lógica de próxima música
    console.log('Próxima música');
  };
  const handlePrevious = () => {
    // Implementar lógica de música anterior
    console.log('Música anterior');
  };
  const handleRepeat = () => setIsRepeat(!isRepeat);
  const handleShuffle = () => setShuffle(!isShuffle);

  const handlePlaySong = (song: Song) => {
    setCurrentSong(song);
    setCurrentTime(0);
    setIsPlaying(true);
    setIsPlaylistOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-surface-900 via-dark-surface-800 to-dark-surface-900 text-foreground">
      {/* Header */}
      <header className="flex items-center justify-between p-4 md:p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-electric-blue-500 to-soft-purple-500 rounded-xl flex items-center justify-center">
            <Music size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-electric-blue-500 to-soft-purple-500 bg-clip-text text-transparent">
              CR Music
            </h1>
            <p className="text-xs text-muted-foreground">Player Moderno</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsBluetoothOpen(true)}
            className="rounded-full bg-muted/20 backdrop-blur-md border border-white/10 hover:bg-muted/30 transition-all duration-300"
          >
            <Bluetooth size={18} />
          </Button>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Player */}
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="glass-effect border-electric-blue-500/30 shadow-glow-soft">
          <CardContent className="p-8 space-y-8">
            {/* Album Art & Song Info */}
            <div className="text-center space-y-4">
              <div className="w-48 h-48 mx-auto bg-gradient-to-br from-electric-blue-500/20 to-soft-purple-500/20 rounded-2xl flex items-center justify-center border border-electric-blue-500/30 shadow-glow-blue">
                <Music size={64} className="text-electric-blue-500" />
              </div>
              
              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-bold">{currentSong.title}</h2>
                <p className="text-lg text-muted-foreground">{currentSong.artist}</p>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFavorited(!isFavorited)}
                className={`rounded-full transition-all duration-300 ${
                  isFavorited 
                    ? 'text-red-500 hover:text-red-600' 
                    : 'text-muted-foreground hover:text-red-500'
                }`}
              >
                <Heart size={20} fill={isFavorited ? 'currentColor' : 'none'} />
              </Button>
            </div>

            {/* Audio Visualizer */}
            <AudioVisualizer isPlaying={isPlaying} />

            {/* Progress Bar */}
            <div className="space-y-3">
              <Slider
                value={[currentTime]}
                max={duration}
                step={1}
                onValueChange={(value) => setCurrentTime(value[0])}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Player Controls */}
            <PlayerControls
              isPlaying={isPlaying}
              onPlay={handlePlay}
              onPause={handlePause}
              onNext={handleNext}
              onPrevious={handlePrevious}
              onRepeat={handleRepeat}
              onShuffle={handleShuffle}
              isRepeat={isRepeat}
              isShuffle={isShuffle}
            />

            {/* Volume & Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1 max-w-xs">
                <Volume2 size={20} className="text-muted-foreground" />
                <Slider
                  value={volume}
                  max={100}
                  step={1}
                  onValueChange={setVolume}
                  className="flex-1"
                />
              </div>

              <Button
                variant="outline"
                onClick={() => setIsPlaylistOpen(true)}
                className="rounded-full border-electric-blue-500/30 hover:border-electric-blue-500 hover:bg-electric-blue-500/10 transition-all duration-300"
              >
                <Music size={18} className="mr-2" />
                Playlists
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Bluetooth Panel */}
      <BluetoothPanel 
        isOpen={isBluetoothOpen}
        onClose={() => setIsBluetoothOpen(false)}
      />

      {/* Playlist Manager */}
      <PlaylistManager
        isOpen={isPlaylistOpen}
        onClose={() => setIsPlaylistOpen(false)}
        onPlaySong={handlePlaySong}
      />
    </div>
  );
};

export default Index;
