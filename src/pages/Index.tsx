
import React, { useState, useRef, useEffect } from 'react';
import { Bluetooth, Music, Search, Grid3X3, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import BluetoothPanel from '@/components/BluetoothPanel';
import PlaylistManager from '@/components/PlaylistManager';
import ThemeToggle from '@/components/ThemeToggle';
import MusicList from '@/components/MusicList';
import MiniPlayer from '@/components/MiniPlayer';

interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration: string;
  cover?: string;
  isNew?: boolean;
}

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(200);
  const [volume, setVolume] = useState([75]);
  const [isBluetoothOpen, setIsBluetoothOpen] = useState(false);
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Sample data
  const recentSongs: Song[] = [
    { id: '1', title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', duration: '3:20', isNew: true },
    { id: '2', title: 'Watermelon Sugar', artist: 'Harry Styles', album: 'Fine Line', duration: '2:54' },
    { id: '3', title: 'Levitating', artist: 'Dua Lipa', album: 'Future Nostalgia', duration: '3:23' },
    { id: '4', title: 'Good 4 U', artist: 'Olivia Rodrigo', album: 'SOUR', duration: '2:58', isNew: true },
    { id: '5', title: 'Stay', artist: 'The Kid LAROI, Justin Bieber', album: 'F*CK LOVE 3', duration: '2:21' },
  ];

  const newReleases: Song[] = [
    { id: '6', title: 'Anti-Hero', artist: 'Taylor Swift', album: 'Midnights', duration: '3:20', isNew: true },
    { id: '7', title: 'Unholy', artist: 'Sam Smith ft. Kim Petras', album: 'Gloria', duration: '2:36', isNew: true },
    { id: '8', title: 'As It Was', artist: 'Harry Styles', album: 'Harry\'s House', duration: '2:47', isNew: true },
    { id: '9', title: 'Heat Waves', artist: 'Glass Animals', album: 'Dreamland', duration: '3:58', isNew: true },
  ];

  const popularSongs: Song[] = [
    { id: '10', title: 'Flowers', artist: 'Miley Cyrus', album: 'Endless Summer Vacation', duration: '3:20' },
    { id: '11', title: 'Calm Down', artist: 'Rema & Selena Gomez', album: 'Rave & Roses', duration: '3:59' },
    { id: '12', title: 'Bad Habit', artist: 'Steve Lacy', album: 'Gemini Rights', duration: '3:51' },
    { id: '13', title: 'Shivers', artist: 'Ed Sheeran', album: '= (Equals)', duration: '3:27' },
  ];

  useEffect(() => {
    if (isPlaying && currentSong) {
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
  }, [isPlaying, duration, currentSong]);

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);
  const handleNext = () => console.log('Next song');
  const handlePrevious = () => console.log('Previous song');

  const handlePlaySong = (song: Song) => {
    setCurrentSong(song);
    setCurrentTime(0);
    setDuration(parseInt(song.duration.split(':')[0]) * 60 + parseInt(song.duration.split(':')[1]));
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 text-foreground pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 glass-effect border-b border-purple-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Music size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  CR Music
                </h1>
                <p className="text-xs text-muted-foreground">Sua música, seu estilo</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2">
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-full"
                >
                  <List size={16} />
                </Button>
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-full"
                >
                  <Grid3X3 size={16} />
                </Button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsBluetoothOpen(true)}
                className="rounded-full glass-effect"
              >
                <Bluetooth size={18} />
              </Button>
              <ThemeToggle />
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-4 max-w-md">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar músicas, artistas, álbuns..."
                className="pl-10 glass-effect border-purple-500/30"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-8">
        <MusicList
          title="🎵 Tocadas Recentemente"
          songs={recentSongs}
          onPlaySong={handlePlaySong}
        />

        <MusicList
          title="🚀 Novos Lançamentos"
          songs={newReleases}
          onPlaySong={handlePlaySong}
        />

        <MusicList
          title="🔥 Mais Populares"
          songs={popularSongs}
          onPlaySong={handlePlaySong}
        />
      </main>

      {/* Mini Player */}
      {currentSong && (
        <MiniPlayer
          currentSong={currentSong}
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={duration}
          volume={volume}
          onPlay={handlePlay}
          onPause={handlePause}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onVolumeChange={setVolume}
          onTimeChange={(value) => setCurrentTime(value[0])}
        />
      )}

      {/* Panels */}
      <BluetoothPanel 
        isOpen={isBluetoothOpen}
        onClose={() => setIsBluetoothOpen(false)}
      />

      <PlaylistManager
        isOpen={isPlaylistOpen}
        onClose={() => setIsPlaylistOpen(false)}
        onPlaySong={handlePlaySong}
      />
    </div>
  );
};

export default Index;
