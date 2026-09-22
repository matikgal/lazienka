import type { RoomMetrics } from '../../../types/room';
import { Card } from '../../ui/Card';

interface RoomStatsProps {
  readonly metrics: RoomMetrics;
}

export function RoomStats({ metrics }: RoomStatsProps) {
  return (
    <Card title="Podsumowanie parametrów">
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Powierzchnia podłogi</span>
          <span className="stat-value">{metrics.floorAreaSquareMeters} m²</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Obwód ścian</span>
          <span className="stat-value">{metrics.perimeterMeters} m</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Powierzchnia ścian</span>
          <span className="stat-value">{metrics.wallAreaSquareMeters} m²</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Kubatura</span>
          <span className="stat-value">{metrics.volumeCubicMeters} m³</span>
        </div>
      </div>
    </Card>
  );
}
