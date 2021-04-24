# ff-open-with

A Firefox extension to open URLs with external programs instead of new tab.

_This extension is based on [openwith developed by darktrojan](https://github.com/darktrojan/openwith)._

# Install

## Build

_This step is optional, you can download the zip file from the github releases_

```sh
# Clone the repo
git clone git@github.com:Aire-One/ff-open-with.git
cd ff-open-with

# [OPTIONAL] Use the correct version Node.js and npm versions with nvm
nvm use

# Install node dependencies
npm install

# Build the extension zip
npm run build
```

## Install the extension

To install this extension, you can install the zip file generated by the previous step. Go to the Firefox "Manage Your Extensions" menu (Ctrl+Shift+A) the click on the option/wheal button and select the "Install Add-on From File..." option.

Alternatively, you can install the add-on from `about:debugging` using the "Load Temporary Add-on" button.

## Install the native part

If you didn't already have cloned this repository, `git clone` then `cd` it!

Alternatively, you can simply download the files from the `native` directory (`native/open_program.json` and `native/open_program.py`)

```sh
# Install the add-on
#ln -sv $(realpath .) <your-firefox-profile>/extensions/ff-open-with@example.org

# Edit the path property
vim native/open_program.json

# Make sure the native app has execution permission
chmod -v +x native/open_program.py

# Install the native application manifest
sudo ln -sv $(realpath native/open_program.json) /usr/lib/mozilla/native-messaging-hosts/open_program.json
# OR
ln -sv $(realpath native/open_program.json) ~/.
```
