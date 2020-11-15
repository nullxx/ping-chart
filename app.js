const path = require('path');
const { menubar } = require('menubar');
require('dotenv').config({ path: '.env.example' }); // for building at github actions

const iconPath = path.join(__dirname, 'assets', '16x16.png');

const mb = menubar({
  browserWindow: {
    webPreferences: {
      nodeIntegration: true
    },
  },
  icon: iconPath,
  dir: 'src/views'
});

mb.on('ready', () => {
  console.log('¡App ready!');
});