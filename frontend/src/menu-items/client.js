import { IconListCheck, IconDetails } from '@tabler/icons';

// constant
const icons = {
    IconListCheck,
    IconDetails
  };

const client = {
    id:'c;ient',
    title:'Client',
    type:'group',
    children:[
        {
            id: 'client-1',
            title: 'Liste des Clients',
            type: 'item',
            url: '/client-list',
            icon: icons.IconListCheck,
            breadcrumbs: false
        },
        {
            id: 'agence-1',
            title: 'Liste des Agences',
            type: 'item',
            url: '/agence-list',
            icon: icons.IconListCheck,
            breadcrumbs: false
        },
        {
            id: 'appelant-1',
            title: 'Liste des Appelants',
            type: 'item',
            url: '/appelant-list',
            icon: icons.IconListCheck,
            breadcrumbs: false
        },
    ]
}

export default client;