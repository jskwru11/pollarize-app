export interface Poll {
  id?: string;
  question: string;
  options: string[];
  date: Date;
  state: string;
  count: number;
  url?: string;
}
