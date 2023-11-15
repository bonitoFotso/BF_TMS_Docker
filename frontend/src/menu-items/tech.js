import { IconListCheck, IconDetails } from '@tabler/icons';

// constant
const icons = {
    IconListCheck,
    IconDetails
  };

const tech = {
    id:'technicien',
    title:'Technicien',
    type:'group',
    children:[
        {
            id: 'tech1-1',
            title: 'Liste des Technicien',
            type: 'item',
            url: '/technicien-list',
            icon: icons.IconListCheck,
            breadcrumbs: false
        },
        
    ]
}

export default tech;