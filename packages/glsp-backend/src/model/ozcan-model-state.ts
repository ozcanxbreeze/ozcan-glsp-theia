import { DefaultModelState } from "@eclipse-glsp/server-node";
import { inject, injectable } from 'inversify';
import { Model } from "./ozcan-model";
import { OzcanModelIndex } from "./ozcan-model-index";

@injectable()
export class OzcanModelState extends DefaultModelState{
    @inject(OzcanModelIndex)
    override readonly index: OzcanModelIndex;
    protected _model: Model;

    get model(): Model {
        return this._model; 
    }

    set model(taskList: Model) {
        this._model
         = taskList;
        this.index.indexNobeList(taskList);
    }
}