import axios from "axios";
import { defineStore } from "pinia";
import { AddTaskServices, deleteTaskServices, GetTaskListServices, PatchTaskServices } from "../services/api/task.service";

// Creazione dello store

const SERVER_URL = "http://localhost:3001";

export interface Task {
    id: string;
    title: string,
    sub: string,
    text: string,
    favourites: boolean;
}

export const useTaskStore = defineStore("task-store", {
    
    // Creazione dei Seguenti Stati
    state: () =>( {
        name: "Store-Tasks",
        task: ([] as Task[]),
        loading: false
    }),

    // Recupero degli stati 
    getters: {
        totalCount: (state) => {
            return Number(state.task.length);
        },

        favCount: (state) => {
            return state.task.reduce((count, tasks) => {
                return tasks.favourites ? count + 1 : count;
            }, 0)
        },

        favs: (state) => {
            return state.task.filter((e) => e.favourites);
        }
    },

    // Azioni per lo store
    actions: {

      async getTasks() {
            try {
                this.loading = true;
                const response = await GetTaskListServices(); //Uso di Json-Server
                const list: any = response ?? [];
                this.task = list;
                
            } catch (error) {
                console.error("Errore nel recupero dei task:", error);
                this.task = [];
            } finally {
                this.loading = false;
            }
        },

        async toogleFav(id: string, addCondition:boolean){
          try {
            if (confirm('Sicuro di Voler Procedere?')) {
            const task = this.task.find((t) => t.id === id);
            task!.favourites = !task?.favourites;
            const response = await PatchTaskServices(id, task);
           }
          } catch (error) {
            console.error(error)
          } finally {
            if(addCondition) window.alert("Aggiunto ai Preferiti!!");
            if(!addCondition) window.alert("Rimosso dai Preferiti!!");
          }
        },
        
        async addTask(task: Task){
            try {
                this.task.push(task);
                const response = await AddTaskServices(task);
            } catch (error) {
                console.error(error);
            } finally {
                window.alert("Task Aggiunta con successo");
            }
        },

        async deleteTask(id: string){
          try {
            if (confirm('Sicuro di Volerlo Eliminare?')) {
                this.task = this.task.filter((t) => t.id !== id);
                const response = await deleteTaskServices(id);
            }
          } catch (error) {
            console.error(error)
          } finally {
             window.alert('Task Eliminato!!');
          }
        }
    }
})