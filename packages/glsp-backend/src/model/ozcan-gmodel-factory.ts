import { GGraph, GLabel, GModelFactory, GNode } from '@eclipse-glsp/server-node';
import { inject, injectable } from 'inversify';
import { OzcanModelState } from './ozcan-model-state';
import { Nobe } from './ozcan-model';

@injectable()
export class OzcanGmodelFactory implements GModelFactory{
    
    @inject(OzcanModelState)
    protected modelState: OzcanModelState;
    
    createModel(): void {
        const model = this.modelState.model;
        this.modelState.index.indexTaskList(model);

        const gNobes = model.nobes.map(nobe => this.createNobe(nobe))
        const newRoot = GGraph.builder().id(model.id).addChildren(gNobes).build();
        this.modelState.updateRoot(newRoot);
    }

    protected createNobe(nobe: Nobe): GNode{
        const builder = GNode.builder()
        .id(nobe.id)
        .add(GLabel.builder().text("test").id(`${nobe.id}_label`).build());
        
        return builder.build();
    }
}