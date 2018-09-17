export interface Tasks {
  id:number,
  taskType: string,
  referenceType: string
  referenceNumber: string,
  taskStatus: string,
  assignedTo: string,
  description: string,
  dueDate: string,
  attachment: string,
  approve: string,
  reject: string,
  reassign: string
}

export interface TasksList {
  id: number,
  taskId: string,
  taskType: string,
  referenceType: string,
  referenceNumber: string,
  assignor: string,
  status: string,
  description: string,
  attachment: string,
  dueDate: string,
  approve: string,
  reject: string,
  reassign: string,
  comment: string,
  selected: boolean
}
