import { BindingTarget, DiagramConfiguration, DiagramModule, GModelFactory, ModelState, SourceModelStorage } from "@eclipse-glsp/server-node";
import { DIAGRAM } from '@ozcan/global'
import { OzcanDiagramConfig } from "./ozcan-diagram-config";


export class OzcanDiagramModule extends DiagramModule{
    readonly diagramType = DIAGRAM.DIAGRAM_TYPE;

    protected bindDiagramConfiguration(): BindingTarget<DiagramConfiguration> {
        return OzcanDiagramConfig;
    }

    protected bindSourceModelStorage(): BindingTarget<SourceModelStorage> {
        throw new Error("Method not implemented.");
    }
    protected bindModelState(): BindingTarget<ModelState> {
        throw new Error("Method not implemented.");
    }
    
    protected bindGModelFactory(): BindingTarget<GModelFactory> {
        throw new Error("Method not implemented.");
    }

}