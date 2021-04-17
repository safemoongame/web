const express = require('express');
const router = express.Router();
const fs = require('fs');
const Jimp = require('Jimp');

const imageDir = '/Users/bmorrise/Documents/safemoon/web/backend/files';

router.get('/api/minimap', (req, res) => {
  // Load this from GCS (Google Cloud Storage) Bucket
  res.sendFile(imageDir + '/map.png');
});

router.get('/api/largemap', (req, res) => {
  // Load this from GCS (Google Cloud Storage) Bucket
  res.sendFile(imageDir + '/large.png');
});

router.get('/api/map', (req, res) => {
  fs.readFile('map.data', (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({status: 'Error loading map'});
    }
    if (data != '') {
      return res.json(JSON.parse(data));
    }
    return res.status(200).send();
  });
});

const drawLine = (image, x1, y1, x2, y2) => {
  for (var y = y1; y < y1; y++) {

  }
}

router.post('/api/map', (req, res) => {
  const map = req.body;

  const image = new Jimp(map.length * 2, map.length * 2);

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === 1) {
        image.setPixelColor(0x787878ff, j * 2, i * 2);
        image.setPixelColor(0x787878ff, j * 2 + 1, i * 2 + 1);
        image.setPixelColor(0x787878ff, j * 2, i * 2 + 1);
        image.setPixelColor(0x787878ff, j * 2 + 1, i * 2);
      }
      if (map[i][j] === 2) {
        console.log('2');
        image.setPixelColor(0xadd8e6ff, j * 2, i * 2);
        image.setPixelColor(0xadd8e6ff, j * 2 + 1, i * 2 + 1);
        image.setPixelColor(0xadd8e6ff, j * 2, i * 2 + 1);
        image.setPixelColor(0xadd8e6ff, j * 2 + 1, i * 2);
      }
      if (map[i][j] === 3) {
        console.log('3');
        image.setPixelColor(0xb2b200ff, j * 2, i * 2);
        image.setPixelColor(0xb2b200ff, j * 2 + 1, i * 2 + 1);
        image.setPixelColor(0xb2b200ff, j * 2, i * 2 + 1);
        image.setPixelColor(0xb2b200ff, j * 2 + 1, i * 2);
      }
    }
  }
  image.write(imageDir + '/map.png');

  fs.writeFile('map.data', JSON.stringify(req.body), err => {
    if (err) {
      console.log(err);
      return res.status(500).json({status: 'Error saving map'});
    }
    res.json({status: 'success'});
  });
});

module.exports = router;
