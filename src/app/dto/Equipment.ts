export class Equipment {
  id: string;
  title: string;
  parentId: number;
  equipmentStatus: string;
  depth: number;
  children: Equipment[];

  determinationProbability: number;
  its: number;
  failureDate: string;
  modeDate: string;
  startDate: string;
}
