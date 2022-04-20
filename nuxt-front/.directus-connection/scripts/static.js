require('dotenv').config({ path: '.env' })
const {
  fs, axios, config, host
} =  require('./_conf');

const writeContentToFile = ({url, content, collection}) => {
  const directories = url.split('/').filter(el => el !== '');
  const filename = `${directories.pop() || 'index'}.json`;
  const baseDestination = `${config.static.exportDir}${collection}/`;
  console.log(`File from [${url}] to: ${filename}`);
  fs.mkdirSync(`${baseDestination}`, { recursive: true });
  if (directories.length > 0) {
    fs.mkdirSync(`${baseDestination}${directories.join('/')}`, { recursive: true });
    fs.writeFileSync(`${baseDestination}${directories.join('/')}${filename}`, content, { flag: 'w+' });
  } else {
    fs.writeFileSync(`${baseDestination}${filename}`, content);
  }

};

const getStaticContent = async (collection) => {
  // dependiendo de la coleccion
  const url = `${host}items/${collection}?fields=${config.static.fields[collection]}`;
  await axios.get(url)
    .then((response) => response.data)
    .catch(function (error) {
      console.log('error: ', error.response.statusText);
    })
    .then((content) => {
      if (content) {
        try {
          fs.rmSync(`${config.static.exportDir}${collection}/`, { recursive: true });
        } catch (error) {
          console.log(`${collection} has no folder`);
        }
        console.log('Founded: ', content.data.length, 'elements in collection', collection);
        content.data.forEach(element => {
          const { url } = element;
          if (url) {
            const contentToFile = JSON.stringify(element);
            writeContentToFile({
              url,
              content: contentToFile,
              collection,
            });
          }
        });
        console.log('File for collection ', collection);
        const baseDestination = `${config.static.exportDir}${collection}.json`;
        fs.writeFileSync(baseDestination, JSON.stringify(content.data), { flag: 'w+' });
      }
    });
};


const collections = config.static.collections;
collections.forEach((el, index) => {
  console.log(`Downloading -> ${el} ... ${index + 1} of ${collections.length}`);
  getStaticContent(el);
});
