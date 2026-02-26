// Chiamate e oraganizzazione ai microservizi
import { services } from "..";

// Simulazione di Interceptions nelle chiamate
services.interceptions.token();
services.interceptions.error();

// Servizi di Chiamate Simulate
export const GetTaskListServices = async () => {
  const { data } = await services.GET("/tasks");
  return data
}

export const PatchTaskServices = async (id: any, taskPayload: any) => {
  const { data } = await services.PATCH(`/tasks/${id}`, taskPayload);
  return data
}

export const deleteTaskServices = async (id: any) => {
  const { data } = await services.DELETE(`/tasks/${id}`);
  return data
}

export const AddTaskServices = async (taskPayload: any) => {
  const { data } = await services.POST(`/tasks`, taskPayload);
  return data
}