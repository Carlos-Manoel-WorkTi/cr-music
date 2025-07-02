
import React, { useState } from 'react';
import { Bluetooth, Headphones, Speaker, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BluetoothDevice {
  id: string;
  name: string;
  type: 'headphones' | 'speaker' | 'phone';
  connected: boolean;
}

interface BluetoothPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const BluetoothPanel: React.FC<BluetoothPanelProps> = ({ isOpen, onClose }) => {
  const [devices, setDevices] = useState<BluetoothDevice[]>([
    { id: '1', name: 'AirPods Pro', type: 'headphones', connected: true },
    { id: '2', name: 'JBL Flip 6', type: 'speaker', connected: false },
    { id: '3', name: 'Sony WH-1000XM4', type: 'headphones', connected: false },
  ]);

  const [activeOutput, setActiveOutput] = useState<'phone' | 'headphones' | 'bluetooth'>('headphones');

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'headphones': return <Headphones size={20} />;
      case 'speaker': return <Speaker size={20} />;
      default: return <Smartphone size={20} />;
    }
  };

  const connectDevice = (deviceId: string) => {
    setDevices(prev => prev.map(device => ({
      ...device,
      connected: device.id === deviceId ? !device.connected : false
    })));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md glass-effect border-electric-blue-500/30 animate-slide-up">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-electric-blue-500">
            <Bluetooth size={24} />
            Conectividade Bluetooth
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Saída de Áudio Atual */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Saída de Áudio</h3>
            <div className="flex gap-2">
              <Button
                variant={activeOutput === 'phone' ? 'default' : 'outline'}
                size="sm"
                className="flex-1"
                onClick={() => setActiveOutput('phone')}
              >
                <Smartphone size={16} className="mr-2" />
                Celular
              </Button>
              <Button
                variant={activeOutput === 'headphones' ? 'default' : 'outline'}
                size="sm"
                className="flex-1"
                onClick={() => setActiveOutput('headphones')}
              >
                <Headphones size={16} className="mr-2" />
                Fone
              </Button>
              <Button
                variant={activeOutput === 'bluetooth' ? 'default' : 'outline'}
                size="sm"
                className="flex-1"
                onClick={() => setActiveOutput('bluetooth')}
              >
                <Bluetooth size={16} className="mr-2" />
                Bluetooth
              </Button>
            </div>
          </div>

          {/* Lista de Dispositivos */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Dispositivos Disponíveis</h3>
            <div className="space-y-2">
              {devices.map((device) => (
                <div
                  key={device.id}
                  className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${
                    device.connected
                      ? 'border-electric-blue-500/50 bg-electric-blue-500/10'
                      : 'border-muted hover:border-electric-blue-500/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {getDeviceIcon(device.type)}
                    <span className="font-medium">{device.name}</span>
                  </div>
                  <Button
                    variant={device.connected ? 'destructive' : 'default'}
                    size="sm"
                    onClick={() => connectDevice(device.id)}
                  >
                    {device.connected ? 'Desconectar' : 'Conectar'}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <Button onClick={onClose} className="w-full">
            Fechar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default BluetoothPanel;
