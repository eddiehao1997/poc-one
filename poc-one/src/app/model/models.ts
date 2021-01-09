export interface Door {
    id: number;
    name: string;
    count: number;
    data: {
        height: number;
        width: number 
    }
}

export interface Window {
    id: number;
    name: string;
    count: number;
    data: {
        height: number;
        width: number 
    }
}

export interface Wall {
    id: number;
    name: string;
    data: {
        thickness: number
    }
}

export interface WallTemp {
    id: number;
    name: string;
    data:{
        thickness: number; 
        totLengh: number;
        beamDepth: number;
        depUnderBoard: number;
        preDeductable: {
            beamLength: number;
            marginalHeight: number
        },
        doorAndWindow: {
            totalSize: number;
            windowsDetail: Window[];
            doorDetail: Door[]
        }
    } 
}

export interface Floor {
    id: number;
    name: string;
    data: {
        walls: WallTemp[]
    }
}

export interface Building {
    id: number;
    name: string;
    data:{
        floors: Floor[]
    }
}

export interface dataExchangeObj {
    data: []
}