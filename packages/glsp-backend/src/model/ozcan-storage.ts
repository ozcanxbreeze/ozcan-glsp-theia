import { AbstractJsonModelStorage, MaybePromise, RequestModelAction, SaveModelAction } from "@eclipse-glsp/server-node"
import { Model } from './ozcan-model'
import {OzcanModelState} from './ozcan-model-state'

import {inject, injectable} from 'inversify'

@injectable()
export class OzcanStorage extends AbstractJsonModelStorage {
    @inject(OzcanModelState)
    protected override modelState: OzcanModelState;

    loadSourceModel(action: RequestModelAction): MaybePromise<void> { 
        const sourceUri = this.getSourceUri(action);
        const model = this.loadFromFile(sourceUri, Model.is);
        this.modelState.model = model;
    }
 
    saveSourceModel(action: SaveModelAction): MaybePromise<void> {
        const sourceUri = this.getFileUri(action);
        this.writeFile(sourceUri, this.modelState.model);
    }
}