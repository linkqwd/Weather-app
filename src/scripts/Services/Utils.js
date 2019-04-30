export default class Utils {
  static getTimeFromEpoch(
    arg,
    params = { hour: 'numeric', minute: 'numeric', hour12: false }
  ) {
    const date = new Date(arg * 1000);
    return date.toLocaleString('en-GB', params);
    // https://learn.javascript.ru/intl#intl-datetimeformat
  }
}
