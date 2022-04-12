module.exports = {
  static: {
    collections: ['posts', 'events', 'social_media', 'options', 'manufacture'],
    exportDir: './src/static/directus-mocks/',
    fields: '*.*',
  },
  images: {
    exportDir: './src/static/directus-files/',
    fields: ['id', 'title'],
    formats: ['jpg', 'webp'],
    quality: 50,
    sizes: [
      // Outside makes bigger images
      // Inside makes smaller images with big black borders
      // Cover is better for thumbnails
      { width: 128, height: 128, fit: 'cover', name: 'xs' },
      { width: 256, height: 256, fit: 'cover', name: 'sm' },
      { width: 568, fit: 'outside', name: 'md' },
    ]
  },
};
