# 📡 Service Layer

The service layer handles the interaction between the features of the application and the service providers. These providers may be internal (e.g. [Toast](https://primereact.org/toast/) message service) or external (e.g. REST API, internal storage). 

## Service Abstraction

Since there might be multiple providers for the same service and we could need to switch between providers we recommend to follow the **D** of the [SOLID](https://en.wikipedia.org/wiki/SOLID) principles and define interfaces for each one of the services and inject the implementation in running time.

The following diagram illustrates the dependency injection principle for a HTTP REST API service meant to use a `plant` endpoint to perform basic CRUD operations.

<img src="../../../img/service-injection.png" alt="5" style="zoom:40%;" />

The components should interact with the services using a custom hook to handle all the loading and error handling logic. To inject a service's implementation into a hook we have two possible approaches.

### Context & Providers

In a typical React application, data is passed top-down (parent to child) via props. Context is designed to share data that can be considered “global” (like a service :wink:) for a tree of React components. By using a [Provider](https://legacy.reactjs.org/docs/context.html#contextprovider) component we can pass an object to all of its children down the tree, this approach is specially useful if the service requires the existence of another component in the DOM tree like the [Toast message service]().

In that case we first defined our `MessageService` interface for said service without specifying any implementation details.

```typescript
// src/services/messages/types/messages.d.ts
export interface MessageService {
    show(message: Message): void;
}

export interface MessageServiceContextType {
    messageService?: MessageService;
}
```

Now, in order to use a toast we obviously need a [Toast](https://primereact.org/toast/) component to be present in the DOM, therefore the `ToastMessageService` implementation requires a reference to the toast component to be passed to its constructor. 

```typescript
// src/services/messages/classes/toast-message-service.ts
export class ToastMessageService implements MessageService {
    toast: RefObject<Toast | null>;

    constructor(toast: RefObject<Toast | null>) {
        this.toast = toast;
    }

    show(message: Message): void {
        this.toast.current?.show(message);
    }
}
```

Then we defined a `ToastMessageServiceProvider` component that should wrap the application component. This provider will render the toast component and use its reference to initialize a  `ToastMessageService` instace that will be passed down to the application tree using the context. 

```tsx
// src/services/messages/components/toast-message-service.provider.tsx
interface ToastMessageServiceProviderProps {
    children: ReactNode;
}

const ToastMessageServiceProvider : React.FC<ToastMessageServiceProviderProps> = 
      ({children}: ToastMessageServiceProviderProps) => 
      {
          const toast: RefObject<Toast | null> = useRef<Toast>(null);
          const messageService = new ToastMessageService(toast);

          return (
              <MessageServiceContext.Provider value={{ messageService }}>
                  <Toast ref={toast}></Toast>
                  {children}
              </MessageServiceContext.Provider>
          );
      };
```

Finally the `MessageService` object can be accessed using the `useContext` hook

```ts
const { messageService } = useContext(MessageServiceContext);
```

### Containers & [InversifyJS](https://github.com/inversify/InversifyJS)

An **Inversion of Control (IoC) container** is a tool that automatically manages object creation and dependency injection in an application. Instead of manually creating and wiring up dependencies, the container resolves and provides them where needed.

InversifyJS is a lightweight IoC container for TypeScript and JavaScript apps allowing us to write OOP code to manage the services and we can use this approach for any service that doesn't need to use an element from the DOM.

Like with the previous approach we need to define an interface without specifying any implementation details.

```ts
// src/features/text-search/services/text-search-service.ts
export interface ITextSearchService {
    search(query: string, messageService: MessageService): Promise<Monograph[]>;
}
```

Then you can implement your service and decorate it as `injectable` for inversify to be able to instantiate it.

```ts
// src/features/text-search/services/text-search-service.ts
@injectable()
export class TextSearchService
    extends BaseApiService
    implements ITextSearchService
{
    url: string = 'api/search';

    search(
        query: string,
        messageService: MessageService,
    ): Promise<Monograph[]> {
        return this.handleRequest(
            axios.get<Monograph[]>(`${this.url}/plants`, {
                params: { query: query },
            }),
            new BaseHttpResponsesHandler(messageService),
        );
    }
}
```

Once you have your interface and implementation we need to register them in the container. To do this we need to create a symbol for the interface (since TypeScript can't use reflection on interfaces), **please name this symbol the same as the interface**. Inversify supports different patterns of injection like singleton, transient and scoped, you can learn more about these patterns here. 

```ts
// src/services/injection/container.ts
const TYPES = {
    ITextSearchService: Symbol.for('ITextSearchService')
};

const ServiceContainer = new Container();
ServiceContainer.bind(TYPES.ITextSearchService).to(TextSearchService).inTransientScope();
```

Finally you can use it from your hook using the `get` method of the container to cast it to the interface

```typescript
const textSearchService = ServiceContainer.get<ITextSearchService>(TYPES.ITextSearchService);
```

## ✅ Conventions

- All files the files that contain a service must have a name ending with `service`
- For all the services that need a provider (and therefore components) please create a separate folder for it inside `src/services`
- All interface symbols used in Inversify must match the name of their interface.





