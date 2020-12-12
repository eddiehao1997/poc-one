export interface Door {
    id: number;
    name: string;
    data: {
        length: number;
        height: number 
    }
}

export interface Window {
    id: number;
    name: string;
    data: {
        length: number;
        height: number 
    }
}

export interface Wall {
    id: number;
    name: string;
    data:{
        thickness: number; 
        totLengh: number;
        beamDepth: number;
        depUnderBoard: number;
        preDeductable: {
            beamLengh: number;
            marginalHeight: number
        },
        doorAndWindow: {
            totalSize: number;
            windowsDetail: Window[];
            doorDetail: Door[]
        }
    } 
}

export interface Building {
    id: number;
    name: string;
    data:{
        walls: Wall[]
    }
}