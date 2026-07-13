import type { UserConfig } from 'vitepress';

const config: UserConfig = {
  title: 'VerificarIT',
  description: 'Documentacion tecnica de VerificarIT',
  lang: 'es-CO',
base: '/verificar/',
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: [
    /^https:\/\/github\.com\//,
    /^https:\/\/maproute39-hue\.github\.io\//,
  ],
  themeConfig: {
    logo: '/logo.svg',
    search: {
      provider: 'local',
    },
    nav: [
      { text: 'Inicio', link: '/' },
      { text: 'Guia', link: '/guia/introduccion' },
      { text: 'Home', link: '/funcionalidades/home' },
      { text: 'Changelog', link: '/changelog' },
      { text: 'GitHub', link: 'https://github.com/maproute39-hue/verificar' },
    ],
    sidebar: [
      {
        text: 'Guia',
        items: [
          { text: 'Introduccion', link: '/guia/introduccion' },
          { text: 'Instalacion y ejecucion', link: '/guia/instalacion' },
        ],
      },
      {
        text: 'Arquitectura',
        items: [
          { text: 'Vision general', link: '/arquitectura/overview' },
          { text: 'Realtime y cache', link: '/arquitectura/realtime-cache' },
        ],
      },
      {
        text: 'Funcionalidades',
        items: [
          { text: 'Home de inspecciones', link: '/funcionalidades/home' },
          { text: 'Documentos criticos', link: '/funcionalidades/documentos-criticos' },
          { text: 'Busqueda por placa', link: '/funcionalidades/busqueda-placa' },
        ],
      },
      {
        text: 'Flujos',
        items: [
          { text: 'Inspecciones heredadas', link: '/flujos/inspecciones-heredadas' },
          { text: 'PDF y certificados', link: '/flujos/pdf-certificados' },
        ],
      },
      {
        text: 'Modelos',
        items: [
          { text: 'Modelo de datos', link: '/modelos/datos' },
        ],
      },
      {
        text: 'Despliegue',
        items: [
          { text: 'Despliegue', link: '/despliegue/guia' },
          { text: 'Seguridad Gotenberg', link: '/despliegue/seguridad-gotenberg' },
        ],
      },
      {
        text: 'Historial',
        items: [
          { text: 'Changelog', link: '/changelog' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/maproute39-hue/verificar' },
    ],
    footer: {
      message: 'Documentacion tecnica de VerificarIT.',
    },
  },
};

export default config;
