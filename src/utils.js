import NodeID3 from "node-id3";
import fse from "fs-extra";
import pick from "lodash-es/pick.js";
import utilsStoracle from "storacle-ms/src/utils.js";
import utilsMetastocle from "metastocle-ms/src/utils.js";
import emojiStrip from "emoji-strip";
import mm from "music-metadata";
import base64url from "base64url";

const utils = Object.assign({}, utilsStoracle, utilsMetastocle);
utils.regexSongLinks = /(([a-z]+:\/\/)?[-\p{L}\p{N}]+\.[\p{L}]{2,}|[a-z]+:\/\/(\[:*[\w\d]+:[\w\d:]+\]|\d+\.[\d.]+))\S*/igu;
utils.regexSongFeats = /[([\s]+((ft\.|feat\.)[\s]+((?!(\s+[-([)\]]+))[^)\]])+)\s*[)\]]*([\s]+[-([]+|$)/iu;
utils.heritableSongTags = [
  'TALB', 'TCOM', 'TCON', 'TCOP', 'TDAT', 'TEXT', 'TIT1', 'TIT3', 'TLAN',
  'TOAL', 'TOLY', 'TOPE', 'TORY', 'TPE2', 'TPE3', 'TPE4', 'APIC'
];

/**
 * Class to handle music document.
 */
utils.MusicDocumentsHandler = class extends utils.DocumentsHandler {
  $mus(value, filter) {
    return utils.getSongSimilarity(value, filter.value, { min: filter.similarity, beautify: filter.beautify }) >= filter.similarity;
  }
  $art(value, filter) {
    filter = filter.toLowerCase();
    const artists = utils.getSongArtists(value);
    return !!artists.find(a => a.toLowerCase() == filter);
  }
  $milk(value, filter) {
    if (/^\s*[(]?(feat[.]?|remix?)\s*$/i.test(filter)) {
      return false;
    }
    return this.$ilk(value, filter);
  }
};

/**
 * @see utilsStoracle.getFileInfo
 */
utils.getFileInfo = async function () {
  const info = await utilsStoracle.getFileInfo.apply(this, arguments);
  info.ext == 'mpga' && (info.ext = 'mp3');
  return info;
};

/**
 * Check the link is valid as an audio
 *
 * @see utilsStoracle.isValidFileLink
 */
utils.isValidSongAudioLink = function (link) {
  if (typeof link != 'string' || !link.split('?')[0].match(/\.(mp3|mpeg|mpga)$/i)) {
    return false;
  }

  return this.isValidFileLink(link, { action: 'audio' });
};

/**
 * Check the link is valid as a cover
 *
 * @see utilsStoracle.isValidFileLink
 */
utils.isValidSongCoverLink = function (link) {
  if (typeof link != 'string' || !link.split('?')[0].match(/\.(jpe?g|png|jfif|webp)$/i)) {
    return false;
  }

  return this.isValidFileLink(link, { action: 'cover' });
};

/**
 * Prepare the string to find songs
 *
 * @param {string} str
 * @returns {string}
 */
utils.prepareSongFindingString = function (str) {
  if (typeof str != 'string') {
    return '';
  }

  str = this.prepareComparisonSongTitle(str, { beautify: false })
    .trim()
    .replace(/[–—]+/g, '-')
    .replace(/[\sᅠ]+/g, ' ');
  return str;
};

/**
 * Split the song title
 *
 * @param {string} title
 * @returns {string[]}
 */
utils.splitSongTitle = function (title) {
  if (typeof title != 'string') {
    return ['', ''];
  }

  const delim = ' - ';
  const arr = title.split(delim);
  return [arr[0], arr.slice(1).join(delim)];
};

/**
 * Beautify the song title
 *
 * @param {string} title
 * @returns {string}
 */
utils.beautifySongTitle = function (title) {
  if (typeof title != 'string') {
    return '';
  }

  title = emojiStrip(title)
    .replace(/[–—]+/g, '-')
    .replace(this.regexSongLinks, '')
    .replace(/[\sᅠ]+/g, ' ')
    .replace(/([([])\s+/g, '$1')
    .replace(/\s+([)\]])/g, '$1')
    .replace(/([([]+)(featuring|feat|ft)(\s)/ig, '$1feat.$3')
    .replace(/([([\s]+)(feat\.|ft\.)(\s)/ig, '$1feat.$3')
    .toLowerCase();
  
  if (!/[^\s]+ - [^\s]+/.test(title)) {
    return '';
  }

  const arr = title.split(/\(?feat\./i);
  
  if (arr.length > 2) {
    arr.splice(2, arr.length - 2);
    title = arr.join('(feat.').trim();
  }

  const sides = this.splitSongTitle(title);
  let artists = sides[0].split(/,[\s]*/);
  const mainArtist = artists[0];
  artists.shift();
  
  if (!mainArtist) {
    return '';
  }

  const match = sides[1].match(this.regexSongFeats);
  let feats = (match ? match[1] : '').replace(/,([^\s])/, ', $1').trim();
  title = `${mainArtist} - ${sides[1]}`;
  title = title.replace(this.regexSongFeats, '$5');
  feats && (artists = artists.concat(feats.replace(/feat\./i, '').split(',')));
  artists = [...new Set(artists.map(a => a.trim()).filter(v => v))];
  
  if (artists.length) {
    feats = `feat. ${artists.join(', ')}`;
  }

  feats && (title += ` (${feats})`);
  title = title
    .replace(/\[\]|\(\)/g, '')
    .replace(/\s+/g, ' ')
    .split(' ')
    .map(p => p ? (p[0].toUpperCase() + p.slice(1)) : p)
    .join(' ')
    .trim();
  return title;
};

/**
 * Prepare a comparison song title
 *
 * @param {string} title
 * @returns {string}
 */
utils.prepareComparisonSongTitle = function (title, options = {}) {
  if (typeof title != 'string') {
    return '';
  }

  options.beautify !== false && (title = this.beautifySongTitle(title));
  return this.stringifyNumbers(this.normalizeString(title));
};

/**
 * Check it is a right song title
 *
 * @param {string} title
 * @param {object} [options]
 * @returns {boolean}
 */
utils.isSongTitle = function (title, options = {}) {
  if (options.beautify || options.beautify === undefined) {
    title = this.beautifySongTitle(title);
  }

  if (typeof title != 'string' || Buffer.byteLength(title) > 1024) {
    return false;
  }

  return /.\s+-\s+./.test(title);
};

/**
 * Get the song name
 *
 * @param {string} title
 * @param {object} [options]
 * @returns {string}
 */
utils.getSongName = function (title, options = {}) {
  if (options.beautify || options.beautify === undefined) {
    title = this.beautifySongTitle(title);
  }

  if (!this.isSongTitle(title, { beautify: false })) {
    return '';
  }

  return (this.splitSongTitle(title)[1] || '').replace(this.regexSongFeats, '$5').trim();
};

/**
 * Get the song artists
 *
 * @param {string} title
 * @param {object} [options]
 * @returns {string[]}
 */
utils.getSongArtists = function (title, options = {}) {
  if (options.beautify || options.beautify === undefined) {
    title = this.beautifySongTitle(title);
  }

  if (!this.isSongTitle(title, { beautify: false })) {
    return [];
  }

  const sides = this.splitSongTitle(title);
  let artists = sides[0].split(/,/);
  const match = title.match(this.regexSongFeats);
  let feats = (match ? match[1] : '').replace(/^feat\./i, '');
  return [...new Set(artists.concat(feats.split(',')).map(v => v.trim()).filter(v => v))];
};

/**
 * Get the song similarity
 *
 * @param {string} source
 * @param {string} target
 * @param {object} [options]
 * @returns {float}
 */
utils.getSongSimilarity = function (source, target, options = {}) {
  const tp = options.titlePriority || 0.5;
  
  if (options.beautify || options.beautify === undefined) {
    source = this.beautifySongTitle(source);
    target = this.beautifySongTitle(target);
  }

  source = source.toLowerCase();
  target = target.toLowerCase();
  
  if (!source || !target) {
    return 0;
  }

  const min = options.min || 0;
  const mcoef = (min - 0.5) / 0.5;
  const sourceName = this.getSongName(source, { beautify: false });
  const targetName = this.getSongName(target, { beautify: false });
  const t = this.getStringSimilarity(sourceName, targetName, { min: mcoef });
  
  if (min && !t) {
    return 0;
  }

  const sourceArtists = this.getSongArtists(source, { beautify: false });
  const targetArtists = this.getSongArtists(target, { beautify: false });
  const sources = sourceArtists.join(',');
  const targets = targetArtists.join(',');
  const a = this.getStringSimilarity(sources, targets);
  const res = (t * (1 + tp) + a * (1 - tp)) / 2;
  return res >= min ? res : 0;
};

/**
 * Create the song tags
 *
 * @param {object} [tags]
 * @returns {object}
 */
utils.createSongTags = function (tags = {}) {
  const obj = {};
  const self = this;
  Object.defineProperty(obj, 'fullTitle', {
    enumerable: false,
    get: function () {
      return `${this.TPE1 || ''} - ${this.TIT2 || ''}`;
    },
    set: function (val) {
      const title = self.beautifySongTitle(val);
      
      if (!title) {
        delete this.TPE1;
        delete this.TIT2;
        return;
      }

      const arr = self.splitSongTitle(title);
      this.TPE1 = arr[0];
      this.TIT2 = arr[1];
    }
  });

  for (let key in tags) {
    obj[key] = tags[key];
  }

  return obj;
};

/**
 * Merge the song tags
 *
 * @param {object} source
 * @param {object} dest
 * @returns {object}
 */
utils.mergeSongTags = function (source, dest) {
  source = this.createSongTags(source);
  dest = this.createSongTags(dest);
  const sourceTitle = source.fullTitle;
  const destTitle = dest.fullTitle;
  const sourceObj = Object.assign({}, source, { fullTitle: sourceTitle });
  const destObj = Object.assign({}, dest, { fullTitle: destTitle });
  const obj = Object.assign({}, pick(sourceObj, this.heritableSongTags), destObj);
  return this.createSongTags(obj);
};

/**
 * Prepare the song tags to get
 *
 * @async
 * @param {object} tags
 * @returns {object}
 */
utils.prepareSongTagsToGet = async function (tags) {
  tags = this.createSongTags(tags);
  
  if (tags.APIC && typeof tags.APIC == 'object' && !Buffer.isBuffer(tags.APIC)) {
    tags.APIC = tags.APIC.imageBuffer;
  }

  return tags;
};

/**
 * Prepare the song tags to set
 *
 * @async
 * @param {object} tags
 * @returns {object}
 */
utils.prepareSongTagsToSet = async function (tags) {
  tags = this.createSongTags(tags);
  
  if (tags.image) {
    tags.APIC = tags.image;
    delete tags.image;
  }

  if (this.isFileReadStream(tags.APIC)) {
    tags.APIC.destroy();
    tags.APIC = tags.APIC.path;
  }

  if (typeof Blob == 'function' && tags.APIC instanceof Blob) {
    tags.APIC = await this.blobToBuffer(tags.APIC);
  }

  return tags;
};

/**
 * Prepare the song Blob file
 *
 * @async
 * @param {Buffer} buffer
 * @param {Blob|File} blob
 * @returns {Blob|File}
 */
utils.prepareSongBlobFile = async function (buffer, blob) {
  const opts = { type: blob.type };
  return blob instanceof File ? new File([buffer], blob.name, opts) : new Blob([buffer], opts);
};

/**
 * Get the song tags
 *
 * @async
 * @param {string|Buffer|fse.ReadStream|Blob} file
 * @returns {object}
 */
utils.getSongTags = async function (file) {
  if (typeof Blob == 'function' && file instanceof Blob) {
    file = await this.blobToBuffer(file);
  }

  if (Buffer.isBuffer(file)) {
    const tags = NodeID3.read(file);
    return await this.prepareSongTagsToGet(tags ? tags.raw : {});
  }

  return new Promise((resolve, reject) => {
    NodeID3.read(file.path || file, async (err, tags) => {
      if (err) {
        return reject(err);
      }
      resolve(await this.prepareSongTagsToGet(tags.raw || {}));
    });
  });
};

/**
 * Get the song tags
 *
 * @async
 * @param {string|Buffer|fse.ReadStream|Blob} file
 * @param {object} tags
 * @returns {string|Buffer|fse.ReadStream|Blob}
 */
utils.setSongTags = async function (file, tags) {
  tags = await this.prepareSongTagsToSet(tags);
 
  if (typeof Blob == 'function' && file instanceof Blob) {
    const buffer = NodeID3.write(tags, await this.blobToBuffer(file));
    return this.prepareSongBlobFile(buffer, file);
  }

  if (Buffer.isBuffer(file)) {
    return NodeID3.write(tags, file);
  }

  return new Promise((resolve, reject) => {
    NodeID3.write(tags, file.path || file, (err) => {
      if (err) {
        return reject(err);
      }

      if (file.path) {
        file.destroy();
        file = fse.createReadStream(file.path);
      }
      resolve(file);
    });
  });
};

/**
 * Add the song tags
 *
 * @async
 * @param {string|Buffer|fse.ReadStream|Blob} file
 * @param {object} tags
 * @returns {string|Buffer|fse.ReadStream|Blob}
 */
utils.addSongTags = async function (file, tags) {
  tags = await this.prepareSongTagsToSet(tags);
  
  if (typeof Blob == 'function' && file instanceof Blob) {
    const buffer = NodeID3.update(tags, await this.blobToBuffer(file));
    return this.prepareSongBlobFile(buffer, file);
  }

  if (Buffer.isBuffer(file)) {
    return NodeID3.update(tags, file);
  }

  return new Promise((resolve, reject) => {
    NodeID3.update(tags, file.path || file, (err) => {
      if (err) {
        return reject(err);
      }

      if (file.path) {
        file.destroy();
        file = fse.createReadStream(file.path);
      }

      resolve(file);
    });
  });
};

/**
 * Remove the song
 *
 * @async
 * @param {string|Buffer|fse.ReadStream|Blob} file
 * @returns {string|Buffer|fse.ReadStream|Blob}
 */
utils.removeSongTags = async function (file) {
  if (typeof Blob == 'function' && file instanceof Blob) {
    const buffer = NodeID3.removeTagsFromBuffer(await this.blobToBuffer(file));
    return this.prepareSongBlobFile(buffer, file);
  }

  if (Buffer.isBuffer(file)) {
    return NodeID3.removeTagsFromBuffer(file);
  }

  return new Promise((resolve, reject) => {
    NodeID3.removeTags(file.path || file, (err) => {
      if (err) {
        return reject(err);
      }

      if (file.path) {
        file.destroy();
        file = fse.createReadStream(file.path);
      }
      resolve(file);
    });
  });
};

/**
 * Get the song metadata
 *
 * @async
 * @param {string|Buffer|fse.ReadStream|Blob} file
 * @returns {object}
 */
utils.getSongMetadata = async function (file) {
  if (typeof Blob == 'function' && file instanceof Blob) {
    file = await this.blobToBuffer(file);
  }

  if (utils.isFileReadStream(file)) {
    file = file.path;
  }

  const data = await mm[typeof file == 'string' ? 'parseFile' : 'parseBuffer'](file, { duration: true });
  return data.format;
};

/**
 * Encode the song title
 *
 * @param {string} title
 * @returns {string}
 */
utils.encodeSongTitle = function (title) {
  return base64url(title);
};

/**
 * Decode the song title
 *
 * @param {string} title
 * @returns {string}
 */
utils.decodeSongTitle = function (title) {
  return base64url.decode(title);
};

/**
 * Check the value is a valid song priority
 *
 * @param {*} title
 * @returns {boolean}
 */
utils.isValidSongPriority = function (value) {
  return [0, 1, -1].includes(value);
};

/**
 * Calculate two strings similarity
 *
 * @param {string} first
 * @param {string} second
 * @param {object} [options]
 * @param {number} [options.min]
 * @param {boolean} [options.ignoreOrder]
 *
 * @returns {number}
 */
utils.getStringSimilarity = function (first, second, options = {}) {
  const min = options.min || 0;
  let short = first;
  let long = second;

  if (second.length < first.length) {
    short = second;
    long = first;
  }

  long = long.toLowerCase().split('');
  short = short.toLowerCase().split('');
  const coef = Math.sqrt(short.length * long.length);
  let matches = 0;

  for (let i = 0; i < short.length; i++) {
    let index = -1;
    let dist = 0;

    while (dist < long.length) {
      if (long[i + dist] === short[i]) {
        index = i + dist;
        break;
      }
      else if (long[i - dist] === short[i]) {
        index = i - dist;
        break;
      }
      dist++;
    }

    if (index != -1) {
      let coef = 1;
      !options.ignoreOrder && (coef = 1 - Math.abs(index - i) / short.length);
      matches += coef;
      long[index] = undefined;
    }

    const res = short.length + matches - i - 1;
    
    if (res / coef < min) {
      return 0;
    }
  }

  return matches / coef;
};

/**
 * Normalize the string
 *
 * @param {string} str
 * @returns {string}
 */
utils.normalizeString = function (str) {
  return str.normalize("NFD").replace(/(?!\^)\p{Diacritic}/gu, "");
};

/**
 * Stringfy numbers in the string
 *
 * @param {string} str
 * @returns {string}
 */
utils.stringifyNumbers = function (str) {
  const arr = [
    'zero', 'one', 'two', 'three', 'four',
    'five', 'six', 'seven', 'eight', 'nine'
  ];
  return str.replace(/[0-9]{1}/g, m => arr[+m]);
};

export default utils;
