require('dotenv').config({ path: '.env' })
const http = require('http')
const https = require('https')
const Stream = require('stream').Transform

const {
  fs, axios, config, host
} =  require('./_conf');

const saveImageToFile = async ({
  imageid,
  format,
  name,
  title = 'untitled',
}) => {
  const {
    width,
    height,
    fit,
  } = config.images.sizes.find(el => el.name === name);
  const miau = config.images.sizes.find(el => el.name === name);
  let params = `format=${format}`;
  if (width) {
    params += `&width=${width}`;
  }
  if (height) {
    params += `&height=${height}`;
  }
  if (height) {
    params += `&fit=${fit}`;
  }
  const url = `${host}assets/${imageid}?${params}`;

  let client = http
  if (url.toString().indexOf('https') === 0) {
    client = https
  }

  await client.request(url, function (response) {
    const data = new Stream()
    response.on('data', function (chunk) {
      data.push(chunk)
    })
    response.on('end', function () {
      console.log(` - ${title}.${format} downloaded`);
      fs.writeFileSync(`${config.images.exportDir}/${imageid}/${name}.${format}`, data.read());
    })
  }).end()
};

const getAllImages = async () =>  {
  const url = `${host}files/?fields=${config.images.fields.join(',')}`;
  await axios.get(url)
    .then((response) => response.data)
    .catch(function (error) {
      console.log('error: ', error.response.statusText);
    })
    .then((content) => {
      if (content) {
        fs.rmSync(`${config.images.exportDir}/`, { recursive: true });
        fs.mkdirSync(`${config.images.exportDir}/`, { recursive: true });
        fs.writeFileSync(`${config.images.exportDir}/files.json`, JSON.stringify(content.data));
        const sizes = config.images.sizes.map((el) => el.name);
        const formats = config.images.formats;
        content.data.forEach(el => {
          fs.mkdirSync(`${config.images.exportDir}/${el.id}/`, { recursive: true });
          console.log(` - Downloading file -> ${el.title}`);
          formats.forEach(format => {
            sizes.forEach(async name => {
              await saveImageToFile({
                imageid: el.id,
                format,
                name,
                title: el.title,
              })
            })
          });
        });
      }
    });
}

getAllImages();
