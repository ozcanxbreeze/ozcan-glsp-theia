import { GModelIndex } from '@eclipse-glsp/server-node';
import { injectable } from 'inversify';
import { Model, Nobe } from './ozcan-model';

@injectable()
export class OzcanModelIndex extends GModelIndex {
    protected nobeIndex = new Map<string, Nobe>();

    indexNobeList(model: Model): void {
        model.nobes.forEach(nobe => this.nobeIndex.set(nobe.id, nobe));
    }

    findNobe(id: string): Nobe | undefined {
        return this.nobeIndex.get(id);
    }
}
