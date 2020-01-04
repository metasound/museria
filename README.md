# [Museria](https://github.com/ortexx/museria/) [alpha]

Museria is a decentralized music storage based on [spreadable](https://github.com/ortexx/spreadable/), [storacle](https://github.com/ortexx/storacle/) and [metastocle](https://github.com/ortexx/metastocle/).

```javascript
const Node = require('museria').Node;

(async () => {  
  try {
    const node = new Node({
      port: 4000,
      hostname: 'localhost',
      initialNetworkAddress: 'localhost:4000'
    });
    await node.init();
  }
  catch(err) {
    console.error(err.stack);
    process.exit(1);
  }
})();
```

```javascript
const Client = require('museria').Client;
const utils = require('museria/src/utils');

(async () => {  
  try {
    const client = new Client({
      address: 'localhost:4000'
    });
    await client.init();
    const fullTitle = 'Artist - Title';

    // Prepare the song tags
    await utils.addSongTags('./audio.mp3', {
      fullTitle,
      APIC: './cover.jpg'
    });

    // Add the song
    await client.addSong('./audio.mp3');

    // Get the song info
    const info = await client.getSong(title);

    // Get the song audio link
    const audioLink = await client.getSongAudioLink(title);

    // Get the song cover link
    const coverLink = await client.getSongCoverLink(title);
    
    // Remove the song
    await client.removeSong(title);
  }
  catch(err) {
    console.error(err.stack);
    process.exit(1);
  }
})();
```

## Browser client
You can also use the client in a browser. Look at the description of the [spreadable](https://github.com/ortexx/spreadable/) library. In window you  have __window.ClientMuseria__ instead of __window.ClientSpreadable__. The prepared file name is __museria.client.js__.

## How it works

The mechanism of the library is very similar to [storacle](https://github.com/ortexx/storacle/). The only difference is that the key to the file is the name of the song, not the hash. Also, a unique song is considered not with the full title match, but the percentage of coincidence set in the options.  

## What are the requirements

Currently only mp3 format is supported. The tags are id3, based on the [node-id3](https://github.com/Zazama/node-id3). 
TPE1 and TIT2 tags are required to store the song. You can use setter __fullTitle__ as __TPE1 - TIT2__ when you set the tags using __utils__. It must be a valid combination for __utils.isSongTitle()__ function. Also, the network may have its own cover size requirements. The number of songs that can be added to one node is configurable as well. 

## Where to use it

### 1. Wherever songs need to be stored decentralized
For example, we can collect all the music on the planet together in [one place](https://github.com/ortexx/museria-global/), but in a decentralized way with the ability to access it at any time.

### 2. For own needs
You can use it to store music as you like.

### 3. Serverless solutions
Since the library is written in javascript, you can receive / send / work with songs in the browser and do not use server code at all. In some cases, it can be very convenient.