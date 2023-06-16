import { LabelProvider } from '@theia/core/lib/browser';
import { inject, injectable } from '@theia/core/shared/inversify';
import { FileSelection } from '@theia/filesystem/lib/browser/file-selection'
import { FileStat } from '@theia/filesystem/lib/common/files'
import { PropertyDataService } from '@theia/property-view/lib/browser/property-data-service'

export interface FileInfoPropertyObject {
    name: string;
    isDirectory: boolean;
}

@injectable()
export class FileInfoPropertyDataService implements PropertyDataService {

    readonly id = 'fileinfo';
    readonly label = 'FileInfoPropertyDataService';

    @inject(LabelProvider) protected readonly labelProvider: LabelProvider;

    canHandleSelection(selection: Object | undefined): number {
        return this.isFileSelection(selection) ? 1 : 0;
    }

    private isFileSelection(selection: Object | undefined): boolean {
        return !!selection && Array.isArray(selection) && FileSelection.is(selection[0]);
    }

    async providePropertyData(selection: Object | undefined): Promise<FileInfoPropertyObject | undefined> {
        if (this.isFileSelection(selection) && Array.isArray(selection)) {
            return {
                name: this.labelProvider.getName(selection[0].fileStat.resource),
                isDirectory: (selection[0].fileStat as FileStat).isDirectory
            };
        }
        return Promise.reject();
    }
}