import { Nobe } from '@ozcan/glsp-backend/lib/model/ozcan-model'
import { inject, injectable } from '@theia/core/shared/inversify';
import { PropertyDataService } from '@theia/property-view/lib/browser/property-data-service';
import { isSprottySelection } from '@eclipse-glsp/theia-integration';
import { OzcanModelState } from '@ozcan/glsp-backend/lib/model/ozcan-model-state'

export interface AttributePropertyObject {
    id: string;
    uri: string;
    nobe: Nobe;
}

export interface NobeSelection {
    selectedElementsIDs: Array<string>;
    widgetId: string; 
    sourceUri: string;
    additionalSelectionData? :string;
}

@injectable()
export class AttributeDataService implements PropertyDataService {
    id = "attributes-info";
    label = "AttributeDataService" ;

    @inject(OzcanModelState)
    modelState : OzcanModelState;

    canHandleSelection(selection: NobeSelection | undefined): number {
        if (selection) {
            delete selection.additionalSelectionData;
        }

        return isSprottySelection(selection) ? 1 : 0;
    }

    providePropertyData(selection: NobeSelection | undefined): Promise<Object | undefined> {
        if (selection ) {
            delete selection.additionalSelectionData;    
        }else{
            return Promise.reject();
        }
        
        const nobe =  this.modelState.index.findNobe(selection.selectedElementsIDs[0])

        if (isSprottySelection(selection)){
            console.log("ikbenhier")

            const result =  {
                id : "test",
                uri : "test1234",
                nobe : nobe
            }

            return Promise.resolve(result);
        } else {
            return Promise.reject();
        }
    }

}