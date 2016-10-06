// flow-typed signature: b4226cf30275bf70a3290b2b33b01451
// flow-typed version: 5e1c1576ae/uuid-js_v0.7.x/flow_>=v0.23.x

declare module 'uuid-js' {
  declare class UUID<V: 1|4> {
    fromParts(timeLow: mixed, timeMid: mixed, timeHiAndVersion: mixed, clockSeqHiAndReserved: mixed, clockSeqLow: mixed, node: mixed): mixed;
    hex: string;
    toBytes(): mixed[];
    toString(): string;
    toURN(): string;
    version: V;
  }
  declare function create(): UUID<1>;
  declare function create<V: 1|4>(version: V): UUID<V>;
  declare function firstFromTime(time: number): UUID<1>;
  declare function fromBinary(binary: mixed): UUID<*>;
  declare function fromBytes(bytes: number[]): UUID<*>;
  declare function fromURN(string: string): UUID<*>;
  declare function lastFromTime(time: number): UUID<1>;
}
