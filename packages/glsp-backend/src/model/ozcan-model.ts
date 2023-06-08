// Here the model gets specified. 

import { AnyObject } from '@eclipse-glsp/server-node';

export interface Model {
    id: string;
    nodes : Nobe[];
    // edges : Edge[];
}

export namespace Model {
    export function is(object: any): object is Model{
        return AnyObject.is(object)
    }
}

export interface Nobe{
    id: string;
    name: string;
    position: {x: number; y: number};
    size: {width : number; height: number};
}

export namespace Nobe{
    export function is(object: any): object is Nobe{
        return AnyObject.is(object);
    }
}