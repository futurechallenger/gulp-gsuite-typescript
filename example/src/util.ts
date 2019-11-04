
const REQUEST_HOST = 'https://www.someapi.com';
export const REQUEST_VERSION = '1.0';

class Utils {
  static composeName(action: string, name: string): string {
    return `${action}, ${name}`;
  }
}

export { Utils, REQUEST_HOST };
