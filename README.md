# Battery Charge Limiter for Lenovo V15 Gen2
This is an alternative for the Lenovo Vantage app on Windows platform. Battery conservation mode can be activated/deactivated from the system tray.

## Requierements for Ubuntu 22:04
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

## Install on Ubuntu 22:04

```bash
cd out/make/deb/x64
```
```bash
sudo dpkg -i lenovo-acpi_x.x.x_amd64.deb
```

## LICENSE
MIT