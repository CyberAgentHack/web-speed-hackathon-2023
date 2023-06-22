declare module 'zipcode-ja' {
  export default Record<
    string,
    {
      zipcode: string;
      zipcodeOld: string;
      jisX0402: string;
      address: string[];
      ruby: string[];
      status: number[];
    }
  >;
}
