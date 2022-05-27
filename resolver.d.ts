import Resolver from 'ember-resolver';
interface PrasedName {
    fullName: string;
    fullNameWithoutType: string;
}
export default class ReactResolver extends Resolver {
    resolveComponent(parsedName: PrasedName): any;
    _resolveReactStyleFile(parsedName: PrasedName): any;
}
export {};
//# sourceMappingURL=resolver.d.ts.map