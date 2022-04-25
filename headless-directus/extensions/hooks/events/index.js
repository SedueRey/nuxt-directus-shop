module.exports = function registerHook({filter, action}) {
  filter('events.items.create', async (input) => {
    let {url} = input;
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
        url = `${title.toLowerCase()}`;
      }
    }
		return {...input, url, published_date};
	});
};