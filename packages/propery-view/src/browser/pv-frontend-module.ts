import { ContainerModule } from '@theia/core/shared/inversify';
import { PropertyDataService } from '@theia/property-view/lib/browser/property-data-service'
import { FileInfoPropertyDataService } from '../common/custom-data-service';
import { PropertyViewWidgetProvider } from '@theia/property-view/lib/browser/property-view-widget-provider';
import { FileInfoPropertyViewWidgetProvider } from './custom-content-widget';
import { AlwaysWidgetProvider } from './always-property-widget';

export default new ContainerModule((bind, _unbind, _isBound, rebind) => {
    bind(PropertyDataService).to(FileInfoPropertyDataService).inSingletonScope();
    bind(PropertyViewWidgetProvider).to(FileInfoPropertyViewWidgetProvider).inSingletonScope();

    bind(PropertyViewWidgetProvider).to(AlwaysWidgetProvider).inSingletonScope();
});