export class toolbox {
  generatePassword() {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }
    return password;
  }

  public static calculateGrandTotal(transactions, property) {
    let grandTotal = 0;

    for (let i = 0; i < transactions?.length; i++) {
      grandTotal += transactions[i][property];
    }

    return grandTotal;
  }

  public static isJwtExpired(tokens: number): boolean {
    const date: Date = new Date(tokens * 1000);
    const parsedDate = Date.parse(date.toString());
    if (parsedDate - Date.now() > 0) {
      return false;
    } else {
      return true;
    }
  }

  public static getSerializeData(data: any[]) {
    const serializeData = data?.sort((a, b) => a.serial - b.serial);
    return serializeData;
  }

  public static getSerializeDataById(data: any[]) {
    const serializeData = data?.sort((a, b) => a.id - b.id);
    return serializeData;
  }

  static isNullOrUndefined(value: any): boolean {
    return value === null || value === undefined;
  }

  public static isValidArray(value: any): boolean {
    return Array.isArray(value) && value.length > 0;
  }

  public static isValidObject(value: any): boolean {
    return typeof value === 'object' && value !== null;
  }

  public static toSafeValue(value: any): any {
    if (toolbox.isNotEmpty(value)) {
      return value;
    }
    return '';
  }

  public static randomString(length: number, type: 'lower' | 'upper' | 'numeric'): string {
    let result = '';
    const characters =
      type === 'lower'
        ? 'abcdefghijklmnopqrstuvwxyz'
        : type === 'upper'
        ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        : type === 'numeric'
        ? '0123456789'
        : 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  public static isValidString(value: any): boolean {
    return typeof value === 'string' && value.length > 0;
  }

  public static isValidNumber(value: any): boolean {
    return typeof value === 'number' && !isNaN(value);
  }

  public static isValidBoolean(value: any): boolean {
    return typeof value === 'boolean';
  }

  //is not empty
  public static isNotEmpty(value: any): boolean {
    return value !== null && value !== undefined && value !== '' && value.length !== 0;
  }

  public static toNumber(value: any): number {
    return Number(value);
  }

  //safety convert to number
  public static toSafeNumber(value: any): number {
    if (toolbox.isNotEmpty(value)) {
      return Number(value);
    }
    return 0;
  }

  //safety convert to string
  public static toSafeString(value: any): string {
    if (toolbox.isNotEmpty(value)) {
      return value.toString();
    }
    return '';
  }

  public static toSafeObject(value: any): any {
    if (toolbox.isNotEmpty(value)) {
      return value;
    }
    return {};
  }

  //safety convert to boolean
  public static toBooleanSafe(value: any): boolean {
    if (toolbox.isNotEmpty(value)) {
      return value.toString() === 'true';
    }
    return false;
  }

  public static findMax(array: number[]): number {
    return Math.max.apply(Math, array);
  }

  public static findMin(array: number[]): number {
    return Math.min.apply(Math, array);
  }

  public static findAverage(array: number[]): number {
    let sum = 0;
    for (const value of array) {
      sum += value;
    }
    return sum / array.length;
  }

  public static findMedian(array: number[]): number {
    const sorted = array.sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  }

  public static isEmpty(value: any): boolean {
    return (
      value === null ||
      value === undefined ||
      value === '' ||
      (Array.isArray(value) && value.length === 0) ||
      value === 'null' ||
      value === 'undefined'
    );
  }

  //to safe array
  public static toSafeArray(value: any): any[] {
    if (toolbox.isNotEmpty(value)) {
      return value;
    }
    return [];
  }

  public static toCleanObject(obj: { [key: string]: any }): any {
    if (toolbox.isValidObject(obj)) {
      Object.keys(obj).forEach((key) => {
        if (toolbox.isEmpty(obj[key])) {
          delete obj[key];
        }
      });
    }
    return toolbox.toSafeObject(obj);
  }

  // params query normalize to url query
  public static toQueryString(params: any): string {
    if (toolbox.isValidObject(params)) {
      return Object.keys(params)
        .map((key) => {
          return key + '=' + params[key];
        })
        .join('&');
    }
    return '';
  }

  public static queryNormalizer = (options: any) => {
    const pureOption = toolbox.toCleanObject(options);

    if (pureOption?.query) {
      return options.query;
    }
    const queries: any = [];
    Object.entries(pureOption).map(([key, value]: any) => {
      const valueType = Array.isArray(value) ? 'array' : typeof value;
      if (valueType === 'array' || key === 'filter' || key === 'sort') {
        return value.map((fOption) => {
          return queries.push(`${key}=${fOption}`);
        });
      } else if (valueType === 'object') {
        return queries.push(`${key}=${JSON.stringify(value)}`);
      } else {
        return queries.push(`${key}=${value}`);
      }
    });
    return queries.join('&');
  };

  // is valid browser url
  public static isValidBrowserUrl(url: string): boolean {
    // check is string
    if (typeof url !== 'string') {
      return false;
    }
    return url?.startsWith('http://') || url?.startsWith('https://');
  }

  // check url ending extension
  public static isValidSvgUrl(url: string): boolean {
    // check is string
    if (typeof url !== 'string') {
      return false;
    }
    return url?.toLocaleLowerCase()?.endsWith('.svg');
  }

  // amount prefix with currency symbol
  public static amountPrefixWithCurrencySymbol = (amount: number, currencySymbol: string = '৳'): string => {
    return currencySymbol + toolbox.toSafeNumber(amount);
  };

  // purify data if json stringfy object
  public static jsonParser = (data: any): any => {
    const r = toolbox.isJsonString(data);
    return r ? JSON.parse(data) : data;
  };

  // is json string
  public static isJsonString = (str: string): boolean => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };

  // clean svg code from xml version tag
  public static cleanSvgCode = (svgCode: string): string => {
    return svgCode.replace(/<\?xml[^>]*>/g, '');
  };
}
