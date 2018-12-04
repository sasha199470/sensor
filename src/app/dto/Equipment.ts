export class Equipment {
  id: number;
  title: string;
  parentId: number;
  equipmentStatus: string;
  depth: number;
  children: Equipment[];

  determinationProbability: number;
  failureDate: string;
  stationaryModeDate: string;
  startDate: string;
}
