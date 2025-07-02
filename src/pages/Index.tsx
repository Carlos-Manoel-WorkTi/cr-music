
import React, { useState, useRef, useEffect } from 'react';
import { Bluetooth, Music, Search, Grid3X3, List, X } from 'lucide-react';
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
  album: string;
  duration: string;
  year?: number;
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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Sample data
  const recentSongs: Song[] = [
    { id: '1', title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', duration: '3:20', year: 2020, isNew: true, cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop' },
    { id: '2', title: 'Watermelon Sugar', artist: 'Harry Styles', album: 'Fine Line', duration: '2:54', year: 2020, cover: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop' },
    { id: '3', title: 'Levitating', artist: 'Dua Lipa', album: 'Future Nostalgia', duration: '3:23', year: 2020, cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop' },
    { id: '4', title: 'Good 4 U', artist: 'Olivia Rodrigo', album: 'SOUR', duration: '2:58', year: 2021, isNew: true, cover: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop' },
    { id: '5', title: 'Stay', artist: 'The Kid LAROI, Justin Bieber', album: 'F*CK LOVE 3', duration: '2:21', year: 2021, cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop' },
  ];

  const newReleases: Song[] = [
    { id: '6', title: 'Anti-Hero', artist: 'Taylor Swift', album: 'Midnights', duration: '3:20', year: 2022, isNew: true, cover: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop' },
    { id: '7', title: 'Unholy', artist: 'Sam Smith ft. Kim Petras', album: 'Gloria', duration: '2:36', year: 2023, isNew: true, cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop' },
    { id: '8', title: 'As It Was', artist: 'Harry Styles', album: 'Harry\'s House', duration: '2:47', year: 2022, isNew: true, cover: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop' },
    { id: '9', title: 'Heat Waves', artist: 'Glass Animals', album: 'Dreamland', duration: '3:58', year: 2020, isNew: true, cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop' },
  ];

  const popularSongs: Song[] = [
    { id: '10', title: 'Flowers', artist: 'Miley Cyrus', album: 'Endless Summer Vacation', duration: '3:20', year: 2023, cover: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop' },
    { id: '11', title: 'Calm Down', artist: 'Rema & Selena Gomez', album: 'Rave & Roses', duration: '3:59', year: 2022, cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop' },
    { id: '12', title: 'Bad Habit', artist: 'Steve Lacy', album: 'Gemini Rights', duration: '3:51', year: 2022, cover: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop' },
    { id: '13', title: 'Shivers', artist: 'Ed Sheeran', album: '= (Equals)', duration: '3:27', year: 2021, cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop' },
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
              {/* View Mode Toggle */}
              <div className="hidden md:flex items-center gap-1 bg-muted/20 rounded-lg p-1">
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={`rounded-md ${
                    viewMode === 'list' 
                      ? 'bg-purple-500 text-white hover:bg-purple-600' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                  }`}
                >
                  <List size={16} />
                </Button>
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={`rounded-md ${
                    viewMode === 'grid' 
                      ? 'bg-purple-500 text-white hover:bg-purple-600' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                  }`}
                >
                  <Grid3X3 size={16} />
                </Button>
              </div>

              {/* Search */}
              <div className="flex items-center">
                {isSearchOpen ? (
                  <div className="flex items-center gap-2 bg-muted/20 rounded-lg px-3 py-2">
                    <Search size={16} className="text-muted-foreground" />
                    <Input
                      placeholder="Buscar músicas..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-48 bg-transparent border-none p-0 h-auto focus-visible:ring-0 text-sm"
                      autoFocus
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className="p-1 h-auto hover:bg-muted/40"
                    >
                      <X size={14} />
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsSearchOpen(true)}
                    className="rounded-full glass-effect hover:bg-purple-500/20"
                  >
                    <Search size={18} />
                  </Button>
                )}
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsBluetoothOpen(true)}
                className="rounded-full glass-effect hover:bg-purple-500/20"
              >
                <Bluetooth size={18} />
              </Button>
              <ThemeToggle />
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
          viewMode={viewMode}
        />

        <MusicList
          title="🚀 Novos Lançamentos"
          songs={newReleases}
          onPlaySong={handlePlaySong}
          viewMode={viewMode}
        />

        <MusicList
          title="🔥 Mais Populares"
          songs={popularSongs}
          onPlaySong={handlePlaySong}
          viewMode={viewMode}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-purple-500/20 mt-12 py-6 glass-effect">
        <div className="container mx-auto px-4 text-center">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              🎵 <span className="font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">CR Music</span> - Protótipo de Interface
            </p>
            <p className="text-xs text-muted-foreground">
              Desenvolvido por <span className="text-purple-400 font-medium">Caio Ribeiro</span> • 2025
            </p>
            <p className="text-xs text-muted-foreground/80">
              Interface de demonstração para aplicativo de música
            </p>
          </div>
        </div>
      </footer>

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
