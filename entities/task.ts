export type Responsible = {
  id: string;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  responsible_id: string;
  responsible: Responsible;
  status: TaskStatus;
  created_at: string;
  updated_at: string;
};


export enum TaskStatus {
  Pending = 'pending',
  InProgress = 'in_progress',
  Completed = 'completed',
}