class Storage {
  public set(name: string, value: string): void {
    const str = this.encode(value) || '';
    localStorage.setItem(name, str);
  }

  public get(name: string): string {
    const pair = localStorage.getItem(name) || '';
    return this.decode(pair);
  }

  public remove(name: string): void {
    localStorage.removeItem(name);
  }

  private encode(value: string): string {
    try {
      return encodeURIComponent(value);
    } catch (e) {
      console.log('error `encode(%o)` - %o', value, e);
    }

    return '';
  }

  private decode(value: string): string {
    try {
      return decodeURIComponent(value);
    } catch (e) {
      console.log('error `encode(%o)` - %o', value, e);
    }

    return '';
  }
}

export default new Storage();
