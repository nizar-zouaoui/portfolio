export interface DataTableColumn<T> {
  title: string;
  selector?: KeyOfNestedObjectWithoutArray<T>;
  cell?: (item: T) => React.ReactNode;
  sortable?: boolean;
}
type Prev = [never, 0, 1, 2, 3, 4, 5, ...0[]];

type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${"" extends P ? "" : "."}${P}`
    : never
  : never;

export type KeyOfNestedObject<T, D extends number = 3> = [D] extends [never]
  ? never
  : T extends object
    ? T extends Date
      ? ""
      : {
          [K in keyof T]: T[K] extends Array<any>
            ? K extends string
              ? `${K}`
              : ""
            : Join<K, KeyOfNestedObject<T[K], Prev[D]>>;
        }[keyof T]
    : "";

export type KeyOfNestedObjectWithoutArray<T, D extends number = 3> = [
  D,
] extends [never]
  ? never
  : T extends object
    ? {
        [K in keyof T]: Join<K, KeyOfNestedObject<T[K], Prev[D]>>;
      }[keyof T]
    : "";
