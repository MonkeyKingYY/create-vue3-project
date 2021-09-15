import {createRouter, createWebHistory} from "vue-router";

const router = createRouter({
    history: createWebHistory('/'),
    routes: [
        {
            path: '/',
            component: () => import('./views/welcome.vue')
        }, 
        {
            path: '/vue3-api-web/vue3-component-doc',
            component: () => import('./views/welcome.vue')
        }, 
		
		{
            path: '/example',
            component: () => import('./views/example/example.vue')
        },
		/*
		{
            path: '/house/proxy/buyManager',
            component: () => import('./views/house/proxy/manager-buy.vue')//买卖列表页 hangyang
        },
		*/
    ]
});

export default router;

