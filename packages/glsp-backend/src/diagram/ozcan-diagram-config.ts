// Stores the options for the diagram and all the subjects

import { DefaultTypes, DiagramConfiguration, EdgeTypeHint, GModelElementConstructor, ServerLayoutKind, ShapeTypeHint, getDefaultMapping } from "@eclipse-glsp/server-node";
import { injectable } from 'inversify';

@injectable()
export class OzcanDiagramConfig implements DiagramConfiguration{    
    get typeMapping(): Map<string, GModelElementConstructor>{
        return getDefaultMapping()
    }

    get shapeTypeHints(): ShapeTypeHint[]{
        return [{elementTypeId: DefaultTypes.NODE, deletable: true, reparentable: false, repositionable: true, resizable: true}]
    }

    get edgeTypeHints(): EdgeTypeHint[] {
        return [];
    }

    layoutKind: ServerLayoutKind.MANUAL;
    needsClientLayout = true;
    animatedUpdate = true;
}