import { BindingTarget, DiagramConfiguration, DiagramModule, GModelFactory, GModelIndex, InstanceMultiBinding, ModelState, OperationHandlerConstructor, SourceModelStorage } from "@eclipse-glsp/server-node";
import { DIAGRAM } from '@ozcan/global'
import { OzcanDiagramConfig } from "./ozcan-diagram-config";
import { injectable } from 'inversify'
import { OzcanStorage } from "../model/ozcan-storage";
import { OzcanModelState } from "../model/ozcan-model-state";
import { OzcanGmodelFactory } from "../model/ozcan-gmodel-factory";
import { OzcanModelIndex } from "../model/ozcan-model-index";
import { CreateNobeHandler } from "../handler/create-nobe-handler";

@injectable()
export class OzcanDiagramModule extends DiagramModule{
    readonly diagramType = 'ozcan-diagram';

    protected bindDiagramConfiguration(): BindingTarget<DiagramConfiguration> {
        return OzcanDiagramConfig;
    }

    protected bindSourceModelStorage(): BindingTarget<SourceModelStorage> {
        return OzcanStorage;
    }

    protected bindModelState(): BindingTarget<ModelState> {
        return OzcanModelState;
    }
    
    protected bindGModelFactory(): BindingTarget<GModelFactory> {
        return OzcanGmodelFactory;
    }

    protected override bindGModelIndex(): BindingTarget<GModelIndex> {
        this.context.bind(OzcanModelIndex).toSelf().inSingletonScope();
        return {service: OzcanModelIndex};
    }

    
    protected override configureOperationHandlers(binding: InstanceMultiBinding<OperationHandlerConstructor>): void {
        super.configureOperationHandlers(binding);
        binding.add(CreateNobeHandler);
    }

}