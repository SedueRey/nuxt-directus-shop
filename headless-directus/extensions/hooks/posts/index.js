module.exports = function registerHook({filter, action}) {
  filter('posts.items.create', async (input) => {
    const now = new Date();
    let {url, published_date} = input;
    if (!published_date) {
      published_date = now.toISOString();
    }
    if (!url) {
      let title = input.translations &&
        input.translations.length > 0 &&
        input.translations[0].title 
          ? input.translations[0].title || '' : '';
      if (title !== '') {
        title = title.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        try {
          title = title.replace(/[ \/:;,.&$=\'\"\\%·#]/ig, '-');
        } catch(e) {
          console.log(title, e);
        }
        url = `/${now.getFullYear()}/${title.toLowerCase()}`;
      }
    }
		return {...input, url, published_date};
	});
};