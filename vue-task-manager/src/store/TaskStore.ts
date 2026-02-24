import axios from "axios";
import { defineStore } from "pinia";

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
            this.loading = true;
            try {
                const response = await axios.get(`${SERVER_URL}/tasks`); //Uso di Json-Server

                if (response.status !== 200) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const list = response.data;
                this.task = list ?? [];

            } catch (error) {
                console.error("Errore nel recupero dei task:", error);
                this.task = [];
            } finally {
                this.loading = false;
            }
        },

        async toogleFav(id: number){
          try {
            if (confirm('Sicuro di Voler Procedere?')) {
            const task = this.task.find((t) => t.id === id);
            task!.favourites = !task?.favourites;

            const response = await axios.patch(`${SERVER_URL}/tasks/${id}`, task);
            if (response.status !== 200) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            window.alert("Aggiunto ai Preferiti!!");
           }
          } catch (error) {
            console.error(error)
          }
        },
        
        async addTask(task: Task){
            try {
                this.task.push(task);
                const response = await axios.post(`${SERVER_URL}/tasks`, task);
                if (response.status !== 200) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                window.alert("Task Aggiunta con successo");
            } catch (error) {
                console.error(error);
            }
        },

        async deleteTask(id: number){
          try {
            if (confirm('Sicuro di Volerlo Eliminare?')) {
                this.task = this.task.filter((t) => t.id !== id);
                const response = await axios.delete(`${SERVER_URL}/tasks/${id}`);
                 if (response.status !== 200) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                window.alert('Task Eliminato!!');
            }
          } catch (error) {
            console.error(error)
          }
        }
    }
})