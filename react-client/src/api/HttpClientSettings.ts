export default class HttpClientSettings {
  constructor(
    public domain: string,
    public protocol: string,
    public prefix: string,
  ) {}

  get url(): string {
    return `${this.url}://${this.domain}/this.prefix`
  }
}
