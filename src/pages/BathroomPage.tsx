import { useState } from 'react';
import type { ViewPreset } from '../types/room';
import type { DisplayMode } from '../types/technical';
import { useCustomRoom } from '../hooks/useCustomRoom';
import { RoomCanvas } from '../components/features/room/RoomCanvas';
import { RoomControls } from '../components/features/room/RoomControls';
import { WallListPanel } from '../components/features/room/WallListPanel';
import { CadSheet } from '../components/features/technical/CadSheet';
import { Button } from '../components/ui/Button';

export function BathroomPage() {
  const [activePreset, setActivePreset] = useState<ViewPreset>('perspective');
  const [displayMode, setDisplayMode] = useState<DisplayMode>('3d');
  const {
    model,
    bbox,
    totalLength,
    settings,
    toggleSetting,
  } = useCustomRoom();

  return (
    <div className="app-layout">
      <header className="app-header">
        <div>
          <h1 className="app-title">Wizualizator i Wymiarowanie Łazienki 3D</h1>
          <p className="app-subtitle">
            Wysokości: Ściana A = 257.5 cm | Ściana C = 123 cm | Skos zaczyna się 183 cm od ściany A (spadek 43.6°)
          </p>
        </div>
        <nav className="mode-switcher" aria-label="Wybór trybu widoku">
          <Button
            variant="secondary"
            isActive={displayMode === '3d'}
            onClick={() => setDisplayMode('3d')}
          >
            Model 3D
          </Button>
          <Button
            variant="secondary"
            isActive={displayMode === 'technical'}
            onClick={() => setDisplayMode('technical')}
          >
            Rysunek Techniczny 2D
          </Button>
        </nav>
      </header>

      <main className="app-main">
        <section className="viewport-section" aria-label={displayMode === '3d' ? 'Wizualizacja 3D' : 'Rysunek Techniczny'}>
          {displayMode === '3d' ? (
            <RoomCanvas
              walls={model.walls}
              bbox={bbox}
              settings={settings}
              activePreset={activePreset}
            />
          ) : (
            <CadSheet walls={model.walls} />
          )}
        </section>

        <aside className="sidebar-section" aria-label="Panele konfiguracyjne">
          <WallListPanel
            walls={model.walls}
            totalLength={totalLength}
          />

          <RoomControls
            activePreset={activePreset}
            settings={settings}
            onSelectPreset={setActivePreset}
            onToggleSetting={toggleSetting}
          />
        </aside>
      </main>
    </div>
  );
}
