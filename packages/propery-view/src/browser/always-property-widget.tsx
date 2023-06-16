import { ReactWidget } from "@theia/core/lib/browser";
import { PropertyDataService } from '@theia/property-view/lib/browser/property-data-service'
import { PropertyViewContentWidget } from '@theia/property-view/lib/browser/property-view-content-widget'
import { DefaultPropertyViewWidgetProvider } from '@theia/property-view/lib/browser/property-view-widget-provider'
import { FileInfoPropertyObject } from "../common/custom-data-service";  
import { FileSelection } from '@theia/filesystem/lib/browser/file-selection'
import * as React from '@theia/core/shared/react';
import { injectable } from "@theia/core/shared/inversify";

export class AlwaysWidget extends ReactWidget implements PropertyViewContentWidget {

    static readonly ID = 'always-property-view';
    static readonly LABEL = 'Always info';

    protected currentFileInfo: FileInfoPropertyObject;

    constructor() {
        super();
        this.id = AlwaysWidget.ID;
        this.title.label = AlwaysWidget.LABEL;
        this.title.caption = AlwaysWidget.LABEL;
        this.title.closable = false;
        this.node.tabIndex = 0;
    }

    updatePropertyViewContent(propertyDataService?: PropertyDataService, selection?: Object | undefined): void {

        if (propertyDataService) {
            propertyDataService.providePropertyData(selection).then((fileInfo) => this.currentFileInfo = fileInfo as FileInfoPropertyObject);
        }
        
        this.update();
    }

    protected render(): React.ReactNode {
        return (
            <div>
                Test123
            </div>)
        ;
    }
}


@injectable()
export class AlwaysWidgetProvider extends DefaultPropertyViewWidgetProvider {

    override readonly id = 'Always';
    override readonly label = 'AlwaysPropertyViewWidgetProvider';

    private alwaysWdiget: AlwaysWidget;

    constructor() {
        super();
        this.alwaysWdiget = new AlwaysWidget();
    }

    override canHandle(selection: Object | undefined): number {
        return !this.isFileSelection(selection) ? 1 : 0;
    }

    private isFileSelection(selection: Object | undefined): boolean {
        return !!selection && Array.isArray(selection) && FileSelection.is(selection[0]);
    }

    override provideWidget(selection: Object | undefined): Promise<AlwaysWidget> {
        return Promise.resolve(this.alwaysWdiget);
    }

    override updateContentWidget(selection: Object | undefined): void {
        this.getPropertyDataService(selection).then(service => this.alwaysWdiget.updatePropertyViewContent(service, selection));
    }
}