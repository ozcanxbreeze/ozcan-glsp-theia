// Here the model gets specified. 

import { AnyObject } from '@eclipse-glsp/server-node';

export interface Model {
    id: string;
    nobes : Nobe[];
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
    attributes?: Array<Attribute>;
}

export interface Attribute {
    id: string;
    name: string;
}

export namespace Nobe{
    export function is(object: any): object is Nobe{
        return AnyObject.is(object);
    }
}