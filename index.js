const path = require('path');
const { menubar } = require('menubar');

const iconPath = path.join(__dirname, 'assets', '16x16.png');

const mb = menubar({
  browserWindow: {
    webPreferences: {
      nodeIntegration: true
    },
  },
  icon: iconPath,
});

mb.on('ready', () => {
  console.log('¡App ready!');
});