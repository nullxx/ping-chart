const path = require('path');
const { menubar } = require('menubar');
require('dotenv').config();

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