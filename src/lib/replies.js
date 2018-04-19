/**
 * Class for constructing CogniCity bot messages
 * @class Messages
 */
export default class Replies {
  /**
   * Constructor for Messages class
   * @param {Object} config - class configuration
   * @param {String} config.cardsUrl - client endpoint for cards
   * @param {String} config.DEFAULT_LANGUAGE - bot messages object
   * @param {Object} config.MESSAGES - bot messages object

   */
  constructor(config) {
    this.cardsUrl = config.CARDS_URL;
    this.defaultLanguage = config.DEFAULT_LANGUAGE;
    this.mapUrl = config.MAP_URL;
    this.messages = config.MESSAGES;
  }

  /**
   * Construct default message
   * @param {Object} properties - properties for message
   * @param {String} properties.language - user language code
   * @return {String} - message to send
   */
  default(properties) {
    let response = this.messages[this.defaultLanguage].texts.default;

    if (properties.language in this.messages) {
      response = this.messages[properties.language].texts.default;
    }
    return response;
  }

  /**
   * Construct card message
   * @param {Object} properties - properties for message
   * @param {String} properties.language - user language code
   * @param {String} properties.cardId - card ID
   * @return {String} - message to send
   */
  card(properties) {
    let response = this.messages[this.defaultLanguage].texts.card +
      this.cardsUrl +properties.cardId;

    if (properties.language in this.messages) {
      response = this.messages[properties.language].texts.card +
        this.cardsUrl + properties.cardId;
    }
    return response;
  }

  /**
   * Construct thanks message
   * @param {Object} properties - properties for message
   * @param {String} properties.language - user language code
   * @param {String} properties.regionName - region name for map link
   * @param {String} properties.reportId - report ID
   * @return {String} - message to send
   */
  thanks(properties) {
    let response = this.messages[this.defaultLanguage].texts.thanks +
    this.mapUrl + properties.regionName +
    '/?id=' + properties.reportId;

    if (properties.language in this.messages) {
      response = this.messages[properties.language].texts.thanks +
        this.mapUrl + properties.regionName +
        '/?id=' + properties.reportId;
    }
    return response;
  }
}
