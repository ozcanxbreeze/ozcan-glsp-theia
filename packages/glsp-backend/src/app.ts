import {
    createAppModule,
    createSocketCliParser,
    LoggerFactory, 
    resolveAndCatch,
    ServerModule,
    SocketServerLauncher
} from '@eclipse-glsp/server-node';
import { Container } from 'inversify';
import { OzcanDiagramModule } from './diagram/ozcan-diagram-module';

export function launch(argv?: string[]): void {
    const options = createSocketCliParser().parse(argv);
    const appContainer = new Container();
    appContainer.load(createAppModule(options));

    const logger = appContainer.get<LoggerFactory>(LoggerFactory)('TaskListServerApp');
    const launcher = appContainer.resolve(SocketServerLauncher);
    const serverModule = new ServerModule().configureDiagramModule(new OzcanDiagramModule());

    const errorHandler = (error: any): void => logger.error('Error in workflow server launcher:', error);
    launcher.configure(serverModule);
    resolveAndCatch(() => launcher.start({ port: options.port, host: options.host }), errorHandler); 
}










