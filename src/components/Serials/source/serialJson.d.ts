export interface serialsJson {
    bbt: Series[],
    himym: Series[],
    simpsons: Series[]
}

export interface Series {
    number: number;
    parts: SerialPart[];
}

export interface SerialPart {
    name: string,
    number: number,
    link: string
}