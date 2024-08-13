//@ts-nocheck
// * Dependency Injection In Angular

// DI is a design pattern and mechanism for creating and delivering some parts of an app to other parts
// that require them

//Angular supports DI that helps increase flexibility and modularity
// In angular dependencies are typically services , but they also can be values such as strings or duntions

// An Application Injector (created during bootstrap) creates dependencies when needed using
// configured provider of the service or value

// The main roles in DI system; dependency consumer and dependency provider.

// Angular creates the interaction between consumer and provider using abstraction called Injector.
// When dependency is required the injector checks the registry and search abailable instaces.
// If not found , a new instance is created and stored in the registry. Angular creates an
// application-wide injector (also known as root injector) during bootstrap process.
// In most cases we dont need to manually create injectors but its good to know that there is
// a layer that connect providers and consumers.

//* Providing Dependency
// Lets assume we have a class HeroService, that needs to act as dependency in a component.
// The first step is to add @Injectable() decorator to show that the class can be injected.

@Injectable()
class HeroService {}

// the next step is to make it available in the DI by providing it. A dependency injection
// can be provided in multiple places:

// 1. Preffered: At the application root using provideIn //!SINGLETON
// 2. At the component level //! PER COMPONENT
// 3. At the application root level using ApplicationConfig
// 4. NgModule based applications //! PER MODULE

// * 1 - Provided in root
// allows injecting service into all other classes. Using providedIn enables Angular
// and JS code optimizers to effectively remove services that are unused (tree-shaking)

// Example:
@Injectable({
  providedIn: "root", //!SINGLETON
})
class HeroService {}

// When provide service at the root level Angualr create single shared instance of the HeroService

//* 2 Component level

// We can provide service at @Component level by using [providers] field ofthe @Component decorator
// In this case the HeroService becomes available to all instances of this component and directives used in the
// template

@Component({
  standalone: true,
  selector: "hero-list",
  template: "...",
  providers: [HeroService],
})
class HeroListComponent {}

// When register a provider at the component level we get a new instance of service with each
//new intance of that component (сервис пер компонент)

//! This approach disable tree-shaking

//* 3 Using ApplicationConfig
export const appConfig: ApplicationConfig = {
  providers: [{ provide: HeroService }],
};
// available for all components
//! This approach disable tree-shaking

//* NgModule based applications
// NgModule based applications sue the providers field of the @NgModule decorator to provide a service or other
// injectable abailable at application Level

// A service provided in module is available to all declarations of the module or to any other modules
// which share the same ModuleInjector

//! This approach disable tree-shaking

//* Injecting/consuming dependency

// Most common way to declare it in a class constructor.
@Component()
class HeroListComponent {
  constructor(private service: HeroService) {}
}
//OR use inject method
@Component()
class HeroListComponent {
  private service = inject(HeroService);
}

//todo DEPENDENCY PROVIDER
// Making dependency coinfiguration flexible

//* Provider Token
// If service class specified as the provider token, the default behaviour to create that clas
// using new Operator

// App provides a loger instance:
//app.component
providers: [Logger];

// However we can associate the Logger provider token with the different class
// so when the loger is injected, the configured value is used instead
//Angular expands the providers value in this case into a full provider object as follows:
[{ provide: Logger, useClass: Logger }];
//The expanded provider configuration is an object literal with two properties:
// Provide - holds the token that serves as the key for dependency value
// Second property is a provider definition object, which tells the injector how to create dependency value
// variations:
//1. useClass- tells to create a provided class when dependency is injected
//2. useExisting - reference to existing one
//3. useFactory - allows to define a function that constructs a dependency
//4. useValue - provides a static value that should be use as Dependency

//* useClass
//  provider key lets create and return a new instance of specified class
// [{ provide: Logger, useClass: BetterLogger }]
// it also has its own dependenies
[
  UserService, // dependency needed in `EvenBetterLogger`.
  { provide: Logger, useClass: EvenBetterLogger },
];

//* useExisting
//provider key lets you map one token to another. In effect, the first token is an alias for the service
//associated with the second token, creating two ways to access the same service object.
[
  NewLogger,
  // Alias OldLogger w/ reference to NewLogger
  { provide: OldLogger, useExisting: NewLogger },
];

//* useFactory
// allows to pass values (if class has contructor arguments) to create a dependency object by calling factory function

class HeroService {
  constructor(private logger: Logger, private isAuthorized: boolean) {}
  getHeroes() {
    const auth = this.isAuthorized ? "authorized " : "unauthorized";
    this.logger.log(`Getting heroes for ${auth} user.`);
    return HEROES.filter((hero) => this.isAuthorized || !hero.isSecret);
  }
}
const heroServiceFactory = (logger: Logger, userService: UserService) =>
  new HeroService(logger, userService.user.isAuthorized);
export const heroServiceProvider = {
  provide: HeroService,
  useFactory: heroServiceFactory,
  deps: [Logger, UserService],
};

//* useValue
// lets associate a statc value with token
// useful to keep runtime data such as website base addresses and feature flags
