
import Settings from "../../componentLayer/pages/settings/Settings"

import { roleRouter } from "./role/role.router"
import { organizationRouter } from "./organization/organization.router";
import { formRouter } from "./form/form.router";
import { itegrationRoutes } from "./integration/integration.router";
import { communicationRouter } from "./communication/commucation.router";
import { datasharerouter } from "./dataShare/datashare.router";

export const settingRouter = [
    { index: true, element: <Settings /> },
    {
        path: 'forms', children: [
            ...formRouter,
        ]
    },
    {
        path: 'organizationprofile', children: [
            ...organizationRouter,
        ]
    },
    ...communicationRouter,
    {
        path: 'roles', children: [
            ...roleRouter, 
        ]
    },
    {
        path: 'datashare', children: [
            ...datasharerouter, 
        ]
    },
    ...itegrationRoutes,
]