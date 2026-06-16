declare module 'vis-network' {
  export class Network {
    constructor(container: HTMLElement, data: any, options?: any);
    setData(data: any): void;
    destroy(): void;
  }
}
