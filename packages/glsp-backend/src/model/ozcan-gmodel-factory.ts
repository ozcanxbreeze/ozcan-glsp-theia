import { GCompartment, GGraph, GLabel, GModelFactory, GNode } from '@eclipse-glsp/server-node';
import { inject, injectable } from 'inversify';
import { OzcanModelState } from './ozcan-model-state';
import { Nobe } from './ozcan-model';

@injectable()
export class OzcanGmodelFactory implements GModelFactory{
    
    @inject(OzcanModelState)
    protected modelState: OzcanModelState;
    
    createModel(): void {
        const model = this.modelState.model;
        this.modelState.index.indexNobeList(model);

        const gNobes = model.nobes.map(nobe => this.createNobe(nobe))
        const newRoot = GGraph.builder().id(model.id).addChildren(gNobes).build();
        this.modelState.updateRoot(newRoot);
    }

    protected createNobe(nobe: Nobe): GNode{
        const builder = GNode.builder() //
            .id(nobe.id)
            .addCssClass('nobe-node')
            .add(GLabel.builder().text(nobe.name).id(`${nobe.id}_label`).build())
            .layout('vbox')
            .addLayoutOption('paddingLeft', 5)
            .position(nobe.position);

        if (nobe.size) {
            builder.addLayoutOptions({ prefWidth: nobe.size.width, prefHeight: nobe.size.height });
        }

        const attributes = this.buildAttributes(nobe)
        builder.add(attributes);

        return builder.build();
    }

    buildAttributes(nobe: Nobe): GCompartment{
        const compartment = GCompartment.builder().layout("vbox");
        const attributes = nobe.attributes? nobe.attributes : [];

        for(const [index, attribute] of attributes.entries()){
            compartment.add(
                GLabel.builder().text(attribute.name).id(`${nobe.id}_attributes${index}`).build()
            )
        }


        return compartment.build();
    }
}