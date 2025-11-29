import { Route } from '@models/route.model';
import React from 'react';

const HomePage = React.lazy(() => import('@pages/Home'));
const ContactPage = React.lazy(() => import('@pages/Contact'));
const CertificationsPage = React.lazy(() => import('@pages/Certifications'));
const SkillsPage = React.lazy(() => import('@pages/Skills'));

const routes: Route[] = [
  {
    label: '/home',
    path: '/home',
    component: HomePage,
    isIndexRoute: true,
  },
  {
    label: '/certifications',
    path: '/certifications',
    component: CertificationsPage,
    isIndexRoute: false,
  },
  {
    label: '/skills',
    path: '/skills',
    component: SkillsPage,
    isIndexRoute: false,
  },
  {
    label: '/contact',
    path: '/contact',
    component: ContactPage,
    isIndexRoute: false,
  },
];

export default routes;
