export class Constants {
  private static instance: Constants;
  private constructor() {}

  static shared() {
    if (!Constants.instance) {
      Constants.instance = new Constants();
    }
    return Constants.instance;
  }

  private isLocal = location.host === localHost;

  public apiOrigin = this.isLocal
    ? 'http://localhost:8080'
    : 'https://reading-record-api-wxmmi.ondigitalocean.app';
}

const localHost = 'localhost:3000';
