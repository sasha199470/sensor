import {DefectMessage} from './defect-message';

export class Equipment {
  id: string;
  title: string;
  parentId: string;
  equipmentStatus: string;
  depth: number;
  children: Equipment[];

  determinationProbability: number;
  its: number;
  failureDate: string;
  modeDate: string;
  equipmentMode: string;
  modeDescription: string;
  startDate: string;

  defectMessage: DefectMessage[];
}
