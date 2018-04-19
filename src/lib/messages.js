// Prepare bot replies

// Make this a class?
/**
 * Class for constructing CogniCity bot messages
 * @class Messages
 * @param {Object} properties - class properties
 * @param {Object} properties.config - bot configuration object
 * @param {Object} properties.language - bot language object 
 */
export default class Messages {
  /**
   * Constructor for Messages class
   * @param {*} properties - class properties
   */
  constructor(properties) {
    this.config = properties.config;
    this.language = properties.config.language;
  }

  /**
   * Construct default message
   * @param {Object} properties - properties for message
   * @param {String} properties.userLanguage - user language code
   * @return {String} - message to send
   */
  default (properties) {
    let response = this.language[this.config.defaultLanguage].texts.default;
    if (properties.userLanguage in this.language) {
      response = this.language[properties.userLanguage].texts.default;
    }
    return response;
  }

  /**
   * Construct card message
   * @param {Object} properties - properties for message
   * @param {String} properties.userLanguage - user language code
   * @param {String} properties.cardId - card ID
   * @return {String} - message to send
   */
  card (properties) {
    let response = this.language[this.config.defaultLanguage].texts.card;
    if (properties.userLanauge in this.language) {
      response = this.language[properties.userLanguage].texts.card + this.config.CARDS_URL + properties.cardId;
    }
    return response;
  }

  /**
   * Construct thanks message
   * @param {Object} properties - properties for message
   * @param {String} properties.userLanguage - user language code
   * @param {String} properties.regionName - region name for map link
   * @param {String} properties.reportId - report ID
   * @return {String} - message to send
   */
  thanks(properties) {
    let response = this.language[this.config.defaultLanguage].texts.thanks;
    if (properties.userLanguage in this.language) {
      response = this.language[properties.userLanguage].texts.thanks + this.config.MAP_URL + properties.regionName + '/?id=' + properties.reportId;
    }
    return response;
  }
}