import axios from "axios"
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"

const URL_BASE = import.meta.env.VITE_BASE_URL;

const headers = {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
    "Accept-Language": "it"
}

const InjectTokenRequest = (config: any) => {
    try {
        const token = String(import.meta.env.VITE_TOKEN_AXIOS) || "";
        if(token !== ""){
            config.headers.Authorization = `Barer ${token}`;
            sessionStorage.setItem("Token", token)
        }
        return config
    } catch (error) {
        return config
    }
}

// Eleborazione delle chiamate Usate
export const services = {

    build:{
        url: URL_BASE,

        http: axios.create({
            baseURL: URL_BASE,
            headers: headers,
            withCredentials: true
        })
    },

    interceptions: {

        // Uso del Token nelle Seguenti Richieste
        token: () => {
            return services.build.http.interceptors.request.use(
                (config) => {
                    return InjectTokenRequest(config);
                },
                (error) => {
                    const { response } = error;
                    return Promise.reject(response);
                }
            )
        }, 

        // Uso delle Risposte ad Errori in Maniera Globale
        error: () => {
            return services.build.http.interceptors.response.use(
                (response) => {
                    return response;
                },
                (error) => {
                    const { response } = error;
                    services.handleErrorResponse(error);
                    return Promise.reject(response);
                }
            )
        }
    },

    GET<T>(endpoint: string){
        return this.build.http.get<T>(endpoint);
    },

    POST<T>(endpoint: string, data: unknown) {
        return this.build.http.post<T>(endpoint, data);
    },

    PUT<T>(endpoint: string, data: unknown) {
        return this.build.http.put<T>(endpoint, data);
    },

    DELETE<T>(endpoint: string) {
        return this.build.http.delete<T>(endpoint);
    },

    PATCH<T>(endpoint: string, data: unknown) {
        return this.build.http.patch<T>(endpoint, data);
    },

    handleErrorResponse(error: any){
        console.log("HandleError");
        if (error) {
            const { status } = error;

            switch (status) {
                case 500:
                console.error("Errore 500");
                break;

                case 403:
                console.error("Errore 403");
                break;

                case 401:
                console.error("Errore 401");
                break;

                case 429:
                console.error("Errore 429");
                break;
            }

        } else {
            console.warn("No internet connection found. App is running in offline mode.")
        }
    }

}