import database from "spreadable-ms/src/db/transports/database/index.js";

const Database = database();

export default (Parent) => {
  /**
   * Database transport interface
   */
  return class DatabaseMuseria extends (Parent || Database) {
    /**
     * @async
     * @param {string} title
     * @returns {object}
     */
    async getMusicByPk() {
      throw new Error('Method "getMusicByPk" is required for database transport');
    }

    /**
     * @async
     * @param {string} hash
     * @returns {object}
     */
    async getMusicByFileHash() {
      throw new Error('Method "getMusicByFileHash" is required for database transport');
    }

    /**
     * @async
     * @param {string} hash
     */
    async removeMusicByFileHash() {
      throw new Error('Method "removeMusicByFileHash" is required for database transport');
    }
  };
};
