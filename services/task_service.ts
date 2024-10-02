import { Task } from "@/entities/task";
import { axiosRequest } from "@/utils/axios";

export class TaskService {
  _request = axiosRequest
  
  async getUserTasks(userId: string) {
    const response =  await axiosRequest.get(`/tasks/`);
    return response.data;
  }

  async getTask(taskId: string) {
    const response = await axiosRequest.get(`/tasks/${taskId}`);
    return response.data;
  }

  async getUsers() {
    const response = await axiosRequest.get(`/users`);
    return response.data;
  }


  async updateTask(task: Task) {
    const body = {
      title: task.title,
      description: task.description,
      responsible_id: task.responsible_id,
      status: task.status,
    };
    const response = await axiosRequest.put(`/tasks/${task.id}`, body);
    return response.data;
  }

  async createTask(task: {
    title: string;
    description: string;
    responsible_id: string;
  }) {
    const body = {
      title: task.title,
      description: task.description,
      responsible_id: task.responsible_id,
      // status: task.status,
    };

    const response = await axiosRequest.post('/tasks/', body);
    return response.data
  }
}