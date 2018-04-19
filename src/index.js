import axios from 'axios';
import regions from './lib/regions';
import Cards from './lib/cards';
import Messages from './lib/messages';
/**
 * Class for constructing CogniCity chatbot messages
 * @class Bot
 * @param {Object} config - Bot parameters
 * @return {Object} Function methods
 **/
// TODO - document bot params
/**
 * Bot class - Prepated statements for CogniCity chatbot
 * @class Bot
 */
export default class Bot {
  /**
   * constructor for class Bot
   * @param {Object} config - bot parameters
   */
  constructor(config) {
    // Config
    this.config = config;

    // Setup language and messaging
    this.config.language = JSON.parse(config.language);
    this.messages = new Messages(config);

    // Cards class for handling card requests
    this.cards = new Cards(config);

    // Regions constants for replies
    this.regions = regions;

    // External libs
    this.axios = axios;
    }

  /**
   * sendCard - Method to send report card to Telegram user
   * @method sendCard
   * @param {Object} properties - properties of message to send
   * @param {String} properties.userId - User ID or chat ID to send message to
   * @param {String} properties.language - Language of response
   * @param {String} properties.network - Network for response
   * @return {String} Message to send
   */
  card(properties) {
    return new Promise((resolve, reject) => {
      // Get a card id
    this.cards.getCardId(properties)
    .then((cardId) => {
        // Build the response
    properties.cardId = cardId;
        const message = this.messages.card(properties);
        // Return the message
        resolve(message);
      }).catch((err) => {
        reject(err);
        });
    });
  }

  /**
   * sendThanks - Method to send report link to Telegram user
   * @method sendThanks
   * @param {Object} properties - properties of message to send
   * @param {String} properties.userId - User ID or chat ID to send message to
   * @param {String} properties.reportId - Report identifier for uniquie link
   * @param {String} properties.language - Language of response
   * @param {String} properties.instanceRegionCode - CogniCity region code
   * @return {Promise} Result of _sendMessage request
   */
  thanks(properties) {
    return new Promise((resolve, reject) =>{
      const region = this.regions(properties.instanceRegionCode);
      if (region === null) reject(new Error(`Instance region not found`));
      else {
        const message = this.messages.thanks(properties.language,
          properties.reportId, region);
        resolve(message);
      }
    });
  }

  /**
   * sendDefault - Method to send default message Telegram user
   * @method sendDefault
   * @param {Object} properties - properties of message to send
   * @param {String} properties.userId - User ID or chat ID to send message to
   * @param {String} properties.language - Language of response
   * @return {Promise} Result of _sendMessage request
   */
  default(properties) {
    return new Promise((resolve, reject) => {
      const message = this.messages.default(properties.language);
      resolve(message);
    });
  }
}
