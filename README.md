# YouTube Quiet Ads

Hide midroll ads on YouTube.

## What's this?

First of all, this is **not and adblocker**. It does not block ads, **it only hides the screen** when ads are playing. YouTube is currently fighting against adblockers more then ever, so this extension serves as a less convenient, but more reliable alternative.  
Since only the stylesheets are modified, YouTube shouldn't notice this extension and show that annoying popup.

This extension continuously checks if a YouTube advertisement is playing and if so, hides and mutes the video player until the ad is over. If the ad is skippable, a _Skip_ button will appear as soon as the ad starts. Unfortunately, due to YouTube's elaborate defenses, it is not possible to click this button automatically, however you don't need to wait 5 seconds for it to show up.

**This extension is compatible with existing adblockers**. You can use it as a fallback if your adblocker fails to block an ad (as is often the case with [AdBlock](https://getadblock.com/en/)).

## Installation

1. Download the extension `.zip` file from the [releases page](https://github.com/Mirrrek/youtube-quiet-ads/releases)
2. Extract the contents into a folder
3. Open the Chrome Extensions page `chrome://extensions` and enable _Developer mode_ (using the toggle in the top right corner)
4. Click on _Load unpacked_ in the top left corner and select the folder you extracted the contents to
5. In a new tab, open [YouTube](https://www.youtube.com) and click on a video with ads to see if the extension was installed successfully

To enable the extension in _Incognito mode_, toggle the option in the _Details_ page accessible from the extension's card on the Chrome Extensions page.

## Building

To build the extension, make sure `npm` is installed. Then run the following commands in the terminal:

1. Install the dependencies:
    ```bash
    npm i
    ```
2. Build in development mode (watch mode):
    ```bash
    npm run dev
    ```
3. Build in production mode:
    ```bash
    npm run build
    ```

Output files will be placed in the `dist` folder.
