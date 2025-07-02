
import React, { useState } from 'react';
import { Plus, Music, Trash2, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface Song {
  id: string;
  title: string;
  artist: string;
  duration: string;
}

interface Playlist {
  id: string;
  name: string;
  songs: Song[];
}

interface PlaylistManagerProps {
  isOpen: boolean;
  onClose: () => void;
  onPlaySong: (song: Song) => void;
}

const PlaylistManager: React.FC<PlaylistManagerProps> = ({ isOpen, onClose, onPlaySong }) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([
    {
      id: '1',
      name: 'Favoritas',
      songs: [
        { id: '1', title: 'Blinding Lights', artist: 'The Weeknd', duration: '3:20' },
        { id: '2', title: 'Watermelon Sugar', artist: 'Harry Styles', duration: '2:54' },
        { id: '3', title: 'Good 4 U', artist: 'Olivia Rodrigo', duration: '2:58' },
      ]
    },
    {
      id: '2',
      name: 'Eletrônica',
      songs: [
        { id: '4', title: 'Titanium', artist: 'David Guetta ft. Sia', duration: '4:05' },
        { id: '5', title: 'Levels', artist: 'Avicii', duration: '3:18' },
      ]
    }
  ]);

  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const createPlaylist = () => {
    if (newPlaylistName.trim()) {
      const newPlaylist: Playlist = {
        id: Date.now().toString(),
        name: newPlaylistName.trim(),
        songs: []
      };
      setPlaylists(prev => [...prev, newPlaylist]);
      setNewPlaylistName('');
      setIsCreating(false);
    }
  };

  const deletePlaylist = (playlistId: string) => {
    setPlaylists(prev => prev.filter(p => p.id !== playlistId));
    if (selectedPlaylist === playlistId) {
      setSelectedPlaylist(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl h-[80vh] glass-effect border-electric-blue-500/30 animate-slide-up overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-electric-blue-500">
              <Music size={24} />
              Gerenciar Playlists
            </span>
            <Button variant="outline" onClick={onClose}>
              Fechar
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex gap-6 h-full overflow-hidden">
          {/* Lista de Playlists */}
          <div className="w-1/3 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Minhas Playlists</h3>
              <Button 
                size="sm" 
                onClick={() => setIsCreating(true)}
                className="rounded-full"
              >
                <Plus size={16} />
              </Button>
            </div>

            {isCreating && (
              <div className="space-y-2">
                <Input
                  placeholder="Nome da playlist"
                  value={newPlaylistName}
                  onChange={(e) => setNewPlaylistName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && createPlaylist()}
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={createPlaylist}>Criar</Button>
                  <Button size="sm" variant="outline" onClick={() => setIsCreating(false)}>
                    Cancelar
                  </Button>
                </div>
              </div>
            )}

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {playlists.map((playlist) => (
                <div
                  key={playlist.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                    selectedPlaylist === playlist.id
                      ? 'border-electric-blue-500 bg-electric-blue-500/10'
                      : 'border-muted hover:border-electric-blue-500/30'
                  }`}
                  onClick={() => setSelectedPlaylist(playlist.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{playlist.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {playlist.songs.length} músicas
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Implementar edição
                        }}
                      >
                        <Edit size={14} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          deletePlaylist(playlist.id);
                        }}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conteúdo da Playlist Selecionada */}
          <div className="flex-1">
            {selectedPlaylist ? (
              <div className="space-y-4">
                {(() => {
                  const playlist = playlists.find(p => p.id === selectedPlaylist);
                  return playlist ? (
                    <>
                      <h3 className="text-xl font-semibold">{playlist.name}</h3>
                      <div className="space-y-2 max-h-96 overflow-y-auto">
                        {playlist.songs.map((song) => (
                          <div
                            key={song.id}
                            className="flex items-center justify-between p-3 rounded-lg border border-muted hover:border-electric-blue-500/30 transition-all duration-200 cursor-pointer hover:bg-muted/10"
                            onClick={() => onPlaySong(song)}
                          >
                            <div>
                              <h4 className="font-medium">{song.title}</h4>
                              <p className="text-sm text-muted-foreground">{song.artist}</p>
                            </div>
                            <span className="text-sm text-muted-foreground">{song.duration}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : null;
                })()}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Selecione uma playlist para ver as músicas
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlaylistManager;
