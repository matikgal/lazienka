import { useState } from 'react';
import type { WallDefinition } from '../../../types/wall';
import type { CadViewType } from '../../../types/cad';
import { Button } from '../../ui/Button';
import { CadPlanView } from './CadPlanView';
import { CadSectionView } from './CadSectionView';
import { TechnicalLegend } from './TechnicalLegend';
import { CadSheetHeader } from './CadSheetHeader';

interface CadSheetProps {
  readonly walls: readonly WallDefinition[];
}

export function CadSheet({ walls }: CadSheetProps) {
  const [activeTab, setActiveTab] = useState<CadViewType>('plan');

  return (
    <div className="cad-sheet-container">
      <div className="cad-toolbar no-print">
        <div className="cad-tab-group">
          <Button
            variant="secondary"
            isActive={activeTab === 'plan'}
            onClick={() => setActiveTab('plan')}
          >
            Rzut poziomy (Plan)
          </Button>
          <Button
            variant="secondary"
            isActive={activeTab === 'section'}
            onClick={() => setActiveTab('section')}
          >
            Przekrój pionowy (Skos)
          </Button>
          <Button
            variant="secondary"
            isActive={activeTab === 'full'}
            onClick={() => setActiveTab('full')}
          >
            Arkusz zbiorczy (Wszystkie rzuty)
          </Button>
        </div>

        <Button
          variant="outline"
          onClick={() => window.print()}
          className="print-btn"
        >
          Drukuj / Eksportuj PDF
        </Button>
      </div>

      <div className="cad-paper-sheet">
        <CadSheetHeader />

        {(activeTab === 'plan' || activeTab === 'full') && (
          <section className="sheet-drawing-section">
            <h3 className="drawing-subtitle">1. RZUT POZIOMY POMIESZCZENIA (KOTY ŚCIAN I WNĘK)</h3>
            <CadPlanView />
          </section>
        )}

        {(activeTab === 'section' || activeTab === 'full') && (
          <section className="sheet-drawing-section">
            <h3 className="drawing-subtitle">2. PRZEKRÓJ PIONOWY A-A (PROFIL SKOSU DACHOWEGO)</h3>
            <CadSectionView />
          </section>
        )}

        <footer className="sheet-footer">
          <TechnicalLegend walls={walls} />
        </footer>
      </div>
    </div>
  );
}
