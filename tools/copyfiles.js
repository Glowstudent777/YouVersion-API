const { execSync } = require('child_process');
const os = require('os');
const path = require('path');

function runCommand(command) {
  try {
    const result = execSync(command, { stdio: 'pipe' });
    if (result)
      console.log(result.toString());
  } catch (error) {
    console.error('Error executing command:', error);
    process.exit(1);
  }
}

function copyFilesWindows() {
  console.log('Copying files for Windows...');

  runCommand('mkdir dist\\api\\v1\\core\\db');

  runCommand('xcopy .\\src\\api\\v1\\core\\db\\ .\\dist\\api\\v1\\core\\db\\ /s /e');

  console.log('Files copied successfully for Windows.');
}

function copyFilesLinux() {
  console.log('Copying files for Linux...');

  runCommand('mkdir -p dist/api/v1/core/db');

  runCommand('cp -r ./src/api/v1/core/db/* ./dist/api/v1/core/db');

  console.log('Files copied successfully for Linux.');
}

function copyFilesMac() {
  console.log('Copying files for macOS...');

  runCommand('mkdir -p dist/api/v1/core/db');

  runCommand('cp -r ./src/api/v1/core/db/* ./dist/api/v1/core/db');

  console.log('Files copied successfully for macOS.');
}

function copyFiles() {
  const platform = os.type();

  switch (platform) {
    case 'Linux':
      copyFilesLinux();
      break;
    case 'Darwin':
      copyFilesMac();
      break;
    case 'Windows_NT':
      copyFilesWindows();
      break;
    default:
      console.error('Unsupported OS found: ' + platform);
      process.exit(1);
  }
}

copyFiles();
