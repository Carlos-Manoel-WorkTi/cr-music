
import React from 'react';
import { Play, Heart, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

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

interface MusicListProps {
  songs: Song[];
  onPlaySong: (song: Song) => void;
  title: string;
  viewMode: 'list' | 'grid';
}

const MusicList: React.FC<MusicListProps> = ({ songs, onPlaySong, title, viewMode }) => {
  if (viewMode === 'grid') {
    return (
      <Card className="glass-effect border-purple-500/30">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {title}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {songs.map((song) => (
              <div
                key={song.id}
                className="relative group cursor-pointer"
                onClick={() => onPlaySong(song)}
              >
                <div className="aspect-square relative rounded-lg overflow-hidden">
                  {/* Background image with blur effect */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 bg-cover bg-center"
                    style={{
                      backgroundImage: song.cover ? `url(${song.cover})` : undefined,
                      filter: 'blur(8px)',
                      transform: 'scale(1.1)'
                    }}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-4 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      {song.isNew && (
                        <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse" />
                      )}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="rounded-full w-8 h-8 p-0 bg-black/20 hover:bg-purple-500/30"
                        >
                          <Play size={14} className="text-white" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="text-white">
                      <h3 className="font-medium text-sm mb-1 line-clamp-2">{song.title}</h3>
                      <p className="text-xs text-white/80 mb-1">{song.artist}</p>
                      <div className="flex justify-between items-center text-xs text-white/60">
                        <span>{song.year || '2024'}</span>
                        <span>{song.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-effect border-purple-500/30">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          {title}
        </h2>
        <div className="space-y-3">
          {songs.map((song) => (
            <div
              key={song.id}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/20 transition-all duration-300 group"
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center border border-purple-500/30">
                  <Play size={16} className="text-purple-400" />
                </div>
                {song.isNew && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-full animate-pulse" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-medium truncate">{song.title}</h3>
                <p className="text-sm text-muted-foreground truncate">
                  {song.artist} • {song.album} • {song.year || '2024'}
                </p>
              </div>
              
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full w-8 h-8 p-0"
                >
                  <Heart size={14} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onPlaySong(song)}
                  className="rounded-full w-8 h-8 p-0 hover:bg-purple-500/20"
                >
                  <Play size={14} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full w-8 h-8 p-0"
                >
                  <MoreHorizontal size={14} />
                </Button>
              </div>
              
              <span className="text-sm text-muted-foreground min-w-0">
                {song.duration}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MusicList;
