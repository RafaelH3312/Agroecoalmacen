export default ({ env }) => ({
  upload: {
    config: {
      provider: 'local',
      sizeLimit: 100 * 1024 * 1024,
    },
  },
  'users-permissions': {
    config: {
      providers: {}, // <-- vacío, Strapi no rompe
    },
  },
});