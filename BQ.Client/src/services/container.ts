import { Container } from "inversify";
import { AppStore } from "../layout/AppStore";



const ServiceContainer = new Container();

ServiceContainer.bind(AppStore).toSelf().inSingletonScope();

export {ServiceContainer}