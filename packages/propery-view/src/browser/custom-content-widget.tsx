import { ReactWidget } from "@theia/core/lib/browser";
import { PropertyDataService } from '@theia/property-view/lib/browser/property-data-service'
import { PropertyViewContentWidget } from '@theia/property-view/lib/browser/property-view-content-widget'
import { DefaultPropertyViewWidgetProvider } from '@theia/property-view/lib/browser/property-view-widget-provider'
import { FileInfoPropertyObject } from "../common/custom-data-service";  
import { FileSelection } from '@theia/filesystem/lib/browser/file-selection'
import * as React from '@theia/core/shared/react';
import { injectable } from "@theia/core/shared/inversify";

export class FileInfoPropertyViewWidget extends ReactWidget implements PropertyViewContentWidget {

    static readonly ID = 'file-info-property-view';
    static readonly LABEL = 'File Information';

    protected currentFileInfo: FileInfoPropertyObject;

    constructor() {
        super();
        this.id = FileInfoPropertyViewWidget.ID;
        this.title.label = FileInfoPropertyViewWidget.LABEL;
        this.title.caption = FileInfoPropertyViewWidget.LABEL;
        this.title.closable = false;
        this.node.tabIndex = 0;
    }

    updatePropertyViewContent(): void {
        this.update();
    }

    protected render(): React.ReactNode {
        return (
            <div>
                {`Selected node in explorer: ${this.currentFileInfo.name} ${this.currentFileInfo.isDirectory ? '(Directory)' : '(File)'}`}
            </div>)
        ;
    }
}


@injectable()
export class FileInfoPropertyViewWidgetProvider extends DefaultPropertyViewWidgetProvider {

    override readonly id = 'fileinfo';
    override readonly label = 'FileInfoPropertyViewWidgetProvider';

    private fileInfoWidget: FileInfoPropertyViewWidget;

    constructor() {
        super();
        this.fileInfoWidget = new FileInfoPropertyViewWidget();
    }

    override canHandle(selection: Object | undefined): number {
        console.log(Object)

        return this.isFileSelection(selection) ? 1 : 0;
    }

    private isFileSelection(selection: Object | undefined): boolean {
        return !!selection && Array.isArray(selection) && FileSelection.is(selection[0]);
    }

    override provideWidget(selection: Object | undefined): Promise<FileInfoPropertyViewWidget> {
        return Promise.resolve(this.fileInfoWidget);
    }

    override updateContentWidget(selection: Object | undefined): void {
        this.getPropertyDataService(selection).then(service => this.fileInfoWidget.updatePropertyViewContent(service, selection));
    }
}