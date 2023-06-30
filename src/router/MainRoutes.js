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
                        }
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
            component: () => import('@/views/contracts/ContractListing.vue')
        },
//---------------------------------- Reports ---------------------------------------------//

        {
            name: 'Reports',
            path: '/reports',
            component: () => import('@/views/reports/ReportsListing.vue')
        },

        {
            name: 'UserProfile',
            path: '/apps/user/profile',
            component: () => import('@/views/apps/user-profile/Profile.vue')
        },
        {
            name: 'Account Setting',
            path: '/pages/account-settings',
            component: () => import('@/views/account-settings/AccountSettings.vue')
        },
        {
            name: 'Account Setting',
            path: '/pages/company-settings',
            component: () => import('@/views/company-settings/CompanySettings.vue')
        },
    ]
};

export default MainRoutes;
