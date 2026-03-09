import { Home, Info, Package, Mail } from 'lucide-react';

export const navigationItems = [
  {
    id: 1,
    name: 'Home',
    path: '/',
    icon: Home,
  },
  {
    id: 3,
    name: 'Products',
    path: '/products',
    icon: Package,
  },
    {
    id: 2,
    name: 'About',
    path: '/about',
    icon: Info,
  },
  {
    id: 4,
    name: 'Contact',
    path: '/contact',
    icon: Mail,
  },
];