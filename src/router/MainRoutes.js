const MainRoutes = {
    path: '/main',
    meta: {
        requiresAuth: true
    },
    redirect: '/main',
    component: () => import('@/layouts/full/FullLayout.vue'),
    children: [
        // {
        //     name: 'Dashboard',
        //     path: '/dashboard',
        //     component: () => import('@/views/dashboard/Dashboard.vue')
        // },
        {
            name: 'Users',
            path: '/users',
            component: () => import('@/views/users/UserListing.vue')
        },
//---------------------------------- Tickets ------------------------------------------------//
        {
            name: 'Tickets',
            path: '/tickets',
            exact:true,
            // redirect: 'list-tickets',
            // component: () => <div></div>,
            component: () => import('@/views/tickets/TicketListing.vue'),
            children: [
                {
                    name: 'AddTickets',
                    path: '/tickets/add-ticket',
                    exact:true,
                    component: () => import('@/views/tickets/AddTicket.vue'),
                },
            ]
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
