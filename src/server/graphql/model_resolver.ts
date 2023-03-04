export type GraphQLModelResolver<T> = {
  [P in keyof T as T[P] extends object ? P : never]?: (parent: T) => T[P] | Promise<T[P]>;
};
