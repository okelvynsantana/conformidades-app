import { TaskStatus } from "@/entities/task";

export class Actions {
  static formatTasksStatus(status: TaskStatus ) {

    switch (status) {
      case TaskStatus.Pending:
        return 'Pendente'
      case TaskStatus.InProgress:
        return 'Em progresso'
      case TaskStatus.Completed:
        return 'Concluído'
      default:
        return ''
    }
  }

  static getStatusProps(status: TaskStatus) {
    switch (status) {
      case TaskStatus.Pending:
        return { color: "#FFC107", label: "Pendente", icon: "access-time-filled" };
      case TaskStatus.InProgress:
        return { color: "#17A2B8", label: "Em progresso", icon: "access-time" };
      case TaskStatus.Completed:
        return { color: "#28A745", label: "Concluído", icon: "check"};
    }

  }
}