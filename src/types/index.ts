
export type Coordinates = {
    latitude: string;
    longitude: string;
}

export type ISSApiRes = {
    iss_position: Coordinates;
    timestamp: number;
    message: string;
}

export type IssLocation = {
    latitude: string;
    longitude: string;
    timestamp: number;
    id?: number;
   
}

