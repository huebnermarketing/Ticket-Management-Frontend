const MainRoutes = {
    path: '/',
    meta: {
        requiresAuth: true
    },
    redirect: '/tickets',
    component: () => import('@/layouts/full/FullLayout.vue'),
    children: [
        //---------------------------------- Tickets ------------------------------------------------//
        {
            name: 'Tickets',
            path: 'tickets',
            component: () => import('@/views/Empty.vue'),
            children: [
                {
                    path: '',
                    component: () => import('@/views/tickets/TicketListing.vue'),
                },
                {
                    name: 'AddTickets',
                    path: 'add',
                    component: () => import('@/views/tickets/AddTicket.vue'),
                },
                {
                    path: ':id',
                    component: () => import('@/views/Empty.vue'),
                    children: [
                        {
                            name:'EditTicket',
                            path: 'edit',
                            component: () => import('@/views/tickets/EditTicket.vue'),
                        },
                        {
                            path: '',
                            redirect: { name: 'EditTicket' }
                        },
                    ]
                },
            ]
        },
        {
            name: 'Users',
            path: '/users',
            component: () => import('@/views/users/UserListing.vue')
        },
//---------------------------------- Contracts ---------------------------------------------//
        {
            name: 'Contracts',
            path: '/contracts',
            component: () => import('@/views/Empty.vue'),          
            children: [
                {
                    path: '',
                    component: () => import('@/views/contracts/ContractListing.vue'),
                },
                {
                    name: 'AddContract',
                    path: 'add',
                    component: () => import('@/views/contracts/AddContract.vue'),
                },
                // {
                //     path: ':id',
                //     component: () => import('@/views/Empty.vue'),
                //     children: [
                //         {
                //             name:'EditTicket',
                //             path: 'edit',
                //             component: () => import('@/views/tickets/EditTicket.vue'),
                //         },
                //         {
                //             path: '',
                //             redirect: { name: 'EditTicket' }
                //         },
                //     ]
                // },
            ]
        },
//---------------------------------- Reports ---------------------------------------------//

        {
            name: 'Reports',
            path: '/reports',
            component: () => import('@/views/reports/ReportsListing.vue')
        },

        {
            name: 'UserProfile',
            path: '/profile',
            component: () => import('@/views/apps/user-profile/Profile.vue')
        },
        // {
        //     name: 'Account Setting',
        //     path: '/pages/account-settings',
        //     component: () => import('@/views/account-settings/AccountSettings.vue')
        // },
        {
            name: 'Account Setting',
            path: '/company-settings',
            component: () => import('@/views/company-settings/CompanySettings.vue'),
        },
    ]
};

export default MainRoutes;
