import { IconListCheck, IconDetails } from '@tabler/icons';

// constant
const icons = {
    IconListCheck,
    IconDetails
  };

const tache = {
    id:'tache',
    title:'Taches',
    type:'group',
    children:[
        {
            id: 'tache1-1',
            title: 'Liste des Taches',
            type: 'item',
            url: '/tache-list',
            icon: icons.IconListCheck,
            breadcrumbs: false
        },
        {
            id: 'categorie-1',
            title: 'Liste des categorie',
            type: 'item',
            url: '/categorie-list',
            icon: icons.IconListCheck,
            breadcrumbs: false
        },
        {
            id: 'activite-1',
            title: 'Liste des activite',
            type: 'item',
            url: '/activite-list',
            icon: icons.IconListCheck,
            breadcrumbs: false
        },
    ]
}

export default tache;