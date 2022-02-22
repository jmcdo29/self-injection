# "Self-Injecting" without Self Injection

## Current Behavior

It turns out that right now, if a class (`AppService`) injects a dependency that has the same name (`@Inject('AppService')`), Nest will throw an error: `Nest can't resolve dependencies of the AppService (?). Please make sure that the argument AppService at index [0] is available in the AppModule context.`

I assume this is to prevent self injecting loops that will never actually resolve (class `AppService` injects class `AppService` inject class `AppService` etc).

## Expected Behavior

Nest should only throw an error if there are no specific providers using the custom provider syntax that have the same provider name as the class.

## Motivation for the "fix"

I've seen several users in the Discord create a wrapper class to create a custom repository via something like

```ts
@Injectable()
export class FooRepository {
  constructor(@InjectRepository(Foo) private readonly fooRepo: Repository<Foo>) {}
}
```

This results in the error message above. While I don't think this approach is necessary, we shouldn't necessarily be limiting, especially as Nest v8 allows for injecting classes by reference and not just by name anymore. 

If this is still the intention, we should make a mention in the docs that providers cannot inject providers with the same name. Namely, class providers will not be able to `@Inject(ProviderWithTheSameNameAsClass)`

## Steps to reproduce

```
git clone git@github.com/jmcdo29:self-injection.git
cd self-injection
npm i
npm run start:dev
# observe error
```
