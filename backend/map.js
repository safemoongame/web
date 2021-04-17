const Jimp = require('jimp');
const fs = require('fs');

fs.readFile('map.data', async (err, data) => {
  const map = JSON.parse(data);
  const image = new Jimp(map.length * 20, map.length * 20);
  const background = await Jimp.read('./files/background.png');
  const available = await Jimp.read('./files/available.png');
  const premium = await Jimp.read('./files/premium.png');
  const unavailable = await Jimp.read('./files/unavailable.png');

  const lineLeft = await Jimp.read('./files/lineleft.png');
  const lineRight = await Jimp.read('./files/lineright.png');
  const lineTop = await Jimp.read('./files/linetop.png');
  const lineBottom = await Jimp.read('./files/linebottom.png');  

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map.length; x++) {
      switch (map[y][x]) {
        case 1:
          image.composite(available, x * 20, y * 20);
          break;
        case 2:
          image.composite(unavailable, x * 20, y * 20);
          break;
        case 3:
          image.composite(premium, x * 20, y * 20);
          break;
        default:
          image.composite(background, x * 20, y * 20);
      }
      if (map[y][x]) {
        if (x - 1 < 0 || !map[y][x-1]) {
          image.composite(lineLeft, x * 20, y * 20);
        }        
        if (x + 1 > map.length || !map[y][x+1]) {
          image.composite(lineRight, x * 20, y * 20);
        }

        if (y - 1 < 0 || !map[y-1][x]) {
          image.composite(lineTop, x * 20, y * 20);
        }        
        if (y + 1 > map.length || !map[y+1][x]) {
          image.composite(lineBottom, x * 20, y * 20);
        }        
      }
    }
  }
  image.write('./files/large.png');
});