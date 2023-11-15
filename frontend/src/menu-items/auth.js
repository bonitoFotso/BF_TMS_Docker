import { IconListCheck, IconDetails, IconUser } from '@tabler/icons';

// constant
const icons = {
    IconListCheck,
    IconDetails,
    IconUser
  };

const auth = {
    id:'auth',
    title:'auth',
    type:'group',
    children:[
        {
            id: 'login-1',
            title: 'Login',
            type: 'item',
            url: '/pages/login/login3',
            icon: icons.IconListCheck,
            breadcrumbs: false
        },
        {
            id: 'register-1',
            title: 'Register',
            type: 'item',
            url: '/pages/register/register3',
            icon: icons.IconListCheck,
            breadcrumbs: false
        },
        {
            id: 'profile-1',
            title: 'Profile',
            type: 'item',
            url: '/profile',
            icon: icons.IconUser,
            breadcrumbs: false
        }
        
    ]
}

export default auth;