# Battery Charge Limiter for Lenovo V15 Gen2
This is an alternative for the Lenovo Vantage app on Windows platform. Battery conservation mode can be activated/deactivated from the system tray.

![Screenshot from 2023-03-24 08-46-50](https://user-images.githubusercontent.com/104576153/227435554-895404ea-ecb0-4a17-825b-fcd7d783f782.png)


## Requirements for Ubuntu 22.04
```bash
sudo apt install build-essential rpm
```

## Build
```bash
npm install
```
```bash
npx electron-forge import
```
```bash
npm run make
```

## Install on Ubuntu 22.04

```bash
cd out/make/deb/x64
```
```bash
sudo dpkg -i lenovo-acpi_x.x.x_amd64.deb
```

## LICENSE
MIT!
