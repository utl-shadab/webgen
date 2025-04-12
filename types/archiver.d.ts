declare module 'archiver' {
  import { PassThrough } from 'stream';
  
  interface ArchiverOptions {
    zlib?: {
      level?: number;
    };
    store?: boolean;
  }
  
  interface Entry {
    name: string;
    type: string;
    date: Date;
    mode: number;
    prefix?: string;
    sourcePath: string;
    stats: {
      size: number;
    };
  }
  
  interface ArchiverProgressData {
    entries: {
      total: number;
      processed: number;
    };
    fs: {
      totalBytes: number;
      processedBytes: number;
    };
  }
  
  interface Archiver extends PassThrough {
    abort(): this;
    append(source: NodeJS.ReadableStream | Buffer | string, name?: string): this;
    directory(dirpath: string, destpath: string | false): this;
    file(filepath: string, options: string | { name: string }): this;
    finalize(): Promise<void>;
    on(event: 'close' | 'end', listener: () => void): this;
    on(event: 'data', listener: (data: Buffer) => void): this;
    on(event: 'entry', listener: (entry: Entry) => void): this;
    on(event: 'error', listener: (err: Error) => void): this;
    on(event: 'progress', listener: (progress: ArchiverProgressData) => void): this;
    on(event: 'warning', listener: (err: Error) => void): this;
    on(event: string, listener: (...args: any[]) => void): this;
    pointer(): number;
  }
  
  function archiver(format: string, options?: ArchiverOptions): Archiver;
  
  export = archiver;
}