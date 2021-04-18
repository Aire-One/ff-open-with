# ff-open-with

A Firefox extension to open URLs with external programs instead of new tab.

_This extension is based on [openwith developed by darktrojan](https://github.com/darktrojan/openwith)._

# Development

```sh
git clone <this-repo>
cd ff-open-with

# Install the add-on
ln -sv $(realpath .) <your-firefox-profile>/extensions/ff-open-with@example.org

# Install the native app
sudo ln -sv $(realpath native/open_program.json) /usr/lib/mozilla/native-messaging-hosts/open_program.json

# Make sure the native app has execution permission
chmod -v +x native/open_program.py
```

You can also install the add-on from `about:debugging` using the "Load Temporary Add-on" button.
