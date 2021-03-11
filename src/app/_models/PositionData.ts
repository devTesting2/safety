export class PositionData {
  info: string;
  positions: Position[];
}

export class Position {
  id: number;
  positionName: string;
  shortDescription: string;
  openings: string;

  detailDescription: string;
  roleDescription: string;
  requirements: string;
  steps: string;
  questions: string;
}
