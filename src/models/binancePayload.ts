const payload: any = {
    e: "Event type",  // Event type
    E: "Event time",     // Event time
    s: "Symbol",      // Symbol
    p: "Price change",      // Price change
    P: "Price change percent",      // Price change percent
    w: "Weighted average price",      // Weighted average price
    x: "First trade(F)-1 price",      // First trade(F)-1 price (first trade before the 24hr rolling window)
    c: "Last price",      // Last price
    Q: "Last quantity",          // Last quantity
    b: "Best bid price",      // Best bid price
    B: "Best bid quantity",          // Best bid quantity
    a: "Best ask price",      // Best ask price
    A: "Best ask quantity",         // Best ask quantity
    o: "Open price",      // Open price
    h: "High price",      // High price
    l: "Low price",      // Low price
    v: "Total traded base asset volume",       // Total traded base asset volume
    q: "Total traded quote asset volume",          // Total traded quote asset volume
    O: "Statistics open time",             // Statistics open time
    C: "Statistics close time",      // Statistics close time
    F: "First trade ID",             // First trade ID
    L: "Last trade Id",         // Last trade Id
    n: "Total number of trades",          // Total number of trades
    T: 'Kline close time',
    t: 'Kline start time',
    V: 'Taker buy base asset volume',
    i: "Interval",      // Interval
    f: "First trade ID",       // First trade ID


}
const klinePayload: any = {
    t: "Kline start time", // Kline start time
    T: "Kline close time", // Kline close time
    s: "Symbol",  // Symbol
    i: "Interval",      // Interval
    f: "First trade ID",       // First trade ID
    L: "Last trade ID",       // Last trade ID
    o: "Open price",  // Open price
    c: "Close price",  // Close price
    h: "High price",  // High price
    l: "Low price",  // Low price
    v: "Base asset volume",    // Base asset volume
    n: "Number of trades",       // Number of trades
    x: "Is this kline closed?",     // Is this kline closed?
    q: "Quote asset volume",  // Quote asset volume
    V: "Taker buy base asset volume",     // Taker buy base asset volume
    Q: "Taker buy quote asset volume",   // Taker buy quote asset volume
    B: "Ignore"   // Ignore
}
export { payload, klinePayload };


