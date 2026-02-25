import { createRouter, createWebHashHistory, createWebHistory, useRoute } from 'vue-router'
// Lazy Loading delle Pagine
const HomeView = () => import('./view/HomeView.vue')
const TaskView = () => import('./view/TaskView.vue')
const DetailTask = () => import('./view/DetailTask.vue')
const NotFoundVue = () => import('./view/NotFoundVue.vue')
const TaskCommentDetail = () => import('./view/TaskCommentDetail.vue')

const routes = [
    { path: '/', component: HomeView, name: 'homepage' },
    { path: '/task', component: TaskView, name: 'task-page' },
    { path: '/task/:taskId', component: DetailTask, name: 'detail-task', props: true, children: [ //Utilizzo della Props
        { path: 'comments', component: TaskCommentDetail, name: 'comments-task', props: true }
    ] }, 
    { path: '/:pathMatch(.*)*', component: NotFoundVue, name: 'not-found-page' }
];

export const router = createRouter({
    history: createWebHistory(),
    routes
})
