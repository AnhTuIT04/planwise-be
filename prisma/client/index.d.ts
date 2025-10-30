
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model OAuthAccount
 * 
 */
export type OAuthAccount = $Result.DefaultSelection<Prisma.$OAuthAccountPayload>
/**
 * Model Project
 * 
 */
export type Project = $Result.DefaultSelection<Prisma.$ProjectPayload>
/**
 * Model Section
 * 
 */
export type Section = $Result.DefaultSelection<Prisma.$SectionPayload>
/**
 * Model Task
 * 
 */
export type Task = $Result.DefaultSelection<Prisma.$TaskPayload>
/**
 * Model TaskOfUser
 * 
 */
export type TaskOfUser = $Result.DefaultSelection<Prisma.$TaskOfUserPayload>
/**
 * Model Comment
 * 
 */
export type Comment = $Result.DefaultSelection<Prisma.$CommentPayload>
/**
 * Model ProjectInvitation
 * 
 */
export type ProjectInvitation = $Result.DefaultSelection<Prisma.$ProjectInvitationPayload>
/**
 * Model UserInProject
 * 
 */
export type UserInProject = $Result.DefaultSelection<Prisma.$UserInProjectPayload>
/**
 * Model Role
 * 
 */
export type Role = $Result.DefaultSelection<Prisma.$RolePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Provider: {
  google: 'google',
  github: 'github'
};

export type Provider = (typeof Provider)[keyof typeof Provider]


export const TaskStatus: {
  TODO: 'TODO',
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE',
  DELAYED: 'DELAYED'
};

export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus]


export const PriorityLevel: {
  LOW: 'LOW',
  NORMAL: 'NORMAL',
  HIGH: 'HIGH',
  URGENT: 'URGENT'
};

export type PriorityLevel = (typeof PriorityLevel)[keyof typeof PriorityLevel]


export const InvitationStatus: {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  DECLINED: 'DECLINED'
};

export type InvitationStatus = (typeof InvitationStatus)[keyof typeof InvitationStatus]

}

export type Provider = $Enums.Provider

export const Provider: typeof $Enums.Provider

export type TaskStatus = $Enums.TaskStatus

export const TaskStatus: typeof $Enums.TaskStatus

export type PriorityLevel = $Enums.PriorityLevel

export const PriorityLevel: typeof $Enums.PriorityLevel

export type InvitationStatus = $Enums.InvitationStatus

export const InvitationStatus: typeof $Enums.InvitationStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.oAuthAccount`: Exposes CRUD operations for the **OAuthAccount** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OAuthAccounts
    * const oAuthAccounts = await prisma.oAuthAccount.findMany()
    * ```
    */
  get oAuthAccount(): Prisma.OAuthAccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.project`: Exposes CRUD operations for the **Project** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.project.findMany()
    * ```
    */
  get project(): Prisma.ProjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.section`: Exposes CRUD operations for the **Section** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sections
    * const sections = await prisma.section.findMany()
    * ```
    */
  get section(): Prisma.SectionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.task`: Exposes CRUD operations for the **Task** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tasks
    * const tasks = await prisma.task.findMany()
    * ```
    */
  get task(): Prisma.TaskDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.taskOfUser`: Exposes CRUD operations for the **TaskOfUser** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TaskOfUsers
    * const taskOfUsers = await prisma.taskOfUser.findMany()
    * ```
    */
  get taskOfUser(): Prisma.TaskOfUserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.comment`: Exposes CRUD operations for the **Comment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Comments
    * const comments = await prisma.comment.findMany()
    * ```
    */
  get comment(): Prisma.CommentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.projectInvitation`: Exposes CRUD operations for the **ProjectInvitation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProjectInvitations
    * const projectInvitations = await prisma.projectInvitation.findMany()
    * ```
    */
  get projectInvitation(): Prisma.ProjectInvitationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userInProject`: Exposes CRUD operations for the **UserInProject** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserInProjects
    * const userInProjects = await prisma.userInProject.findMany()
    * ```
    */
  get userInProject(): Prisma.UserInProjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.role`: Exposes CRUD operations for the **Role** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Roles
    * const roles = await prisma.role.findMany()
    * ```
    */
  get role(): Prisma.RoleDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.17.1
   * Query Engine version: 272a37d34178c2894197e17273bf937f25acdeac
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    OAuthAccount: 'OAuthAccount',
    Project: 'Project',
    Section: 'Section',
    Task: 'Task',
    TaskOfUser: 'TaskOfUser',
    Comment: 'Comment',
    ProjectInvitation: 'ProjectInvitation',
    UserInProject: 'UserInProject',
    Role: 'Role'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "oAuthAccount" | "project" | "section" | "task" | "taskOfUser" | "comment" | "projectInvitation" | "userInProject" | "role"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      OAuthAccount: {
        payload: Prisma.$OAuthAccountPayload<ExtArgs>
        fields: Prisma.OAuthAccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OAuthAccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthAccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OAuthAccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthAccountPayload>
          }
          findFirst: {
            args: Prisma.OAuthAccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthAccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OAuthAccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthAccountPayload>
          }
          findMany: {
            args: Prisma.OAuthAccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthAccountPayload>[]
          }
          create: {
            args: Prisma.OAuthAccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthAccountPayload>
          }
          createMany: {
            args: Prisma.OAuthAccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OAuthAccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthAccountPayload>[]
          }
          delete: {
            args: Prisma.OAuthAccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthAccountPayload>
          }
          update: {
            args: Prisma.OAuthAccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthAccountPayload>
          }
          deleteMany: {
            args: Prisma.OAuthAccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OAuthAccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OAuthAccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthAccountPayload>[]
          }
          upsert: {
            args: Prisma.OAuthAccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthAccountPayload>
          }
          aggregate: {
            args: Prisma.OAuthAccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOAuthAccount>
          }
          groupBy: {
            args: Prisma.OAuthAccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<OAuthAccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.OAuthAccountCountArgs<ExtArgs>
            result: $Utils.Optional<OAuthAccountCountAggregateOutputType> | number
          }
        }
      }
      Project: {
        payload: Prisma.$ProjectPayload<ExtArgs>
        fields: Prisma.ProjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findFirst: {
            args: Prisma.ProjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findMany: {
            args: Prisma.ProjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          create: {
            args: Prisma.ProjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          createMany: {
            args: Prisma.ProjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          delete: {
            args: Prisma.ProjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          update: {
            args: Prisma.ProjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          deleteMany: {
            args: Prisma.ProjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          upsert: {
            args: Prisma.ProjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          aggregate: {
            args: Prisma.ProjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProject>
          }
          groupBy: {
            args: Prisma.ProjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectCountAggregateOutputType> | number
          }
        }
      }
      Section: {
        payload: Prisma.$SectionPayload<ExtArgs>
        fields: Prisma.SectionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SectionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SectionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload>
          }
          findFirst: {
            args: Prisma.SectionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SectionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload>
          }
          findMany: {
            args: Prisma.SectionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload>[]
          }
          create: {
            args: Prisma.SectionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload>
          }
          createMany: {
            args: Prisma.SectionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SectionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload>[]
          }
          delete: {
            args: Prisma.SectionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload>
          }
          update: {
            args: Prisma.SectionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload>
          }
          deleteMany: {
            args: Prisma.SectionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SectionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SectionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload>[]
          }
          upsert: {
            args: Prisma.SectionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload>
          }
          aggregate: {
            args: Prisma.SectionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSection>
          }
          groupBy: {
            args: Prisma.SectionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SectionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SectionCountArgs<ExtArgs>
            result: $Utils.Optional<SectionCountAggregateOutputType> | number
          }
        }
      }
      Task: {
        payload: Prisma.$TaskPayload<ExtArgs>
        fields: Prisma.TaskFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findFirst: {
            args: Prisma.TaskFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findMany: {
            args: Prisma.TaskFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          create: {
            args: Prisma.TaskCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          createMany: {
            args: Prisma.TaskCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TaskCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          delete: {
            args: Prisma.TaskDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          update: {
            args: Prisma.TaskUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          deleteMany: {
            args: Prisma.TaskDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TaskUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          upsert: {
            args: Prisma.TaskUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          aggregate: {
            args: Prisma.TaskAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTask>
          }
          groupBy: {
            args: Prisma.TaskGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaskGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskCountArgs<ExtArgs>
            result: $Utils.Optional<TaskCountAggregateOutputType> | number
          }
        }
      }
      TaskOfUser: {
        payload: Prisma.$TaskOfUserPayload<ExtArgs>
        fields: Prisma.TaskOfUserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskOfUserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskOfUserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskOfUserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskOfUserPayload>
          }
          findFirst: {
            args: Prisma.TaskOfUserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskOfUserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskOfUserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskOfUserPayload>
          }
          findMany: {
            args: Prisma.TaskOfUserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskOfUserPayload>[]
          }
          create: {
            args: Prisma.TaskOfUserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskOfUserPayload>
          }
          createMany: {
            args: Prisma.TaskOfUserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TaskOfUserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskOfUserPayload>[]
          }
          delete: {
            args: Prisma.TaskOfUserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskOfUserPayload>
          }
          update: {
            args: Prisma.TaskOfUserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskOfUserPayload>
          }
          deleteMany: {
            args: Prisma.TaskOfUserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskOfUserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TaskOfUserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskOfUserPayload>[]
          }
          upsert: {
            args: Prisma.TaskOfUserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskOfUserPayload>
          }
          aggregate: {
            args: Prisma.TaskOfUserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTaskOfUser>
          }
          groupBy: {
            args: Prisma.TaskOfUserGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaskOfUserGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskOfUserCountArgs<ExtArgs>
            result: $Utils.Optional<TaskOfUserCountAggregateOutputType> | number
          }
        }
      }
      Comment: {
        payload: Prisma.$CommentPayload<ExtArgs>
        fields: Prisma.CommentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CommentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CommentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          findFirst: {
            args: Prisma.CommentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CommentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          findMany: {
            args: Prisma.CommentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>[]
          }
          create: {
            args: Prisma.CommentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          createMany: {
            args: Prisma.CommentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CommentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>[]
          }
          delete: {
            args: Prisma.CommentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          update: {
            args: Prisma.CommentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          deleteMany: {
            args: Prisma.CommentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CommentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CommentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>[]
          }
          upsert: {
            args: Prisma.CommentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          aggregate: {
            args: Prisma.CommentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComment>
          }
          groupBy: {
            args: Prisma.CommentGroupByArgs<ExtArgs>
            result: $Utils.Optional<CommentGroupByOutputType>[]
          }
          count: {
            args: Prisma.CommentCountArgs<ExtArgs>
            result: $Utils.Optional<CommentCountAggregateOutputType> | number
          }
        }
      }
      ProjectInvitation: {
        payload: Prisma.$ProjectInvitationPayload<ExtArgs>
        fields: Prisma.ProjectInvitationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectInvitationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectInvitationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectInvitationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectInvitationPayload>
          }
          findFirst: {
            args: Prisma.ProjectInvitationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectInvitationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectInvitationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectInvitationPayload>
          }
          findMany: {
            args: Prisma.ProjectInvitationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectInvitationPayload>[]
          }
          create: {
            args: Prisma.ProjectInvitationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectInvitationPayload>
          }
          createMany: {
            args: Prisma.ProjectInvitationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectInvitationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectInvitationPayload>[]
          }
          delete: {
            args: Prisma.ProjectInvitationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectInvitationPayload>
          }
          update: {
            args: Prisma.ProjectInvitationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectInvitationPayload>
          }
          deleteMany: {
            args: Prisma.ProjectInvitationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectInvitationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectInvitationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectInvitationPayload>[]
          }
          upsert: {
            args: Prisma.ProjectInvitationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectInvitationPayload>
          }
          aggregate: {
            args: Prisma.ProjectInvitationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProjectInvitation>
          }
          groupBy: {
            args: Prisma.ProjectInvitationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectInvitationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectInvitationCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectInvitationCountAggregateOutputType> | number
          }
        }
      }
      UserInProject: {
        payload: Prisma.$UserInProjectPayload<ExtArgs>
        fields: Prisma.UserInProjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserInProjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInProjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserInProjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInProjectPayload>
          }
          findFirst: {
            args: Prisma.UserInProjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInProjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserInProjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInProjectPayload>
          }
          findMany: {
            args: Prisma.UserInProjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInProjectPayload>[]
          }
          create: {
            args: Prisma.UserInProjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInProjectPayload>
          }
          createMany: {
            args: Prisma.UserInProjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserInProjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInProjectPayload>[]
          }
          delete: {
            args: Prisma.UserInProjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInProjectPayload>
          }
          update: {
            args: Prisma.UserInProjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInProjectPayload>
          }
          deleteMany: {
            args: Prisma.UserInProjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserInProjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserInProjectUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInProjectPayload>[]
          }
          upsert: {
            args: Prisma.UserInProjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInProjectPayload>
          }
          aggregate: {
            args: Prisma.UserInProjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserInProject>
          }
          groupBy: {
            args: Prisma.UserInProjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserInProjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserInProjectCountArgs<ExtArgs>
            result: $Utils.Optional<UserInProjectCountAggregateOutputType> | number
          }
        }
      }
      Role: {
        payload: Prisma.$RolePayload<ExtArgs>
        fields: Prisma.RoleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          findFirst: {
            args: Prisma.RoleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          findMany: {
            args: Prisma.RoleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>[]
          }
          create: {
            args: Prisma.RoleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          createMany: {
            args: Prisma.RoleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>[]
          }
          delete: {
            args: Prisma.RoleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          update: {
            args: Prisma.RoleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          deleteMany: {
            args: Prisma.RoleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RoleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>[]
          }
          upsert: {
            args: Prisma.RoleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          aggregate: {
            args: Prisma.RoleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRole>
          }
          groupBy: {
            args: Prisma.RoleGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoleGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoleCountArgs<ExtArgs>
            result: $Utils.Optional<RoleCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    oAuthAccount?: OAuthAccountOmit
    project?: ProjectOmit
    section?: SectionOmit
    task?: TaskOmit
    taskOfUser?: TaskOfUserOmit
    comment?: CommentOmit
    projectInvitation?: ProjectInvitationOmit
    userInProject?: UserInProjectOmit
    role?: RoleOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    accounts: number
    projects: number
    projectInvitations: number
    belongToProjects: number
    supervisedTasks: number
    tasks: number
    comments: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
    projects?: boolean | UserCountOutputTypeCountProjectsArgs
    projectInvitations?: boolean | UserCountOutputTypeCountProjectInvitationsArgs
    belongToProjects?: boolean | UserCountOutputTypeCountBelongToProjectsArgs
    supervisedTasks?: boolean | UserCountOutputTypeCountSupervisedTasksArgs
    tasks?: boolean | UserCountOutputTypeCountTasksArgs
    comments?: boolean | UserCountOutputTypeCountCommentsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OAuthAccountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProjectInvitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectInvitationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBelongToProjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserInProjectWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSupervisedTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskOfUserWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
  }


  /**
   * Count Type ProjectCountOutputType
   */

  export type ProjectCountOutputType = {
    sections: number
    tasks: number
    invitations: number
    members: number
    roles: number
  }

  export type ProjectCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sections?: boolean | ProjectCountOutputTypeCountSectionsArgs
    tasks?: boolean | ProjectCountOutputTypeCountTasksArgs
    invitations?: boolean | ProjectCountOutputTypeCountInvitationsArgs
    members?: boolean | ProjectCountOutputTypeCountMembersArgs
    roles?: boolean | ProjectCountOutputTypeCountRolesArgs
  }

  // Custom InputTypes
  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectCountOutputType
     */
    select?: ProjectCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountSectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SectionWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountInvitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectInvitationWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserInProjectWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountRolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoleWhereInput
  }


  /**
   * Count Type TaskCountOutputType
   */

  export type TaskCountOutputType = {
    assignees: number
    subtasks: number
    comments: number
  }

  export type TaskCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignees?: boolean | TaskCountOutputTypeCountAssigneesArgs
    subtasks?: boolean | TaskCountOutputTypeCountSubtasksArgs
    comments?: boolean | TaskCountOutputTypeCountCommentsArgs
  }

  // Custom InputTypes
  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCountOutputType
     */
    select?: TaskCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeCountAssigneesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskOfUserWhereInput
  }

  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeCountSubtasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }

  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
  }


  /**
   * Count Type RoleCountOutputType
   */

  export type RoleCountOutputType = {
    userInProjects: number
  }

  export type RoleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userInProjects?: boolean | RoleCountOutputTypeCountUserInProjectsArgs
  }

  // Custom InputTypes
  /**
   * RoleCountOutputType without action
   */
  export type RoleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleCountOutputType
     */
    select?: RoleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RoleCountOutputType without action
   */
  export type RoleCountOutputTypeCountUserInProjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserInProjectWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    avatarUrl: string | null
    verified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    avatarUrl: string | null
    verified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    name: number
    avatarUrl: number
    verified: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    avatarUrl?: true
    verified?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    avatarUrl?: true
    verified?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    avatarUrl?: true
    verified?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string | null
    name: string | null
    avatarUrl: string | null
    verified: boolean
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    avatarUrl?: boolean
    verified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    accounts?: boolean | User$accountsArgs<ExtArgs>
    projects?: boolean | User$projectsArgs<ExtArgs>
    projectInvitations?: boolean | User$projectInvitationsArgs<ExtArgs>
    belongToProjects?: boolean | User$belongToProjectsArgs<ExtArgs>
    supervisedTasks?: boolean | User$supervisedTasksArgs<ExtArgs>
    tasks?: boolean | User$tasksArgs<ExtArgs>
    comments?: boolean | User$commentsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    avatarUrl?: boolean
    verified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    avatarUrl?: boolean
    verified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    avatarUrl?: boolean
    verified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "name" | "avatarUrl" | "verified" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | User$accountsArgs<ExtArgs>
    projects?: boolean | User$projectsArgs<ExtArgs>
    projectInvitations?: boolean | User$projectInvitationsArgs<ExtArgs>
    belongToProjects?: boolean | User$belongToProjectsArgs<ExtArgs>
    supervisedTasks?: boolean | User$supervisedTasksArgs<ExtArgs>
    tasks?: boolean | User$tasksArgs<ExtArgs>
    comments?: boolean | User$commentsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      accounts: Prisma.$OAuthAccountPayload<ExtArgs>[]
      projects: Prisma.$ProjectPayload<ExtArgs>[]
      projectInvitations: Prisma.$ProjectInvitationPayload<ExtArgs>[]
      belongToProjects: Prisma.$UserInProjectPayload<ExtArgs>[]
      supervisedTasks: Prisma.$TaskPayload<ExtArgs>[]
      tasks: Prisma.$TaskOfUserPayload<ExtArgs>[]
      comments: Prisma.$CommentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string | null
      name: string | null
      avatarUrl: string | null
      verified: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthAccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    projects<T extends User$projectsArgs<ExtArgs> = {}>(args?: Subset<T, User$projectsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    projectInvitations<T extends User$projectInvitationsArgs<ExtArgs> = {}>(args?: Subset<T, User$projectInvitationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectInvitationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    belongToProjects<T extends User$belongToProjectsArgs<ExtArgs> = {}>(args?: Subset<T, User$belongToProjectsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserInProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    supervisedTasks<T extends User$supervisedTasksArgs<ExtArgs> = {}>(args?: Subset<T, User$supervisedTasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tasks<T extends User$tasksArgs<ExtArgs> = {}>(args?: Subset<T, User$tasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskOfUserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    comments<T extends User$commentsArgs<ExtArgs> = {}>(args?: Subset<T, User$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly avatarUrl: FieldRef<"User", 'String'>
    readonly verified: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAccount
     */
    select?: OAuthAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAccount
     */
    omit?: OAuthAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAccountInclude<ExtArgs> | null
    where?: OAuthAccountWhereInput
    orderBy?: OAuthAccountOrderByWithRelationInput | OAuthAccountOrderByWithRelationInput[]
    cursor?: OAuthAccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OAuthAccountScalarFieldEnum | OAuthAccountScalarFieldEnum[]
  }

  /**
   * User.projects
   */
  export type User$projectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    cursor?: ProjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * User.projectInvitations
   */
  export type User$projectInvitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectInvitation
     */
    select?: ProjectInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectInvitation
     */
    omit?: ProjectInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInvitationInclude<ExtArgs> | null
    where?: ProjectInvitationWhereInput
    orderBy?: ProjectInvitationOrderByWithRelationInput | ProjectInvitationOrderByWithRelationInput[]
    cursor?: ProjectInvitationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectInvitationScalarFieldEnum | ProjectInvitationScalarFieldEnum[]
  }

  /**
   * User.belongToProjects
   */
  export type User$belongToProjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInProject
     */
    select?: UserInProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInProject
     */
    omit?: UserInProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInProjectInclude<ExtArgs> | null
    where?: UserInProjectWhereInput
    orderBy?: UserInProjectOrderByWithRelationInput | UserInProjectOrderByWithRelationInput[]
    cursor?: UserInProjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserInProjectScalarFieldEnum | UserInProjectScalarFieldEnum[]
  }

  /**
   * User.supervisedTasks
   */
  export type User$supervisedTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * User.tasks
   */
  export type User$tasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskOfUser
     */
    select?: TaskOfUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskOfUser
     */
    omit?: TaskOfUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskOfUserInclude<ExtArgs> | null
    where?: TaskOfUserWhereInput
    orderBy?: TaskOfUserOrderByWithRelationInput | TaskOfUserOrderByWithRelationInput[]
    cursor?: TaskOfUserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskOfUserScalarFieldEnum | TaskOfUserScalarFieldEnum[]
  }

  /**
   * User.comments
   */
  export type User$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    cursor?: CommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model OAuthAccount
   */

  export type AggregateOAuthAccount = {
    _count: OAuthAccountCountAggregateOutputType | null
    _min: OAuthAccountMinAggregateOutputType | null
    _max: OAuthAccountMaxAggregateOutputType | null
  }

  export type OAuthAccountMinAggregateOutputType = {
    id: string | null
    provider: $Enums.Provider | null
    userId: string | null
  }

  export type OAuthAccountMaxAggregateOutputType = {
    id: string | null
    provider: $Enums.Provider | null
    userId: string | null
  }

  export type OAuthAccountCountAggregateOutputType = {
    id: number
    provider: number
    userId: number
    _all: number
  }


  export type OAuthAccountMinAggregateInputType = {
    id?: true
    provider?: true
    userId?: true
  }

  export type OAuthAccountMaxAggregateInputType = {
    id?: true
    provider?: true
    userId?: true
  }

  export type OAuthAccountCountAggregateInputType = {
    id?: true
    provider?: true
    userId?: true
    _all?: true
  }

  export type OAuthAccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OAuthAccount to aggregate.
     */
    where?: OAuthAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthAccounts to fetch.
     */
    orderBy?: OAuthAccountOrderByWithRelationInput | OAuthAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OAuthAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OAuthAccounts
    **/
    _count?: true | OAuthAccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OAuthAccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OAuthAccountMaxAggregateInputType
  }

  export type GetOAuthAccountAggregateType<T extends OAuthAccountAggregateArgs> = {
        [P in keyof T & keyof AggregateOAuthAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOAuthAccount[P]>
      : GetScalarType<T[P], AggregateOAuthAccount[P]>
  }




  export type OAuthAccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OAuthAccountWhereInput
    orderBy?: OAuthAccountOrderByWithAggregationInput | OAuthAccountOrderByWithAggregationInput[]
    by: OAuthAccountScalarFieldEnum[] | OAuthAccountScalarFieldEnum
    having?: OAuthAccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OAuthAccountCountAggregateInputType | true
    _min?: OAuthAccountMinAggregateInputType
    _max?: OAuthAccountMaxAggregateInputType
  }

  export type OAuthAccountGroupByOutputType = {
    id: string
    provider: $Enums.Provider
    userId: string
    _count: OAuthAccountCountAggregateOutputType | null
    _min: OAuthAccountMinAggregateOutputType | null
    _max: OAuthAccountMaxAggregateOutputType | null
  }

  type GetOAuthAccountGroupByPayload<T extends OAuthAccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OAuthAccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OAuthAccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OAuthAccountGroupByOutputType[P]>
            : GetScalarType<T[P], OAuthAccountGroupByOutputType[P]>
        }
      >
    >


  export type OAuthAccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    provider?: boolean
    userId?: boolean
    own?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["oAuthAccount"]>

  export type OAuthAccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    provider?: boolean
    userId?: boolean
    own?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["oAuthAccount"]>

  export type OAuthAccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    provider?: boolean
    userId?: boolean
    own?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["oAuthAccount"]>

  export type OAuthAccountSelectScalar = {
    id?: boolean
    provider?: boolean
    userId?: boolean
  }

  export type OAuthAccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "provider" | "userId", ExtArgs["result"]["oAuthAccount"]>
  export type OAuthAccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    own?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type OAuthAccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    own?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type OAuthAccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    own?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $OAuthAccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OAuthAccount"
    objects: {
      own: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      provider: $Enums.Provider
      userId: string
    }, ExtArgs["result"]["oAuthAccount"]>
    composites: {}
  }

  type OAuthAccountGetPayload<S extends boolean | null | undefined | OAuthAccountDefaultArgs> = $Result.GetResult<Prisma.$OAuthAccountPayload, S>

  type OAuthAccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OAuthAccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OAuthAccountCountAggregateInputType | true
    }

  export interface OAuthAccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OAuthAccount'], meta: { name: 'OAuthAccount' } }
    /**
     * Find zero or one OAuthAccount that matches the filter.
     * @param {OAuthAccountFindUniqueArgs} args - Arguments to find a OAuthAccount
     * @example
     * // Get one OAuthAccount
     * const oAuthAccount = await prisma.oAuthAccount.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OAuthAccountFindUniqueArgs>(args: SelectSubset<T, OAuthAccountFindUniqueArgs<ExtArgs>>): Prisma__OAuthAccountClient<$Result.GetResult<Prisma.$OAuthAccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OAuthAccount that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OAuthAccountFindUniqueOrThrowArgs} args - Arguments to find a OAuthAccount
     * @example
     * // Get one OAuthAccount
     * const oAuthAccount = await prisma.oAuthAccount.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OAuthAccountFindUniqueOrThrowArgs>(args: SelectSubset<T, OAuthAccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OAuthAccountClient<$Result.GetResult<Prisma.$OAuthAccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OAuthAccount that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthAccountFindFirstArgs} args - Arguments to find a OAuthAccount
     * @example
     * // Get one OAuthAccount
     * const oAuthAccount = await prisma.oAuthAccount.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OAuthAccountFindFirstArgs>(args?: SelectSubset<T, OAuthAccountFindFirstArgs<ExtArgs>>): Prisma__OAuthAccountClient<$Result.GetResult<Prisma.$OAuthAccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OAuthAccount that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthAccountFindFirstOrThrowArgs} args - Arguments to find a OAuthAccount
     * @example
     * // Get one OAuthAccount
     * const oAuthAccount = await prisma.oAuthAccount.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OAuthAccountFindFirstOrThrowArgs>(args?: SelectSubset<T, OAuthAccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__OAuthAccountClient<$Result.GetResult<Prisma.$OAuthAccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OAuthAccounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthAccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OAuthAccounts
     * const oAuthAccounts = await prisma.oAuthAccount.findMany()
     * 
     * // Get first 10 OAuthAccounts
     * const oAuthAccounts = await prisma.oAuthAccount.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const oAuthAccountWithIdOnly = await prisma.oAuthAccount.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OAuthAccountFindManyArgs>(args?: SelectSubset<T, OAuthAccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthAccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OAuthAccount.
     * @param {OAuthAccountCreateArgs} args - Arguments to create a OAuthAccount.
     * @example
     * // Create one OAuthAccount
     * const OAuthAccount = await prisma.oAuthAccount.create({
     *   data: {
     *     // ... data to create a OAuthAccount
     *   }
     * })
     * 
     */
    create<T extends OAuthAccountCreateArgs>(args: SelectSubset<T, OAuthAccountCreateArgs<ExtArgs>>): Prisma__OAuthAccountClient<$Result.GetResult<Prisma.$OAuthAccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OAuthAccounts.
     * @param {OAuthAccountCreateManyArgs} args - Arguments to create many OAuthAccounts.
     * @example
     * // Create many OAuthAccounts
     * const oAuthAccount = await prisma.oAuthAccount.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OAuthAccountCreateManyArgs>(args?: SelectSubset<T, OAuthAccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OAuthAccounts and returns the data saved in the database.
     * @param {OAuthAccountCreateManyAndReturnArgs} args - Arguments to create many OAuthAccounts.
     * @example
     * // Create many OAuthAccounts
     * const oAuthAccount = await prisma.oAuthAccount.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OAuthAccounts and only return the `id`
     * const oAuthAccountWithIdOnly = await prisma.oAuthAccount.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OAuthAccountCreateManyAndReturnArgs>(args?: SelectSubset<T, OAuthAccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthAccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OAuthAccount.
     * @param {OAuthAccountDeleteArgs} args - Arguments to delete one OAuthAccount.
     * @example
     * // Delete one OAuthAccount
     * const OAuthAccount = await prisma.oAuthAccount.delete({
     *   where: {
     *     // ... filter to delete one OAuthAccount
     *   }
     * })
     * 
     */
    delete<T extends OAuthAccountDeleteArgs>(args: SelectSubset<T, OAuthAccountDeleteArgs<ExtArgs>>): Prisma__OAuthAccountClient<$Result.GetResult<Prisma.$OAuthAccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OAuthAccount.
     * @param {OAuthAccountUpdateArgs} args - Arguments to update one OAuthAccount.
     * @example
     * // Update one OAuthAccount
     * const oAuthAccount = await prisma.oAuthAccount.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OAuthAccountUpdateArgs>(args: SelectSubset<T, OAuthAccountUpdateArgs<ExtArgs>>): Prisma__OAuthAccountClient<$Result.GetResult<Prisma.$OAuthAccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OAuthAccounts.
     * @param {OAuthAccountDeleteManyArgs} args - Arguments to filter OAuthAccounts to delete.
     * @example
     * // Delete a few OAuthAccounts
     * const { count } = await prisma.oAuthAccount.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OAuthAccountDeleteManyArgs>(args?: SelectSubset<T, OAuthAccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OAuthAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthAccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OAuthAccounts
     * const oAuthAccount = await prisma.oAuthAccount.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OAuthAccountUpdateManyArgs>(args: SelectSubset<T, OAuthAccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OAuthAccounts and returns the data updated in the database.
     * @param {OAuthAccountUpdateManyAndReturnArgs} args - Arguments to update many OAuthAccounts.
     * @example
     * // Update many OAuthAccounts
     * const oAuthAccount = await prisma.oAuthAccount.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OAuthAccounts and only return the `id`
     * const oAuthAccountWithIdOnly = await prisma.oAuthAccount.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OAuthAccountUpdateManyAndReturnArgs>(args: SelectSubset<T, OAuthAccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthAccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OAuthAccount.
     * @param {OAuthAccountUpsertArgs} args - Arguments to update or create a OAuthAccount.
     * @example
     * // Update or create a OAuthAccount
     * const oAuthAccount = await prisma.oAuthAccount.upsert({
     *   create: {
     *     // ... data to create a OAuthAccount
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OAuthAccount we want to update
     *   }
     * })
     */
    upsert<T extends OAuthAccountUpsertArgs>(args: SelectSubset<T, OAuthAccountUpsertArgs<ExtArgs>>): Prisma__OAuthAccountClient<$Result.GetResult<Prisma.$OAuthAccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OAuthAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthAccountCountArgs} args - Arguments to filter OAuthAccounts to count.
     * @example
     * // Count the number of OAuthAccounts
     * const count = await prisma.oAuthAccount.count({
     *   where: {
     *     // ... the filter for the OAuthAccounts we want to count
     *   }
     * })
    **/
    count<T extends OAuthAccountCountArgs>(
      args?: Subset<T, OAuthAccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OAuthAccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OAuthAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthAccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OAuthAccountAggregateArgs>(args: Subset<T, OAuthAccountAggregateArgs>): Prisma.PrismaPromise<GetOAuthAccountAggregateType<T>>

    /**
     * Group by OAuthAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthAccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OAuthAccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OAuthAccountGroupByArgs['orderBy'] }
        : { orderBy?: OAuthAccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OAuthAccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOAuthAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OAuthAccount model
   */
  readonly fields: OAuthAccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OAuthAccount.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OAuthAccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    own<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OAuthAccount model
   */
  interface OAuthAccountFieldRefs {
    readonly id: FieldRef<"OAuthAccount", 'String'>
    readonly provider: FieldRef<"OAuthAccount", 'Provider'>
    readonly userId: FieldRef<"OAuthAccount", 'String'>
  }
    

  // Custom InputTypes
  /**
   * OAuthAccount findUnique
   */
  export type OAuthAccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAccount
     */
    select?: OAuthAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAccount
     */
    omit?: OAuthAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAccountInclude<ExtArgs> | null
    /**
     * Filter, which OAuthAccount to fetch.
     */
    where: OAuthAccountWhereUniqueInput
  }

  /**
   * OAuthAccount findUniqueOrThrow
   */
  export type OAuthAccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAccount
     */
    select?: OAuthAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAccount
     */
    omit?: OAuthAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAccountInclude<ExtArgs> | null
    /**
     * Filter, which OAuthAccount to fetch.
     */
    where: OAuthAccountWhereUniqueInput
  }

  /**
   * OAuthAccount findFirst
   */
  export type OAuthAccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAccount
     */
    select?: OAuthAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAccount
     */
    omit?: OAuthAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAccountInclude<ExtArgs> | null
    /**
     * Filter, which OAuthAccount to fetch.
     */
    where?: OAuthAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthAccounts to fetch.
     */
    orderBy?: OAuthAccountOrderByWithRelationInput | OAuthAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OAuthAccounts.
     */
    cursor?: OAuthAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OAuthAccounts.
     */
    distinct?: OAuthAccountScalarFieldEnum | OAuthAccountScalarFieldEnum[]
  }

  /**
   * OAuthAccount findFirstOrThrow
   */
  export type OAuthAccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAccount
     */
    select?: OAuthAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAccount
     */
    omit?: OAuthAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAccountInclude<ExtArgs> | null
    /**
     * Filter, which OAuthAccount to fetch.
     */
    where?: OAuthAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthAccounts to fetch.
     */
    orderBy?: OAuthAccountOrderByWithRelationInput | OAuthAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OAuthAccounts.
     */
    cursor?: OAuthAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OAuthAccounts.
     */
    distinct?: OAuthAccountScalarFieldEnum | OAuthAccountScalarFieldEnum[]
  }

  /**
   * OAuthAccount findMany
   */
  export type OAuthAccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAccount
     */
    select?: OAuthAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAccount
     */
    omit?: OAuthAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAccountInclude<ExtArgs> | null
    /**
     * Filter, which OAuthAccounts to fetch.
     */
    where?: OAuthAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthAccounts to fetch.
     */
    orderBy?: OAuthAccountOrderByWithRelationInput | OAuthAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OAuthAccounts.
     */
    cursor?: OAuthAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthAccounts.
     */
    skip?: number
    distinct?: OAuthAccountScalarFieldEnum | OAuthAccountScalarFieldEnum[]
  }

  /**
   * OAuthAccount create
   */
  export type OAuthAccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAccount
     */
    select?: OAuthAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAccount
     */
    omit?: OAuthAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAccountInclude<ExtArgs> | null
    /**
     * The data needed to create a OAuthAccount.
     */
    data: XOR<OAuthAccountCreateInput, OAuthAccountUncheckedCreateInput>
  }

  /**
   * OAuthAccount createMany
   */
  export type OAuthAccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OAuthAccounts.
     */
    data: OAuthAccountCreateManyInput | OAuthAccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OAuthAccount createManyAndReturn
   */
  export type OAuthAccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAccount
     */
    select?: OAuthAccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAccount
     */
    omit?: OAuthAccountOmit<ExtArgs> | null
    /**
     * The data used to create many OAuthAccounts.
     */
    data: OAuthAccountCreateManyInput | OAuthAccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OAuthAccount update
   */
  export type OAuthAccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAccount
     */
    select?: OAuthAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAccount
     */
    omit?: OAuthAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAccountInclude<ExtArgs> | null
    /**
     * The data needed to update a OAuthAccount.
     */
    data: XOR<OAuthAccountUpdateInput, OAuthAccountUncheckedUpdateInput>
    /**
     * Choose, which OAuthAccount to update.
     */
    where: OAuthAccountWhereUniqueInput
  }

  /**
   * OAuthAccount updateMany
   */
  export type OAuthAccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OAuthAccounts.
     */
    data: XOR<OAuthAccountUpdateManyMutationInput, OAuthAccountUncheckedUpdateManyInput>
    /**
     * Filter which OAuthAccounts to update
     */
    where?: OAuthAccountWhereInput
    /**
     * Limit how many OAuthAccounts to update.
     */
    limit?: number
  }

  /**
   * OAuthAccount updateManyAndReturn
   */
  export type OAuthAccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAccount
     */
    select?: OAuthAccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAccount
     */
    omit?: OAuthAccountOmit<ExtArgs> | null
    /**
     * The data used to update OAuthAccounts.
     */
    data: XOR<OAuthAccountUpdateManyMutationInput, OAuthAccountUncheckedUpdateManyInput>
    /**
     * Filter which OAuthAccounts to update
     */
    where?: OAuthAccountWhereInput
    /**
     * Limit how many OAuthAccounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * OAuthAccount upsert
   */
  export type OAuthAccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAccount
     */
    select?: OAuthAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAccount
     */
    omit?: OAuthAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAccountInclude<ExtArgs> | null
    /**
     * The filter to search for the OAuthAccount to update in case it exists.
     */
    where: OAuthAccountWhereUniqueInput
    /**
     * In case the OAuthAccount found by the `where` argument doesn't exist, create a new OAuthAccount with this data.
     */
    create: XOR<OAuthAccountCreateInput, OAuthAccountUncheckedCreateInput>
    /**
     * In case the OAuthAccount was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OAuthAccountUpdateInput, OAuthAccountUncheckedUpdateInput>
  }

  /**
   * OAuthAccount delete
   */
  export type OAuthAccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAccount
     */
    select?: OAuthAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAccount
     */
    omit?: OAuthAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAccountInclude<ExtArgs> | null
    /**
     * Filter which OAuthAccount to delete.
     */
    where: OAuthAccountWhereUniqueInput
  }

  /**
   * OAuthAccount deleteMany
   */
  export type OAuthAccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OAuthAccounts to delete
     */
    where?: OAuthAccountWhereInput
    /**
     * Limit how many OAuthAccounts to delete.
     */
    limit?: number
  }

  /**
   * OAuthAccount without action
   */
  export type OAuthAccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAccount
     */
    select?: OAuthAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAccount
     */
    omit?: OAuthAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAccountInclude<ExtArgs> | null
  }


  /**
   * Model Project
   */

  export type AggregateProject = {
    _count: ProjectCountAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  export type ProjectMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    isPersonal: boolean | null
    listOfSection: string | null
    createdAt: Date | null
    owner: string | null
  }

  export type ProjectMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    isPersonal: boolean | null
    listOfSection: string | null
    createdAt: Date | null
    owner: string | null
  }

  export type ProjectCountAggregateOutputType = {
    id: number
    name: number
    description: number
    isPersonal: number
    listOfSection: number
    createdAt: number
    owner: number
    _all: number
  }


  export type ProjectMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    isPersonal?: true
    listOfSection?: true
    createdAt?: true
    owner?: true
  }

  export type ProjectMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    isPersonal?: true
    listOfSection?: true
    createdAt?: true
    owner?: true
  }

  export type ProjectCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    isPersonal?: true
    listOfSection?: true
    createdAt?: true
    owner?: true
    _all?: true
  }

  export type ProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Project to aggregate.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Projects
    **/
    _count?: true | ProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMaxAggregateInputType
  }

  export type GetProjectAggregateType<T extends ProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProject[P]>
      : GetScalarType<T[P], AggregateProject[P]>
  }




  export type ProjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithAggregationInput | ProjectOrderByWithAggregationInput[]
    by: ProjectScalarFieldEnum[] | ProjectScalarFieldEnum
    having?: ProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectCountAggregateInputType | true
    _min?: ProjectMinAggregateInputType
    _max?: ProjectMaxAggregateInputType
  }

  export type ProjectGroupByOutputType = {
    id: string
    name: string
    description: string | null
    isPersonal: boolean
    listOfSection: string
    createdAt: Date
    owner: string
    _count: ProjectCountAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  type GetProjectGroupByPayload<T extends ProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectGroupByOutputType[P]>
        }
      >
    >


  export type ProjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    isPersonal?: boolean
    listOfSection?: boolean
    createdAt?: boolean
    owner?: boolean
    sections?: boolean | Project$sectionsArgs<ExtArgs>
    tasks?: boolean | Project$tasksArgs<ExtArgs>
    invitations?: boolean | Project$invitationsArgs<ExtArgs>
    members?: boolean | Project$membersArgs<ExtArgs>
    roles?: boolean | Project$rolesArgs<ExtArgs>
    own?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    isPersonal?: boolean
    listOfSection?: boolean
    createdAt?: boolean
    owner?: boolean
    own?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    isPersonal?: boolean
    listOfSection?: boolean
    createdAt?: boolean
    owner?: boolean
    own?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    isPersonal?: boolean
    listOfSection?: boolean
    createdAt?: boolean
    owner?: boolean
  }

  export type ProjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "isPersonal" | "listOfSection" | "createdAt" | "owner", ExtArgs["result"]["project"]>
  export type ProjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sections?: boolean | Project$sectionsArgs<ExtArgs>
    tasks?: boolean | Project$tasksArgs<ExtArgs>
    invitations?: boolean | Project$invitationsArgs<ExtArgs>
    members?: boolean | Project$membersArgs<ExtArgs>
    roles?: boolean | Project$rolesArgs<ExtArgs>
    own?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProjectIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    own?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProjectIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    own?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ProjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Project"
    objects: {
      sections: Prisma.$SectionPayload<ExtArgs>[]
      tasks: Prisma.$TaskPayload<ExtArgs>[]
      invitations: Prisma.$ProjectInvitationPayload<ExtArgs>[]
      members: Prisma.$UserInProjectPayload<ExtArgs>[]
      roles: Prisma.$RolePayload<ExtArgs>[]
      own: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      isPersonal: boolean
      listOfSection: string
      createdAt: Date
      owner: string
    }, ExtArgs["result"]["project"]>
    composites: {}
  }

  type ProjectGetPayload<S extends boolean | null | undefined | ProjectDefaultArgs> = $Result.GetResult<Prisma.$ProjectPayload, S>

  type ProjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectCountAggregateInputType | true
    }

  export interface ProjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Project'], meta: { name: 'Project' } }
    /**
     * Find zero or one Project that matches the filter.
     * @param {ProjectFindUniqueArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectFindUniqueArgs>(args: SelectSubset<T, ProjectFindUniqueArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Project that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectFindUniqueOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectFindFirstArgs>(args?: SelectSubset<T, ProjectFindFirstArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.project.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.project.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectWithIdOnly = await prisma.project.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectFindManyArgs>(args?: SelectSubset<T, ProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Project.
     * @param {ProjectCreateArgs} args - Arguments to create a Project.
     * @example
     * // Create one Project
     * const Project = await prisma.project.create({
     *   data: {
     *     // ... data to create a Project
     *   }
     * })
     * 
     */
    create<T extends ProjectCreateArgs>(args: SelectSubset<T, ProjectCreateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Projects.
     * @param {ProjectCreateManyArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectCreateManyArgs>(args?: SelectSubset<T, ProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Projects and returns the data saved in the database.
     * @param {ProjectCreateManyAndReturnArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Project.
     * @param {ProjectDeleteArgs} args - Arguments to delete one Project.
     * @example
     * // Delete one Project
     * const Project = await prisma.project.delete({
     *   where: {
     *     // ... filter to delete one Project
     *   }
     * })
     * 
     */
    delete<T extends ProjectDeleteArgs>(args: SelectSubset<T, ProjectDeleteArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Project.
     * @param {ProjectUpdateArgs} args - Arguments to update one Project.
     * @example
     * // Update one Project
     * const project = await prisma.project.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectUpdateArgs>(args: SelectSubset<T, ProjectUpdateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Projects.
     * @param {ProjectDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.project.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectDeleteManyArgs>(args?: SelectSubset<T, ProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectUpdateManyArgs>(args: SelectSubset<T, ProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects and returns the data updated in the database.
     * @param {ProjectUpdateManyAndReturnArgs} args - Arguments to update many Projects.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Project.
     * @param {ProjectUpsertArgs} args - Arguments to update or create a Project.
     * @example
     * // Update or create a Project
     * const project = await prisma.project.upsert({
     *   create: {
     *     // ... data to create a Project
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Project we want to update
     *   }
     * })
     */
    upsert<T extends ProjectUpsertArgs>(args: SelectSubset<T, ProjectUpsertArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.project.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends ProjectCountArgs>(
      args?: Subset<T, ProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectAggregateArgs>(args: Subset<T, ProjectAggregateArgs>): Prisma.PrismaPromise<GetProjectAggregateType<T>>

    /**
     * Group by Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectGroupByArgs['orderBy'] }
        : { orderBy?: ProjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Project model
   */
  readonly fields: ProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Project.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sections<T extends Project$sectionsArgs<ExtArgs> = {}>(args?: Subset<T, Project$sectionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tasks<T extends Project$tasksArgs<ExtArgs> = {}>(args?: Subset<T, Project$tasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    invitations<T extends Project$invitationsArgs<ExtArgs> = {}>(args?: Subset<T, Project$invitationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectInvitationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    members<T extends Project$membersArgs<ExtArgs> = {}>(args?: Subset<T, Project$membersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserInProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    roles<T extends Project$rolesArgs<ExtArgs> = {}>(args?: Subset<T, Project$rolesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    own<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Project model
   */
  interface ProjectFieldRefs {
    readonly id: FieldRef<"Project", 'String'>
    readonly name: FieldRef<"Project", 'String'>
    readonly description: FieldRef<"Project", 'String'>
    readonly isPersonal: FieldRef<"Project", 'Boolean'>
    readonly listOfSection: FieldRef<"Project", 'String'>
    readonly createdAt: FieldRef<"Project", 'DateTime'>
    readonly owner: FieldRef<"Project", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Project findUnique
   */
  export type ProjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findUniqueOrThrow
   */
  export type ProjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findFirst
   */
  export type ProjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findFirstOrThrow
   */
  export type ProjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findMany
   */
  export type ProjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Projects to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project create
   */
  export type ProjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to create a Project.
     */
    data: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
  }

  /**
   * Project createMany
   */
  export type ProjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Project createManyAndReturn
   */
  export type ProjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Project update
   */
  export type ProjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to update a Project.
     */
    data: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
    /**
     * Choose, which Project to update.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project updateMany
   */
  export type ProjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project updateManyAndReturn
   */
  export type ProjectUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Project upsert
   */
  export type ProjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The filter to search for the Project to update in case it exists.
     */
    where: ProjectWhereUniqueInput
    /**
     * In case the Project found by the `where` argument doesn't exist, create a new Project with this data.
     */
    create: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
    /**
     * In case the Project was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
  }

  /**
   * Project delete
   */
  export type ProjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter which Project to delete.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project deleteMany
   */
  export type ProjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Projects to delete
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to delete.
     */
    limit?: number
  }

  /**
   * Project.sections
   */
  export type Project$sectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    where?: SectionWhereInput
    orderBy?: SectionOrderByWithRelationInput | SectionOrderByWithRelationInput[]
    cursor?: SectionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SectionScalarFieldEnum | SectionScalarFieldEnum[]
  }

  /**
   * Project.tasks
   */
  export type Project$tasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Project.invitations
   */
  export type Project$invitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectInvitation
     */
    select?: ProjectInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectInvitation
     */
    omit?: ProjectInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInvitationInclude<ExtArgs> | null
    where?: ProjectInvitationWhereInput
    orderBy?: ProjectInvitationOrderByWithRelationInput | ProjectInvitationOrderByWithRelationInput[]
    cursor?: ProjectInvitationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectInvitationScalarFieldEnum | ProjectInvitationScalarFieldEnum[]
  }

  /**
   * Project.members
   */
  export type Project$membersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInProject
     */
    select?: UserInProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInProject
     */
    omit?: UserInProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInProjectInclude<ExtArgs> | null
    where?: UserInProjectWhereInput
    orderBy?: UserInProjectOrderByWithRelationInput | UserInProjectOrderByWithRelationInput[]
    cursor?: UserInProjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserInProjectScalarFieldEnum | UserInProjectScalarFieldEnum[]
  }

  /**
   * Project.roles
   */
  export type Project$rolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    where?: RoleWhereInput
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    cursor?: RoleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
  }

  /**
   * Project without action
   */
  export type ProjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
  }


  /**
   * Model Section
   */

  export type AggregateSection = {
    _count: SectionCountAggregateOutputType | null
    _min: SectionMinAggregateOutputType | null
    _max: SectionMaxAggregateOutputType | null
  }

  export type SectionMinAggregateOutputType = {
    id: string | null
    name: string | null
    listOfTask: string | null
    createdAt: Date | null
    projectId: string | null
  }

  export type SectionMaxAggregateOutputType = {
    id: string | null
    name: string | null
    listOfTask: string | null
    createdAt: Date | null
    projectId: string | null
  }

  export type SectionCountAggregateOutputType = {
    id: number
    name: number
    listOfTask: number
    createdAt: number
    projectId: number
    _all: number
  }


  export type SectionMinAggregateInputType = {
    id?: true
    name?: true
    listOfTask?: true
    createdAt?: true
    projectId?: true
  }

  export type SectionMaxAggregateInputType = {
    id?: true
    name?: true
    listOfTask?: true
    createdAt?: true
    projectId?: true
  }

  export type SectionCountAggregateInputType = {
    id?: true
    name?: true
    listOfTask?: true
    createdAt?: true
    projectId?: true
    _all?: true
  }

  export type SectionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Section to aggregate.
     */
    where?: SectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sections to fetch.
     */
    orderBy?: SectionOrderByWithRelationInput | SectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sections
    **/
    _count?: true | SectionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SectionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SectionMaxAggregateInputType
  }

  export type GetSectionAggregateType<T extends SectionAggregateArgs> = {
        [P in keyof T & keyof AggregateSection]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSection[P]>
      : GetScalarType<T[P], AggregateSection[P]>
  }




  export type SectionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SectionWhereInput
    orderBy?: SectionOrderByWithAggregationInput | SectionOrderByWithAggregationInput[]
    by: SectionScalarFieldEnum[] | SectionScalarFieldEnum
    having?: SectionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SectionCountAggregateInputType | true
    _min?: SectionMinAggregateInputType
    _max?: SectionMaxAggregateInputType
  }

  export type SectionGroupByOutputType = {
    id: string
    name: string
    listOfTask: string
    createdAt: Date
    projectId: string
    _count: SectionCountAggregateOutputType | null
    _min: SectionMinAggregateOutputType | null
    _max: SectionMaxAggregateOutputType | null
  }

  type GetSectionGroupByPayload<T extends SectionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SectionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SectionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SectionGroupByOutputType[P]>
            : GetScalarType<T[P], SectionGroupByOutputType[P]>
        }
      >
    >


  export type SectionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    listOfTask?: boolean
    createdAt?: boolean
    projectId?: boolean
    has?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["section"]>

  export type SectionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    listOfTask?: boolean
    createdAt?: boolean
    projectId?: boolean
    has?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["section"]>

  export type SectionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    listOfTask?: boolean
    createdAt?: boolean
    projectId?: boolean
    has?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["section"]>

  export type SectionSelectScalar = {
    id?: boolean
    name?: boolean
    listOfTask?: boolean
    createdAt?: boolean
    projectId?: boolean
  }

  export type SectionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "listOfTask" | "createdAt" | "projectId", ExtArgs["result"]["section"]>
  export type SectionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    has?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type SectionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    has?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type SectionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    has?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $SectionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Section"
    objects: {
      has: Prisma.$ProjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      listOfTask: string
      createdAt: Date
      projectId: string
    }, ExtArgs["result"]["section"]>
    composites: {}
  }

  type SectionGetPayload<S extends boolean | null | undefined | SectionDefaultArgs> = $Result.GetResult<Prisma.$SectionPayload, S>

  type SectionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SectionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SectionCountAggregateInputType | true
    }

  export interface SectionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Section'], meta: { name: 'Section' } }
    /**
     * Find zero or one Section that matches the filter.
     * @param {SectionFindUniqueArgs} args - Arguments to find a Section
     * @example
     * // Get one Section
     * const section = await prisma.section.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SectionFindUniqueArgs>(args: SelectSubset<T, SectionFindUniqueArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Section that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SectionFindUniqueOrThrowArgs} args - Arguments to find a Section
     * @example
     * // Get one Section
     * const section = await prisma.section.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SectionFindUniqueOrThrowArgs>(args: SelectSubset<T, SectionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Section that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionFindFirstArgs} args - Arguments to find a Section
     * @example
     * // Get one Section
     * const section = await prisma.section.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SectionFindFirstArgs>(args?: SelectSubset<T, SectionFindFirstArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Section that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionFindFirstOrThrowArgs} args - Arguments to find a Section
     * @example
     * // Get one Section
     * const section = await prisma.section.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SectionFindFirstOrThrowArgs>(args?: SelectSubset<T, SectionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sections that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sections
     * const sections = await prisma.section.findMany()
     * 
     * // Get first 10 Sections
     * const sections = await prisma.section.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sectionWithIdOnly = await prisma.section.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SectionFindManyArgs>(args?: SelectSubset<T, SectionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Section.
     * @param {SectionCreateArgs} args - Arguments to create a Section.
     * @example
     * // Create one Section
     * const Section = await prisma.section.create({
     *   data: {
     *     // ... data to create a Section
     *   }
     * })
     * 
     */
    create<T extends SectionCreateArgs>(args: SelectSubset<T, SectionCreateArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sections.
     * @param {SectionCreateManyArgs} args - Arguments to create many Sections.
     * @example
     * // Create many Sections
     * const section = await prisma.section.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SectionCreateManyArgs>(args?: SelectSubset<T, SectionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sections and returns the data saved in the database.
     * @param {SectionCreateManyAndReturnArgs} args - Arguments to create many Sections.
     * @example
     * // Create many Sections
     * const section = await prisma.section.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sections and only return the `id`
     * const sectionWithIdOnly = await prisma.section.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SectionCreateManyAndReturnArgs>(args?: SelectSubset<T, SectionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Section.
     * @param {SectionDeleteArgs} args - Arguments to delete one Section.
     * @example
     * // Delete one Section
     * const Section = await prisma.section.delete({
     *   where: {
     *     // ... filter to delete one Section
     *   }
     * })
     * 
     */
    delete<T extends SectionDeleteArgs>(args: SelectSubset<T, SectionDeleteArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Section.
     * @param {SectionUpdateArgs} args - Arguments to update one Section.
     * @example
     * // Update one Section
     * const section = await prisma.section.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SectionUpdateArgs>(args: SelectSubset<T, SectionUpdateArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sections.
     * @param {SectionDeleteManyArgs} args - Arguments to filter Sections to delete.
     * @example
     * // Delete a few Sections
     * const { count } = await prisma.section.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SectionDeleteManyArgs>(args?: SelectSubset<T, SectionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sections
     * const section = await prisma.section.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SectionUpdateManyArgs>(args: SelectSubset<T, SectionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sections and returns the data updated in the database.
     * @param {SectionUpdateManyAndReturnArgs} args - Arguments to update many Sections.
     * @example
     * // Update many Sections
     * const section = await prisma.section.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sections and only return the `id`
     * const sectionWithIdOnly = await prisma.section.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SectionUpdateManyAndReturnArgs>(args: SelectSubset<T, SectionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Section.
     * @param {SectionUpsertArgs} args - Arguments to update or create a Section.
     * @example
     * // Update or create a Section
     * const section = await prisma.section.upsert({
     *   create: {
     *     // ... data to create a Section
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Section we want to update
     *   }
     * })
     */
    upsert<T extends SectionUpsertArgs>(args: SelectSubset<T, SectionUpsertArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionCountArgs} args - Arguments to filter Sections to count.
     * @example
     * // Count the number of Sections
     * const count = await prisma.section.count({
     *   where: {
     *     // ... the filter for the Sections we want to count
     *   }
     * })
    **/
    count<T extends SectionCountArgs>(
      args?: Subset<T, SectionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SectionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Section.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SectionAggregateArgs>(args: Subset<T, SectionAggregateArgs>): Prisma.PrismaPromise<GetSectionAggregateType<T>>

    /**
     * Group by Section.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SectionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SectionGroupByArgs['orderBy'] }
        : { orderBy?: SectionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SectionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSectionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Section model
   */
  readonly fields: SectionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Section.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SectionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    has<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Section model
   */
  interface SectionFieldRefs {
    readonly id: FieldRef<"Section", 'String'>
    readonly name: FieldRef<"Section", 'String'>
    readonly listOfTask: FieldRef<"Section", 'String'>
    readonly createdAt: FieldRef<"Section", 'DateTime'>
    readonly projectId: FieldRef<"Section", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Section findUnique
   */
  export type SectionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * Filter, which Section to fetch.
     */
    where: SectionWhereUniqueInput
  }

  /**
   * Section findUniqueOrThrow
   */
  export type SectionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * Filter, which Section to fetch.
     */
    where: SectionWhereUniqueInput
  }

  /**
   * Section findFirst
   */
  export type SectionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * Filter, which Section to fetch.
     */
    where?: SectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sections to fetch.
     */
    orderBy?: SectionOrderByWithRelationInput | SectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sections.
     */
    cursor?: SectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sections.
     */
    distinct?: SectionScalarFieldEnum | SectionScalarFieldEnum[]
  }

  /**
   * Section findFirstOrThrow
   */
  export type SectionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * Filter, which Section to fetch.
     */
    where?: SectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sections to fetch.
     */
    orderBy?: SectionOrderByWithRelationInput | SectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sections.
     */
    cursor?: SectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sections.
     */
    distinct?: SectionScalarFieldEnum | SectionScalarFieldEnum[]
  }

  /**
   * Section findMany
   */
  export type SectionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * Filter, which Sections to fetch.
     */
    where?: SectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sections to fetch.
     */
    orderBy?: SectionOrderByWithRelationInput | SectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sections.
     */
    cursor?: SectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sections.
     */
    skip?: number
    distinct?: SectionScalarFieldEnum | SectionScalarFieldEnum[]
  }

  /**
   * Section create
   */
  export type SectionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * The data needed to create a Section.
     */
    data: XOR<SectionCreateInput, SectionUncheckedCreateInput>
  }

  /**
   * Section createMany
   */
  export type SectionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sections.
     */
    data: SectionCreateManyInput | SectionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Section createManyAndReturn
   */
  export type SectionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * The data used to create many Sections.
     */
    data: SectionCreateManyInput | SectionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Section update
   */
  export type SectionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * The data needed to update a Section.
     */
    data: XOR<SectionUpdateInput, SectionUncheckedUpdateInput>
    /**
     * Choose, which Section to update.
     */
    where: SectionWhereUniqueInput
  }

  /**
   * Section updateMany
   */
  export type SectionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sections.
     */
    data: XOR<SectionUpdateManyMutationInput, SectionUncheckedUpdateManyInput>
    /**
     * Filter which Sections to update
     */
    where?: SectionWhereInput
    /**
     * Limit how many Sections to update.
     */
    limit?: number
  }

  /**
   * Section updateManyAndReturn
   */
  export type SectionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * The data used to update Sections.
     */
    data: XOR<SectionUpdateManyMutationInput, SectionUncheckedUpdateManyInput>
    /**
     * Filter which Sections to update
     */
    where?: SectionWhereInput
    /**
     * Limit how many Sections to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Section upsert
   */
  export type SectionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * The filter to search for the Section to update in case it exists.
     */
    where: SectionWhereUniqueInput
    /**
     * In case the Section found by the `where` argument doesn't exist, create a new Section with this data.
     */
    create: XOR<SectionCreateInput, SectionUncheckedCreateInput>
    /**
     * In case the Section was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SectionUpdateInput, SectionUncheckedUpdateInput>
  }

  /**
   * Section delete
   */
  export type SectionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * Filter which Section to delete.
     */
    where: SectionWhereUniqueInput
  }

  /**
   * Section deleteMany
   */
  export type SectionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sections to delete
     */
    where?: SectionWhereInput
    /**
     * Limit how many Sections to delete.
     */
    limit?: number
  }

  /**
   * Section without action
   */
  export type SectionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
  }


  /**
   * Model Task
   */

  export type AggregateTask = {
    _count: TaskCountAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  export type TaskMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    status: $Enums.TaskStatus | null
    priority: $Enums.PriorityLevel | null
    startDate: Date | null
    dueDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    sectionId: string | null
    parentTaskId: string | null
    supervisorId: string | null
    projectId: string | null
  }

  export type TaskMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    status: $Enums.TaskStatus | null
    priority: $Enums.PriorityLevel | null
    startDate: Date | null
    dueDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    sectionId: string | null
    parentTaskId: string | null
    supervisorId: string | null
    projectId: string | null
  }

  export type TaskCountAggregateOutputType = {
    id: number
    title: number
    description: number
    status: number
    priority: number
    startDate: number
    dueDate: number
    createdAt: number
    updatedAt: number
    sectionId: number
    parentTaskId: number
    supervisorId: number
    projectId: number
    _all: number
  }


  export type TaskMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    status?: true
    priority?: true
    startDate?: true
    dueDate?: true
    createdAt?: true
    updatedAt?: true
    sectionId?: true
    parentTaskId?: true
    supervisorId?: true
    projectId?: true
  }

  export type TaskMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    status?: true
    priority?: true
    startDate?: true
    dueDate?: true
    createdAt?: true
    updatedAt?: true
    sectionId?: true
    parentTaskId?: true
    supervisorId?: true
    projectId?: true
  }

  export type TaskCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    status?: true
    priority?: true
    startDate?: true
    dueDate?: true
    createdAt?: true
    updatedAt?: true
    sectionId?: true
    parentTaskId?: true
    supervisorId?: true
    projectId?: true
    _all?: true
  }

  export type TaskAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Task to aggregate.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tasks
    **/
    _count?: true | TaskCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskMaxAggregateInputType
  }

  export type GetTaskAggregateType<T extends TaskAggregateArgs> = {
        [P in keyof T & keyof AggregateTask]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTask[P]>
      : GetScalarType<T[P], AggregateTask[P]>
  }




  export type TaskGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithAggregationInput | TaskOrderByWithAggregationInput[]
    by: TaskScalarFieldEnum[] | TaskScalarFieldEnum
    having?: TaskScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskCountAggregateInputType | true
    _min?: TaskMinAggregateInputType
    _max?: TaskMaxAggregateInputType
  }

  export type TaskGroupByOutputType = {
    id: string
    title: string
    description: string | null
    status: $Enums.TaskStatus
    priority: $Enums.PriorityLevel | null
    startDate: Date | null
    dueDate: Date | null
    createdAt: Date
    updatedAt: Date
    sectionId: string
    parentTaskId: string | null
    supervisorId: string | null
    projectId: string
    _count: TaskCountAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  type GetTaskGroupByPayload<T extends TaskGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskGroupByOutputType[P]>
            : GetScalarType<T[P], TaskGroupByOutputType[P]>
        }
      >
    >


  export type TaskSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    priority?: boolean
    startDate?: boolean
    dueDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sectionId?: boolean
    parentTaskId?: boolean
    supervisorId?: boolean
    projectId?: boolean
    assignees?: boolean | Task$assigneesArgs<ExtArgs>
    subtasks?: boolean | Task$subtasksArgs<ExtArgs>
    comments?: boolean | Task$commentsArgs<ExtArgs>
    parent?: boolean | Task$parentArgs<ExtArgs>
    supervisor?: boolean | Task$supervisorArgs<ExtArgs>
    belongsToProject?: boolean | ProjectDefaultArgs<ExtArgs>
    _count?: boolean | TaskCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    priority?: boolean
    startDate?: boolean
    dueDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sectionId?: boolean
    parentTaskId?: boolean
    supervisorId?: boolean
    projectId?: boolean
    parent?: boolean | Task$parentArgs<ExtArgs>
    supervisor?: boolean | Task$supervisorArgs<ExtArgs>
    belongsToProject?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    priority?: boolean
    startDate?: boolean
    dueDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sectionId?: boolean
    parentTaskId?: boolean
    supervisorId?: boolean
    projectId?: boolean
    parent?: boolean | Task$parentArgs<ExtArgs>
    supervisor?: boolean | Task$supervisorArgs<ExtArgs>
    belongsToProject?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    priority?: boolean
    startDate?: boolean
    dueDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sectionId?: boolean
    parentTaskId?: boolean
    supervisorId?: boolean
    projectId?: boolean
  }

  export type TaskOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "status" | "priority" | "startDate" | "dueDate" | "createdAt" | "updatedAt" | "sectionId" | "parentTaskId" | "supervisorId" | "projectId", ExtArgs["result"]["task"]>
  export type TaskInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignees?: boolean | Task$assigneesArgs<ExtArgs>
    subtasks?: boolean | Task$subtasksArgs<ExtArgs>
    comments?: boolean | Task$commentsArgs<ExtArgs>
    parent?: boolean | Task$parentArgs<ExtArgs>
    supervisor?: boolean | Task$supervisorArgs<ExtArgs>
    belongsToProject?: boolean | ProjectDefaultArgs<ExtArgs>
    _count?: boolean | TaskCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TaskIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | Task$parentArgs<ExtArgs>
    supervisor?: boolean | Task$supervisorArgs<ExtArgs>
    belongsToProject?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type TaskIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | Task$parentArgs<ExtArgs>
    supervisor?: boolean | Task$supervisorArgs<ExtArgs>
    belongsToProject?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $TaskPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Task"
    objects: {
      assignees: Prisma.$TaskOfUserPayload<ExtArgs>[]
      subtasks: Prisma.$TaskPayload<ExtArgs>[]
      comments: Prisma.$CommentPayload<ExtArgs>[]
      parent: Prisma.$TaskPayload<ExtArgs> | null
      supervisor: Prisma.$UserPayload<ExtArgs> | null
      belongsToProject: Prisma.$ProjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string | null
      status: $Enums.TaskStatus
      priority: $Enums.PriorityLevel | null
      startDate: Date | null
      dueDate: Date | null
      createdAt: Date
      updatedAt: Date
      sectionId: string
      parentTaskId: string | null
      supervisorId: string | null
      projectId: string
    }, ExtArgs["result"]["task"]>
    composites: {}
  }

  type TaskGetPayload<S extends boolean | null | undefined | TaskDefaultArgs> = $Result.GetResult<Prisma.$TaskPayload, S>

  type TaskCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TaskFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TaskCountAggregateInputType | true
    }

  export interface TaskDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Task'], meta: { name: 'Task' } }
    /**
     * Find zero or one Task that matches the filter.
     * @param {TaskFindUniqueArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskFindUniqueArgs>(args: SelectSubset<T, TaskFindUniqueArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Task that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TaskFindUniqueOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskFindFirstArgs>(args?: SelectSubset<T, TaskFindFirstArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tasks
     * const tasks = await prisma.task.findMany()
     * 
     * // Get first 10 Tasks
     * const tasks = await prisma.task.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const taskWithIdOnly = await prisma.task.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TaskFindManyArgs>(args?: SelectSubset<T, TaskFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Task.
     * @param {TaskCreateArgs} args - Arguments to create a Task.
     * @example
     * // Create one Task
     * const Task = await prisma.task.create({
     *   data: {
     *     // ... data to create a Task
     *   }
     * })
     * 
     */
    create<T extends TaskCreateArgs>(args: SelectSubset<T, TaskCreateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tasks.
     * @param {TaskCreateManyArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskCreateManyArgs>(args?: SelectSubset<T, TaskCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tasks and returns the data saved in the database.
     * @param {TaskCreateManyAndReturnArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tasks and only return the `id`
     * const taskWithIdOnly = await prisma.task.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TaskCreateManyAndReturnArgs>(args?: SelectSubset<T, TaskCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Task.
     * @param {TaskDeleteArgs} args - Arguments to delete one Task.
     * @example
     * // Delete one Task
     * const Task = await prisma.task.delete({
     *   where: {
     *     // ... filter to delete one Task
     *   }
     * })
     * 
     */
    delete<T extends TaskDeleteArgs>(args: SelectSubset<T, TaskDeleteArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Task.
     * @param {TaskUpdateArgs} args - Arguments to update one Task.
     * @example
     * // Update one Task
     * const task = await prisma.task.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskUpdateArgs>(args: SelectSubset<T, TaskUpdateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tasks.
     * @param {TaskDeleteManyArgs} args - Arguments to filter Tasks to delete.
     * @example
     * // Delete a few Tasks
     * const { count } = await prisma.task.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskDeleteManyArgs>(args?: SelectSubset<T, TaskDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskUpdateManyArgs>(args: SelectSubset<T, TaskUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks and returns the data updated in the database.
     * @param {TaskUpdateManyAndReturnArgs} args - Arguments to update many Tasks.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tasks and only return the `id`
     * const taskWithIdOnly = await prisma.task.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TaskUpdateManyAndReturnArgs>(args: SelectSubset<T, TaskUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Task.
     * @param {TaskUpsertArgs} args - Arguments to update or create a Task.
     * @example
     * // Update or create a Task
     * const task = await prisma.task.upsert({
     *   create: {
     *     // ... data to create a Task
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Task we want to update
     *   }
     * })
     */
    upsert<T extends TaskUpsertArgs>(args: SelectSubset<T, TaskUpsertArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCountArgs} args - Arguments to filter Tasks to count.
     * @example
     * // Count the number of Tasks
     * const count = await prisma.task.count({
     *   where: {
     *     // ... the filter for the Tasks we want to count
     *   }
     * })
    **/
    count<T extends TaskCountArgs>(
      args?: Subset<T, TaskCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TaskAggregateArgs>(args: Subset<T, TaskAggregateArgs>): Prisma.PrismaPromise<GetTaskAggregateType<T>>

    /**
     * Group by Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TaskGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskGroupByArgs['orderBy'] }
        : { orderBy?: TaskGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TaskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Task model
   */
  readonly fields: TaskFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Task.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    assignees<T extends Task$assigneesArgs<ExtArgs> = {}>(args?: Subset<T, Task$assigneesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskOfUserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    subtasks<T extends Task$subtasksArgs<ExtArgs> = {}>(args?: Subset<T, Task$subtasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    comments<T extends Task$commentsArgs<ExtArgs> = {}>(args?: Subset<T, Task$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    parent<T extends Task$parentArgs<ExtArgs> = {}>(args?: Subset<T, Task$parentArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    supervisor<T extends Task$supervisorArgs<ExtArgs> = {}>(args?: Subset<T, Task$supervisorArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    belongsToProject<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Task model
   */
  interface TaskFieldRefs {
    readonly id: FieldRef<"Task", 'String'>
    readonly title: FieldRef<"Task", 'String'>
    readonly description: FieldRef<"Task", 'String'>
    readonly status: FieldRef<"Task", 'TaskStatus'>
    readonly priority: FieldRef<"Task", 'PriorityLevel'>
    readonly startDate: FieldRef<"Task", 'DateTime'>
    readonly dueDate: FieldRef<"Task", 'DateTime'>
    readonly createdAt: FieldRef<"Task", 'DateTime'>
    readonly updatedAt: FieldRef<"Task", 'DateTime'>
    readonly sectionId: FieldRef<"Task", 'String'>
    readonly parentTaskId: FieldRef<"Task", 'String'>
    readonly supervisorId: FieldRef<"Task", 'String'>
    readonly projectId: FieldRef<"Task", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Task findUnique
   */
  export type TaskFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findUniqueOrThrow
   */
  export type TaskFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findFirst
   */
  export type TaskFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findFirstOrThrow
   */
  export type TaskFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findMany
   */
  export type TaskFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Tasks to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task create
   */
  export type TaskCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to create a Task.
     */
    data: XOR<TaskCreateInput, TaskUncheckedCreateInput>
  }

  /**
   * Task createMany
   */
  export type TaskCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Task createManyAndReturn
   */
  export type TaskCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Task update
   */
  export type TaskUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to update a Task.
     */
    data: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
    /**
     * Choose, which Task to update.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task updateMany
   */
  export type TaskUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to update.
     */
    limit?: number
  }

  /**
   * Task updateManyAndReturn
   */
  export type TaskUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Task upsert
   */
  export type TaskUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The filter to search for the Task to update in case it exists.
     */
    where: TaskWhereUniqueInput
    /**
     * In case the Task found by the `where` argument doesn't exist, create a new Task with this data.
     */
    create: XOR<TaskCreateInput, TaskUncheckedCreateInput>
    /**
     * In case the Task was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
  }

  /**
   * Task delete
   */
  export type TaskDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter which Task to delete.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task deleteMany
   */
  export type TaskDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tasks to delete
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to delete.
     */
    limit?: number
  }

  /**
   * Task.assignees
   */
  export type Task$assigneesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskOfUser
     */
    select?: TaskOfUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskOfUser
     */
    omit?: TaskOfUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskOfUserInclude<ExtArgs> | null
    where?: TaskOfUserWhereInput
    orderBy?: TaskOfUserOrderByWithRelationInput | TaskOfUserOrderByWithRelationInput[]
    cursor?: TaskOfUserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskOfUserScalarFieldEnum | TaskOfUserScalarFieldEnum[]
  }

  /**
   * Task.subtasks
   */
  export type Task$subtasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task.comments
   */
  export type Task$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    cursor?: CommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Task.parent
   */
  export type Task$parentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
  }

  /**
   * Task.supervisor
   */
  export type Task$supervisorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Task without action
   */
  export type TaskDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
  }


  /**
   * Model TaskOfUser
   */

  export type AggregateTaskOfUser = {
    _count: TaskOfUserCountAggregateOutputType | null
    _min: TaskOfUserMinAggregateOutputType | null
    _max: TaskOfUserMaxAggregateOutputType | null
  }

  export type TaskOfUserMinAggregateOutputType = {
    taskId: string | null
    userId: string | null
  }

  export type TaskOfUserMaxAggregateOutputType = {
    taskId: string | null
    userId: string | null
  }

  export type TaskOfUserCountAggregateOutputType = {
    taskId: number
    userId: number
    _all: number
  }


  export type TaskOfUserMinAggregateInputType = {
    taskId?: true
    userId?: true
  }

  export type TaskOfUserMaxAggregateInputType = {
    taskId?: true
    userId?: true
  }

  export type TaskOfUserCountAggregateInputType = {
    taskId?: true
    userId?: true
    _all?: true
  }

  export type TaskOfUserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TaskOfUser to aggregate.
     */
    where?: TaskOfUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskOfUsers to fetch.
     */
    orderBy?: TaskOfUserOrderByWithRelationInput | TaskOfUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskOfUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskOfUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskOfUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TaskOfUsers
    **/
    _count?: true | TaskOfUserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskOfUserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskOfUserMaxAggregateInputType
  }

  export type GetTaskOfUserAggregateType<T extends TaskOfUserAggregateArgs> = {
        [P in keyof T & keyof AggregateTaskOfUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTaskOfUser[P]>
      : GetScalarType<T[P], AggregateTaskOfUser[P]>
  }




  export type TaskOfUserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskOfUserWhereInput
    orderBy?: TaskOfUserOrderByWithAggregationInput | TaskOfUserOrderByWithAggregationInput[]
    by: TaskOfUserScalarFieldEnum[] | TaskOfUserScalarFieldEnum
    having?: TaskOfUserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskOfUserCountAggregateInputType | true
    _min?: TaskOfUserMinAggregateInputType
    _max?: TaskOfUserMaxAggregateInputType
  }

  export type TaskOfUserGroupByOutputType = {
    taskId: string
    userId: string
    _count: TaskOfUserCountAggregateOutputType | null
    _min: TaskOfUserMinAggregateOutputType | null
    _max: TaskOfUserMaxAggregateOutputType | null
  }

  type GetTaskOfUserGroupByPayload<T extends TaskOfUserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskOfUserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskOfUserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskOfUserGroupByOutputType[P]>
            : GetScalarType<T[P], TaskOfUserGroupByOutputType[P]>
        }
      >
    >


  export type TaskOfUserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    taskId?: boolean
    userId?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["taskOfUser"]>

  export type TaskOfUserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    taskId?: boolean
    userId?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["taskOfUser"]>

  export type TaskOfUserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    taskId?: boolean
    userId?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["taskOfUser"]>

  export type TaskOfUserSelectScalar = {
    taskId?: boolean
    userId?: boolean
  }

  export type TaskOfUserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"taskId" | "userId", ExtArgs["result"]["taskOfUser"]>
  export type TaskOfUserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TaskOfUserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TaskOfUserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TaskOfUserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TaskOfUser"
    objects: {
      task: Prisma.$TaskPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      taskId: string
      userId: string
    }, ExtArgs["result"]["taskOfUser"]>
    composites: {}
  }

  type TaskOfUserGetPayload<S extends boolean | null | undefined | TaskOfUserDefaultArgs> = $Result.GetResult<Prisma.$TaskOfUserPayload, S>

  type TaskOfUserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TaskOfUserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TaskOfUserCountAggregateInputType | true
    }

  export interface TaskOfUserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TaskOfUser'], meta: { name: 'TaskOfUser' } }
    /**
     * Find zero or one TaskOfUser that matches the filter.
     * @param {TaskOfUserFindUniqueArgs} args - Arguments to find a TaskOfUser
     * @example
     * // Get one TaskOfUser
     * const taskOfUser = await prisma.taskOfUser.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskOfUserFindUniqueArgs>(args: SelectSubset<T, TaskOfUserFindUniqueArgs<ExtArgs>>): Prisma__TaskOfUserClient<$Result.GetResult<Prisma.$TaskOfUserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TaskOfUser that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TaskOfUserFindUniqueOrThrowArgs} args - Arguments to find a TaskOfUser
     * @example
     * // Get one TaskOfUser
     * const taskOfUser = await prisma.taskOfUser.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskOfUserFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskOfUserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskOfUserClient<$Result.GetResult<Prisma.$TaskOfUserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TaskOfUser that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskOfUserFindFirstArgs} args - Arguments to find a TaskOfUser
     * @example
     * // Get one TaskOfUser
     * const taskOfUser = await prisma.taskOfUser.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskOfUserFindFirstArgs>(args?: SelectSubset<T, TaskOfUserFindFirstArgs<ExtArgs>>): Prisma__TaskOfUserClient<$Result.GetResult<Prisma.$TaskOfUserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TaskOfUser that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskOfUserFindFirstOrThrowArgs} args - Arguments to find a TaskOfUser
     * @example
     * // Get one TaskOfUser
     * const taskOfUser = await prisma.taskOfUser.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskOfUserFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskOfUserFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskOfUserClient<$Result.GetResult<Prisma.$TaskOfUserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TaskOfUsers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskOfUserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TaskOfUsers
     * const taskOfUsers = await prisma.taskOfUser.findMany()
     * 
     * // Get first 10 TaskOfUsers
     * const taskOfUsers = await prisma.taskOfUser.findMany({ take: 10 })
     * 
     * // Only select the `taskId`
     * const taskOfUserWithTaskIdOnly = await prisma.taskOfUser.findMany({ select: { taskId: true } })
     * 
     */
    findMany<T extends TaskOfUserFindManyArgs>(args?: SelectSubset<T, TaskOfUserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskOfUserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TaskOfUser.
     * @param {TaskOfUserCreateArgs} args - Arguments to create a TaskOfUser.
     * @example
     * // Create one TaskOfUser
     * const TaskOfUser = await prisma.taskOfUser.create({
     *   data: {
     *     // ... data to create a TaskOfUser
     *   }
     * })
     * 
     */
    create<T extends TaskOfUserCreateArgs>(args: SelectSubset<T, TaskOfUserCreateArgs<ExtArgs>>): Prisma__TaskOfUserClient<$Result.GetResult<Prisma.$TaskOfUserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TaskOfUsers.
     * @param {TaskOfUserCreateManyArgs} args - Arguments to create many TaskOfUsers.
     * @example
     * // Create many TaskOfUsers
     * const taskOfUser = await prisma.taskOfUser.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskOfUserCreateManyArgs>(args?: SelectSubset<T, TaskOfUserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TaskOfUsers and returns the data saved in the database.
     * @param {TaskOfUserCreateManyAndReturnArgs} args - Arguments to create many TaskOfUsers.
     * @example
     * // Create many TaskOfUsers
     * const taskOfUser = await prisma.taskOfUser.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TaskOfUsers and only return the `taskId`
     * const taskOfUserWithTaskIdOnly = await prisma.taskOfUser.createManyAndReturn({
     *   select: { taskId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TaskOfUserCreateManyAndReturnArgs>(args?: SelectSubset<T, TaskOfUserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskOfUserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TaskOfUser.
     * @param {TaskOfUserDeleteArgs} args - Arguments to delete one TaskOfUser.
     * @example
     * // Delete one TaskOfUser
     * const TaskOfUser = await prisma.taskOfUser.delete({
     *   where: {
     *     // ... filter to delete one TaskOfUser
     *   }
     * })
     * 
     */
    delete<T extends TaskOfUserDeleteArgs>(args: SelectSubset<T, TaskOfUserDeleteArgs<ExtArgs>>): Prisma__TaskOfUserClient<$Result.GetResult<Prisma.$TaskOfUserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TaskOfUser.
     * @param {TaskOfUserUpdateArgs} args - Arguments to update one TaskOfUser.
     * @example
     * // Update one TaskOfUser
     * const taskOfUser = await prisma.taskOfUser.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskOfUserUpdateArgs>(args: SelectSubset<T, TaskOfUserUpdateArgs<ExtArgs>>): Prisma__TaskOfUserClient<$Result.GetResult<Prisma.$TaskOfUserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TaskOfUsers.
     * @param {TaskOfUserDeleteManyArgs} args - Arguments to filter TaskOfUsers to delete.
     * @example
     * // Delete a few TaskOfUsers
     * const { count } = await prisma.taskOfUser.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskOfUserDeleteManyArgs>(args?: SelectSubset<T, TaskOfUserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TaskOfUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskOfUserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TaskOfUsers
     * const taskOfUser = await prisma.taskOfUser.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskOfUserUpdateManyArgs>(args: SelectSubset<T, TaskOfUserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TaskOfUsers and returns the data updated in the database.
     * @param {TaskOfUserUpdateManyAndReturnArgs} args - Arguments to update many TaskOfUsers.
     * @example
     * // Update many TaskOfUsers
     * const taskOfUser = await prisma.taskOfUser.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TaskOfUsers and only return the `taskId`
     * const taskOfUserWithTaskIdOnly = await prisma.taskOfUser.updateManyAndReturn({
     *   select: { taskId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TaskOfUserUpdateManyAndReturnArgs>(args: SelectSubset<T, TaskOfUserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskOfUserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TaskOfUser.
     * @param {TaskOfUserUpsertArgs} args - Arguments to update or create a TaskOfUser.
     * @example
     * // Update or create a TaskOfUser
     * const taskOfUser = await prisma.taskOfUser.upsert({
     *   create: {
     *     // ... data to create a TaskOfUser
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TaskOfUser we want to update
     *   }
     * })
     */
    upsert<T extends TaskOfUserUpsertArgs>(args: SelectSubset<T, TaskOfUserUpsertArgs<ExtArgs>>): Prisma__TaskOfUserClient<$Result.GetResult<Prisma.$TaskOfUserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TaskOfUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskOfUserCountArgs} args - Arguments to filter TaskOfUsers to count.
     * @example
     * // Count the number of TaskOfUsers
     * const count = await prisma.taskOfUser.count({
     *   where: {
     *     // ... the filter for the TaskOfUsers we want to count
     *   }
     * })
    **/
    count<T extends TaskOfUserCountArgs>(
      args?: Subset<T, TaskOfUserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskOfUserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TaskOfUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskOfUserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TaskOfUserAggregateArgs>(args: Subset<T, TaskOfUserAggregateArgs>): Prisma.PrismaPromise<GetTaskOfUserAggregateType<T>>

    /**
     * Group by TaskOfUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskOfUserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TaskOfUserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskOfUserGroupByArgs['orderBy'] }
        : { orderBy?: TaskOfUserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TaskOfUserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskOfUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TaskOfUser model
   */
  readonly fields: TaskOfUserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TaskOfUser.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskOfUserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    task<T extends TaskDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TaskDefaultArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TaskOfUser model
   */
  interface TaskOfUserFieldRefs {
    readonly taskId: FieldRef<"TaskOfUser", 'String'>
    readonly userId: FieldRef<"TaskOfUser", 'String'>
  }
    

  // Custom InputTypes
  /**
   * TaskOfUser findUnique
   */
  export type TaskOfUserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskOfUser
     */
    select?: TaskOfUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskOfUser
     */
    omit?: TaskOfUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskOfUserInclude<ExtArgs> | null
    /**
     * Filter, which TaskOfUser to fetch.
     */
    where: TaskOfUserWhereUniqueInput
  }

  /**
   * TaskOfUser findUniqueOrThrow
   */
  export type TaskOfUserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskOfUser
     */
    select?: TaskOfUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskOfUser
     */
    omit?: TaskOfUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskOfUserInclude<ExtArgs> | null
    /**
     * Filter, which TaskOfUser to fetch.
     */
    where: TaskOfUserWhereUniqueInput
  }

  /**
   * TaskOfUser findFirst
   */
  export type TaskOfUserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskOfUser
     */
    select?: TaskOfUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskOfUser
     */
    omit?: TaskOfUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskOfUserInclude<ExtArgs> | null
    /**
     * Filter, which TaskOfUser to fetch.
     */
    where?: TaskOfUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskOfUsers to fetch.
     */
    orderBy?: TaskOfUserOrderByWithRelationInput | TaskOfUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TaskOfUsers.
     */
    cursor?: TaskOfUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskOfUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskOfUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TaskOfUsers.
     */
    distinct?: TaskOfUserScalarFieldEnum | TaskOfUserScalarFieldEnum[]
  }

  /**
   * TaskOfUser findFirstOrThrow
   */
  export type TaskOfUserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskOfUser
     */
    select?: TaskOfUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskOfUser
     */
    omit?: TaskOfUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskOfUserInclude<ExtArgs> | null
    /**
     * Filter, which TaskOfUser to fetch.
     */
    where?: TaskOfUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskOfUsers to fetch.
     */
    orderBy?: TaskOfUserOrderByWithRelationInput | TaskOfUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TaskOfUsers.
     */
    cursor?: TaskOfUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskOfUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskOfUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TaskOfUsers.
     */
    distinct?: TaskOfUserScalarFieldEnum | TaskOfUserScalarFieldEnum[]
  }

  /**
   * TaskOfUser findMany
   */
  export type TaskOfUserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskOfUser
     */
    select?: TaskOfUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskOfUser
     */
    omit?: TaskOfUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskOfUserInclude<ExtArgs> | null
    /**
     * Filter, which TaskOfUsers to fetch.
     */
    where?: TaskOfUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskOfUsers to fetch.
     */
    orderBy?: TaskOfUserOrderByWithRelationInput | TaskOfUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TaskOfUsers.
     */
    cursor?: TaskOfUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskOfUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskOfUsers.
     */
    skip?: number
    distinct?: TaskOfUserScalarFieldEnum | TaskOfUserScalarFieldEnum[]
  }

  /**
   * TaskOfUser create
   */
  export type TaskOfUserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskOfUser
     */
    select?: TaskOfUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskOfUser
     */
    omit?: TaskOfUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskOfUserInclude<ExtArgs> | null
    /**
     * The data needed to create a TaskOfUser.
     */
    data: XOR<TaskOfUserCreateInput, TaskOfUserUncheckedCreateInput>
  }

  /**
   * TaskOfUser createMany
   */
  export type TaskOfUserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TaskOfUsers.
     */
    data: TaskOfUserCreateManyInput | TaskOfUserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TaskOfUser createManyAndReturn
   */
  export type TaskOfUserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskOfUser
     */
    select?: TaskOfUserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TaskOfUser
     */
    omit?: TaskOfUserOmit<ExtArgs> | null
    /**
     * The data used to create many TaskOfUsers.
     */
    data: TaskOfUserCreateManyInput | TaskOfUserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskOfUserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TaskOfUser update
   */
  export type TaskOfUserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskOfUser
     */
    select?: TaskOfUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskOfUser
     */
    omit?: TaskOfUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskOfUserInclude<ExtArgs> | null
    /**
     * The data needed to update a TaskOfUser.
     */
    data: XOR<TaskOfUserUpdateInput, TaskOfUserUncheckedUpdateInput>
    /**
     * Choose, which TaskOfUser to update.
     */
    where: TaskOfUserWhereUniqueInput
  }

  /**
   * TaskOfUser updateMany
   */
  export type TaskOfUserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TaskOfUsers.
     */
    data: XOR<TaskOfUserUpdateManyMutationInput, TaskOfUserUncheckedUpdateManyInput>
    /**
     * Filter which TaskOfUsers to update
     */
    where?: TaskOfUserWhereInput
    /**
     * Limit how many TaskOfUsers to update.
     */
    limit?: number
  }

  /**
   * TaskOfUser updateManyAndReturn
   */
  export type TaskOfUserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskOfUser
     */
    select?: TaskOfUserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TaskOfUser
     */
    omit?: TaskOfUserOmit<ExtArgs> | null
    /**
     * The data used to update TaskOfUsers.
     */
    data: XOR<TaskOfUserUpdateManyMutationInput, TaskOfUserUncheckedUpdateManyInput>
    /**
     * Filter which TaskOfUsers to update
     */
    where?: TaskOfUserWhereInput
    /**
     * Limit how many TaskOfUsers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskOfUserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TaskOfUser upsert
   */
  export type TaskOfUserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskOfUser
     */
    select?: TaskOfUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskOfUser
     */
    omit?: TaskOfUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskOfUserInclude<ExtArgs> | null
    /**
     * The filter to search for the TaskOfUser to update in case it exists.
     */
    where: TaskOfUserWhereUniqueInput
    /**
     * In case the TaskOfUser found by the `where` argument doesn't exist, create a new TaskOfUser with this data.
     */
    create: XOR<TaskOfUserCreateInput, TaskOfUserUncheckedCreateInput>
    /**
     * In case the TaskOfUser was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskOfUserUpdateInput, TaskOfUserUncheckedUpdateInput>
  }

  /**
   * TaskOfUser delete
   */
  export type TaskOfUserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskOfUser
     */
    select?: TaskOfUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskOfUser
     */
    omit?: TaskOfUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskOfUserInclude<ExtArgs> | null
    /**
     * Filter which TaskOfUser to delete.
     */
    where: TaskOfUserWhereUniqueInput
  }

  /**
   * TaskOfUser deleteMany
   */
  export type TaskOfUserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TaskOfUsers to delete
     */
    where?: TaskOfUserWhereInput
    /**
     * Limit how many TaskOfUsers to delete.
     */
    limit?: number
  }

  /**
   * TaskOfUser without action
   */
  export type TaskOfUserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskOfUser
     */
    select?: TaskOfUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskOfUser
     */
    omit?: TaskOfUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskOfUserInclude<ExtArgs> | null
  }


  /**
   * Model Comment
   */

  export type AggregateComment = {
    _count: CommentCountAggregateOutputType | null
    _min: CommentMinAggregateOutputType | null
    _max: CommentMaxAggregateOutputType | null
  }

  export type CommentMinAggregateOutputType = {
    id: string | null
    content: string | null
    mediaUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
    authorId: string | null
    taskId: string | null
  }

  export type CommentMaxAggregateOutputType = {
    id: string | null
    content: string | null
    mediaUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
    authorId: string | null
    taskId: string | null
  }

  export type CommentCountAggregateOutputType = {
    id: number
    content: number
    mediaUrl: number
    createdAt: number
    updatedAt: number
    authorId: number
    taskId: number
    _all: number
  }


  export type CommentMinAggregateInputType = {
    id?: true
    content?: true
    mediaUrl?: true
    createdAt?: true
    updatedAt?: true
    authorId?: true
    taskId?: true
  }

  export type CommentMaxAggregateInputType = {
    id?: true
    content?: true
    mediaUrl?: true
    createdAt?: true
    updatedAt?: true
    authorId?: true
    taskId?: true
  }

  export type CommentCountAggregateInputType = {
    id?: true
    content?: true
    mediaUrl?: true
    createdAt?: true
    updatedAt?: true
    authorId?: true
    taskId?: true
    _all?: true
  }

  export type CommentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Comment to aggregate.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Comments
    **/
    _count?: true | CommentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CommentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CommentMaxAggregateInputType
  }

  export type GetCommentAggregateType<T extends CommentAggregateArgs> = {
        [P in keyof T & keyof AggregateComment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComment[P]>
      : GetScalarType<T[P], AggregateComment[P]>
  }




  export type CommentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithAggregationInput | CommentOrderByWithAggregationInput[]
    by: CommentScalarFieldEnum[] | CommentScalarFieldEnum
    having?: CommentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CommentCountAggregateInputType | true
    _min?: CommentMinAggregateInputType
    _max?: CommentMaxAggregateInputType
  }

  export type CommentGroupByOutputType = {
    id: string
    content: string
    mediaUrl: string | null
    createdAt: Date
    updatedAt: Date
    authorId: string
    taskId: string
    _count: CommentCountAggregateOutputType | null
    _min: CommentMinAggregateOutputType | null
    _max: CommentMaxAggregateOutputType | null
  }

  type GetCommentGroupByPayload<T extends CommentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CommentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CommentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CommentGroupByOutputType[P]>
            : GetScalarType<T[P], CommentGroupByOutputType[P]>
        }
      >
    >


  export type CommentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    mediaUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    authorId?: boolean
    taskId?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comment"]>

  export type CommentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    mediaUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    authorId?: boolean
    taskId?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comment"]>

  export type CommentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    mediaUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    authorId?: boolean
    taskId?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comment"]>

  export type CommentSelectScalar = {
    id?: boolean
    content?: boolean
    mediaUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    authorId?: boolean
    taskId?: boolean
  }

  export type CommentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "content" | "mediaUrl" | "createdAt" | "updatedAt" | "authorId" | "taskId", ExtArgs["result"]["comment"]>
  export type CommentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }
  export type CommentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }
  export type CommentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }

  export type $CommentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Comment"
    objects: {
      author: Prisma.$UserPayload<ExtArgs>
      task: Prisma.$TaskPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      content: string
      mediaUrl: string | null
      createdAt: Date
      updatedAt: Date
      authorId: string
      taskId: string
    }, ExtArgs["result"]["comment"]>
    composites: {}
  }

  type CommentGetPayload<S extends boolean | null | undefined | CommentDefaultArgs> = $Result.GetResult<Prisma.$CommentPayload, S>

  type CommentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CommentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CommentCountAggregateInputType | true
    }

  export interface CommentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Comment'], meta: { name: 'Comment' } }
    /**
     * Find zero or one Comment that matches the filter.
     * @param {CommentFindUniqueArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CommentFindUniqueArgs>(args: SelectSubset<T, CommentFindUniqueArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Comment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CommentFindUniqueOrThrowArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CommentFindUniqueOrThrowArgs>(args: SelectSubset<T, CommentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Comment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindFirstArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CommentFindFirstArgs>(args?: SelectSubset<T, CommentFindFirstArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Comment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindFirstOrThrowArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CommentFindFirstOrThrowArgs>(args?: SelectSubset<T, CommentFindFirstOrThrowArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Comments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Comments
     * const comments = await prisma.comment.findMany()
     * 
     * // Get first 10 Comments
     * const comments = await prisma.comment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const commentWithIdOnly = await prisma.comment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CommentFindManyArgs>(args?: SelectSubset<T, CommentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Comment.
     * @param {CommentCreateArgs} args - Arguments to create a Comment.
     * @example
     * // Create one Comment
     * const Comment = await prisma.comment.create({
     *   data: {
     *     // ... data to create a Comment
     *   }
     * })
     * 
     */
    create<T extends CommentCreateArgs>(args: SelectSubset<T, CommentCreateArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Comments.
     * @param {CommentCreateManyArgs} args - Arguments to create many Comments.
     * @example
     * // Create many Comments
     * const comment = await prisma.comment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CommentCreateManyArgs>(args?: SelectSubset<T, CommentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Comments and returns the data saved in the database.
     * @param {CommentCreateManyAndReturnArgs} args - Arguments to create many Comments.
     * @example
     * // Create many Comments
     * const comment = await prisma.comment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Comments and only return the `id`
     * const commentWithIdOnly = await prisma.comment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CommentCreateManyAndReturnArgs>(args?: SelectSubset<T, CommentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Comment.
     * @param {CommentDeleteArgs} args - Arguments to delete one Comment.
     * @example
     * // Delete one Comment
     * const Comment = await prisma.comment.delete({
     *   where: {
     *     // ... filter to delete one Comment
     *   }
     * })
     * 
     */
    delete<T extends CommentDeleteArgs>(args: SelectSubset<T, CommentDeleteArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Comment.
     * @param {CommentUpdateArgs} args - Arguments to update one Comment.
     * @example
     * // Update one Comment
     * const comment = await prisma.comment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CommentUpdateArgs>(args: SelectSubset<T, CommentUpdateArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Comments.
     * @param {CommentDeleteManyArgs} args - Arguments to filter Comments to delete.
     * @example
     * // Delete a few Comments
     * const { count } = await prisma.comment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CommentDeleteManyArgs>(args?: SelectSubset<T, CommentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Comments
     * const comment = await prisma.comment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CommentUpdateManyArgs>(args: SelectSubset<T, CommentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Comments and returns the data updated in the database.
     * @param {CommentUpdateManyAndReturnArgs} args - Arguments to update many Comments.
     * @example
     * // Update many Comments
     * const comment = await prisma.comment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Comments and only return the `id`
     * const commentWithIdOnly = await prisma.comment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CommentUpdateManyAndReturnArgs>(args: SelectSubset<T, CommentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Comment.
     * @param {CommentUpsertArgs} args - Arguments to update or create a Comment.
     * @example
     * // Update or create a Comment
     * const comment = await prisma.comment.upsert({
     *   create: {
     *     // ... data to create a Comment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Comment we want to update
     *   }
     * })
     */
    upsert<T extends CommentUpsertArgs>(args: SelectSubset<T, CommentUpsertArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentCountArgs} args - Arguments to filter Comments to count.
     * @example
     * // Count the number of Comments
     * const count = await prisma.comment.count({
     *   where: {
     *     // ... the filter for the Comments we want to count
     *   }
     * })
    **/
    count<T extends CommentCountArgs>(
      args?: Subset<T, CommentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CommentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Comment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CommentAggregateArgs>(args: Subset<T, CommentAggregateArgs>): Prisma.PrismaPromise<GetCommentAggregateType<T>>

    /**
     * Group by Comment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CommentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CommentGroupByArgs['orderBy'] }
        : { orderBy?: CommentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CommentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Comment model
   */
  readonly fields: CommentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Comment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CommentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    author<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    task<T extends TaskDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TaskDefaultArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Comment model
   */
  interface CommentFieldRefs {
    readonly id: FieldRef<"Comment", 'String'>
    readonly content: FieldRef<"Comment", 'String'>
    readonly mediaUrl: FieldRef<"Comment", 'String'>
    readonly createdAt: FieldRef<"Comment", 'DateTime'>
    readonly updatedAt: FieldRef<"Comment", 'DateTime'>
    readonly authorId: FieldRef<"Comment", 'String'>
    readonly taskId: FieldRef<"Comment", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Comment findUnique
   */
  export type CommentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment findUniqueOrThrow
   */
  export type CommentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment findFirst
   */
  export type CommentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comments.
     */
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment findFirstOrThrow
   */
  export type CommentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comments.
     */
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment findMany
   */
  export type CommentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comments to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment create
   */
  export type CommentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * The data needed to create a Comment.
     */
    data: XOR<CommentCreateInput, CommentUncheckedCreateInput>
  }

  /**
   * Comment createMany
   */
  export type CommentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Comments.
     */
    data: CommentCreateManyInput | CommentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Comment createManyAndReturn
   */
  export type CommentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * The data used to create many Comments.
     */
    data: CommentCreateManyInput | CommentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Comment update
   */
  export type CommentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * The data needed to update a Comment.
     */
    data: XOR<CommentUpdateInput, CommentUncheckedUpdateInput>
    /**
     * Choose, which Comment to update.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment updateMany
   */
  export type CommentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Comments.
     */
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyInput>
    /**
     * Filter which Comments to update
     */
    where?: CommentWhereInput
    /**
     * Limit how many Comments to update.
     */
    limit?: number
  }

  /**
   * Comment updateManyAndReturn
   */
  export type CommentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * The data used to update Comments.
     */
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyInput>
    /**
     * Filter which Comments to update
     */
    where?: CommentWhereInput
    /**
     * Limit how many Comments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Comment upsert
   */
  export type CommentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * The filter to search for the Comment to update in case it exists.
     */
    where: CommentWhereUniqueInput
    /**
     * In case the Comment found by the `where` argument doesn't exist, create a new Comment with this data.
     */
    create: XOR<CommentCreateInput, CommentUncheckedCreateInput>
    /**
     * In case the Comment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CommentUpdateInput, CommentUncheckedUpdateInput>
  }

  /**
   * Comment delete
   */
  export type CommentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter which Comment to delete.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment deleteMany
   */
  export type CommentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Comments to delete
     */
    where?: CommentWhereInput
    /**
     * Limit how many Comments to delete.
     */
    limit?: number
  }

  /**
   * Comment without action
   */
  export type CommentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
  }


  /**
   * Model ProjectInvitation
   */

  export type AggregateProjectInvitation = {
    _count: ProjectInvitationCountAggregateOutputType | null
    _min: ProjectInvitationMinAggregateOutputType | null
    _max: ProjectInvitationMaxAggregateOutputType | null
  }

  export type ProjectInvitationMinAggregateOutputType = {
    status: $Enums.InvitationStatus | null
    createdAt: Date | null
    invitorId: string | null
    projectId: string | null
  }

  export type ProjectInvitationMaxAggregateOutputType = {
    status: $Enums.InvitationStatus | null
    createdAt: Date | null
    invitorId: string | null
    projectId: string | null
  }

  export type ProjectInvitationCountAggregateOutputType = {
    status: number
    createdAt: number
    invitorId: number
    projectId: number
    _all: number
  }


  export type ProjectInvitationMinAggregateInputType = {
    status?: true
    createdAt?: true
    invitorId?: true
    projectId?: true
  }

  export type ProjectInvitationMaxAggregateInputType = {
    status?: true
    createdAt?: true
    invitorId?: true
    projectId?: true
  }

  export type ProjectInvitationCountAggregateInputType = {
    status?: true
    createdAt?: true
    invitorId?: true
    projectId?: true
    _all?: true
  }

  export type ProjectInvitationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectInvitation to aggregate.
     */
    where?: ProjectInvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectInvitations to fetch.
     */
    orderBy?: ProjectInvitationOrderByWithRelationInput | ProjectInvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectInvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectInvitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectInvitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProjectInvitations
    **/
    _count?: true | ProjectInvitationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectInvitationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectInvitationMaxAggregateInputType
  }

  export type GetProjectInvitationAggregateType<T extends ProjectInvitationAggregateArgs> = {
        [P in keyof T & keyof AggregateProjectInvitation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProjectInvitation[P]>
      : GetScalarType<T[P], AggregateProjectInvitation[P]>
  }




  export type ProjectInvitationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectInvitationWhereInput
    orderBy?: ProjectInvitationOrderByWithAggregationInput | ProjectInvitationOrderByWithAggregationInput[]
    by: ProjectInvitationScalarFieldEnum[] | ProjectInvitationScalarFieldEnum
    having?: ProjectInvitationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectInvitationCountAggregateInputType | true
    _min?: ProjectInvitationMinAggregateInputType
    _max?: ProjectInvitationMaxAggregateInputType
  }

  export type ProjectInvitationGroupByOutputType = {
    status: $Enums.InvitationStatus
    createdAt: Date
    invitorId: string
    projectId: string
    _count: ProjectInvitationCountAggregateOutputType | null
    _min: ProjectInvitationMinAggregateOutputType | null
    _max: ProjectInvitationMaxAggregateOutputType | null
  }

  type GetProjectInvitationGroupByPayload<T extends ProjectInvitationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectInvitationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectInvitationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectInvitationGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectInvitationGroupByOutputType[P]>
        }
      >
    >


  export type ProjectInvitationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    status?: boolean
    createdAt?: boolean
    invitorId?: boolean
    projectId?: boolean
    invitor?: boolean | UserDefaultArgs<ExtArgs>
    toProject?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectInvitation"]>

  export type ProjectInvitationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    status?: boolean
    createdAt?: boolean
    invitorId?: boolean
    projectId?: boolean
    invitor?: boolean | UserDefaultArgs<ExtArgs>
    toProject?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectInvitation"]>

  export type ProjectInvitationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    status?: boolean
    createdAt?: boolean
    invitorId?: boolean
    projectId?: boolean
    invitor?: boolean | UserDefaultArgs<ExtArgs>
    toProject?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectInvitation"]>

  export type ProjectInvitationSelectScalar = {
    status?: boolean
    createdAt?: boolean
    invitorId?: boolean
    projectId?: boolean
  }

  export type ProjectInvitationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"status" | "createdAt" | "invitorId" | "projectId", ExtArgs["result"]["projectInvitation"]>
  export type ProjectInvitationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    invitor?: boolean | UserDefaultArgs<ExtArgs>
    toProject?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type ProjectInvitationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    invitor?: boolean | UserDefaultArgs<ExtArgs>
    toProject?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type ProjectInvitationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    invitor?: boolean | UserDefaultArgs<ExtArgs>
    toProject?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $ProjectInvitationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProjectInvitation"
    objects: {
      invitor: Prisma.$UserPayload<ExtArgs>
      toProject: Prisma.$ProjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      status: $Enums.InvitationStatus
      createdAt: Date
      invitorId: string
      projectId: string
    }, ExtArgs["result"]["projectInvitation"]>
    composites: {}
  }

  type ProjectInvitationGetPayload<S extends boolean | null | undefined | ProjectInvitationDefaultArgs> = $Result.GetResult<Prisma.$ProjectInvitationPayload, S>

  type ProjectInvitationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectInvitationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectInvitationCountAggregateInputType | true
    }

  export interface ProjectInvitationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProjectInvitation'], meta: { name: 'ProjectInvitation' } }
    /**
     * Find zero or one ProjectInvitation that matches the filter.
     * @param {ProjectInvitationFindUniqueArgs} args - Arguments to find a ProjectInvitation
     * @example
     * // Get one ProjectInvitation
     * const projectInvitation = await prisma.projectInvitation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectInvitationFindUniqueArgs>(args: SelectSubset<T, ProjectInvitationFindUniqueArgs<ExtArgs>>): Prisma__ProjectInvitationClient<$Result.GetResult<Prisma.$ProjectInvitationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProjectInvitation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectInvitationFindUniqueOrThrowArgs} args - Arguments to find a ProjectInvitation
     * @example
     * // Get one ProjectInvitation
     * const projectInvitation = await prisma.projectInvitation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectInvitationFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectInvitationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectInvitationClient<$Result.GetResult<Prisma.$ProjectInvitationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectInvitation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectInvitationFindFirstArgs} args - Arguments to find a ProjectInvitation
     * @example
     * // Get one ProjectInvitation
     * const projectInvitation = await prisma.projectInvitation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectInvitationFindFirstArgs>(args?: SelectSubset<T, ProjectInvitationFindFirstArgs<ExtArgs>>): Prisma__ProjectInvitationClient<$Result.GetResult<Prisma.$ProjectInvitationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectInvitation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectInvitationFindFirstOrThrowArgs} args - Arguments to find a ProjectInvitation
     * @example
     * // Get one ProjectInvitation
     * const projectInvitation = await prisma.projectInvitation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectInvitationFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectInvitationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectInvitationClient<$Result.GetResult<Prisma.$ProjectInvitationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProjectInvitations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectInvitationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProjectInvitations
     * const projectInvitations = await prisma.projectInvitation.findMany()
     * 
     * // Get first 10 ProjectInvitations
     * const projectInvitations = await prisma.projectInvitation.findMany({ take: 10 })
     * 
     * // Only select the `createdAt`
     * const projectInvitationWithCreatedAtOnly = await prisma.projectInvitation.findMany({ select: { createdAt: true } })
     * 
     */
    findMany<T extends ProjectInvitationFindManyArgs>(args?: SelectSubset<T, ProjectInvitationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectInvitationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProjectInvitation.
     * @param {ProjectInvitationCreateArgs} args - Arguments to create a ProjectInvitation.
     * @example
     * // Create one ProjectInvitation
     * const ProjectInvitation = await prisma.projectInvitation.create({
     *   data: {
     *     // ... data to create a ProjectInvitation
     *   }
     * })
     * 
     */
    create<T extends ProjectInvitationCreateArgs>(args: SelectSubset<T, ProjectInvitationCreateArgs<ExtArgs>>): Prisma__ProjectInvitationClient<$Result.GetResult<Prisma.$ProjectInvitationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProjectInvitations.
     * @param {ProjectInvitationCreateManyArgs} args - Arguments to create many ProjectInvitations.
     * @example
     * // Create many ProjectInvitations
     * const projectInvitation = await prisma.projectInvitation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectInvitationCreateManyArgs>(args?: SelectSubset<T, ProjectInvitationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProjectInvitations and returns the data saved in the database.
     * @param {ProjectInvitationCreateManyAndReturnArgs} args - Arguments to create many ProjectInvitations.
     * @example
     * // Create many ProjectInvitations
     * const projectInvitation = await prisma.projectInvitation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProjectInvitations and only return the `createdAt`
     * const projectInvitationWithCreatedAtOnly = await prisma.projectInvitation.createManyAndReturn({
     *   select: { createdAt: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectInvitationCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectInvitationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectInvitationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProjectInvitation.
     * @param {ProjectInvitationDeleteArgs} args - Arguments to delete one ProjectInvitation.
     * @example
     * // Delete one ProjectInvitation
     * const ProjectInvitation = await prisma.projectInvitation.delete({
     *   where: {
     *     // ... filter to delete one ProjectInvitation
     *   }
     * })
     * 
     */
    delete<T extends ProjectInvitationDeleteArgs>(args: SelectSubset<T, ProjectInvitationDeleteArgs<ExtArgs>>): Prisma__ProjectInvitationClient<$Result.GetResult<Prisma.$ProjectInvitationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProjectInvitation.
     * @param {ProjectInvitationUpdateArgs} args - Arguments to update one ProjectInvitation.
     * @example
     * // Update one ProjectInvitation
     * const projectInvitation = await prisma.projectInvitation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectInvitationUpdateArgs>(args: SelectSubset<T, ProjectInvitationUpdateArgs<ExtArgs>>): Prisma__ProjectInvitationClient<$Result.GetResult<Prisma.$ProjectInvitationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProjectInvitations.
     * @param {ProjectInvitationDeleteManyArgs} args - Arguments to filter ProjectInvitations to delete.
     * @example
     * // Delete a few ProjectInvitations
     * const { count } = await prisma.projectInvitation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectInvitationDeleteManyArgs>(args?: SelectSubset<T, ProjectInvitationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectInvitations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectInvitationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProjectInvitations
     * const projectInvitation = await prisma.projectInvitation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectInvitationUpdateManyArgs>(args: SelectSubset<T, ProjectInvitationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectInvitations and returns the data updated in the database.
     * @param {ProjectInvitationUpdateManyAndReturnArgs} args - Arguments to update many ProjectInvitations.
     * @example
     * // Update many ProjectInvitations
     * const projectInvitation = await prisma.projectInvitation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProjectInvitations and only return the `createdAt`
     * const projectInvitationWithCreatedAtOnly = await prisma.projectInvitation.updateManyAndReturn({
     *   select: { createdAt: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectInvitationUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectInvitationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectInvitationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProjectInvitation.
     * @param {ProjectInvitationUpsertArgs} args - Arguments to update or create a ProjectInvitation.
     * @example
     * // Update or create a ProjectInvitation
     * const projectInvitation = await prisma.projectInvitation.upsert({
     *   create: {
     *     // ... data to create a ProjectInvitation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProjectInvitation we want to update
     *   }
     * })
     */
    upsert<T extends ProjectInvitationUpsertArgs>(args: SelectSubset<T, ProjectInvitationUpsertArgs<ExtArgs>>): Prisma__ProjectInvitationClient<$Result.GetResult<Prisma.$ProjectInvitationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProjectInvitations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectInvitationCountArgs} args - Arguments to filter ProjectInvitations to count.
     * @example
     * // Count the number of ProjectInvitations
     * const count = await prisma.projectInvitation.count({
     *   where: {
     *     // ... the filter for the ProjectInvitations we want to count
     *   }
     * })
    **/
    count<T extends ProjectInvitationCountArgs>(
      args?: Subset<T, ProjectInvitationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectInvitationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProjectInvitation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectInvitationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectInvitationAggregateArgs>(args: Subset<T, ProjectInvitationAggregateArgs>): Prisma.PrismaPromise<GetProjectInvitationAggregateType<T>>

    /**
     * Group by ProjectInvitation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectInvitationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectInvitationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectInvitationGroupByArgs['orderBy'] }
        : { orderBy?: ProjectInvitationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectInvitationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectInvitationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProjectInvitation model
   */
  readonly fields: ProjectInvitationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProjectInvitation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectInvitationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    invitor<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    toProject<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProjectInvitation model
   */
  interface ProjectInvitationFieldRefs {
    readonly status: FieldRef<"ProjectInvitation", 'InvitationStatus'>
    readonly createdAt: FieldRef<"ProjectInvitation", 'DateTime'>
    readonly invitorId: FieldRef<"ProjectInvitation", 'String'>
    readonly projectId: FieldRef<"ProjectInvitation", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ProjectInvitation findUnique
   */
  export type ProjectInvitationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectInvitation
     */
    select?: ProjectInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectInvitation
     */
    omit?: ProjectInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInvitationInclude<ExtArgs> | null
    /**
     * Filter, which ProjectInvitation to fetch.
     */
    where: ProjectInvitationWhereUniqueInput
  }

  /**
   * ProjectInvitation findUniqueOrThrow
   */
  export type ProjectInvitationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectInvitation
     */
    select?: ProjectInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectInvitation
     */
    omit?: ProjectInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInvitationInclude<ExtArgs> | null
    /**
     * Filter, which ProjectInvitation to fetch.
     */
    where: ProjectInvitationWhereUniqueInput
  }

  /**
   * ProjectInvitation findFirst
   */
  export type ProjectInvitationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectInvitation
     */
    select?: ProjectInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectInvitation
     */
    omit?: ProjectInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInvitationInclude<ExtArgs> | null
    /**
     * Filter, which ProjectInvitation to fetch.
     */
    where?: ProjectInvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectInvitations to fetch.
     */
    orderBy?: ProjectInvitationOrderByWithRelationInput | ProjectInvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectInvitations.
     */
    cursor?: ProjectInvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectInvitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectInvitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectInvitations.
     */
    distinct?: ProjectInvitationScalarFieldEnum | ProjectInvitationScalarFieldEnum[]
  }

  /**
   * ProjectInvitation findFirstOrThrow
   */
  export type ProjectInvitationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectInvitation
     */
    select?: ProjectInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectInvitation
     */
    omit?: ProjectInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInvitationInclude<ExtArgs> | null
    /**
     * Filter, which ProjectInvitation to fetch.
     */
    where?: ProjectInvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectInvitations to fetch.
     */
    orderBy?: ProjectInvitationOrderByWithRelationInput | ProjectInvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectInvitations.
     */
    cursor?: ProjectInvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectInvitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectInvitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectInvitations.
     */
    distinct?: ProjectInvitationScalarFieldEnum | ProjectInvitationScalarFieldEnum[]
  }

  /**
   * ProjectInvitation findMany
   */
  export type ProjectInvitationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectInvitation
     */
    select?: ProjectInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectInvitation
     */
    omit?: ProjectInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInvitationInclude<ExtArgs> | null
    /**
     * Filter, which ProjectInvitations to fetch.
     */
    where?: ProjectInvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectInvitations to fetch.
     */
    orderBy?: ProjectInvitationOrderByWithRelationInput | ProjectInvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProjectInvitations.
     */
    cursor?: ProjectInvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectInvitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectInvitations.
     */
    skip?: number
    distinct?: ProjectInvitationScalarFieldEnum | ProjectInvitationScalarFieldEnum[]
  }

  /**
   * ProjectInvitation create
   */
  export type ProjectInvitationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectInvitation
     */
    select?: ProjectInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectInvitation
     */
    omit?: ProjectInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInvitationInclude<ExtArgs> | null
    /**
     * The data needed to create a ProjectInvitation.
     */
    data: XOR<ProjectInvitationCreateInput, ProjectInvitationUncheckedCreateInput>
  }

  /**
   * ProjectInvitation createMany
   */
  export type ProjectInvitationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProjectInvitations.
     */
    data: ProjectInvitationCreateManyInput | ProjectInvitationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProjectInvitation createManyAndReturn
   */
  export type ProjectInvitationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectInvitation
     */
    select?: ProjectInvitationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectInvitation
     */
    omit?: ProjectInvitationOmit<ExtArgs> | null
    /**
     * The data used to create many ProjectInvitations.
     */
    data: ProjectInvitationCreateManyInput | ProjectInvitationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInvitationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProjectInvitation update
   */
  export type ProjectInvitationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectInvitation
     */
    select?: ProjectInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectInvitation
     */
    omit?: ProjectInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInvitationInclude<ExtArgs> | null
    /**
     * The data needed to update a ProjectInvitation.
     */
    data: XOR<ProjectInvitationUpdateInput, ProjectInvitationUncheckedUpdateInput>
    /**
     * Choose, which ProjectInvitation to update.
     */
    where: ProjectInvitationWhereUniqueInput
  }

  /**
   * ProjectInvitation updateMany
   */
  export type ProjectInvitationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProjectInvitations.
     */
    data: XOR<ProjectInvitationUpdateManyMutationInput, ProjectInvitationUncheckedUpdateManyInput>
    /**
     * Filter which ProjectInvitations to update
     */
    where?: ProjectInvitationWhereInput
    /**
     * Limit how many ProjectInvitations to update.
     */
    limit?: number
  }

  /**
   * ProjectInvitation updateManyAndReturn
   */
  export type ProjectInvitationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectInvitation
     */
    select?: ProjectInvitationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectInvitation
     */
    omit?: ProjectInvitationOmit<ExtArgs> | null
    /**
     * The data used to update ProjectInvitations.
     */
    data: XOR<ProjectInvitationUpdateManyMutationInput, ProjectInvitationUncheckedUpdateManyInput>
    /**
     * Filter which ProjectInvitations to update
     */
    where?: ProjectInvitationWhereInput
    /**
     * Limit how many ProjectInvitations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInvitationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProjectInvitation upsert
   */
  export type ProjectInvitationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectInvitation
     */
    select?: ProjectInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectInvitation
     */
    omit?: ProjectInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInvitationInclude<ExtArgs> | null
    /**
     * The filter to search for the ProjectInvitation to update in case it exists.
     */
    where: ProjectInvitationWhereUniqueInput
    /**
     * In case the ProjectInvitation found by the `where` argument doesn't exist, create a new ProjectInvitation with this data.
     */
    create: XOR<ProjectInvitationCreateInput, ProjectInvitationUncheckedCreateInput>
    /**
     * In case the ProjectInvitation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectInvitationUpdateInput, ProjectInvitationUncheckedUpdateInput>
  }

  /**
   * ProjectInvitation delete
   */
  export type ProjectInvitationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectInvitation
     */
    select?: ProjectInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectInvitation
     */
    omit?: ProjectInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInvitationInclude<ExtArgs> | null
    /**
     * Filter which ProjectInvitation to delete.
     */
    where: ProjectInvitationWhereUniqueInput
  }

  /**
   * ProjectInvitation deleteMany
   */
  export type ProjectInvitationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectInvitations to delete
     */
    where?: ProjectInvitationWhereInput
    /**
     * Limit how many ProjectInvitations to delete.
     */
    limit?: number
  }

  /**
   * ProjectInvitation without action
   */
  export type ProjectInvitationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectInvitation
     */
    select?: ProjectInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectInvitation
     */
    omit?: ProjectInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInvitationInclude<ExtArgs> | null
  }


  /**
   * Model UserInProject
   */

  export type AggregateUserInProject = {
    _count: UserInProjectCountAggregateOutputType | null
    _min: UserInProjectMinAggregateOutputType | null
    _max: UserInProjectMaxAggregateOutputType | null
  }

  export type UserInProjectMinAggregateOutputType = {
    userId: string | null
    projectId: string | null
    roleId: string | null
  }

  export type UserInProjectMaxAggregateOutputType = {
    userId: string | null
    projectId: string | null
    roleId: string | null
  }

  export type UserInProjectCountAggregateOutputType = {
    userId: number
    projectId: number
    roleId: number
    _all: number
  }


  export type UserInProjectMinAggregateInputType = {
    userId?: true
    projectId?: true
    roleId?: true
  }

  export type UserInProjectMaxAggregateInputType = {
    userId?: true
    projectId?: true
    roleId?: true
  }

  export type UserInProjectCountAggregateInputType = {
    userId?: true
    projectId?: true
    roleId?: true
    _all?: true
  }

  export type UserInProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserInProject to aggregate.
     */
    where?: UserInProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserInProjects to fetch.
     */
    orderBy?: UserInProjectOrderByWithRelationInput | UserInProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserInProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserInProjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserInProjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserInProjects
    **/
    _count?: true | UserInProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserInProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserInProjectMaxAggregateInputType
  }

  export type GetUserInProjectAggregateType<T extends UserInProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateUserInProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserInProject[P]>
      : GetScalarType<T[P], AggregateUserInProject[P]>
  }




  export type UserInProjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserInProjectWhereInput
    orderBy?: UserInProjectOrderByWithAggregationInput | UserInProjectOrderByWithAggregationInput[]
    by: UserInProjectScalarFieldEnum[] | UserInProjectScalarFieldEnum
    having?: UserInProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserInProjectCountAggregateInputType | true
    _min?: UserInProjectMinAggregateInputType
    _max?: UserInProjectMaxAggregateInputType
  }

  export type UserInProjectGroupByOutputType = {
    userId: string
    projectId: string
    roleId: string
    _count: UserInProjectCountAggregateOutputType | null
    _min: UserInProjectMinAggregateOutputType | null
    _max: UserInProjectMaxAggregateOutputType | null
  }

  type GetUserInProjectGroupByPayload<T extends UserInProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserInProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserInProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserInProjectGroupByOutputType[P]>
            : GetScalarType<T[P], UserInProjectGroupByOutputType[P]>
        }
      >
    >


  export type UserInProjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    projectId?: boolean
    roleId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    role?: boolean | RoleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userInProject"]>

  export type UserInProjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    projectId?: boolean
    roleId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    role?: boolean | RoleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userInProject"]>

  export type UserInProjectSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    projectId?: boolean
    roleId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    role?: boolean | RoleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userInProject"]>

  export type UserInProjectSelectScalar = {
    userId?: boolean
    projectId?: boolean
    roleId?: boolean
  }

  export type UserInProjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"userId" | "projectId" | "roleId", ExtArgs["result"]["userInProject"]>
  export type UserInProjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    role?: boolean | RoleDefaultArgs<ExtArgs>
  }
  export type UserInProjectIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    role?: boolean | RoleDefaultArgs<ExtArgs>
  }
  export type UserInProjectIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    role?: boolean | RoleDefaultArgs<ExtArgs>
  }

  export type $UserInProjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserInProject"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      project: Prisma.$ProjectPayload<ExtArgs>
      role: Prisma.$RolePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      userId: string
      projectId: string
      roleId: string
    }, ExtArgs["result"]["userInProject"]>
    composites: {}
  }

  type UserInProjectGetPayload<S extends boolean | null | undefined | UserInProjectDefaultArgs> = $Result.GetResult<Prisma.$UserInProjectPayload, S>

  type UserInProjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserInProjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserInProjectCountAggregateInputType | true
    }

  export interface UserInProjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserInProject'], meta: { name: 'UserInProject' } }
    /**
     * Find zero or one UserInProject that matches the filter.
     * @param {UserInProjectFindUniqueArgs} args - Arguments to find a UserInProject
     * @example
     * // Get one UserInProject
     * const userInProject = await prisma.userInProject.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserInProjectFindUniqueArgs>(args: SelectSubset<T, UserInProjectFindUniqueArgs<ExtArgs>>): Prisma__UserInProjectClient<$Result.GetResult<Prisma.$UserInProjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserInProject that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserInProjectFindUniqueOrThrowArgs} args - Arguments to find a UserInProject
     * @example
     * // Get one UserInProject
     * const userInProject = await prisma.userInProject.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserInProjectFindUniqueOrThrowArgs>(args: SelectSubset<T, UserInProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserInProjectClient<$Result.GetResult<Prisma.$UserInProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserInProject that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInProjectFindFirstArgs} args - Arguments to find a UserInProject
     * @example
     * // Get one UserInProject
     * const userInProject = await prisma.userInProject.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserInProjectFindFirstArgs>(args?: SelectSubset<T, UserInProjectFindFirstArgs<ExtArgs>>): Prisma__UserInProjectClient<$Result.GetResult<Prisma.$UserInProjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserInProject that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInProjectFindFirstOrThrowArgs} args - Arguments to find a UserInProject
     * @example
     * // Get one UserInProject
     * const userInProject = await prisma.userInProject.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserInProjectFindFirstOrThrowArgs>(args?: SelectSubset<T, UserInProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserInProjectClient<$Result.GetResult<Prisma.$UserInProjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserInProjects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInProjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserInProjects
     * const userInProjects = await prisma.userInProject.findMany()
     * 
     * // Get first 10 UserInProjects
     * const userInProjects = await prisma.userInProject.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const userInProjectWithUserIdOnly = await prisma.userInProject.findMany({ select: { userId: true } })
     * 
     */
    findMany<T extends UserInProjectFindManyArgs>(args?: SelectSubset<T, UserInProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserInProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserInProject.
     * @param {UserInProjectCreateArgs} args - Arguments to create a UserInProject.
     * @example
     * // Create one UserInProject
     * const UserInProject = await prisma.userInProject.create({
     *   data: {
     *     // ... data to create a UserInProject
     *   }
     * })
     * 
     */
    create<T extends UserInProjectCreateArgs>(args: SelectSubset<T, UserInProjectCreateArgs<ExtArgs>>): Prisma__UserInProjectClient<$Result.GetResult<Prisma.$UserInProjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserInProjects.
     * @param {UserInProjectCreateManyArgs} args - Arguments to create many UserInProjects.
     * @example
     * // Create many UserInProjects
     * const userInProject = await prisma.userInProject.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserInProjectCreateManyArgs>(args?: SelectSubset<T, UserInProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserInProjects and returns the data saved in the database.
     * @param {UserInProjectCreateManyAndReturnArgs} args - Arguments to create many UserInProjects.
     * @example
     * // Create many UserInProjects
     * const userInProject = await prisma.userInProject.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserInProjects and only return the `userId`
     * const userInProjectWithUserIdOnly = await prisma.userInProject.createManyAndReturn({
     *   select: { userId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserInProjectCreateManyAndReturnArgs>(args?: SelectSubset<T, UserInProjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserInProjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserInProject.
     * @param {UserInProjectDeleteArgs} args - Arguments to delete one UserInProject.
     * @example
     * // Delete one UserInProject
     * const UserInProject = await prisma.userInProject.delete({
     *   where: {
     *     // ... filter to delete one UserInProject
     *   }
     * })
     * 
     */
    delete<T extends UserInProjectDeleteArgs>(args: SelectSubset<T, UserInProjectDeleteArgs<ExtArgs>>): Prisma__UserInProjectClient<$Result.GetResult<Prisma.$UserInProjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserInProject.
     * @param {UserInProjectUpdateArgs} args - Arguments to update one UserInProject.
     * @example
     * // Update one UserInProject
     * const userInProject = await prisma.userInProject.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserInProjectUpdateArgs>(args: SelectSubset<T, UserInProjectUpdateArgs<ExtArgs>>): Prisma__UserInProjectClient<$Result.GetResult<Prisma.$UserInProjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserInProjects.
     * @param {UserInProjectDeleteManyArgs} args - Arguments to filter UserInProjects to delete.
     * @example
     * // Delete a few UserInProjects
     * const { count } = await prisma.userInProject.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserInProjectDeleteManyArgs>(args?: SelectSubset<T, UserInProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserInProjects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserInProjects
     * const userInProject = await prisma.userInProject.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserInProjectUpdateManyArgs>(args: SelectSubset<T, UserInProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserInProjects and returns the data updated in the database.
     * @param {UserInProjectUpdateManyAndReturnArgs} args - Arguments to update many UserInProjects.
     * @example
     * // Update many UserInProjects
     * const userInProject = await prisma.userInProject.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserInProjects and only return the `userId`
     * const userInProjectWithUserIdOnly = await prisma.userInProject.updateManyAndReturn({
     *   select: { userId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserInProjectUpdateManyAndReturnArgs>(args: SelectSubset<T, UserInProjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserInProjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserInProject.
     * @param {UserInProjectUpsertArgs} args - Arguments to update or create a UserInProject.
     * @example
     * // Update or create a UserInProject
     * const userInProject = await prisma.userInProject.upsert({
     *   create: {
     *     // ... data to create a UserInProject
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserInProject we want to update
     *   }
     * })
     */
    upsert<T extends UserInProjectUpsertArgs>(args: SelectSubset<T, UserInProjectUpsertArgs<ExtArgs>>): Prisma__UserInProjectClient<$Result.GetResult<Prisma.$UserInProjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserInProjects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInProjectCountArgs} args - Arguments to filter UserInProjects to count.
     * @example
     * // Count the number of UserInProjects
     * const count = await prisma.userInProject.count({
     *   where: {
     *     // ... the filter for the UserInProjects we want to count
     *   }
     * })
    **/
    count<T extends UserInProjectCountArgs>(
      args?: Subset<T, UserInProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserInProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserInProject.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserInProjectAggregateArgs>(args: Subset<T, UserInProjectAggregateArgs>): Prisma.PrismaPromise<GetUserInProjectAggregateType<T>>

    /**
     * Group by UserInProject.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInProjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserInProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserInProjectGroupByArgs['orderBy'] }
        : { orderBy?: UserInProjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserInProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserInProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserInProject model
   */
  readonly fields: UserInProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserInProject.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserInProjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    role<T extends RoleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoleDefaultArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserInProject model
   */
  interface UserInProjectFieldRefs {
    readonly userId: FieldRef<"UserInProject", 'String'>
    readonly projectId: FieldRef<"UserInProject", 'String'>
    readonly roleId: FieldRef<"UserInProject", 'String'>
  }
    

  // Custom InputTypes
  /**
   * UserInProject findUnique
   */
  export type UserInProjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInProject
     */
    select?: UserInProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInProject
     */
    omit?: UserInProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInProjectInclude<ExtArgs> | null
    /**
     * Filter, which UserInProject to fetch.
     */
    where: UserInProjectWhereUniqueInput
  }

  /**
   * UserInProject findUniqueOrThrow
   */
  export type UserInProjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInProject
     */
    select?: UserInProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInProject
     */
    omit?: UserInProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInProjectInclude<ExtArgs> | null
    /**
     * Filter, which UserInProject to fetch.
     */
    where: UserInProjectWhereUniqueInput
  }

  /**
   * UserInProject findFirst
   */
  export type UserInProjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInProject
     */
    select?: UserInProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInProject
     */
    omit?: UserInProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInProjectInclude<ExtArgs> | null
    /**
     * Filter, which UserInProject to fetch.
     */
    where?: UserInProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserInProjects to fetch.
     */
    orderBy?: UserInProjectOrderByWithRelationInput | UserInProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserInProjects.
     */
    cursor?: UserInProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserInProjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserInProjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserInProjects.
     */
    distinct?: UserInProjectScalarFieldEnum | UserInProjectScalarFieldEnum[]
  }

  /**
   * UserInProject findFirstOrThrow
   */
  export type UserInProjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInProject
     */
    select?: UserInProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInProject
     */
    omit?: UserInProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInProjectInclude<ExtArgs> | null
    /**
     * Filter, which UserInProject to fetch.
     */
    where?: UserInProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserInProjects to fetch.
     */
    orderBy?: UserInProjectOrderByWithRelationInput | UserInProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserInProjects.
     */
    cursor?: UserInProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserInProjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserInProjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserInProjects.
     */
    distinct?: UserInProjectScalarFieldEnum | UserInProjectScalarFieldEnum[]
  }

  /**
   * UserInProject findMany
   */
  export type UserInProjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInProject
     */
    select?: UserInProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInProject
     */
    omit?: UserInProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInProjectInclude<ExtArgs> | null
    /**
     * Filter, which UserInProjects to fetch.
     */
    where?: UserInProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserInProjects to fetch.
     */
    orderBy?: UserInProjectOrderByWithRelationInput | UserInProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserInProjects.
     */
    cursor?: UserInProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserInProjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserInProjects.
     */
    skip?: number
    distinct?: UserInProjectScalarFieldEnum | UserInProjectScalarFieldEnum[]
  }

  /**
   * UserInProject create
   */
  export type UserInProjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInProject
     */
    select?: UserInProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInProject
     */
    omit?: UserInProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInProjectInclude<ExtArgs> | null
    /**
     * The data needed to create a UserInProject.
     */
    data: XOR<UserInProjectCreateInput, UserInProjectUncheckedCreateInput>
  }

  /**
   * UserInProject createMany
   */
  export type UserInProjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserInProjects.
     */
    data: UserInProjectCreateManyInput | UserInProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserInProject createManyAndReturn
   */
  export type UserInProjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInProject
     */
    select?: UserInProjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserInProject
     */
    omit?: UserInProjectOmit<ExtArgs> | null
    /**
     * The data used to create many UserInProjects.
     */
    data: UserInProjectCreateManyInput | UserInProjectCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInProjectIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserInProject update
   */
  export type UserInProjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInProject
     */
    select?: UserInProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInProject
     */
    omit?: UserInProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInProjectInclude<ExtArgs> | null
    /**
     * The data needed to update a UserInProject.
     */
    data: XOR<UserInProjectUpdateInput, UserInProjectUncheckedUpdateInput>
    /**
     * Choose, which UserInProject to update.
     */
    where: UserInProjectWhereUniqueInput
  }

  /**
   * UserInProject updateMany
   */
  export type UserInProjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserInProjects.
     */
    data: XOR<UserInProjectUpdateManyMutationInput, UserInProjectUncheckedUpdateManyInput>
    /**
     * Filter which UserInProjects to update
     */
    where?: UserInProjectWhereInput
    /**
     * Limit how many UserInProjects to update.
     */
    limit?: number
  }

  /**
   * UserInProject updateManyAndReturn
   */
  export type UserInProjectUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInProject
     */
    select?: UserInProjectSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserInProject
     */
    omit?: UserInProjectOmit<ExtArgs> | null
    /**
     * The data used to update UserInProjects.
     */
    data: XOR<UserInProjectUpdateManyMutationInput, UserInProjectUncheckedUpdateManyInput>
    /**
     * Filter which UserInProjects to update
     */
    where?: UserInProjectWhereInput
    /**
     * Limit how many UserInProjects to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInProjectIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserInProject upsert
   */
  export type UserInProjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInProject
     */
    select?: UserInProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInProject
     */
    omit?: UserInProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInProjectInclude<ExtArgs> | null
    /**
     * The filter to search for the UserInProject to update in case it exists.
     */
    where: UserInProjectWhereUniqueInput
    /**
     * In case the UserInProject found by the `where` argument doesn't exist, create a new UserInProject with this data.
     */
    create: XOR<UserInProjectCreateInput, UserInProjectUncheckedCreateInput>
    /**
     * In case the UserInProject was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserInProjectUpdateInput, UserInProjectUncheckedUpdateInput>
  }

  /**
   * UserInProject delete
   */
  export type UserInProjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInProject
     */
    select?: UserInProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInProject
     */
    omit?: UserInProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInProjectInclude<ExtArgs> | null
    /**
     * Filter which UserInProject to delete.
     */
    where: UserInProjectWhereUniqueInput
  }

  /**
   * UserInProject deleteMany
   */
  export type UserInProjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserInProjects to delete
     */
    where?: UserInProjectWhereInput
    /**
     * Limit how many UserInProjects to delete.
     */
    limit?: number
  }

  /**
   * UserInProject without action
   */
  export type UserInProjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInProject
     */
    select?: UserInProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInProject
     */
    omit?: UserInProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInProjectInclude<ExtArgs> | null
  }


  /**
   * Model Role
   */

  export type AggregateRole = {
    _count: RoleCountAggregateOutputType | null
    _min: RoleMinAggregateOutputType | null
    _max: RoleMaxAggregateOutputType | null
  }

  export type RoleMinAggregateOutputType = {
    id: string | null
    name: string | null
    listOfPermission: string | null
    isDefault: boolean | null
    projectId: string | null
  }

  export type RoleMaxAggregateOutputType = {
    id: string | null
    name: string | null
    listOfPermission: string | null
    isDefault: boolean | null
    projectId: string | null
  }

  export type RoleCountAggregateOutputType = {
    id: number
    name: number
    listOfPermission: number
    isDefault: number
    projectId: number
    _all: number
  }


  export type RoleMinAggregateInputType = {
    id?: true
    name?: true
    listOfPermission?: true
    isDefault?: true
    projectId?: true
  }

  export type RoleMaxAggregateInputType = {
    id?: true
    name?: true
    listOfPermission?: true
    isDefault?: true
    projectId?: true
  }

  export type RoleCountAggregateInputType = {
    id?: true
    name?: true
    listOfPermission?: true
    isDefault?: true
    projectId?: true
    _all?: true
  }

  export type RoleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Role to aggregate.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Roles
    **/
    _count?: true | RoleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoleMaxAggregateInputType
  }

  export type GetRoleAggregateType<T extends RoleAggregateArgs> = {
        [P in keyof T & keyof AggregateRole]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRole[P]>
      : GetScalarType<T[P], AggregateRole[P]>
  }




  export type RoleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoleWhereInput
    orderBy?: RoleOrderByWithAggregationInput | RoleOrderByWithAggregationInput[]
    by: RoleScalarFieldEnum[] | RoleScalarFieldEnum
    having?: RoleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoleCountAggregateInputType | true
    _min?: RoleMinAggregateInputType
    _max?: RoleMaxAggregateInputType
  }

  export type RoleGroupByOutputType = {
    id: string
    name: string
    listOfPermission: string
    isDefault: boolean
    projectId: string | null
    _count: RoleCountAggregateOutputType | null
    _min: RoleMinAggregateOutputType | null
    _max: RoleMaxAggregateOutputType | null
  }

  type GetRoleGroupByPayload<T extends RoleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoleGroupByOutputType[P]>
            : GetScalarType<T[P], RoleGroupByOutputType[P]>
        }
      >
    >


  export type RoleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    listOfPermission?: boolean
    isDefault?: boolean
    projectId?: boolean
    userInProjects?: boolean | Role$userInProjectsArgs<ExtArgs>
    project?: boolean | Role$projectArgs<ExtArgs>
    _count?: boolean | RoleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["role"]>

  export type RoleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    listOfPermission?: boolean
    isDefault?: boolean
    projectId?: boolean
    project?: boolean | Role$projectArgs<ExtArgs>
  }, ExtArgs["result"]["role"]>

  export type RoleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    listOfPermission?: boolean
    isDefault?: boolean
    projectId?: boolean
    project?: boolean | Role$projectArgs<ExtArgs>
  }, ExtArgs["result"]["role"]>

  export type RoleSelectScalar = {
    id?: boolean
    name?: boolean
    listOfPermission?: boolean
    isDefault?: boolean
    projectId?: boolean
  }

  export type RoleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "listOfPermission" | "isDefault" | "projectId", ExtArgs["result"]["role"]>
  export type RoleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userInProjects?: boolean | Role$userInProjectsArgs<ExtArgs>
    project?: boolean | Role$projectArgs<ExtArgs>
    _count?: boolean | RoleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RoleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | Role$projectArgs<ExtArgs>
  }
  export type RoleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | Role$projectArgs<ExtArgs>
  }

  export type $RolePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Role"
    objects: {
      userInProjects: Prisma.$UserInProjectPayload<ExtArgs>[]
      project: Prisma.$ProjectPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      listOfPermission: string
      isDefault: boolean
      projectId: string | null
    }, ExtArgs["result"]["role"]>
    composites: {}
  }

  type RoleGetPayload<S extends boolean | null | undefined | RoleDefaultArgs> = $Result.GetResult<Prisma.$RolePayload, S>

  type RoleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoleCountAggregateInputType | true
    }

  export interface RoleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Role'], meta: { name: 'Role' } }
    /**
     * Find zero or one Role that matches the filter.
     * @param {RoleFindUniqueArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoleFindUniqueArgs>(args: SelectSubset<T, RoleFindUniqueArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Role that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoleFindUniqueOrThrowArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoleFindUniqueOrThrowArgs>(args: SelectSubset<T, RoleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Role that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleFindFirstArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoleFindFirstArgs>(args?: SelectSubset<T, RoleFindFirstArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Role that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleFindFirstOrThrowArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoleFindFirstOrThrowArgs>(args?: SelectSubset<T, RoleFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Roles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Roles
     * const roles = await prisma.role.findMany()
     * 
     * // Get first 10 Roles
     * const roles = await prisma.role.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roleWithIdOnly = await prisma.role.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoleFindManyArgs>(args?: SelectSubset<T, RoleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Role.
     * @param {RoleCreateArgs} args - Arguments to create a Role.
     * @example
     * // Create one Role
     * const Role = await prisma.role.create({
     *   data: {
     *     // ... data to create a Role
     *   }
     * })
     * 
     */
    create<T extends RoleCreateArgs>(args: SelectSubset<T, RoleCreateArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Roles.
     * @param {RoleCreateManyArgs} args - Arguments to create many Roles.
     * @example
     * // Create many Roles
     * const role = await prisma.role.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoleCreateManyArgs>(args?: SelectSubset<T, RoleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Roles and returns the data saved in the database.
     * @param {RoleCreateManyAndReturnArgs} args - Arguments to create many Roles.
     * @example
     * // Create many Roles
     * const role = await prisma.role.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Roles and only return the `id`
     * const roleWithIdOnly = await prisma.role.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoleCreateManyAndReturnArgs>(args?: SelectSubset<T, RoleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Role.
     * @param {RoleDeleteArgs} args - Arguments to delete one Role.
     * @example
     * // Delete one Role
     * const Role = await prisma.role.delete({
     *   where: {
     *     // ... filter to delete one Role
     *   }
     * })
     * 
     */
    delete<T extends RoleDeleteArgs>(args: SelectSubset<T, RoleDeleteArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Role.
     * @param {RoleUpdateArgs} args - Arguments to update one Role.
     * @example
     * // Update one Role
     * const role = await prisma.role.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoleUpdateArgs>(args: SelectSubset<T, RoleUpdateArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Roles.
     * @param {RoleDeleteManyArgs} args - Arguments to filter Roles to delete.
     * @example
     * // Delete a few Roles
     * const { count } = await prisma.role.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoleDeleteManyArgs>(args?: SelectSubset<T, RoleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Roles
     * const role = await prisma.role.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoleUpdateManyArgs>(args: SelectSubset<T, RoleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Roles and returns the data updated in the database.
     * @param {RoleUpdateManyAndReturnArgs} args - Arguments to update many Roles.
     * @example
     * // Update many Roles
     * const role = await prisma.role.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Roles and only return the `id`
     * const roleWithIdOnly = await prisma.role.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RoleUpdateManyAndReturnArgs>(args: SelectSubset<T, RoleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Role.
     * @param {RoleUpsertArgs} args - Arguments to update or create a Role.
     * @example
     * // Update or create a Role
     * const role = await prisma.role.upsert({
     *   create: {
     *     // ... data to create a Role
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Role we want to update
     *   }
     * })
     */
    upsert<T extends RoleUpsertArgs>(args: SelectSubset<T, RoleUpsertArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleCountArgs} args - Arguments to filter Roles to count.
     * @example
     * // Count the number of Roles
     * const count = await prisma.role.count({
     *   where: {
     *     // ... the filter for the Roles we want to count
     *   }
     * })
    **/
    count<T extends RoleCountArgs>(
      args?: Subset<T, RoleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Role.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoleAggregateArgs>(args: Subset<T, RoleAggregateArgs>): Prisma.PrismaPromise<GetRoleAggregateType<T>>

    /**
     * Group by Role.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoleGroupByArgs['orderBy'] }
        : { orderBy?: RoleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Role model
   */
  readonly fields: RoleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Role.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    userInProjects<T extends Role$userInProjectsArgs<ExtArgs> = {}>(args?: Subset<T, Role$userInProjectsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserInProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    project<T extends Role$projectArgs<ExtArgs> = {}>(args?: Subset<T, Role$projectArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Role model
   */
  interface RoleFieldRefs {
    readonly id: FieldRef<"Role", 'String'>
    readonly name: FieldRef<"Role", 'String'>
    readonly listOfPermission: FieldRef<"Role", 'String'>
    readonly isDefault: FieldRef<"Role", 'Boolean'>
    readonly projectId: FieldRef<"Role", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Role findUnique
   */
  export type RoleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role findUniqueOrThrow
   */
  export type RoleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role findFirst
   */
  export type RoleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Roles.
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Roles.
     */
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
  }

  /**
   * Role findFirstOrThrow
   */
  export type RoleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Roles.
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Roles.
     */
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
  }

  /**
   * Role findMany
   */
  export type RoleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Roles to fetch.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Roles.
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
  }

  /**
   * Role create
   */
  export type RoleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * The data needed to create a Role.
     */
    data: XOR<RoleCreateInput, RoleUncheckedCreateInput>
  }

  /**
   * Role createMany
   */
  export type RoleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Roles.
     */
    data: RoleCreateManyInput | RoleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Role createManyAndReturn
   */
  export type RoleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * The data used to create many Roles.
     */
    data: RoleCreateManyInput | RoleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Role update
   */
  export type RoleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * The data needed to update a Role.
     */
    data: XOR<RoleUpdateInput, RoleUncheckedUpdateInput>
    /**
     * Choose, which Role to update.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role updateMany
   */
  export type RoleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Roles.
     */
    data: XOR<RoleUpdateManyMutationInput, RoleUncheckedUpdateManyInput>
    /**
     * Filter which Roles to update
     */
    where?: RoleWhereInput
    /**
     * Limit how many Roles to update.
     */
    limit?: number
  }

  /**
   * Role updateManyAndReturn
   */
  export type RoleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * The data used to update Roles.
     */
    data: XOR<RoleUpdateManyMutationInput, RoleUncheckedUpdateManyInput>
    /**
     * Filter which Roles to update
     */
    where?: RoleWhereInput
    /**
     * Limit how many Roles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Role upsert
   */
  export type RoleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * The filter to search for the Role to update in case it exists.
     */
    where: RoleWhereUniqueInput
    /**
     * In case the Role found by the `where` argument doesn't exist, create a new Role with this data.
     */
    create: XOR<RoleCreateInput, RoleUncheckedCreateInput>
    /**
     * In case the Role was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoleUpdateInput, RoleUncheckedUpdateInput>
  }

  /**
   * Role delete
   */
  export type RoleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter which Role to delete.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role deleteMany
   */
  export type RoleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Roles to delete
     */
    where?: RoleWhereInput
    /**
     * Limit how many Roles to delete.
     */
    limit?: number
  }

  /**
   * Role.userInProjects
   */
  export type Role$userInProjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInProject
     */
    select?: UserInProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInProject
     */
    omit?: UserInProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInProjectInclude<ExtArgs> | null
    where?: UserInProjectWhereInput
    orderBy?: UserInProjectOrderByWithRelationInput | UserInProjectOrderByWithRelationInput[]
    cursor?: UserInProjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserInProjectScalarFieldEnum | UserInProjectScalarFieldEnum[]
  }

  /**
   * Role.project
   */
  export type Role$projectArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
  }

  /**
   * Role without action
   */
  export type RoleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    name: 'name',
    avatarUrl: 'avatarUrl',
    verified: 'verified',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const OAuthAccountScalarFieldEnum: {
    id: 'id',
    provider: 'provider',
    userId: 'userId'
  };

  export type OAuthAccountScalarFieldEnum = (typeof OAuthAccountScalarFieldEnum)[keyof typeof OAuthAccountScalarFieldEnum]


  export const ProjectScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    isPersonal: 'isPersonal',
    listOfSection: 'listOfSection',
    createdAt: 'createdAt',
    owner: 'owner'
  };

  export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum]


  export const SectionScalarFieldEnum: {
    id: 'id',
    name: 'name',
    listOfTask: 'listOfTask',
    createdAt: 'createdAt',
    projectId: 'projectId'
  };

  export type SectionScalarFieldEnum = (typeof SectionScalarFieldEnum)[keyof typeof SectionScalarFieldEnum]


  export const TaskScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    status: 'status',
    priority: 'priority',
    startDate: 'startDate',
    dueDate: 'dueDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    sectionId: 'sectionId',
    parentTaskId: 'parentTaskId',
    supervisorId: 'supervisorId',
    projectId: 'projectId'
  };

  export type TaskScalarFieldEnum = (typeof TaskScalarFieldEnum)[keyof typeof TaskScalarFieldEnum]


  export const TaskOfUserScalarFieldEnum: {
    taskId: 'taskId',
    userId: 'userId'
  };

  export type TaskOfUserScalarFieldEnum = (typeof TaskOfUserScalarFieldEnum)[keyof typeof TaskOfUserScalarFieldEnum]


  export const CommentScalarFieldEnum: {
    id: 'id',
    content: 'content',
    mediaUrl: 'mediaUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    authorId: 'authorId',
    taskId: 'taskId'
  };

  export type CommentScalarFieldEnum = (typeof CommentScalarFieldEnum)[keyof typeof CommentScalarFieldEnum]


  export const ProjectInvitationScalarFieldEnum: {
    status: 'status',
    createdAt: 'createdAt',
    invitorId: 'invitorId',
    projectId: 'projectId'
  };

  export type ProjectInvitationScalarFieldEnum = (typeof ProjectInvitationScalarFieldEnum)[keyof typeof ProjectInvitationScalarFieldEnum]


  export const UserInProjectScalarFieldEnum: {
    userId: 'userId',
    projectId: 'projectId',
    roleId: 'roleId'
  };

  export type UserInProjectScalarFieldEnum = (typeof UserInProjectScalarFieldEnum)[keyof typeof UserInProjectScalarFieldEnum]


  export const RoleScalarFieldEnum: {
    id: 'id',
    name: 'name',
    listOfPermission: 'listOfPermission',
    isDefault: 'isDefault',
    projectId: 'projectId'
  };

  export type RoleScalarFieldEnum = (typeof RoleScalarFieldEnum)[keyof typeof RoleScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Provider'
   */
  export type EnumProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Provider'>
    


  /**
   * Reference to a field of type 'Provider[]'
   */
  export type ListEnumProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Provider[]'>
    


  /**
   * Reference to a field of type 'TaskStatus'
   */
  export type EnumTaskStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TaskStatus'>
    


  /**
   * Reference to a field of type 'TaskStatus[]'
   */
  export type ListEnumTaskStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TaskStatus[]'>
    


  /**
   * Reference to a field of type 'PriorityLevel'
   */
  export type EnumPriorityLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PriorityLevel'>
    


  /**
   * Reference to a field of type 'PriorityLevel[]'
   */
  export type ListEnumPriorityLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PriorityLevel[]'>
    


  /**
   * Reference to a field of type 'InvitationStatus'
   */
  export type EnumInvitationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InvitationStatus'>
    


  /**
   * Reference to a field of type 'InvitationStatus[]'
   */
  export type ListEnumInvitationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InvitationStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringNullableFilter<"User"> | string | null
    name?: StringNullableFilter<"User"> | string | null
    avatarUrl?: StringNullableFilter<"User"> | string | null
    verified?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    accounts?: OAuthAccountListRelationFilter
    projects?: ProjectListRelationFilter
    projectInvitations?: ProjectInvitationListRelationFilter
    belongToProjects?: UserInProjectListRelationFilter
    supervisedTasks?: TaskListRelationFilter
    tasks?: TaskOfUserListRelationFilter
    comments?: CommentListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    accounts?: OAuthAccountOrderByRelationAggregateInput
    projects?: ProjectOrderByRelationAggregateInput
    projectInvitations?: ProjectInvitationOrderByRelationAggregateInput
    belongToProjects?: UserInProjectOrderByRelationAggregateInput
    supervisedTasks?: TaskOrderByRelationAggregateInput
    tasks?: TaskOfUserOrderByRelationAggregateInput
    comments?: CommentOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringNullableFilter<"User"> | string | null
    name?: StringNullableFilter<"User"> | string | null
    avatarUrl?: StringNullableFilter<"User"> | string | null
    verified?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    accounts?: OAuthAccountListRelationFilter
    projects?: ProjectListRelationFilter
    projectInvitations?: ProjectInvitationListRelationFilter
    belongToProjects?: UserInProjectListRelationFilter
    supervisedTasks?: TaskListRelationFilter
    tasks?: TaskOfUserListRelationFilter
    comments?: CommentListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    avatarUrl?: StringNullableWithAggregatesFilter<"User"> | string | null
    verified?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type OAuthAccountWhereInput = {
    AND?: OAuthAccountWhereInput | OAuthAccountWhereInput[]
    OR?: OAuthAccountWhereInput[]
    NOT?: OAuthAccountWhereInput | OAuthAccountWhereInput[]
    id?: StringFilter<"OAuthAccount"> | string
    provider?: EnumProviderFilter<"OAuthAccount"> | $Enums.Provider
    userId?: StringFilter<"OAuthAccount"> | string
    own?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type OAuthAccountOrderByWithRelationInput = {
    id?: SortOrder
    provider?: SortOrder
    userId?: SortOrder
    own?: UserOrderByWithRelationInput
  }

  export type OAuthAccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OAuthAccountWhereInput | OAuthAccountWhereInput[]
    OR?: OAuthAccountWhereInput[]
    NOT?: OAuthAccountWhereInput | OAuthAccountWhereInput[]
    provider?: EnumProviderFilter<"OAuthAccount"> | $Enums.Provider
    userId?: StringFilter<"OAuthAccount"> | string
    own?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type OAuthAccountOrderByWithAggregationInput = {
    id?: SortOrder
    provider?: SortOrder
    userId?: SortOrder
    _count?: OAuthAccountCountOrderByAggregateInput
    _max?: OAuthAccountMaxOrderByAggregateInput
    _min?: OAuthAccountMinOrderByAggregateInput
  }

  export type OAuthAccountScalarWhereWithAggregatesInput = {
    AND?: OAuthAccountScalarWhereWithAggregatesInput | OAuthAccountScalarWhereWithAggregatesInput[]
    OR?: OAuthAccountScalarWhereWithAggregatesInput[]
    NOT?: OAuthAccountScalarWhereWithAggregatesInput | OAuthAccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OAuthAccount"> | string
    provider?: EnumProviderWithAggregatesFilter<"OAuthAccount"> | $Enums.Provider
    userId?: StringWithAggregatesFilter<"OAuthAccount"> | string
  }

  export type ProjectWhereInput = {
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    id?: StringFilter<"Project"> | string
    name?: StringFilter<"Project"> | string
    description?: StringNullableFilter<"Project"> | string | null
    isPersonal?: BoolFilter<"Project"> | boolean
    listOfSection?: StringFilter<"Project"> | string
    createdAt?: DateTimeFilter<"Project"> | Date | string
    owner?: StringFilter<"Project"> | string
    sections?: SectionListRelationFilter
    tasks?: TaskListRelationFilter
    invitations?: ProjectInvitationListRelationFilter
    members?: UserInProjectListRelationFilter
    roles?: RoleListRelationFilter
    own?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ProjectOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    isPersonal?: SortOrder
    listOfSection?: SortOrder
    createdAt?: SortOrder
    owner?: SortOrder
    sections?: SectionOrderByRelationAggregateInput
    tasks?: TaskOrderByRelationAggregateInput
    invitations?: ProjectInvitationOrderByRelationAggregateInput
    members?: UserInProjectOrderByRelationAggregateInput
    roles?: RoleOrderByRelationAggregateInput
    own?: UserOrderByWithRelationInput
  }

  export type ProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    name?: StringFilter<"Project"> | string
    description?: StringNullableFilter<"Project"> | string | null
    isPersonal?: BoolFilter<"Project"> | boolean
    listOfSection?: StringFilter<"Project"> | string
    createdAt?: DateTimeFilter<"Project"> | Date | string
    owner?: StringFilter<"Project"> | string
    sections?: SectionListRelationFilter
    tasks?: TaskListRelationFilter
    invitations?: ProjectInvitationListRelationFilter
    members?: UserInProjectListRelationFilter
    roles?: RoleListRelationFilter
    own?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ProjectOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    isPersonal?: SortOrder
    listOfSection?: SortOrder
    createdAt?: SortOrder
    owner?: SortOrder
    _count?: ProjectCountOrderByAggregateInput
    _max?: ProjectMaxOrderByAggregateInput
    _min?: ProjectMinOrderByAggregateInput
  }

  export type ProjectScalarWhereWithAggregatesInput = {
    AND?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    OR?: ProjectScalarWhereWithAggregatesInput[]
    NOT?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Project"> | string
    name?: StringWithAggregatesFilter<"Project"> | string
    description?: StringNullableWithAggregatesFilter<"Project"> | string | null
    isPersonal?: BoolWithAggregatesFilter<"Project"> | boolean
    listOfSection?: StringWithAggregatesFilter<"Project"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    owner?: StringWithAggregatesFilter<"Project"> | string
  }

  export type SectionWhereInput = {
    AND?: SectionWhereInput | SectionWhereInput[]
    OR?: SectionWhereInput[]
    NOT?: SectionWhereInput | SectionWhereInput[]
    id?: StringFilter<"Section"> | string
    name?: StringFilter<"Section"> | string
    listOfTask?: StringFilter<"Section"> | string
    createdAt?: DateTimeFilter<"Section"> | Date | string
    projectId?: StringFilter<"Section"> | string
    has?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }

  export type SectionOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    listOfTask?: SortOrder
    createdAt?: SortOrder
    projectId?: SortOrder
    has?: ProjectOrderByWithRelationInput
  }

  export type SectionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SectionWhereInput | SectionWhereInput[]
    OR?: SectionWhereInput[]
    NOT?: SectionWhereInput | SectionWhereInput[]
    name?: StringFilter<"Section"> | string
    listOfTask?: StringFilter<"Section"> | string
    createdAt?: DateTimeFilter<"Section"> | Date | string
    projectId?: StringFilter<"Section"> | string
    has?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }, "id">

  export type SectionOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    listOfTask?: SortOrder
    createdAt?: SortOrder
    projectId?: SortOrder
    _count?: SectionCountOrderByAggregateInput
    _max?: SectionMaxOrderByAggregateInput
    _min?: SectionMinOrderByAggregateInput
  }

  export type SectionScalarWhereWithAggregatesInput = {
    AND?: SectionScalarWhereWithAggregatesInput | SectionScalarWhereWithAggregatesInput[]
    OR?: SectionScalarWhereWithAggregatesInput[]
    NOT?: SectionScalarWhereWithAggregatesInput | SectionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Section"> | string
    name?: StringWithAggregatesFilter<"Section"> | string
    listOfTask?: StringWithAggregatesFilter<"Section"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Section"> | Date | string
    projectId?: StringWithAggregatesFilter<"Section"> | string
  }

  export type TaskWhereInput = {
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    id?: StringFilter<"Task"> | string
    title?: StringFilter<"Task"> | string
    description?: StringNullableFilter<"Task"> | string | null
    status?: EnumTaskStatusFilter<"Task"> | $Enums.TaskStatus
    priority?: EnumPriorityLevelNullableFilter<"Task"> | $Enums.PriorityLevel | null
    startDate?: DateTimeNullableFilter<"Task"> | Date | string | null
    dueDate?: DateTimeNullableFilter<"Task"> | Date | string | null
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
    sectionId?: StringFilter<"Task"> | string
    parentTaskId?: StringNullableFilter<"Task"> | string | null
    supervisorId?: StringNullableFilter<"Task"> | string | null
    projectId?: StringFilter<"Task"> | string
    assignees?: TaskOfUserListRelationFilter
    subtasks?: TaskListRelationFilter
    comments?: CommentListRelationFilter
    parent?: XOR<TaskNullableScalarRelationFilter, TaskWhereInput> | null
    supervisor?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    belongsToProject?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }

  export type TaskOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    priority?: SortOrderInput | SortOrder
    startDate?: SortOrderInput | SortOrder
    dueDate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sectionId?: SortOrder
    parentTaskId?: SortOrderInput | SortOrder
    supervisorId?: SortOrderInput | SortOrder
    projectId?: SortOrder
    assignees?: TaskOfUserOrderByRelationAggregateInput
    subtasks?: TaskOrderByRelationAggregateInput
    comments?: CommentOrderByRelationAggregateInput
    parent?: TaskOrderByWithRelationInput
    supervisor?: UserOrderByWithRelationInput
    belongsToProject?: ProjectOrderByWithRelationInput
  }

  export type TaskWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    title?: StringFilter<"Task"> | string
    description?: StringNullableFilter<"Task"> | string | null
    status?: EnumTaskStatusFilter<"Task"> | $Enums.TaskStatus
    priority?: EnumPriorityLevelNullableFilter<"Task"> | $Enums.PriorityLevel | null
    startDate?: DateTimeNullableFilter<"Task"> | Date | string | null
    dueDate?: DateTimeNullableFilter<"Task"> | Date | string | null
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
    sectionId?: StringFilter<"Task"> | string
    parentTaskId?: StringNullableFilter<"Task"> | string | null
    supervisorId?: StringNullableFilter<"Task"> | string | null
    projectId?: StringFilter<"Task"> | string
    assignees?: TaskOfUserListRelationFilter
    subtasks?: TaskListRelationFilter
    comments?: CommentListRelationFilter
    parent?: XOR<TaskNullableScalarRelationFilter, TaskWhereInput> | null
    supervisor?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    belongsToProject?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }, "id">

  export type TaskOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    priority?: SortOrderInput | SortOrder
    startDate?: SortOrderInput | SortOrder
    dueDate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sectionId?: SortOrder
    parentTaskId?: SortOrderInput | SortOrder
    supervisorId?: SortOrderInput | SortOrder
    projectId?: SortOrder
    _count?: TaskCountOrderByAggregateInput
    _max?: TaskMaxOrderByAggregateInput
    _min?: TaskMinOrderByAggregateInput
  }

  export type TaskScalarWhereWithAggregatesInput = {
    AND?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    OR?: TaskScalarWhereWithAggregatesInput[]
    NOT?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Task"> | string
    title?: StringWithAggregatesFilter<"Task"> | string
    description?: StringNullableWithAggregatesFilter<"Task"> | string | null
    status?: EnumTaskStatusWithAggregatesFilter<"Task"> | $Enums.TaskStatus
    priority?: EnumPriorityLevelNullableWithAggregatesFilter<"Task"> | $Enums.PriorityLevel | null
    startDate?: DateTimeNullableWithAggregatesFilter<"Task"> | Date | string | null
    dueDate?: DateTimeNullableWithAggregatesFilter<"Task"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Task"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Task"> | Date | string
    sectionId?: StringWithAggregatesFilter<"Task"> | string
    parentTaskId?: StringNullableWithAggregatesFilter<"Task"> | string | null
    supervisorId?: StringNullableWithAggregatesFilter<"Task"> | string | null
    projectId?: StringWithAggregatesFilter<"Task"> | string
  }

  export type TaskOfUserWhereInput = {
    AND?: TaskOfUserWhereInput | TaskOfUserWhereInput[]
    OR?: TaskOfUserWhereInput[]
    NOT?: TaskOfUserWhereInput | TaskOfUserWhereInput[]
    taskId?: StringFilter<"TaskOfUser"> | string
    userId?: StringFilter<"TaskOfUser"> | string
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type TaskOfUserOrderByWithRelationInput = {
    taskId?: SortOrder
    userId?: SortOrder
    task?: TaskOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type TaskOfUserWhereUniqueInput = Prisma.AtLeast<{
    taskId_userId?: TaskOfUserTaskIdUserIdCompoundUniqueInput
    AND?: TaskOfUserWhereInput | TaskOfUserWhereInput[]
    OR?: TaskOfUserWhereInput[]
    NOT?: TaskOfUserWhereInput | TaskOfUserWhereInput[]
    taskId?: StringFilter<"TaskOfUser"> | string
    userId?: StringFilter<"TaskOfUser"> | string
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "taskId_userId">

  export type TaskOfUserOrderByWithAggregationInput = {
    taskId?: SortOrder
    userId?: SortOrder
    _count?: TaskOfUserCountOrderByAggregateInput
    _max?: TaskOfUserMaxOrderByAggregateInput
    _min?: TaskOfUserMinOrderByAggregateInput
  }

  export type TaskOfUserScalarWhereWithAggregatesInput = {
    AND?: TaskOfUserScalarWhereWithAggregatesInput | TaskOfUserScalarWhereWithAggregatesInput[]
    OR?: TaskOfUserScalarWhereWithAggregatesInput[]
    NOT?: TaskOfUserScalarWhereWithAggregatesInput | TaskOfUserScalarWhereWithAggregatesInput[]
    taskId?: StringWithAggregatesFilter<"TaskOfUser"> | string
    userId?: StringWithAggregatesFilter<"TaskOfUser"> | string
  }

  export type CommentWhereInput = {
    AND?: CommentWhereInput | CommentWhereInput[]
    OR?: CommentWhereInput[]
    NOT?: CommentWhereInput | CommentWhereInput[]
    id?: StringFilter<"Comment"> | string
    content?: StringFilter<"Comment"> | string
    mediaUrl?: StringNullableFilter<"Comment"> | string | null
    createdAt?: DateTimeFilter<"Comment"> | Date | string
    updatedAt?: DateTimeFilter<"Comment"> | Date | string
    authorId?: StringFilter<"Comment"> | string
    taskId?: StringFilter<"Comment"> | string
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
  }

  export type CommentOrderByWithRelationInput = {
    id?: SortOrder
    content?: SortOrder
    mediaUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    authorId?: SortOrder
    taskId?: SortOrder
    author?: UserOrderByWithRelationInput
    task?: TaskOrderByWithRelationInput
  }

  export type CommentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CommentWhereInput | CommentWhereInput[]
    OR?: CommentWhereInput[]
    NOT?: CommentWhereInput | CommentWhereInput[]
    content?: StringFilter<"Comment"> | string
    mediaUrl?: StringNullableFilter<"Comment"> | string | null
    createdAt?: DateTimeFilter<"Comment"> | Date | string
    updatedAt?: DateTimeFilter<"Comment"> | Date | string
    authorId?: StringFilter<"Comment"> | string
    taskId?: StringFilter<"Comment"> | string
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
  }, "id">

  export type CommentOrderByWithAggregationInput = {
    id?: SortOrder
    content?: SortOrder
    mediaUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    authorId?: SortOrder
    taskId?: SortOrder
    _count?: CommentCountOrderByAggregateInput
    _max?: CommentMaxOrderByAggregateInput
    _min?: CommentMinOrderByAggregateInput
  }

  export type CommentScalarWhereWithAggregatesInput = {
    AND?: CommentScalarWhereWithAggregatesInput | CommentScalarWhereWithAggregatesInput[]
    OR?: CommentScalarWhereWithAggregatesInput[]
    NOT?: CommentScalarWhereWithAggregatesInput | CommentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Comment"> | string
    content?: StringWithAggregatesFilter<"Comment"> | string
    mediaUrl?: StringNullableWithAggregatesFilter<"Comment"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Comment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Comment"> | Date | string
    authorId?: StringWithAggregatesFilter<"Comment"> | string
    taskId?: StringWithAggregatesFilter<"Comment"> | string
  }

  export type ProjectInvitationWhereInput = {
    AND?: ProjectInvitationWhereInput | ProjectInvitationWhereInput[]
    OR?: ProjectInvitationWhereInput[]
    NOT?: ProjectInvitationWhereInput | ProjectInvitationWhereInput[]
    status?: EnumInvitationStatusFilter<"ProjectInvitation"> | $Enums.InvitationStatus
    createdAt?: DateTimeFilter<"ProjectInvitation"> | Date | string
    invitorId?: StringFilter<"ProjectInvitation"> | string
    projectId?: StringFilter<"ProjectInvitation"> | string
    invitor?: XOR<UserScalarRelationFilter, UserWhereInput>
    toProject?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }

  export type ProjectInvitationOrderByWithRelationInput = {
    status?: SortOrder
    createdAt?: SortOrder
    invitorId?: SortOrder
    projectId?: SortOrder
    invitor?: UserOrderByWithRelationInput
    toProject?: ProjectOrderByWithRelationInput
  }

  export type ProjectInvitationWhereUniqueInput = Prisma.AtLeast<{
    invitorId_projectId?: ProjectInvitationInvitorIdProjectIdCompoundUniqueInput
    AND?: ProjectInvitationWhereInput | ProjectInvitationWhereInput[]
    OR?: ProjectInvitationWhereInput[]
    NOT?: ProjectInvitationWhereInput | ProjectInvitationWhereInput[]
    status?: EnumInvitationStatusFilter<"ProjectInvitation"> | $Enums.InvitationStatus
    createdAt?: DateTimeFilter<"ProjectInvitation"> | Date | string
    invitorId?: StringFilter<"ProjectInvitation"> | string
    projectId?: StringFilter<"ProjectInvitation"> | string
    invitor?: XOR<UserScalarRelationFilter, UserWhereInput>
    toProject?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }, "invitorId_projectId">

  export type ProjectInvitationOrderByWithAggregationInput = {
    status?: SortOrder
    createdAt?: SortOrder
    invitorId?: SortOrder
    projectId?: SortOrder
    _count?: ProjectInvitationCountOrderByAggregateInput
    _max?: ProjectInvitationMaxOrderByAggregateInput
    _min?: ProjectInvitationMinOrderByAggregateInput
  }

  export type ProjectInvitationScalarWhereWithAggregatesInput = {
    AND?: ProjectInvitationScalarWhereWithAggregatesInput | ProjectInvitationScalarWhereWithAggregatesInput[]
    OR?: ProjectInvitationScalarWhereWithAggregatesInput[]
    NOT?: ProjectInvitationScalarWhereWithAggregatesInput | ProjectInvitationScalarWhereWithAggregatesInput[]
    status?: EnumInvitationStatusWithAggregatesFilter<"ProjectInvitation"> | $Enums.InvitationStatus
    createdAt?: DateTimeWithAggregatesFilter<"ProjectInvitation"> | Date | string
    invitorId?: StringWithAggregatesFilter<"ProjectInvitation"> | string
    projectId?: StringWithAggregatesFilter<"ProjectInvitation"> | string
  }

  export type UserInProjectWhereInput = {
    AND?: UserInProjectWhereInput | UserInProjectWhereInput[]
    OR?: UserInProjectWhereInput[]
    NOT?: UserInProjectWhereInput | UserInProjectWhereInput[]
    userId?: StringFilter<"UserInProject"> | string
    projectId?: StringFilter<"UserInProject"> | string
    roleId?: StringFilter<"UserInProject"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    role?: XOR<RoleScalarRelationFilter, RoleWhereInput>
  }

  export type UserInProjectOrderByWithRelationInput = {
    userId?: SortOrder
    projectId?: SortOrder
    roleId?: SortOrder
    user?: UserOrderByWithRelationInput
    project?: ProjectOrderByWithRelationInput
    role?: RoleOrderByWithRelationInput
  }

  export type UserInProjectWhereUniqueInput = Prisma.AtLeast<{
    userId_projectId?: UserInProjectUserIdProjectIdCompoundUniqueInput
    AND?: UserInProjectWhereInput | UserInProjectWhereInput[]
    OR?: UserInProjectWhereInput[]
    NOT?: UserInProjectWhereInput | UserInProjectWhereInput[]
    userId?: StringFilter<"UserInProject"> | string
    projectId?: StringFilter<"UserInProject"> | string
    roleId?: StringFilter<"UserInProject"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    role?: XOR<RoleScalarRelationFilter, RoleWhereInput>
  }, "userId_projectId">

  export type UserInProjectOrderByWithAggregationInput = {
    userId?: SortOrder
    projectId?: SortOrder
    roleId?: SortOrder
    _count?: UserInProjectCountOrderByAggregateInput
    _max?: UserInProjectMaxOrderByAggregateInput
    _min?: UserInProjectMinOrderByAggregateInput
  }

  export type UserInProjectScalarWhereWithAggregatesInput = {
    AND?: UserInProjectScalarWhereWithAggregatesInput | UserInProjectScalarWhereWithAggregatesInput[]
    OR?: UserInProjectScalarWhereWithAggregatesInput[]
    NOT?: UserInProjectScalarWhereWithAggregatesInput | UserInProjectScalarWhereWithAggregatesInput[]
    userId?: StringWithAggregatesFilter<"UserInProject"> | string
    projectId?: StringWithAggregatesFilter<"UserInProject"> | string
    roleId?: StringWithAggregatesFilter<"UserInProject"> | string
  }

  export type RoleWhereInput = {
    AND?: RoleWhereInput | RoleWhereInput[]
    OR?: RoleWhereInput[]
    NOT?: RoleWhereInput | RoleWhereInput[]
    id?: StringFilter<"Role"> | string
    name?: StringFilter<"Role"> | string
    listOfPermission?: StringFilter<"Role"> | string
    isDefault?: BoolFilter<"Role"> | boolean
    projectId?: StringNullableFilter<"Role"> | string | null
    userInProjects?: UserInProjectListRelationFilter
    project?: XOR<ProjectNullableScalarRelationFilter, ProjectWhereInput> | null
  }

  export type RoleOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    listOfPermission?: SortOrder
    isDefault?: SortOrder
    projectId?: SortOrderInput | SortOrder
    userInProjects?: UserInProjectOrderByRelationAggregateInput
    project?: ProjectOrderByWithRelationInput
  }

  export type RoleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name_projectId?: RoleNameProjectIdCompoundUniqueInput
    AND?: RoleWhereInput | RoleWhereInput[]
    OR?: RoleWhereInput[]
    NOT?: RoleWhereInput | RoleWhereInput[]
    name?: StringFilter<"Role"> | string
    listOfPermission?: StringFilter<"Role"> | string
    isDefault?: BoolFilter<"Role"> | boolean
    projectId?: StringNullableFilter<"Role"> | string | null
    userInProjects?: UserInProjectListRelationFilter
    project?: XOR<ProjectNullableScalarRelationFilter, ProjectWhereInput> | null
  }, "id" | "name_projectId">

  export type RoleOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    listOfPermission?: SortOrder
    isDefault?: SortOrder
    projectId?: SortOrderInput | SortOrder
    _count?: RoleCountOrderByAggregateInput
    _max?: RoleMaxOrderByAggregateInput
    _min?: RoleMinOrderByAggregateInput
  }

  export type RoleScalarWhereWithAggregatesInput = {
    AND?: RoleScalarWhereWithAggregatesInput | RoleScalarWhereWithAggregatesInput[]
    OR?: RoleScalarWhereWithAggregatesInput[]
    NOT?: RoleScalarWhereWithAggregatesInput | RoleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Role"> | string
    name?: StringWithAggregatesFilter<"Role"> | string
    listOfPermission?: StringWithAggregatesFilter<"Role"> | string
    isDefault?: BoolWithAggregatesFilter<"Role"> | boolean
    projectId?: StringNullableWithAggregatesFilter<"Role"> | string | null
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password?: string | null
    name?: string | null
    avatarUrl?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: OAuthAccountCreateNestedManyWithoutOwnInput
    projects?: ProjectCreateNestedManyWithoutOwnInput
    projectInvitations?: ProjectInvitationCreateNestedManyWithoutInvitorInput
    belongToProjects?: UserInProjectCreateNestedManyWithoutUserInput
    supervisedTasks?: TaskCreateNestedManyWithoutSupervisorInput
    tasks?: TaskOfUserCreateNestedManyWithoutUserInput
    comments?: CommentCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password?: string | null
    name?: string | null
    avatarUrl?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: OAuthAccountUncheckedCreateNestedManyWithoutOwnInput
    projects?: ProjectUncheckedCreateNestedManyWithoutOwnInput
    projectInvitations?: ProjectInvitationUncheckedCreateNestedManyWithoutInvitorInput
    belongToProjects?: UserInProjectUncheckedCreateNestedManyWithoutUserInput
    supervisedTasks?: TaskUncheckedCreateNestedManyWithoutSupervisorInput
    tasks?: TaskOfUserUncheckedCreateNestedManyWithoutUserInput
    comments?: CommentUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: OAuthAccountUpdateManyWithoutOwnNestedInput
    projects?: ProjectUpdateManyWithoutOwnNestedInput
    projectInvitations?: ProjectInvitationUpdateManyWithoutInvitorNestedInput
    belongToProjects?: UserInProjectUpdateManyWithoutUserNestedInput
    supervisedTasks?: TaskUpdateManyWithoutSupervisorNestedInput
    tasks?: TaskOfUserUpdateManyWithoutUserNestedInput
    comments?: CommentUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: OAuthAccountUncheckedUpdateManyWithoutOwnNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutOwnNestedInput
    projectInvitations?: ProjectInvitationUncheckedUpdateManyWithoutInvitorNestedInput
    belongToProjects?: UserInProjectUncheckedUpdateManyWithoutUserNestedInput
    supervisedTasks?: TaskUncheckedUpdateManyWithoutSupervisorNestedInput
    tasks?: TaskOfUserUncheckedUpdateManyWithoutUserNestedInput
    comments?: CommentUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password?: string | null
    name?: string | null
    avatarUrl?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthAccountCreateInput = {
    id?: string
    provider: $Enums.Provider
    own: UserCreateNestedOneWithoutAccountsInput
  }

  export type OAuthAccountUncheckedCreateInput = {
    id?: string
    provider: $Enums.Provider
    userId: string
  }

  export type OAuthAccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    own?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type OAuthAccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type OAuthAccountCreateManyInput = {
    id?: string
    provider: $Enums.Provider
    userId: string
  }

  export type OAuthAccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
  }

  export type OAuthAccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type ProjectCreateInput = {
    id?: string
    name: string
    description?: string | null
    isPersonal?: boolean
    listOfSection?: string
    createdAt?: Date | string
    sections?: SectionCreateNestedManyWithoutHasInput
    tasks?: TaskCreateNestedManyWithoutBelongsToProjectInput
    invitations?: ProjectInvitationCreateNestedManyWithoutToProjectInput
    members?: UserInProjectCreateNestedManyWithoutProjectInput
    roles?: RoleCreateNestedManyWithoutProjectInput
    own: UserCreateNestedOneWithoutProjectsInput
  }

  export type ProjectUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    isPersonal?: boolean
    listOfSection?: string
    createdAt?: Date | string
    owner: string
    sections?: SectionUncheckedCreateNestedManyWithoutHasInput
    tasks?: TaskUncheckedCreateNestedManyWithoutBelongsToProjectInput
    invitations?: ProjectInvitationUncheckedCreateNestedManyWithoutToProjectInput
    members?: UserInProjectUncheckedCreateNestedManyWithoutProjectInput
    roles?: RoleUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPersonal?: BoolFieldUpdateOperationsInput | boolean
    listOfSection?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sections?: SectionUpdateManyWithoutHasNestedInput
    tasks?: TaskUpdateManyWithoutBelongsToProjectNestedInput
    invitations?: ProjectInvitationUpdateManyWithoutToProjectNestedInput
    members?: UserInProjectUpdateManyWithoutProjectNestedInput
    roles?: RoleUpdateManyWithoutProjectNestedInput
    own?: UserUpdateOneRequiredWithoutProjectsNestedInput
  }

  export type ProjectUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPersonal?: BoolFieldUpdateOperationsInput | boolean
    listOfSection?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: StringFieldUpdateOperationsInput | string
    sections?: SectionUncheckedUpdateManyWithoutHasNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutBelongsToProjectNestedInput
    invitations?: ProjectInvitationUncheckedUpdateManyWithoutToProjectNestedInput
    members?: UserInProjectUncheckedUpdateManyWithoutProjectNestedInput
    roles?: RoleUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    isPersonal?: boolean
    listOfSection?: string
    createdAt?: Date | string
    owner: string
  }

  export type ProjectUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPersonal?: BoolFieldUpdateOperationsInput | boolean
    listOfSection?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPersonal?: BoolFieldUpdateOperationsInput | boolean
    listOfSection?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: StringFieldUpdateOperationsInput | string
  }

  export type SectionCreateInput = {
    id?: string
    name: string
    listOfTask?: string
    createdAt?: Date | string
    has: ProjectCreateNestedOneWithoutSectionsInput
  }

  export type SectionUncheckedCreateInput = {
    id?: string
    name: string
    listOfTask?: string
    createdAt?: Date | string
    projectId: string
  }

  export type SectionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    listOfTask?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    has?: ProjectUpdateOneRequiredWithoutSectionsNestedInput
  }

  export type SectionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    listOfTask?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projectId?: StringFieldUpdateOperationsInput | string
  }

  export type SectionCreateManyInput = {
    id?: string
    name: string
    listOfTask?: string
    createdAt?: Date | string
    projectId: string
  }

  export type SectionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    listOfTask?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SectionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    listOfTask?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projectId?: StringFieldUpdateOperationsInput | string
  }

  export type TaskCreateInput = {
    id?: string
    title: string
    description?: string | null
    status?: $Enums.TaskStatus
    priority?: $Enums.PriorityLevel | null
    startDate?: Date | string | null
    dueDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sectionId: string
    assignees?: TaskOfUserCreateNestedManyWithoutTaskInput
    subtasks?: TaskCreateNestedManyWithoutParentInput
    comments?: CommentCreateNestedManyWithoutTaskInput
    parent?: TaskCreateNestedOneWithoutSubtasksInput
    supervisor?: UserCreateNestedOneWithoutSupervisedTasksInput
    belongsToProject: ProjectCreateNestedOneWithoutTasksInput
  }

  export type TaskUncheckedCreateInput = {
    id?: string
    title: string
    description?: string | null
    status?: $Enums.TaskStatus
    priority?: $Enums.PriorityLevel | null
    startDate?: Date | string | null
    dueDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sectionId: string
    parentTaskId?: string | null
    supervisorId?: string | null
    projectId: string
    assignees?: TaskOfUserUncheckedCreateNestedManyWithoutTaskInput
    subtasks?: TaskUncheckedCreateNestedManyWithoutParentInput
    comments?: CommentUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    priority?: NullableEnumPriorityLevelFieldUpdateOperationsInput | $Enums.PriorityLevel | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sectionId?: StringFieldUpdateOperationsInput | string
    assignees?: TaskOfUserUpdateManyWithoutTaskNestedInput
    subtasks?: TaskUpdateManyWithoutParentNestedInput
    comments?: CommentUpdateManyWithoutTaskNestedInput
    parent?: TaskUpdateOneWithoutSubtasksNestedInput
    supervisor?: UserUpdateOneWithoutSupervisedTasksNestedInput
    belongsToProject?: ProjectUpdateOneRequiredWithoutTasksNestedInput
  }

  export type TaskUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    priority?: NullableEnumPriorityLevelFieldUpdateOperationsInput | $Enums.PriorityLevel | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sectionId?: StringFieldUpdateOperationsInput | string
    parentTaskId?: NullableStringFieldUpdateOperationsInput | string | null
    supervisorId?: NullableStringFieldUpdateOperationsInput | string | null
    projectId?: StringFieldUpdateOperationsInput | string
    assignees?: TaskOfUserUncheckedUpdateManyWithoutTaskNestedInput
    subtasks?: TaskUncheckedUpdateManyWithoutParentNestedInput
    comments?: CommentUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskCreateManyInput = {
    id?: string
    title: string
    description?: string | null
    status?: $Enums.TaskStatus
    priority?: $Enums.PriorityLevel | null
    startDate?: Date | string | null
    dueDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sectionId: string
    parentTaskId?: string | null
    supervisorId?: string | null
    projectId: string
  }

  export type TaskUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    priority?: NullableEnumPriorityLevelFieldUpdateOperationsInput | $Enums.PriorityLevel | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sectionId?: StringFieldUpdateOperationsInput | string
  }

  export type TaskUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    priority?: NullableEnumPriorityLevelFieldUpdateOperationsInput | $Enums.PriorityLevel | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sectionId?: StringFieldUpdateOperationsInput | string
    parentTaskId?: NullableStringFieldUpdateOperationsInput | string | null
    supervisorId?: NullableStringFieldUpdateOperationsInput | string | null
    projectId?: StringFieldUpdateOperationsInput | string
  }

  export type TaskOfUserCreateInput = {
    task: TaskCreateNestedOneWithoutAssigneesInput
    user: UserCreateNestedOneWithoutTasksInput
  }

  export type TaskOfUserUncheckedCreateInput = {
    taskId: string
    userId: string
  }

  export type TaskOfUserUpdateInput = {
    task?: TaskUpdateOneRequiredWithoutAssigneesNestedInput
    user?: UserUpdateOneRequiredWithoutTasksNestedInput
  }

  export type TaskOfUserUncheckedUpdateInput = {
    taskId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type TaskOfUserCreateManyInput = {
    taskId: string
    userId: string
  }

  export type TaskOfUserUpdateManyMutationInput = {

  }

  export type TaskOfUserUncheckedUpdateManyInput = {
    taskId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type CommentCreateInput = {
    id?: string
    content: string
    mediaUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    author: UserCreateNestedOneWithoutCommentsInput
    task: TaskCreateNestedOneWithoutCommentsInput
  }

  export type CommentUncheckedCreateInput = {
    id?: string
    content: string
    mediaUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    authorId: string
    taskId: string
  }

  export type CommentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: UserUpdateOneRequiredWithoutCommentsNestedInput
    task?: TaskUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type CommentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorId?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
  }

  export type CommentCreateManyInput = {
    id?: string
    content: string
    mediaUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    authorId: string
    taskId: string
  }

  export type CommentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorId?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
  }

  export type ProjectInvitationCreateInput = {
    status?: $Enums.InvitationStatus
    createdAt?: Date | string
    invitor: UserCreateNestedOneWithoutProjectInvitationsInput
    toProject: ProjectCreateNestedOneWithoutInvitationsInput
  }

  export type ProjectInvitationUncheckedCreateInput = {
    status?: $Enums.InvitationStatus
    createdAt?: Date | string
    invitorId: string
    projectId: string
  }

  export type ProjectInvitationUpdateInput = {
    status?: EnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invitor?: UserUpdateOneRequiredWithoutProjectInvitationsNestedInput
    toProject?: ProjectUpdateOneRequiredWithoutInvitationsNestedInput
  }

  export type ProjectInvitationUncheckedUpdateInput = {
    status?: EnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invitorId?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
  }

  export type ProjectInvitationCreateManyInput = {
    status?: $Enums.InvitationStatus
    createdAt?: Date | string
    invitorId: string
    projectId: string
  }

  export type ProjectInvitationUpdateManyMutationInput = {
    status?: EnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectInvitationUncheckedUpdateManyInput = {
    status?: EnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invitorId?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
  }

  export type UserInProjectCreateInput = {
    user: UserCreateNestedOneWithoutBelongToProjectsInput
    project: ProjectCreateNestedOneWithoutMembersInput
    role: RoleCreateNestedOneWithoutUserInProjectsInput
  }

  export type UserInProjectUncheckedCreateInput = {
    userId: string
    projectId: string
    roleId: string
  }

  export type UserInProjectUpdateInput = {
    user?: UserUpdateOneRequiredWithoutBelongToProjectsNestedInput
    project?: ProjectUpdateOneRequiredWithoutMembersNestedInput
    role?: RoleUpdateOneRequiredWithoutUserInProjectsNestedInput
  }

  export type UserInProjectUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    roleId?: StringFieldUpdateOperationsInput | string
  }

  export type UserInProjectCreateManyInput = {
    userId: string
    projectId: string
    roleId: string
  }

  export type UserInProjectUpdateManyMutationInput = {

  }

  export type UserInProjectUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    roleId?: StringFieldUpdateOperationsInput | string
  }

  export type RoleCreateInput = {
    id?: string
    name: string
    listOfPermission: string
    isDefault?: boolean
    userInProjects?: UserInProjectCreateNestedManyWithoutRoleInput
    project?: ProjectCreateNestedOneWithoutRolesInput
  }

  export type RoleUncheckedCreateInput = {
    id?: string
    name: string
    listOfPermission: string
    isDefault?: boolean
    projectId?: string | null
    userInProjects?: UserInProjectUncheckedCreateNestedManyWithoutRoleInput
  }

  export type RoleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    listOfPermission?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    userInProjects?: UserInProjectUpdateManyWithoutRoleNestedInput
    project?: ProjectUpdateOneWithoutRolesNestedInput
  }

  export type RoleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    listOfPermission?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    userInProjects?: UserInProjectUncheckedUpdateManyWithoutRoleNestedInput
  }

  export type RoleCreateManyInput = {
    id?: string
    name: string
    listOfPermission: string
    isDefault?: boolean
    projectId?: string | null
  }

  export type RoleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    listOfPermission?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RoleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    listOfPermission?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type OAuthAccountListRelationFilter = {
    every?: OAuthAccountWhereInput
    some?: OAuthAccountWhereInput
    none?: OAuthAccountWhereInput
  }

  export type ProjectListRelationFilter = {
    every?: ProjectWhereInput
    some?: ProjectWhereInput
    none?: ProjectWhereInput
  }

  export type ProjectInvitationListRelationFilter = {
    every?: ProjectInvitationWhereInput
    some?: ProjectInvitationWhereInput
    none?: ProjectInvitationWhereInput
  }

  export type UserInProjectListRelationFilter = {
    every?: UserInProjectWhereInput
    some?: UserInProjectWhereInput
    none?: UserInProjectWhereInput
  }

  export type TaskListRelationFilter = {
    every?: TaskWhereInput
    some?: TaskWhereInput
    none?: TaskWhereInput
  }

  export type TaskOfUserListRelationFilter = {
    every?: TaskOfUserWhereInput
    some?: TaskOfUserWhereInput
    none?: TaskOfUserWhereInput
  }

  export type CommentListRelationFilter = {
    every?: CommentWhereInput
    some?: CommentWhereInput
    none?: CommentWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type OAuthAccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectInvitationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserInProjectOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TaskOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TaskOfUserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CommentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    avatarUrl?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    avatarUrl?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    avatarUrl?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumProviderFilter<$PrismaModel = never> = {
    equals?: $Enums.Provider | EnumProviderFieldRefInput<$PrismaModel>
    in?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumProviderFilter<$PrismaModel> | $Enums.Provider
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type OAuthAccountCountOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    userId?: SortOrder
  }

  export type OAuthAccountMaxOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    userId?: SortOrder
  }

  export type OAuthAccountMinOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    userId?: SortOrder
  }

  export type EnumProviderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Provider | EnumProviderFieldRefInput<$PrismaModel>
    in?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumProviderWithAggregatesFilter<$PrismaModel> | $Enums.Provider
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProviderFilter<$PrismaModel>
    _max?: NestedEnumProviderFilter<$PrismaModel>
  }

  export type SectionListRelationFilter = {
    every?: SectionWhereInput
    some?: SectionWhereInput
    none?: SectionWhereInput
  }

  export type RoleListRelationFilter = {
    every?: RoleWhereInput
    some?: RoleWhereInput
    none?: RoleWhereInput
  }

  export type SectionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RoleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isPersonal?: SortOrder
    listOfSection?: SortOrder
    createdAt?: SortOrder
    owner?: SortOrder
  }

  export type ProjectMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isPersonal?: SortOrder
    listOfSection?: SortOrder
    createdAt?: SortOrder
    owner?: SortOrder
  }

  export type ProjectMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isPersonal?: SortOrder
    listOfSection?: SortOrder
    createdAt?: SortOrder
    owner?: SortOrder
  }

  export type ProjectScalarRelationFilter = {
    is?: ProjectWhereInput
    isNot?: ProjectWhereInput
  }

  export type SectionCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    listOfTask?: SortOrder
    createdAt?: SortOrder
    projectId?: SortOrder
  }

  export type SectionMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    listOfTask?: SortOrder
    createdAt?: SortOrder
    projectId?: SortOrder
  }

  export type SectionMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    listOfTask?: SortOrder
    createdAt?: SortOrder
    projectId?: SortOrder
  }

  export type EnumTaskStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskStatus | EnumTaskStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskStatusFilter<$PrismaModel> | $Enums.TaskStatus
  }

  export type EnumPriorityLevelNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.PriorityLevel | EnumPriorityLevelFieldRefInput<$PrismaModel> | null
    in?: $Enums.PriorityLevel[] | ListEnumPriorityLevelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.PriorityLevel[] | ListEnumPriorityLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumPriorityLevelNullableFilter<$PrismaModel> | $Enums.PriorityLevel | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type TaskNullableScalarRelationFilter = {
    is?: TaskWhereInput | null
    isNot?: TaskWhereInput | null
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type TaskCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    startDate?: SortOrder
    dueDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sectionId?: SortOrder
    parentTaskId?: SortOrder
    supervisorId?: SortOrder
    projectId?: SortOrder
  }

  export type TaskMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    startDate?: SortOrder
    dueDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sectionId?: SortOrder
    parentTaskId?: SortOrder
    supervisorId?: SortOrder
    projectId?: SortOrder
  }

  export type TaskMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    startDate?: SortOrder
    dueDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sectionId?: SortOrder
    parentTaskId?: SortOrder
    supervisorId?: SortOrder
    projectId?: SortOrder
  }

  export type EnumTaskStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskStatus | EnumTaskStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskStatusWithAggregatesFilter<$PrismaModel> | $Enums.TaskStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTaskStatusFilter<$PrismaModel>
    _max?: NestedEnumTaskStatusFilter<$PrismaModel>
  }

  export type EnumPriorityLevelNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PriorityLevel | EnumPriorityLevelFieldRefInput<$PrismaModel> | null
    in?: $Enums.PriorityLevel[] | ListEnumPriorityLevelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.PriorityLevel[] | ListEnumPriorityLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumPriorityLevelNullableWithAggregatesFilter<$PrismaModel> | $Enums.PriorityLevel | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumPriorityLevelNullableFilter<$PrismaModel>
    _max?: NestedEnumPriorityLevelNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type TaskScalarRelationFilter = {
    is?: TaskWhereInput
    isNot?: TaskWhereInput
  }

  export type TaskOfUserTaskIdUserIdCompoundUniqueInput = {
    taskId: string
    userId: string
  }

  export type TaskOfUserCountOrderByAggregateInput = {
    taskId?: SortOrder
    userId?: SortOrder
  }

  export type TaskOfUserMaxOrderByAggregateInput = {
    taskId?: SortOrder
    userId?: SortOrder
  }

  export type TaskOfUserMinOrderByAggregateInput = {
    taskId?: SortOrder
    userId?: SortOrder
  }

  export type CommentCountOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    mediaUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    authorId?: SortOrder
    taskId?: SortOrder
  }

  export type CommentMaxOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    mediaUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    authorId?: SortOrder
    taskId?: SortOrder
  }

  export type CommentMinOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    mediaUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    authorId?: SortOrder
    taskId?: SortOrder
  }

  export type EnumInvitationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.InvitationStatus | EnumInvitationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InvitationStatus[] | ListEnumInvitationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InvitationStatus[] | ListEnumInvitationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInvitationStatusFilter<$PrismaModel> | $Enums.InvitationStatus
  }

  export type ProjectInvitationInvitorIdProjectIdCompoundUniqueInput = {
    invitorId: string
    projectId: string
  }

  export type ProjectInvitationCountOrderByAggregateInput = {
    status?: SortOrder
    createdAt?: SortOrder
    invitorId?: SortOrder
    projectId?: SortOrder
  }

  export type ProjectInvitationMaxOrderByAggregateInput = {
    status?: SortOrder
    createdAt?: SortOrder
    invitorId?: SortOrder
    projectId?: SortOrder
  }

  export type ProjectInvitationMinOrderByAggregateInput = {
    status?: SortOrder
    createdAt?: SortOrder
    invitorId?: SortOrder
    projectId?: SortOrder
  }

  export type EnumInvitationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InvitationStatus | EnumInvitationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InvitationStatus[] | ListEnumInvitationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InvitationStatus[] | ListEnumInvitationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInvitationStatusWithAggregatesFilter<$PrismaModel> | $Enums.InvitationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumInvitationStatusFilter<$PrismaModel>
    _max?: NestedEnumInvitationStatusFilter<$PrismaModel>
  }

  export type RoleScalarRelationFilter = {
    is?: RoleWhereInput
    isNot?: RoleWhereInput
  }

  export type UserInProjectUserIdProjectIdCompoundUniqueInput = {
    userId: string
    projectId: string
  }

  export type UserInProjectCountOrderByAggregateInput = {
    userId?: SortOrder
    projectId?: SortOrder
    roleId?: SortOrder
  }

  export type UserInProjectMaxOrderByAggregateInput = {
    userId?: SortOrder
    projectId?: SortOrder
    roleId?: SortOrder
  }

  export type UserInProjectMinOrderByAggregateInput = {
    userId?: SortOrder
    projectId?: SortOrder
    roleId?: SortOrder
  }

  export type ProjectNullableScalarRelationFilter = {
    is?: ProjectWhereInput | null
    isNot?: ProjectWhereInput | null
  }

  export type RoleNameProjectIdCompoundUniqueInput = {
    name: string
    projectId: string
  }

  export type RoleCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    listOfPermission?: SortOrder
    isDefault?: SortOrder
    projectId?: SortOrder
  }

  export type RoleMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    listOfPermission?: SortOrder
    isDefault?: SortOrder
    projectId?: SortOrder
  }

  export type RoleMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    listOfPermission?: SortOrder
    isDefault?: SortOrder
    projectId?: SortOrder
  }

  export type OAuthAccountCreateNestedManyWithoutOwnInput = {
    create?: XOR<OAuthAccountCreateWithoutOwnInput, OAuthAccountUncheckedCreateWithoutOwnInput> | OAuthAccountCreateWithoutOwnInput[] | OAuthAccountUncheckedCreateWithoutOwnInput[]
    connectOrCreate?: OAuthAccountCreateOrConnectWithoutOwnInput | OAuthAccountCreateOrConnectWithoutOwnInput[]
    createMany?: OAuthAccountCreateManyOwnInputEnvelope
    connect?: OAuthAccountWhereUniqueInput | OAuthAccountWhereUniqueInput[]
  }

  export type ProjectCreateNestedManyWithoutOwnInput = {
    create?: XOR<ProjectCreateWithoutOwnInput, ProjectUncheckedCreateWithoutOwnInput> | ProjectCreateWithoutOwnInput[] | ProjectUncheckedCreateWithoutOwnInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutOwnInput | ProjectCreateOrConnectWithoutOwnInput[]
    createMany?: ProjectCreateManyOwnInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type ProjectInvitationCreateNestedManyWithoutInvitorInput = {
    create?: XOR<ProjectInvitationCreateWithoutInvitorInput, ProjectInvitationUncheckedCreateWithoutInvitorInput> | ProjectInvitationCreateWithoutInvitorInput[] | ProjectInvitationUncheckedCreateWithoutInvitorInput[]
    connectOrCreate?: ProjectInvitationCreateOrConnectWithoutInvitorInput | ProjectInvitationCreateOrConnectWithoutInvitorInput[]
    createMany?: ProjectInvitationCreateManyInvitorInputEnvelope
    connect?: ProjectInvitationWhereUniqueInput | ProjectInvitationWhereUniqueInput[]
  }

  export type UserInProjectCreateNestedManyWithoutUserInput = {
    create?: XOR<UserInProjectCreateWithoutUserInput, UserInProjectUncheckedCreateWithoutUserInput> | UserInProjectCreateWithoutUserInput[] | UserInProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserInProjectCreateOrConnectWithoutUserInput | UserInProjectCreateOrConnectWithoutUserInput[]
    createMany?: UserInProjectCreateManyUserInputEnvelope
    connect?: UserInProjectWhereUniqueInput | UserInProjectWhereUniqueInput[]
  }

  export type TaskCreateNestedManyWithoutSupervisorInput = {
    create?: XOR<TaskCreateWithoutSupervisorInput, TaskUncheckedCreateWithoutSupervisorInput> | TaskCreateWithoutSupervisorInput[] | TaskUncheckedCreateWithoutSupervisorInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutSupervisorInput | TaskCreateOrConnectWithoutSupervisorInput[]
    createMany?: TaskCreateManySupervisorInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type TaskOfUserCreateNestedManyWithoutUserInput = {
    create?: XOR<TaskOfUserCreateWithoutUserInput, TaskOfUserUncheckedCreateWithoutUserInput> | TaskOfUserCreateWithoutUserInput[] | TaskOfUserUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskOfUserCreateOrConnectWithoutUserInput | TaskOfUserCreateOrConnectWithoutUserInput[]
    createMany?: TaskOfUserCreateManyUserInputEnvelope
    connect?: TaskOfUserWhereUniqueInput | TaskOfUserWhereUniqueInput[]
  }

  export type CommentCreateNestedManyWithoutAuthorInput = {
    create?: XOR<CommentCreateWithoutAuthorInput, CommentUncheckedCreateWithoutAuthorInput> | CommentCreateWithoutAuthorInput[] | CommentUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutAuthorInput | CommentCreateOrConnectWithoutAuthorInput[]
    createMany?: CommentCreateManyAuthorInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type OAuthAccountUncheckedCreateNestedManyWithoutOwnInput = {
    create?: XOR<OAuthAccountCreateWithoutOwnInput, OAuthAccountUncheckedCreateWithoutOwnInput> | OAuthAccountCreateWithoutOwnInput[] | OAuthAccountUncheckedCreateWithoutOwnInput[]
    connectOrCreate?: OAuthAccountCreateOrConnectWithoutOwnInput | OAuthAccountCreateOrConnectWithoutOwnInput[]
    createMany?: OAuthAccountCreateManyOwnInputEnvelope
    connect?: OAuthAccountWhereUniqueInput | OAuthAccountWhereUniqueInput[]
  }

  export type ProjectUncheckedCreateNestedManyWithoutOwnInput = {
    create?: XOR<ProjectCreateWithoutOwnInput, ProjectUncheckedCreateWithoutOwnInput> | ProjectCreateWithoutOwnInput[] | ProjectUncheckedCreateWithoutOwnInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutOwnInput | ProjectCreateOrConnectWithoutOwnInput[]
    createMany?: ProjectCreateManyOwnInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type ProjectInvitationUncheckedCreateNestedManyWithoutInvitorInput = {
    create?: XOR<ProjectInvitationCreateWithoutInvitorInput, ProjectInvitationUncheckedCreateWithoutInvitorInput> | ProjectInvitationCreateWithoutInvitorInput[] | ProjectInvitationUncheckedCreateWithoutInvitorInput[]
    connectOrCreate?: ProjectInvitationCreateOrConnectWithoutInvitorInput | ProjectInvitationCreateOrConnectWithoutInvitorInput[]
    createMany?: ProjectInvitationCreateManyInvitorInputEnvelope
    connect?: ProjectInvitationWhereUniqueInput | ProjectInvitationWhereUniqueInput[]
  }

  export type UserInProjectUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserInProjectCreateWithoutUserInput, UserInProjectUncheckedCreateWithoutUserInput> | UserInProjectCreateWithoutUserInput[] | UserInProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserInProjectCreateOrConnectWithoutUserInput | UserInProjectCreateOrConnectWithoutUserInput[]
    createMany?: UserInProjectCreateManyUserInputEnvelope
    connect?: UserInProjectWhereUniqueInput | UserInProjectWhereUniqueInput[]
  }

  export type TaskUncheckedCreateNestedManyWithoutSupervisorInput = {
    create?: XOR<TaskCreateWithoutSupervisorInput, TaskUncheckedCreateWithoutSupervisorInput> | TaskCreateWithoutSupervisorInput[] | TaskUncheckedCreateWithoutSupervisorInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutSupervisorInput | TaskCreateOrConnectWithoutSupervisorInput[]
    createMany?: TaskCreateManySupervisorInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type TaskOfUserUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TaskOfUserCreateWithoutUserInput, TaskOfUserUncheckedCreateWithoutUserInput> | TaskOfUserCreateWithoutUserInput[] | TaskOfUserUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskOfUserCreateOrConnectWithoutUserInput | TaskOfUserCreateOrConnectWithoutUserInput[]
    createMany?: TaskOfUserCreateManyUserInputEnvelope
    connect?: TaskOfUserWhereUniqueInput | TaskOfUserWhereUniqueInput[]
  }

  export type CommentUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<CommentCreateWithoutAuthorInput, CommentUncheckedCreateWithoutAuthorInput> | CommentCreateWithoutAuthorInput[] | CommentUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutAuthorInput | CommentCreateOrConnectWithoutAuthorInput[]
    createMany?: CommentCreateManyAuthorInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type OAuthAccountUpdateManyWithoutOwnNestedInput = {
    create?: XOR<OAuthAccountCreateWithoutOwnInput, OAuthAccountUncheckedCreateWithoutOwnInput> | OAuthAccountCreateWithoutOwnInput[] | OAuthAccountUncheckedCreateWithoutOwnInput[]
    connectOrCreate?: OAuthAccountCreateOrConnectWithoutOwnInput | OAuthAccountCreateOrConnectWithoutOwnInput[]
    upsert?: OAuthAccountUpsertWithWhereUniqueWithoutOwnInput | OAuthAccountUpsertWithWhereUniqueWithoutOwnInput[]
    createMany?: OAuthAccountCreateManyOwnInputEnvelope
    set?: OAuthAccountWhereUniqueInput | OAuthAccountWhereUniqueInput[]
    disconnect?: OAuthAccountWhereUniqueInput | OAuthAccountWhereUniqueInput[]
    delete?: OAuthAccountWhereUniqueInput | OAuthAccountWhereUniqueInput[]
    connect?: OAuthAccountWhereUniqueInput | OAuthAccountWhereUniqueInput[]
    update?: OAuthAccountUpdateWithWhereUniqueWithoutOwnInput | OAuthAccountUpdateWithWhereUniqueWithoutOwnInput[]
    updateMany?: OAuthAccountUpdateManyWithWhereWithoutOwnInput | OAuthAccountUpdateManyWithWhereWithoutOwnInput[]
    deleteMany?: OAuthAccountScalarWhereInput | OAuthAccountScalarWhereInput[]
  }

  export type ProjectUpdateManyWithoutOwnNestedInput = {
    create?: XOR<ProjectCreateWithoutOwnInput, ProjectUncheckedCreateWithoutOwnInput> | ProjectCreateWithoutOwnInput[] | ProjectUncheckedCreateWithoutOwnInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutOwnInput | ProjectCreateOrConnectWithoutOwnInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutOwnInput | ProjectUpsertWithWhereUniqueWithoutOwnInput[]
    createMany?: ProjectCreateManyOwnInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutOwnInput | ProjectUpdateWithWhereUniqueWithoutOwnInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutOwnInput | ProjectUpdateManyWithWhereWithoutOwnInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type ProjectInvitationUpdateManyWithoutInvitorNestedInput = {
    create?: XOR<ProjectInvitationCreateWithoutInvitorInput, ProjectInvitationUncheckedCreateWithoutInvitorInput> | ProjectInvitationCreateWithoutInvitorInput[] | ProjectInvitationUncheckedCreateWithoutInvitorInput[]
    connectOrCreate?: ProjectInvitationCreateOrConnectWithoutInvitorInput | ProjectInvitationCreateOrConnectWithoutInvitorInput[]
    upsert?: ProjectInvitationUpsertWithWhereUniqueWithoutInvitorInput | ProjectInvitationUpsertWithWhereUniqueWithoutInvitorInput[]
    createMany?: ProjectInvitationCreateManyInvitorInputEnvelope
    set?: ProjectInvitationWhereUniqueInput | ProjectInvitationWhereUniqueInput[]
    disconnect?: ProjectInvitationWhereUniqueInput | ProjectInvitationWhereUniqueInput[]
    delete?: ProjectInvitationWhereUniqueInput | ProjectInvitationWhereUniqueInput[]
    connect?: ProjectInvitationWhereUniqueInput | ProjectInvitationWhereUniqueInput[]
    update?: ProjectInvitationUpdateWithWhereUniqueWithoutInvitorInput | ProjectInvitationUpdateWithWhereUniqueWithoutInvitorInput[]
    updateMany?: ProjectInvitationUpdateManyWithWhereWithoutInvitorInput | ProjectInvitationUpdateManyWithWhereWithoutInvitorInput[]
    deleteMany?: ProjectInvitationScalarWhereInput | ProjectInvitationScalarWhereInput[]
  }

  export type UserInProjectUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserInProjectCreateWithoutUserInput, UserInProjectUncheckedCreateWithoutUserInput> | UserInProjectCreateWithoutUserInput[] | UserInProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserInProjectCreateOrConnectWithoutUserInput | UserInProjectCreateOrConnectWithoutUserInput[]
    upsert?: UserInProjectUpsertWithWhereUniqueWithoutUserInput | UserInProjectUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserInProjectCreateManyUserInputEnvelope
    set?: UserInProjectWhereUniqueInput | UserInProjectWhereUniqueInput[]
    disconnect?: UserInProjectWhereUniqueInput | UserInProjectWhereUniqueInput[]
    delete?: UserInProjectWhereUniqueInput | UserInProjectWhereUniqueInput[]
    connect?: UserInProjectWhereUniqueInput | UserInProjectWhereUniqueInput[]
    update?: UserInProjectUpdateWithWhereUniqueWithoutUserInput | UserInProjectUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserInProjectUpdateManyWithWhereWithoutUserInput | UserInProjectUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserInProjectScalarWhereInput | UserInProjectScalarWhereInput[]
  }

  export type TaskUpdateManyWithoutSupervisorNestedInput = {
    create?: XOR<TaskCreateWithoutSupervisorInput, TaskUncheckedCreateWithoutSupervisorInput> | TaskCreateWithoutSupervisorInput[] | TaskUncheckedCreateWithoutSupervisorInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutSupervisorInput | TaskCreateOrConnectWithoutSupervisorInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutSupervisorInput | TaskUpsertWithWhereUniqueWithoutSupervisorInput[]
    createMany?: TaskCreateManySupervisorInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutSupervisorInput | TaskUpdateWithWhereUniqueWithoutSupervisorInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutSupervisorInput | TaskUpdateManyWithWhereWithoutSupervisorInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type TaskOfUserUpdateManyWithoutUserNestedInput = {
    create?: XOR<TaskOfUserCreateWithoutUserInput, TaskOfUserUncheckedCreateWithoutUserInput> | TaskOfUserCreateWithoutUserInput[] | TaskOfUserUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskOfUserCreateOrConnectWithoutUserInput | TaskOfUserCreateOrConnectWithoutUserInput[]
    upsert?: TaskOfUserUpsertWithWhereUniqueWithoutUserInput | TaskOfUserUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TaskOfUserCreateManyUserInputEnvelope
    set?: TaskOfUserWhereUniqueInput | TaskOfUserWhereUniqueInput[]
    disconnect?: TaskOfUserWhereUniqueInput | TaskOfUserWhereUniqueInput[]
    delete?: TaskOfUserWhereUniqueInput | TaskOfUserWhereUniqueInput[]
    connect?: TaskOfUserWhereUniqueInput | TaskOfUserWhereUniqueInput[]
    update?: TaskOfUserUpdateWithWhereUniqueWithoutUserInput | TaskOfUserUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TaskOfUserUpdateManyWithWhereWithoutUserInput | TaskOfUserUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TaskOfUserScalarWhereInput | TaskOfUserScalarWhereInput[]
  }

  export type CommentUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<CommentCreateWithoutAuthorInput, CommentUncheckedCreateWithoutAuthorInput> | CommentCreateWithoutAuthorInput[] | CommentUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutAuthorInput | CommentCreateOrConnectWithoutAuthorInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutAuthorInput | CommentUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: CommentCreateManyAuthorInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutAuthorInput | CommentUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutAuthorInput | CommentUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type OAuthAccountUncheckedUpdateManyWithoutOwnNestedInput = {
    create?: XOR<OAuthAccountCreateWithoutOwnInput, OAuthAccountUncheckedCreateWithoutOwnInput> | OAuthAccountCreateWithoutOwnInput[] | OAuthAccountUncheckedCreateWithoutOwnInput[]
    connectOrCreate?: OAuthAccountCreateOrConnectWithoutOwnInput | OAuthAccountCreateOrConnectWithoutOwnInput[]
    upsert?: OAuthAccountUpsertWithWhereUniqueWithoutOwnInput | OAuthAccountUpsertWithWhereUniqueWithoutOwnInput[]
    createMany?: OAuthAccountCreateManyOwnInputEnvelope
    set?: OAuthAccountWhereUniqueInput | OAuthAccountWhereUniqueInput[]
    disconnect?: OAuthAccountWhereUniqueInput | OAuthAccountWhereUniqueInput[]
    delete?: OAuthAccountWhereUniqueInput | OAuthAccountWhereUniqueInput[]
    connect?: OAuthAccountWhereUniqueInput | OAuthAccountWhereUniqueInput[]
    update?: OAuthAccountUpdateWithWhereUniqueWithoutOwnInput | OAuthAccountUpdateWithWhereUniqueWithoutOwnInput[]
    updateMany?: OAuthAccountUpdateManyWithWhereWithoutOwnInput | OAuthAccountUpdateManyWithWhereWithoutOwnInput[]
    deleteMany?: OAuthAccountScalarWhereInput | OAuthAccountScalarWhereInput[]
  }

  export type ProjectUncheckedUpdateManyWithoutOwnNestedInput = {
    create?: XOR<ProjectCreateWithoutOwnInput, ProjectUncheckedCreateWithoutOwnInput> | ProjectCreateWithoutOwnInput[] | ProjectUncheckedCreateWithoutOwnInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutOwnInput | ProjectCreateOrConnectWithoutOwnInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutOwnInput | ProjectUpsertWithWhereUniqueWithoutOwnInput[]
    createMany?: ProjectCreateManyOwnInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutOwnInput | ProjectUpdateWithWhereUniqueWithoutOwnInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutOwnInput | ProjectUpdateManyWithWhereWithoutOwnInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type ProjectInvitationUncheckedUpdateManyWithoutInvitorNestedInput = {
    create?: XOR<ProjectInvitationCreateWithoutInvitorInput, ProjectInvitationUncheckedCreateWithoutInvitorInput> | ProjectInvitationCreateWithoutInvitorInput[] | ProjectInvitationUncheckedCreateWithoutInvitorInput[]
    connectOrCreate?: ProjectInvitationCreateOrConnectWithoutInvitorInput | ProjectInvitationCreateOrConnectWithoutInvitorInput[]
    upsert?: ProjectInvitationUpsertWithWhereUniqueWithoutInvitorInput | ProjectInvitationUpsertWithWhereUniqueWithoutInvitorInput[]
    createMany?: ProjectInvitationCreateManyInvitorInputEnvelope
    set?: ProjectInvitationWhereUniqueInput | ProjectInvitationWhereUniqueInput[]
    disconnect?: ProjectInvitationWhereUniqueInput | ProjectInvitationWhereUniqueInput[]
    delete?: ProjectInvitationWhereUniqueInput | ProjectInvitationWhereUniqueInput[]
    connect?: ProjectInvitationWhereUniqueInput | ProjectInvitationWhereUniqueInput[]
    update?: ProjectInvitationUpdateWithWhereUniqueWithoutInvitorInput | ProjectInvitationUpdateWithWhereUniqueWithoutInvitorInput[]
    updateMany?: ProjectInvitationUpdateManyWithWhereWithoutInvitorInput | ProjectInvitationUpdateManyWithWhereWithoutInvitorInput[]
    deleteMany?: ProjectInvitationScalarWhereInput | ProjectInvitationScalarWhereInput[]
  }

  export type UserInProjectUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserInProjectCreateWithoutUserInput, UserInProjectUncheckedCreateWithoutUserInput> | UserInProjectCreateWithoutUserInput[] | UserInProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserInProjectCreateOrConnectWithoutUserInput | UserInProjectCreateOrConnectWithoutUserInput[]
    upsert?: UserInProjectUpsertWithWhereUniqueWithoutUserInput | UserInProjectUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserInProjectCreateManyUserInputEnvelope
    set?: UserInProjectWhereUniqueInput | UserInProjectWhereUniqueInput[]
    disconnect?: UserInProjectWhereUniqueInput | UserInProjectWhereUniqueInput[]
    delete?: UserInProjectWhereUniqueInput | UserInProjectWhereUniqueInput[]
    connect?: UserInProjectWhereUniqueInput | UserInProjectWhereUniqueInput[]
    update?: UserInProjectUpdateWithWhereUniqueWithoutUserInput | UserInProjectUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserInProjectUpdateManyWithWhereWithoutUserInput | UserInProjectUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserInProjectScalarWhereInput | UserInProjectScalarWhereInput[]
  }

  export type TaskUncheckedUpdateManyWithoutSupervisorNestedInput = {
    create?: XOR<TaskCreateWithoutSupervisorInput, TaskUncheckedCreateWithoutSupervisorInput> | TaskCreateWithoutSupervisorInput[] | TaskUncheckedCreateWithoutSupervisorInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutSupervisorInput | TaskCreateOrConnectWithoutSupervisorInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutSupervisorInput | TaskUpsertWithWhereUniqueWithoutSupervisorInput[]
    createMany?: TaskCreateManySupervisorInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutSupervisorInput | TaskUpdateWithWhereUniqueWithoutSupervisorInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutSupervisorInput | TaskUpdateManyWithWhereWithoutSupervisorInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type TaskOfUserUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TaskOfUserCreateWithoutUserInput, TaskOfUserUncheckedCreateWithoutUserInput> | TaskOfUserCreateWithoutUserInput[] | TaskOfUserUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskOfUserCreateOrConnectWithoutUserInput | TaskOfUserCreateOrConnectWithoutUserInput[]
    upsert?: TaskOfUserUpsertWithWhereUniqueWithoutUserInput | TaskOfUserUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TaskOfUserCreateManyUserInputEnvelope
    set?: TaskOfUserWhereUniqueInput | TaskOfUserWhereUniqueInput[]
    disconnect?: TaskOfUserWhereUniqueInput | TaskOfUserWhereUniqueInput[]
    delete?: TaskOfUserWhereUniqueInput | TaskOfUserWhereUniqueInput[]
    connect?: TaskOfUserWhereUniqueInput | TaskOfUserWhereUniqueInput[]
    update?: TaskOfUserUpdateWithWhereUniqueWithoutUserInput | TaskOfUserUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TaskOfUserUpdateManyWithWhereWithoutUserInput | TaskOfUserUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TaskOfUserScalarWhereInput | TaskOfUserScalarWhereInput[]
  }

  export type CommentUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<CommentCreateWithoutAuthorInput, CommentUncheckedCreateWithoutAuthorInput> | CommentCreateWithoutAuthorInput[] | CommentUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutAuthorInput | CommentCreateOrConnectWithoutAuthorInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutAuthorInput | CommentUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: CommentCreateManyAuthorInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutAuthorInput | CommentUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutAuthorInput | CommentUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumProviderFieldUpdateOperationsInput = {
    set?: $Enums.Provider
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type SectionCreateNestedManyWithoutHasInput = {
    create?: XOR<SectionCreateWithoutHasInput, SectionUncheckedCreateWithoutHasInput> | SectionCreateWithoutHasInput[] | SectionUncheckedCreateWithoutHasInput[]
    connectOrCreate?: SectionCreateOrConnectWithoutHasInput | SectionCreateOrConnectWithoutHasInput[]
    createMany?: SectionCreateManyHasInputEnvelope
    connect?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
  }

  export type TaskCreateNestedManyWithoutBelongsToProjectInput = {
    create?: XOR<TaskCreateWithoutBelongsToProjectInput, TaskUncheckedCreateWithoutBelongsToProjectInput> | TaskCreateWithoutBelongsToProjectInput[] | TaskUncheckedCreateWithoutBelongsToProjectInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutBelongsToProjectInput | TaskCreateOrConnectWithoutBelongsToProjectInput[]
    createMany?: TaskCreateManyBelongsToProjectInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type ProjectInvitationCreateNestedManyWithoutToProjectInput = {
    create?: XOR<ProjectInvitationCreateWithoutToProjectInput, ProjectInvitationUncheckedCreateWithoutToProjectInput> | ProjectInvitationCreateWithoutToProjectInput[] | ProjectInvitationUncheckedCreateWithoutToProjectInput[]
    connectOrCreate?: ProjectInvitationCreateOrConnectWithoutToProjectInput | ProjectInvitationCreateOrConnectWithoutToProjectInput[]
    createMany?: ProjectInvitationCreateManyToProjectInputEnvelope
    connect?: ProjectInvitationWhereUniqueInput | ProjectInvitationWhereUniqueInput[]
  }

  export type UserInProjectCreateNestedManyWithoutProjectInput = {
    create?: XOR<UserInProjectCreateWithoutProjectInput, UserInProjectUncheckedCreateWithoutProjectInput> | UserInProjectCreateWithoutProjectInput[] | UserInProjectUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: UserInProjectCreateOrConnectWithoutProjectInput | UserInProjectCreateOrConnectWithoutProjectInput[]
    createMany?: UserInProjectCreateManyProjectInputEnvelope
    connect?: UserInProjectWhereUniqueInput | UserInProjectWhereUniqueInput[]
  }

  export type RoleCreateNestedManyWithoutProjectInput = {
    create?: XOR<RoleCreateWithoutProjectInput, RoleUncheckedCreateWithoutProjectInput> | RoleCreateWithoutProjectInput[] | RoleUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: RoleCreateOrConnectWithoutProjectInput | RoleCreateOrConnectWithoutProjectInput[]
    createMany?: RoleCreateManyProjectInputEnvelope
    connect?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutProjectsInput = {
    create?: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectsInput
    connect?: UserWhereUniqueInput
  }

  export type SectionUncheckedCreateNestedManyWithoutHasInput = {
    create?: XOR<SectionCreateWithoutHasInput, SectionUncheckedCreateWithoutHasInput> | SectionCreateWithoutHasInput[] | SectionUncheckedCreateWithoutHasInput[]
    connectOrCreate?: SectionCreateOrConnectWithoutHasInput | SectionCreateOrConnectWithoutHasInput[]
    createMany?: SectionCreateManyHasInputEnvelope
    connect?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
  }

  export type TaskUncheckedCreateNestedManyWithoutBelongsToProjectInput = {
    create?: XOR<TaskCreateWithoutBelongsToProjectInput, TaskUncheckedCreateWithoutBelongsToProjectInput> | TaskCreateWithoutBelongsToProjectInput[] | TaskUncheckedCreateWithoutBelongsToProjectInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutBelongsToProjectInput | TaskCreateOrConnectWithoutBelongsToProjectInput[]
    createMany?: TaskCreateManyBelongsToProjectInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type ProjectInvitationUncheckedCreateNestedManyWithoutToProjectInput = {
    create?: XOR<ProjectInvitationCreateWithoutToProjectInput, ProjectInvitationUncheckedCreateWithoutToProjectInput> | ProjectInvitationCreateWithoutToProjectInput[] | ProjectInvitationUncheckedCreateWithoutToProjectInput[]
    connectOrCreate?: ProjectInvitationCreateOrConnectWithoutToProjectInput | ProjectInvitationCreateOrConnectWithoutToProjectInput[]
    createMany?: ProjectInvitationCreateManyToProjectInputEnvelope
    connect?: ProjectInvitationWhereUniqueInput | ProjectInvitationWhereUniqueInput[]
  }

  export type UserInProjectUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<UserInProjectCreateWithoutProjectInput, UserInProjectUncheckedCreateWithoutProjectInput> | UserInProjectCreateWithoutProjectInput[] | UserInProjectUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: UserInProjectCreateOrConnectWithoutProjectInput | UserInProjectCreateOrConnectWithoutProjectInput[]
    createMany?: UserInProjectCreateManyProjectInputEnvelope
    connect?: UserInProjectWhereUniqueInput | UserInProjectWhereUniqueInput[]
  }

  export type RoleUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<RoleCreateWithoutProjectInput, RoleUncheckedCreateWithoutProjectInput> | RoleCreateWithoutProjectInput[] | RoleUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: RoleCreateOrConnectWithoutProjectInput | RoleCreateOrConnectWithoutProjectInput[]
    createMany?: RoleCreateManyProjectInputEnvelope
    connect?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
  }

  export type SectionUpdateManyWithoutHasNestedInput = {
    create?: XOR<SectionCreateWithoutHasInput, SectionUncheckedCreateWithoutHasInput> | SectionCreateWithoutHasInput[] | SectionUncheckedCreateWithoutHasInput[]
    connectOrCreate?: SectionCreateOrConnectWithoutHasInput | SectionCreateOrConnectWithoutHasInput[]
    upsert?: SectionUpsertWithWhereUniqueWithoutHasInput | SectionUpsertWithWhereUniqueWithoutHasInput[]
    createMany?: SectionCreateManyHasInputEnvelope
    set?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    disconnect?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    delete?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    connect?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    update?: SectionUpdateWithWhereUniqueWithoutHasInput | SectionUpdateWithWhereUniqueWithoutHasInput[]
    updateMany?: SectionUpdateManyWithWhereWithoutHasInput | SectionUpdateManyWithWhereWithoutHasInput[]
    deleteMany?: SectionScalarWhereInput | SectionScalarWhereInput[]
  }

  export type TaskUpdateManyWithoutBelongsToProjectNestedInput = {
    create?: XOR<TaskCreateWithoutBelongsToProjectInput, TaskUncheckedCreateWithoutBelongsToProjectInput> | TaskCreateWithoutBelongsToProjectInput[] | TaskUncheckedCreateWithoutBelongsToProjectInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutBelongsToProjectInput | TaskCreateOrConnectWithoutBelongsToProjectInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutBelongsToProjectInput | TaskUpsertWithWhereUniqueWithoutBelongsToProjectInput[]
    createMany?: TaskCreateManyBelongsToProjectInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutBelongsToProjectInput | TaskUpdateWithWhereUniqueWithoutBelongsToProjectInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutBelongsToProjectInput | TaskUpdateManyWithWhereWithoutBelongsToProjectInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type ProjectInvitationUpdateManyWithoutToProjectNestedInput = {
    create?: XOR<ProjectInvitationCreateWithoutToProjectInput, ProjectInvitationUncheckedCreateWithoutToProjectInput> | ProjectInvitationCreateWithoutToProjectInput[] | ProjectInvitationUncheckedCreateWithoutToProjectInput[]
    connectOrCreate?: ProjectInvitationCreateOrConnectWithoutToProjectInput | ProjectInvitationCreateOrConnectWithoutToProjectInput[]
    upsert?: ProjectInvitationUpsertWithWhereUniqueWithoutToProjectInput | ProjectInvitationUpsertWithWhereUniqueWithoutToProjectInput[]
    createMany?: ProjectInvitationCreateManyToProjectInputEnvelope
    set?: ProjectInvitationWhereUniqueInput | ProjectInvitationWhereUniqueInput[]
    disconnect?: ProjectInvitationWhereUniqueInput | ProjectInvitationWhereUniqueInput[]
    delete?: ProjectInvitationWhereUniqueInput | ProjectInvitationWhereUniqueInput[]
    connect?: ProjectInvitationWhereUniqueInput | ProjectInvitationWhereUniqueInput[]
    update?: ProjectInvitationUpdateWithWhereUniqueWithoutToProjectInput | ProjectInvitationUpdateWithWhereUniqueWithoutToProjectInput[]
    updateMany?: ProjectInvitationUpdateManyWithWhereWithoutToProjectInput | ProjectInvitationUpdateManyWithWhereWithoutToProjectInput[]
    deleteMany?: ProjectInvitationScalarWhereInput | ProjectInvitationScalarWhereInput[]
  }

  export type UserInProjectUpdateManyWithoutProjectNestedInput = {
    create?: XOR<UserInProjectCreateWithoutProjectInput, UserInProjectUncheckedCreateWithoutProjectInput> | UserInProjectCreateWithoutProjectInput[] | UserInProjectUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: UserInProjectCreateOrConnectWithoutProjectInput | UserInProjectCreateOrConnectWithoutProjectInput[]
    upsert?: UserInProjectUpsertWithWhereUniqueWithoutProjectInput | UserInProjectUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: UserInProjectCreateManyProjectInputEnvelope
    set?: UserInProjectWhereUniqueInput | UserInProjectWhereUniqueInput[]
    disconnect?: UserInProjectWhereUniqueInput | UserInProjectWhereUniqueInput[]
    delete?: UserInProjectWhereUniqueInput | UserInProjectWhereUniqueInput[]
    connect?: UserInProjectWhereUniqueInput | UserInProjectWhereUniqueInput[]
    update?: UserInProjectUpdateWithWhereUniqueWithoutProjectInput | UserInProjectUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: UserInProjectUpdateManyWithWhereWithoutProjectInput | UserInProjectUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: UserInProjectScalarWhereInput | UserInProjectScalarWhereInput[]
  }

  export type RoleUpdateManyWithoutProjectNestedInput = {
    create?: XOR<RoleCreateWithoutProjectInput, RoleUncheckedCreateWithoutProjectInput> | RoleCreateWithoutProjectInput[] | RoleUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: RoleCreateOrConnectWithoutProjectInput | RoleCreateOrConnectWithoutProjectInput[]
    upsert?: RoleUpsertWithWhereUniqueWithoutProjectInput | RoleUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: RoleCreateManyProjectInputEnvelope
    set?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
    disconnect?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
    delete?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
    connect?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
    update?: RoleUpdateWithWhereUniqueWithoutProjectInput | RoleUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: RoleUpdateManyWithWhereWithoutProjectInput | RoleUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: RoleScalarWhereInput | RoleScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutProjectsNestedInput = {
    create?: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectsInput
    upsert?: UserUpsertWithoutProjectsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProjectsInput, UserUpdateWithoutProjectsInput>, UserUncheckedUpdateWithoutProjectsInput>
  }

  export type SectionUncheckedUpdateManyWithoutHasNestedInput = {
    create?: XOR<SectionCreateWithoutHasInput, SectionUncheckedCreateWithoutHasInput> | SectionCreateWithoutHasInput[] | SectionUncheckedCreateWithoutHasInput[]
    connectOrCreate?: SectionCreateOrConnectWithoutHasInput | SectionCreateOrConnectWithoutHasInput[]
    upsert?: SectionUpsertWithWhereUniqueWithoutHasInput | SectionUpsertWithWhereUniqueWithoutHasInput[]
    createMany?: SectionCreateManyHasInputEnvelope
    set?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    disconnect?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    delete?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    connect?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    update?: SectionUpdateWithWhereUniqueWithoutHasInput | SectionUpdateWithWhereUniqueWithoutHasInput[]
    updateMany?: SectionUpdateManyWithWhereWithoutHasInput | SectionUpdateManyWithWhereWithoutHasInput[]
    deleteMany?: SectionScalarWhereInput | SectionScalarWhereInput[]
  }

  export type TaskUncheckedUpdateManyWithoutBelongsToProjectNestedInput = {
    create?: XOR<TaskCreateWithoutBelongsToProjectInput, TaskUncheckedCreateWithoutBelongsToProjectInput> | TaskCreateWithoutBelongsToProjectInput[] | TaskUncheckedCreateWithoutBelongsToProjectInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutBelongsToProjectInput | TaskCreateOrConnectWithoutBelongsToProjectInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutBelongsToProjectInput | TaskUpsertWithWhereUniqueWithoutBelongsToProjectInput[]
    createMany?: TaskCreateManyBelongsToProjectInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutBelongsToProjectInput | TaskUpdateWithWhereUniqueWithoutBelongsToProjectInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutBelongsToProjectInput | TaskUpdateManyWithWhereWithoutBelongsToProjectInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type ProjectInvitationUncheckedUpdateManyWithoutToProjectNestedInput = {
    create?: XOR<ProjectInvitationCreateWithoutToProjectInput, ProjectInvitationUncheckedCreateWithoutToProjectInput> | ProjectInvitationCreateWithoutToProjectInput[] | ProjectInvitationUncheckedCreateWithoutToProjectInput[]
    connectOrCreate?: ProjectInvitationCreateOrConnectWithoutToProjectInput | ProjectInvitationCreateOrConnectWithoutToProjectInput[]
    upsert?: ProjectInvitationUpsertWithWhereUniqueWithoutToProjectInput | ProjectInvitationUpsertWithWhereUniqueWithoutToProjectInput[]
    createMany?: ProjectInvitationCreateManyToProjectInputEnvelope
    set?: ProjectInvitationWhereUniqueInput | ProjectInvitationWhereUniqueInput[]
    disconnect?: ProjectInvitationWhereUniqueInput | ProjectInvitationWhereUniqueInput[]
    delete?: ProjectInvitationWhereUniqueInput | ProjectInvitationWhereUniqueInput[]
    connect?: ProjectInvitationWhereUniqueInput | ProjectInvitationWhereUniqueInput[]
    update?: ProjectInvitationUpdateWithWhereUniqueWithoutToProjectInput | ProjectInvitationUpdateWithWhereUniqueWithoutToProjectInput[]
    updateMany?: ProjectInvitationUpdateManyWithWhereWithoutToProjectInput | ProjectInvitationUpdateManyWithWhereWithoutToProjectInput[]
    deleteMany?: ProjectInvitationScalarWhereInput | ProjectInvitationScalarWhereInput[]
  }

  export type UserInProjectUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<UserInProjectCreateWithoutProjectInput, UserInProjectUncheckedCreateWithoutProjectInput> | UserInProjectCreateWithoutProjectInput[] | UserInProjectUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: UserInProjectCreateOrConnectWithoutProjectInput | UserInProjectCreateOrConnectWithoutProjectInput[]
    upsert?: UserInProjectUpsertWithWhereUniqueWithoutProjectInput | UserInProjectUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: UserInProjectCreateManyProjectInputEnvelope
    set?: UserInProjectWhereUniqueInput | UserInProjectWhereUniqueInput[]
    disconnect?: UserInProjectWhereUniqueInput | UserInProjectWhereUniqueInput[]
    delete?: UserInProjectWhereUniqueInput | UserInProjectWhereUniqueInput[]
    connect?: UserInProjectWhereUniqueInput | UserInProjectWhereUniqueInput[]
    update?: UserInProjectUpdateWithWhereUniqueWithoutProjectInput | UserInProjectUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: UserInProjectUpdateManyWithWhereWithoutProjectInput | UserInProjectUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: UserInProjectScalarWhereInput | UserInProjectScalarWhereInput[]
  }

  export type RoleUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<RoleCreateWithoutProjectInput, RoleUncheckedCreateWithoutProjectInput> | RoleCreateWithoutProjectInput[] | RoleUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: RoleCreateOrConnectWithoutProjectInput | RoleCreateOrConnectWithoutProjectInput[]
    upsert?: RoleUpsertWithWhereUniqueWithoutProjectInput | RoleUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: RoleCreateManyProjectInputEnvelope
    set?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
    disconnect?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
    delete?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
    connect?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
    update?: RoleUpdateWithWhereUniqueWithoutProjectInput | RoleUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: RoleUpdateManyWithWhereWithoutProjectInput | RoleUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: RoleScalarWhereInput | RoleScalarWhereInput[]
  }

  export type ProjectCreateNestedOneWithoutSectionsInput = {
    create?: XOR<ProjectCreateWithoutSectionsInput, ProjectUncheckedCreateWithoutSectionsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutSectionsInput
    connect?: ProjectWhereUniqueInput
  }

  export type ProjectUpdateOneRequiredWithoutSectionsNestedInput = {
    create?: XOR<ProjectCreateWithoutSectionsInput, ProjectUncheckedCreateWithoutSectionsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutSectionsInput
    upsert?: ProjectUpsertWithoutSectionsInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutSectionsInput, ProjectUpdateWithoutSectionsInput>, ProjectUncheckedUpdateWithoutSectionsInput>
  }

  export type TaskOfUserCreateNestedManyWithoutTaskInput = {
    create?: XOR<TaskOfUserCreateWithoutTaskInput, TaskOfUserUncheckedCreateWithoutTaskInput> | TaskOfUserCreateWithoutTaskInput[] | TaskOfUserUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TaskOfUserCreateOrConnectWithoutTaskInput | TaskOfUserCreateOrConnectWithoutTaskInput[]
    createMany?: TaskOfUserCreateManyTaskInputEnvelope
    connect?: TaskOfUserWhereUniqueInput | TaskOfUserWhereUniqueInput[]
  }

  export type TaskCreateNestedManyWithoutParentInput = {
    create?: XOR<TaskCreateWithoutParentInput, TaskUncheckedCreateWithoutParentInput> | TaskCreateWithoutParentInput[] | TaskUncheckedCreateWithoutParentInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutParentInput | TaskCreateOrConnectWithoutParentInput[]
    createMany?: TaskCreateManyParentInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type CommentCreateNestedManyWithoutTaskInput = {
    create?: XOR<CommentCreateWithoutTaskInput, CommentUncheckedCreateWithoutTaskInput> | CommentCreateWithoutTaskInput[] | CommentUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutTaskInput | CommentCreateOrConnectWithoutTaskInput[]
    createMany?: CommentCreateManyTaskInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type TaskCreateNestedOneWithoutSubtasksInput = {
    create?: XOR<TaskCreateWithoutSubtasksInput, TaskUncheckedCreateWithoutSubtasksInput>
    connectOrCreate?: TaskCreateOrConnectWithoutSubtasksInput
    connect?: TaskWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutSupervisedTasksInput = {
    create?: XOR<UserCreateWithoutSupervisedTasksInput, UserUncheckedCreateWithoutSupervisedTasksInput>
    connectOrCreate?: UserCreateOrConnectWithoutSupervisedTasksInput
    connect?: UserWhereUniqueInput
  }

  export type ProjectCreateNestedOneWithoutTasksInput = {
    create?: XOR<ProjectCreateWithoutTasksInput, ProjectUncheckedCreateWithoutTasksInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutTasksInput
    connect?: ProjectWhereUniqueInput
  }

  export type TaskOfUserUncheckedCreateNestedManyWithoutTaskInput = {
    create?: XOR<TaskOfUserCreateWithoutTaskInput, TaskOfUserUncheckedCreateWithoutTaskInput> | TaskOfUserCreateWithoutTaskInput[] | TaskOfUserUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TaskOfUserCreateOrConnectWithoutTaskInput | TaskOfUserCreateOrConnectWithoutTaskInput[]
    createMany?: TaskOfUserCreateManyTaskInputEnvelope
    connect?: TaskOfUserWhereUniqueInput | TaskOfUserWhereUniqueInput[]
  }

  export type TaskUncheckedCreateNestedManyWithoutParentInput = {
    create?: XOR<TaskCreateWithoutParentInput, TaskUncheckedCreateWithoutParentInput> | TaskCreateWithoutParentInput[] | TaskUncheckedCreateWithoutParentInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutParentInput | TaskCreateOrConnectWithoutParentInput[]
    createMany?: TaskCreateManyParentInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type CommentUncheckedCreateNestedManyWithoutTaskInput = {
    create?: XOR<CommentCreateWithoutTaskInput, CommentUncheckedCreateWithoutTaskInput> | CommentCreateWithoutTaskInput[] | CommentUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutTaskInput | CommentCreateOrConnectWithoutTaskInput[]
    createMany?: CommentCreateManyTaskInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type EnumTaskStatusFieldUpdateOperationsInput = {
    set?: $Enums.TaskStatus
  }

  export type NullableEnumPriorityLevelFieldUpdateOperationsInput = {
    set?: $Enums.PriorityLevel | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type TaskOfUserUpdateManyWithoutTaskNestedInput = {
    create?: XOR<TaskOfUserCreateWithoutTaskInput, TaskOfUserUncheckedCreateWithoutTaskInput> | TaskOfUserCreateWithoutTaskInput[] | TaskOfUserUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TaskOfUserCreateOrConnectWithoutTaskInput | TaskOfUserCreateOrConnectWithoutTaskInput[]
    upsert?: TaskOfUserUpsertWithWhereUniqueWithoutTaskInput | TaskOfUserUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: TaskOfUserCreateManyTaskInputEnvelope
    set?: TaskOfUserWhereUniqueInput | TaskOfUserWhereUniqueInput[]
    disconnect?: TaskOfUserWhereUniqueInput | TaskOfUserWhereUniqueInput[]
    delete?: TaskOfUserWhereUniqueInput | TaskOfUserWhereUniqueInput[]
    connect?: TaskOfUserWhereUniqueInput | TaskOfUserWhereUniqueInput[]
    update?: TaskOfUserUpdateWithWhereUniqueWithoutTaskInput | TaskOfUserUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: TaskOfUserUpdateManyWithWhereWithoutTaskInput | TaskOfUserUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: TaskOfUserScalarWhereInput | TaskOfUserScalarWhereInput[]
  }

  export type TaskUpdateManyWithoutParentNestedInput = {
    create?: XOR<TaskCreateWithoutParentInput, TaskUncheckedCreateWithoutParentInput> | TaskCreateWithoutParentInput[] | TaskUncheckedCreateWithoutParentInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutParentInput | TaskCreateOrConnectWithoutParentInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutParentInput | TaskUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: TaskCreateManyParentInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutParentInput | TaskUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutParentInput | TaskUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type CommentUpdateManyWithoutTaskNestedInput = {
    create?: XOR<CommentCreateWithoutTaskInput, CommentUncheckedCreateWithoutTaskInput> | CommentCreateWithoutTaskInput[] | CommentUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutTaskInput | CommentCreateOrConnectWithoutTaskInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutTaskInput | CommentUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: CommentCreateManyTaskInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutTaskInput | CommentUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutTaskInput | CommentUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type TaskUpdateOneWithoutSubtasksNestedInput = {
    create?: XOR<TaskCreateWithoutSubtasksInput, TaskUncheckedCreateWithoutSubtasksInput>
    connectOrCreate?: TaskCreateOrConnectWithoutSubtasksInput
    upsert?: TaskUpsertWithoutSubtasksInput
    disconnect?: TaskWhereInput | boolean
    delete?: TaskWhereInput | boolean
    connect?: TaskWhereUniqueInput
    update?: XOR<XOR<TaskUpdateToOneWithWhereWithoutSubtasksInput, TaskUpdateWithoutSubtasksInput>, TaskUncheckedUpdateWithoutSubtasksInput>
  }

  export type UserUpdateOneWithoutSupervisedTasksNestedInput = {
    create?: XOR<UserCreateWithoutSupervisedTasksInput, UserUncheckedCreateWithoutSupervisedTasksInput>
    connectOrCreate?: UserCreateOrConnectWithoutSupervisedTasksInput
    upsert?: UserUpsertWithoutSupervisedTasksInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSupervisedTasksInput, UserUpdateWithoutSupervisedTasksInput>, UserUncheckedUpdateWithoutSupervisedTasksInput>
  }

  export type ProjectUpdateOneRequiredWithoutTasksNestedInput = {
    create?: XOR<ProjectCreateWithoutTasksInput, ProjectUncheckedCreateWithoutTasksInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutTasksInput
    upsert?: ProjectUpsertWithoutTasksInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutTasksInput, ProjectUpdateWithoutTasksInput>, ProjectUncheckedUpdateWithoutTasksInput>
  }

  export type TaskOfUserUncheckedUpdateManyWithoutTaskNestedInput = {
    create?: XOR<TaskOfUserCreateWithoutTaskInput, TaskOfUserUncheckedCreateWithoutTaskInput> | TaskOfUserCreateWithoutTaskInput[] | TaskOfUserUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TaskOfUserCreateOrConnectWithoutTaskInput | TaskOfUserCreateOrConnectWithoutTaskInput[]
    upsert?: TaskOfUserUpsertWithWhereUniqueWithoutTaskInput | TaskOfUserUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: TaskOfUserCreateManyTaskInputEnvelope
    set?: TaskOfUserWhereUniqueInput | TaskOfUserWhereUniqueInput[]
    disconnect?: TaskOfUserWhereUniqueInput | TaskOfUserWhereUniqueInput[]
    delete?: TaskOfUserWhereUniqueInput | TaskOfUserWhereUniqueInput[]
    connect?: TaskOfUserWhereUniqueInput | TaskOfUserWhereUniqueInput[]
    update?: TaskOfUserUpdateWithWhereUniqueWithoutTaskInput | TaskOfUserUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: TaskOfUserUpdateManyWithWhereWithoutTaskInput | TaskOfUserUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: TaskOfUserScalarWhereInput | TaskOfUserScalarWhereInput[]
  }

  export type TaskUncheckedUpdateManyWithoutParentNestedInput = {
    create?: XOR<TaskCreateWithoutParentInput, TaskUncheckedCreateWithoutParentInput> | TaskCreateWithoutParentInput[] | TaskUncheckedCreateWithoutParentInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutParentInput | TaskCreateOrConnectWithoutParentInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutParentInput | TaskUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: TaskCreateManyParentInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutParentInput | TaskUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutParentInput | TaskUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type CommentUncheckedUpdateManyWithoutTaskNestedInput = {
    create?: XOR<CommentCreateWithoutTaskInput, CommentUncheckedCreateWithoutTaskInput> | CommentCreateWithoutTaskInput[] | CommentUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutTaskInput | CommentCreateOrConnectWithoutTaskInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutTaskInput | CommentUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: CommentCreateManyTaskInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutTaskInput | CommentUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutTaskInput | CommentUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type TaskCreateNestedOneWithoutAssigneesInput = {
    create?: XOR<TaskCreateWithoutAssigneesInput, TaskUncheckedCreateWithoutAssigneesInput>
    connectOrCreate?: TaskCreateOrConnectWithoutAssigneesInput
    connect?: TaskWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutTasksInput = {
    create?: XOR<UserCreateWithoutTasksInput, UserUncheckedCreateWithoutTasksInput>
    connectOrCreate?: UserCreateOrConnectWithoutTasksInput
    connect?: UserWhereUniqueInput
  }

  export type TaskUpdateOneRequiredWithoutAssigneesNestedInput = {
    create?: XOR<TaskCreateWithoutAssigneesInput, TaskUncheckedCreateWithoutAssigneesInput>
    connectOrCreate?: TaskCreateOrConnectWithoutAssigneesInput
    upsert?: TaskUpsertWithoutAssigneesInput
    connect?: TaskWhereUniqueInput
    update?: XOR<XOR<TaskUpdateToOneWithWhereWithoutAssigneesInput, TaskUpdateWithoutAssigneesInput>, TaskUncheckedUpdateWithoutAssigneesInput>
  }

  export type UserUpdateOneRequiredWithoutTasksNestedInput = {
    create?: XOR<UserCreateWithoutTasksInput, UserUncheckedCreateWithoutTasksInput>
    connectOrCreate?: UserCreateOrConnectWithoutTasksInput
    upsert?: UserUpsertWithoutTasksInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTasksInput, UserUpdateWithoutTasksInput>, UserUncheckedUpdateWithoutTasksInput>
  }

  export type UserCreateNestedOneWithoutCommentsInput = {
    create?: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCommentsInput
    connect?: UserWhereUniqueInput
  }

  export type TaskCreateNestedOneWithoutCommentsInput = {
    create?: XOR<TaskCreateWithoutCommentsInput, TaskUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: TaskCreateOrConnectWithoutCommentsInput
    connect?: TaskWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCommentsInput
    upsert?: UserUpsertWithoutCommentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCommentsInput, UserUpdateWithoutCommentsInput>, UserUncheckedUpdateWithoutCommentsInput>
  }

  export type TaskUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<TaskCreateWithoutCommentsInput, TaskUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: TaskCreateOrConnectWithoutCommentsInput
    upsert?: TaskUpsertWithoutCommentsInput
    connect?: TaskWhereUniqueInput
    update?: XOR<XOR<TaskUpdateToOneWithWhereWithoutCommentsInput, TaskUpdateWithoutCommentsInput>, TaskUncheckedUpdateWithoutCommentsInput>
  }

  export type UserCreateNestedOneWithoutProjectInvitationsInput = {
    create?: XOR<UserCreateWithoutProjectInvitationsInput, UserUncheckedCreateWithoutProjectInvitationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectInvitationsInput
    connect?: UserWhereUniqueInput
  }

  export type ProjectCreateNestedOneWithoutInvitationsInput = {
    create?: XOR<ProjectCreateWithoutInvitationsInput, ProjectUncheckedCreateWithoutInvitationsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutInvitationsInput
    connect?: ProjectWhereUniqueInput
  }

  export type EnumInvitationStatusFieldUpdateOperationsInput = {
    set?: $Enums.InvitationStatus
  }

  export type UserUpdateOneRequiredWithoutProjectInvitationsNestedInput = {
    create?: XOR<UserCreateWithoutProjectInvitationsInput, UserUncheckedCreateWithoutProjectInvitationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectInvitationsInput
    upsert?: UserUpsertWithoutProjectInvitationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProjectInvitationsInput, UserUpdateWithoutProjectInvitationsInput>, UserUncheckedUpdateWithoutProjectInvitationsInput>
  }

  export type ProjectUpdateOneRequiredWithoutInvitationsNestedInput = {
    create?: XOR<ProjectCreateWithoutInvitationsInput, ProjectUncheckedCreateWithoutInvitationsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutInvitationsInput
    upsert?: ProjectUpsertWithoutInvitationsInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutInvitationsInput, ProjectUpdateWithoutInvitationsInput>, ProjectUncheckedUpdateWithoutInvitationsInput>
  }

  export type UserCreateNestedOneWithoutBelongToProjectsInput = {
    create?: XOR<UserCreateWithoutBelongToProjectsInput, UserUncheckedCreateWithoutBelongToProjectsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBelongToProjectsInput
    connect?: UserWhereUniqueInput
  }

  export type ProjectCreateNestedOneWithoutMembersInput = {
    create?: XOR<ProjectCreateWithoutMembersInput, ProjectUncheckedCreateWithoutMembersInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutMembersInput
    connect?: ProjectWhereUniqueInput
  }

  export type RoleCreateNestedOneWithoutUserInProjectsInput = {
    create?: XOR<RoleCreateWithoutUserInProjectsInput, RoleUncheckedCreateWithoutUserInProjectsInput>
    connectOrCreate?: RoleCreateOrConnectWithoutUserInProjectsInput
    connect?: RoleWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutBelongToProjectsNestedInput = {
    create?: XOR<UserCreateWithoutBelongToProjectsInput, UserUncheckedCreateWithoutBelongToProjectsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBelongToProjectsInput
    upsert?: UserUpsertWithoutBelongToProjectsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBelongToProjectsInput, UserUpdateWithoutBelongToProjectsInput>, UserUncheckedUpdateWithoutBelongToProjectsInput>
  }

  export type ProjectUpdateOneRequiredWithoutMembersNestedInput = {
    create?: XOR<ProjectCreateWithoutMembersInput, ProjectUncheckedCreateWithoutMembersInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutMembersInput
    upsert?: ProjectUpsertWithoutMembersInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutMembersInput, ProjectUpdateWithoutMembersInput>, ProjectUncheckedUpdateWithoutMembersInput>
  }

  export type RoleUpdateOneRequiredWithoutUserInProjectsNestedInput = {
    create?: XOR<RoleCreateWithoutUserInProjectsInput, RoleUncheckedCreateWithoutUserInProjectsInput>
    connectOrCreate?: RoleCreateOrConnectWithoutUserInProjectsInput
    upsert?: RoleUpsertWithoutUserInProjectsInput
    connect?: RoleWhereUniqueInput
    update?: XOR<XOR<RoleUpdateToOneWithWhereWithoutUserInProjectsInput, RoleUpdateWithoutUserInProjectsInput>, RoleUncheckedUpdateWithoutUserInProjectsInput>
  }

  export type UserInProjectCreateNestedManyWithoutRoleInput = {
    create?: XOR<UserInProjectCreateWithoutRoleInput, UserInProjectUncheckedCreateWithoutRoleInput> | UserInProjectCreateWithoutRoleInput[] | UserInProjectUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserInProjectCreateOrConnectWithoutRoleInput | UserInProjectCreateOrConnectWithoutRoleInput[]
    createMany?: UserInProjectCreateManyRoleInputEnvelope
    connect?: UserInProjectWhereUniqueInput | UserInProjectWhereUniqueInput[]
  }

  export type ProjectCreateNestedOneWithoutRolesInput = {
    create?: XOR<ProjectCreateWithoutRolesInput, ProjectUncheckedCreateWithoutRolesInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutRolesInput
    connect?: ProjectWhereUniqueInput
  }

  export type UserInProjectUncheckedCreateNestedManyWithoutRoleInput = {
    create?: XOR<UserInProjectCreateWithoutRoleInput, UserInProjectUncheckedCreateWithoutRoleInput> | UserInProjectCreateWithoutRoleInput[] | UserInProjectUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserInProjectCreateOrConnectWithoutRoleInput | UserInProjectCreateOrConnectWithoutRoleInput[]
    createMany?: UserInProjectCreateManyRoleInputEnvelope
    connect?: UserInProjectWhereUniqueInput | UserInProjectWhereUniqueInput[]
  }

  export type UserInProjectUpdateManyWithoutRoleNestedInput = {
    create?: XOR<UserInProjectCreateWithoutRoleInput, UserInProjectUncheckedCreateWithoutRoleInput> | UserInProjectCreateWithoutRoleInput[] | UserInProjectUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserInProjectCreateOrConnectWithoutRoleInput | UserInProjectCreateOrConnectWithoutRoleInput[]
    upsert?: UserInProjectUpsertWithWhereUniqueWithoutRoleInput | UserInProjectUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: UserInProjectCreateManyRoleInputEnvelope
    set?: UserInProjectWhereUniqueInput | UserInProjectWhereUniqueInput[]
    disconnect?: UserInProjectWhereUniqueInput | UserInProjectWhereUniqueInput[]
    delete?: UserInProjectWhereUniqueInput | UserInProjectWhereUniqueInput[]
    connect?: UserInProjectWhereUniqueInput | UserInProjectWhereUniqueInput[]
    update?: UserInProjectUpdateWithWhereUniqueWithoutRoleInput | UserInProjectUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: UserInProjectUpdateManyWithWhereWithoutRoleInput | UserInProjectUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: UserInProjectScalarWhereInput | UserInProjectScalarWhereInput[]
  }

  export type ProjectUpdateOneWithoutRolesNestedInput = {
    create?: XOR<ProjectCreateWithoutRolesInput, ProjectUncheckedCreateWithoutRolesInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutRolesInput
    upsert?: ProjectUpsertWithoutRolesInput
    disconnect?: ProjectWhereInput | boolean
    delete?: ProjectWhereInput | boolean
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutRolesInput, ProjectUpdateWithoutRolesInput>, ProjectUncheckedUpdateWithoutRolesInput>
  }

  export type UserInProjectUncheckedUpdateManyWithoutRoleNestedInput = {
    create?: XOR<UserInProjectCreateWithoutRoleInput, UserInProjectUncheckedCreateWithoutRoleInput> | UserInProjectCreateWithoutRoleInput[] | UserInProjectUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserInProjectCreateOrConnectWithoutRoleInput | UserInProjectCreateOrConnectWithoutRoleInput[]
    upsert?: UserInProjectUpsertWithWhereUniqueWithoutRoleInput | UserInProjectUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: UserInProjectCreateManyRoleInputEnvelope
    set?: UserInProjectWhereUniqueInput | UserInProjectWhereUniqueInput[]
    disconnect?: UserInProjectWhereUniqueInput | UserInProjectWhereUniqueInput[]
    delete?: UserInProjectWhereUniqueInput | UserInProjectWhereUniqueInput[]
    connect?: UserInProjectWhereUniqueInput | UserInProjectWhereUniqueInput[]
    update?: UserInProjectUpdateWithWhereUniqueWithoutRoleInput | UserInProjectUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: UserInProjectUpdateManyWithWhereWithoutRoleInput | UserInProjectUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: UserInProjectScalarWhereInput | UserInProjectScalarWhereInput[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumProviderFilter<$PrismaModel = never> = {
    equals?: $Enums.Provider | EnumProviderFieldRefInput<$PrismaModel>
    in?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumProviderFilter<$PrismaModel> | $Enums.Provider
  }

  export type NestedEnumProviderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Provider | EnumProviderFieldRefInput<$PrismaModel>
    in?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumProviderWithAggregatesFilter<$PrismaModel> | $Enums.Provider
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProviderFilter<$PrismaModel>
    _max?: NestedEnumProviderFilter<$PrismaModel>
  }

  export type NestedEnumTaskStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskStatus | EnumTaskStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskStatusFilter<$PrismaModel> | $Enums.TaskStatus
  }

  export type NestedEnumPriorityLevelNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.PriorityLevel | EnumPriorityLevelFieldRefInput<$PrismaModel> | null
    in?: $Enums.PriorityLevel[] | ListEnumPriorityLevelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.PriorityLevel[] | ListEnumPriorityLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumPriorityLevelNullableFilter<$PrismaModel> | $Enums.PriorityLevel | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumTaskStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskStatus | EnumTaskStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskStatusWithAggregatesFilter<$PrismaModel> | $Enums.TaskStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTaskStatusFilter<$PrismaModel>
    _max?: NestedEnumTaskStatusFilter<$PrismaModel>
  }

  export type NestedEnumPriorityLevelNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PriorityLevel | EnumPriorityLevelFieldRefInput<$PrismaModel> | null
    in?: $Enums.PriorityLevel[] | ListEnumPriorityLevelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.PriorityLevel[] | ListEnumPriorityLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumPriorityLevelNullableWithAggregatesFilter<$PrismaModel> | $Enums.PriorityLevel | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumPriorityLevelNullableFilter<$PrismaModel>
    _max?: NestedEnumPriorityLevelNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumInvitationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.InvitationStatus | EnumInvitationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InvitationStatus[] | ListEnumInvitationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InvitationStatus[] | ListEnumInvitationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInvitationStatusFilter<$PrismaModel> | $Enums.InvitationStatus
  }

  export type NestedEnumInvitationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InvitationStatus | EnumInvitationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InvitationStatus[] | ListEnumInvitationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InvitationStatus[] | ListEnumInvitationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInvitationStatusWithAggregatesFilter<$PrismaModel> | $Enums.InvitationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumInvitationStatusFilter<$PrismaModel>
    _max?: NestedEnumInvitationStatusFilter<$PrismaModel>
  }

  export type OAuthAccountCreateWithoutOwnInput = {
    id?: string
    provider: $Enums.Provider
  }

  export type OAuthAccountUncheckedCreateWithoutOwnInput = {
    id?: string
    provider: $Enums.Provider
  }

  export type OAuthAccountCreateOrConnectWithoutOwnInput = {
    where: OAuthAccountWhereUniqueInput
    create: XOR<OAuthAccountCreateWithoutOwnInput, OAuthAccountUncheckedCreateWithoutOwnInput>
  }

  export type OAuthAccountCreateManyOwnInputEnvelope = {
    data: OAuthAccountCreateManyOwnInput | OAuthAccountCreateManyOwnInput[]
    skipDuplicates?: boolean
  }

  export type ProjectCreateWithoutOwnInput = {
    id?: string
    name: string
    description?: string | null
    isPersonal?: boolean
    listOfSection?: string
    createdAt?: Date | string
    sections?: SectionCreateNestedManyWithoutHasInput
    tasks?: TaskCreateNestedManyWithoutBelongsToProjectInput
    invitations?: ProjectInvitationCreateNestedManyWithoutToProjectInput
    members?: UserInProjectCreateNestedManyWithoutProjectInput
    roles?: RoleCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutOwnInput = {
    id?: string
    name: string
    description?: string | null
    isPersonal?: boolean
    listOfSection?: string
    createdAt?: Date | string
    sections?: SectionUncheckedCreateNestedManyWithoutHasInput
    tasks?: TaskUncheckedCreateNestedManyWithoutBelongsToProjectInput
    invitations?: ProjectInvitationUncheckedCreateNestedManyWithoutToProjectInput
    members?: UserInProjectUncheckedCreateNestedManyWithoutProjectInput
    roles?: RoleUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutOwnInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutOwnInput, ProjectUncheckedCreateWithoutOwnInput>
  }

  export type ProjectCreateManyOwnInputEnvelope = {
    data: ProjectCreateManyOwnInput | ProjectCreateManyOwnInput[]
    skipDuplicates?: boolean
  }

  export type ProjectInvitationCreateWithoutInvitorInput = {
    status?: $Enums.InvitationStatus
    createdAt?: Date | string
    toProject: ProjectCreateNestedOneWithoutInvitationsInput
  }

  export type ProjectInvitationUncheckedCreateWithoutInvitorInput = {
    status?: $Enums.InvitationStatus
    createdAt?: Date | string
    projectId: string
  }

  export type ProjectInvitationCreateOrConnectWithoutInvitorInput = {
    where: ProjectInvitationWhereUniqueInput
    create: XOR<ProjectInvitationCreateWithoutInvitorInput, ProjectInvitationUncheckedCreateWithoutInvitorInput>
  }

  export type ProjectInvitationCreateManyInvitorInputEnvelope = {
    data: ProjectInvitationCreateManyInvitorInput | ProjectInvitationCreateManyInvitorInput[]
    skipDuplicates?: boolean
  }

  export type UserInProjectCreateWithoutUserInput = {
    project: ProjectCreateNestedOneWithoutMembersInput
    role: RoleCreateNestedOneWithoutUserInProjectsInput
  }

  export type UserInProjectUncheckedCreateWithoutUserInput = {
    projectId: string
    roleId: string
  }

  export type UserInProjectCreateOrConnectWithoutUserInput = {
    where: UserInProjectWhereUniqueInput
    create: XOR<UserInProjectCreateWithoutUserInput, UserInProjectUncheckedCreateWithoutUserInput>
  }

  export type UserInProjectCreateManyUserInputEnvelope = {
    data: UserInProjectCreateManyUserInput | UserInProjectCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TaskCreateWithoutSupervisorInput = {
    id?: string
    title: string
    description?: string | null
    status?: $Enums.TaskStatus
    priority?: $Enums.PriorityLevel | null
    startDate?: Date | string | null
    dueDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sectionId: string
    assignees?: TaskOfUserCreateNestedManyWithoutTaskInput
    subtasks?: TaskCreateNestedManyWithoutParentInput
    comments?: CommentCreateNestedManyWithoutTaskInput
    parent?: TaskCreateNestedOneWithoutSubtasksInput
    belongsToProject: ProjectCreateNestedOneWithoutTasksInput
  }

  export type TaskUncheckedCreateWithoutSupervisorInput = {
    id?: string
    title: string
    description?: string | null
    status?: $Enums.TaskStatus
    priority?: $Enums.PriorityLevel | null
    startDate?: Date | string | null
    dueDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sectionId: string
    parentTaskId?: string | null
    projectId: string
    assignees?: TaskOfUserUncheckedCreateNestedManyWithoutTaskInput
    subtasks?: TaskUncheckedCreateNestedManyWithoutParentInput
    comments?: CommentUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutSupervisorInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutSupervisorInput, TaskUncheckedCreateWithoutSupervisorInput>
  }

  export type TaskCreateManySupervisorInputEnvelope = {
    data: TaskCreateManySupervisorInput | TaskCreateManySupervisorInput[]
    skipDuplicates?: boolean
  }

  export type TaskOfUserCreateWithoutUserInput = {
    task: TaskCreateNestedOneWithoutAssigneesInput
  }

  export type TaskOfUserUncheckedCreateWithoutUserInput = {
    taskId: string
  }

  export type TaskOfUserCreateOrConnectWithoutUserInput = {
    where: TaskOfUserWhereUniqueInput
    create: XOR<TaskOfUserCreateWithoutUserInput, TaskOfUserUncheckedCreateWithoutUserInput>
  }

  export type TaskOfUserCreateManyUserInputEnvelope = {
    data: TaskOfUserCreateManyUserInput | TaskOfUserCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CommentCreateWithoutAuthorInput = {
    id?: string
    content: string
    mediaUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    task: TaskCreateNestedOneWithoutCommentsInput
  }

  export type CommentUncheckedCreateWithoutAuthorInput = {
    id?: string
    content: string
    mediaUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    taskId: string
  }

  export type CommentCreateOrConnectWithoutAuthorInput = {
    where: CommentWhereUniqueInput
    create: XOR<CommentCreateWithoutAuthorInput, CommentUncheckedCreateWithoutAuthorInput>
  }

  export type CommentCreateManyAuthorInputEnvelope = {
    data: CommentCreateManyAuthorInput | CommentCreateManyAuthorInput[]
    skipDuplicates?: boolean
  }

  export type OAuthAccountUpsertWithWhereUniqueWithoutOwnInput = {
    where: OAuthAccountWhereUniqueInput
    update: XOR<OAuthAccountUpdateWithoutOwnInput, OAuthAccountUncheckedUpdateWithoutOwnInput>
    create: XOR<OAuthAccountCreateWithoutOwnInput, OAuthAccountUncheckedCreateWithoutOwnInput>
  }

  export type OAuthAccountUpdateWithWhereUniqueWithoutOwnInput = {
    where: OAuthAccountWhereUniqueInput
    data: XOR<OAuthAccountUpdateWithoutOwnInput, OAuthAccountUncheckedUpdateWithoutOwnInput>
  }

  export type OAuthAccountUpdateManyWithWhereWithoutOwnInput = {
    where: OAuthAccountScalarWhereInput
    data: XOR<OAuthAccountUpdateManyMutationInput, OAuthAccountUncheckedUpdateManyWithoutOwnInput>
  }

  export type OAuthAccountScalarWhereInput = {
    AND?: OAuthAccountScalarWhereInput | OAuthAccountScalarWhereInput[]
    OR?: OAuthAccountScalarWhereInput[]
    NOT?: OAuthAccountScalarWhereInput | OAuthAccountScalarWhereInput[]
    id?: StringFilter<"OAuthAccount"> | string
    provider?: EnumProviderFilter<"OAuthAccount"> | $Enums.Provider
    userId?: StringFilter<"OAuthAccount"> | string
  }

  export type ProjectUpsertWithWhereUniqueWithoutOwnInput = {
    where: ProjectWhereUniqueInput
    update: XOR<ProjectUpdateWithoutOwnInput, ProjectUncheckedUpdateWithoutOwnInput>
    create: XOR<ProjectCreateWithoutOwnInput, ProjectUncheckedCreateWithoutOwnInput>
  }

  export type ProjectUpdateWithWhereUniqueWithoutOwnInput = {
    where: ProjectWhereUniqueInput
    data: XOR<ProjectUpdateWithoutOwnInput, ProjectUncheckedUpdateWithoutOwnInput>
  }

  export type ProjectUpdateManyWithWhereWithoutOwnInput = {
    where: ProjectScalarWhereInput
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyWithoutOwnInput>
  }

  export type ProjectScalarWhereInput = {
    AND?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
    OR?: ProjectScalarWhereInput[]
    NOT?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
    id?: StringFilter<"Project"> | string
    name?: StringFilter<"Project"> | string
    description?: StringNullableFilter<"Project"> | string | null
    isPersonal?: BoolFilter<"Project"> | boolean
    listOfSection?: StringFilter<"Project"> | string
    createdAt?: DateTimeFilter<"Project"> | Date | string
    owner?: StringFilter<"Project"> | string
  }

  export type ProjectInvitationUpsertWithWhereUniqueWithoutInvitorInput = {
    where: ProjectInvitationWhereUniqueInput
    update: XOR<ProjectInvitationUpdateWithoutInvitorInput, ProjectInvitationUncheckedUpdateWithoutInvitorInput>
    create: XOR<ProjectInvitationCreateWithoutInvitorInput, ProjectInvitationUncheckedCreateWithoutInvitorInput>
  }

  export type ProjectInvitationUpdateWithWhereUniqueWithoutInvitorInput = {
    where: ProjectInvitationWhereUniqueInput
    data: XOR<ProjectInvitationUpdateWithoutInvitorInput, ProjectInvitationUncheckedUpdateWithoutInvitorInput>
  }

  export type ProjectInvitationUpdateManyWithWhereWithoutInvitorInput = {
    where: ProjectInvitationScalarWhereInput
    data: XOR<ProjectInvitationUpdateManyMutationInput, ProjectInvitationUncheckedUpdateManyWithoutInvitorInput>
  }

  export type ProjectInvitationScalarWhereInput = {
    AND?: ProjectInvitationScalarWhereInput | ProjectInvitationScalarWhereInput[]
    OR?: ProjectInvitationScalarWhereInput[]
    NOT?: ProjectInvitationScalarWhereInput | ProjectInvitationScalarWhereInput[]
    status?: EnumInvitationStatusFilter<"ProjectInvitation"> | $Enums.InvitationStatus
    createdAt?: DateTimeFilter<"ProjectInvitation"> | Date | string
    invitorId?: StringFilter<"ProjectInvitation"> | string
    projectId?: StringFilter<"ProjectInvitation"> | string
  }

  export type UserInProjectUpsertWithWhereUniqueWithoutUserInput = {
    where: UserInProjectWhereUniqueInput
    update: XOR<UserInProjectUpdateWithoutUserInput, UserInProjectUncheckedUpdateWithoutUserInput>
    create: XOR<UserInProjectCreateWithoutUserInput, UserInProjectUncheckedCreateWithoutUserInput>
  }

  export type UserInProjectUpdateWithWhereUniqueWithoutUserInput = {
    where: UserInProjectWhereUniqueInput
    data: XOR<UserInProjectUpdateWithoutUserInput, UserInProjectUncheckedUpdateWithoutUserInput>
  }

  export type UserInProjectUpdateManyWithWhereWithoutUserInput = {
    where: UserInProjectScalarWhereInput
    data: XOR<UserInProjectUpdateManyMutationInput, UserInProjectUncheckedUpdateManyWithoutUserInput>
  }

  export type UserInProjectScalarWhereInput = {
    AND?: UserInProjectScalarWhereInput | UserInProjectScalarWhereInput[]
    OR?: UserInProjectScalarWhereInput[]
    NOT?: UserInProjectScalarWhereInput | UserInProjectScalarWhereInput[]
    userId?: StringFilter<"UserInProject"> | string
    projectId?: StringFilter<"UserInProject"> | string
    roleId?: StringFilter<"UserInProject"> | string
  }

  export type TaskUpsertWithWhereUniqueWithoutSupervisorInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutSupervisorInput, TaskUncheckedUpdateWithoutSupervisorInput>
    create: XOR<TaskCreateWithoutSupervisorInput, TaskUncheckedCreateWithoutSupervisorInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutSupervisorInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutSupervisorInput, TaskUncheckedUpdateWithoutSupervisorInput>
  }

  export type TaskUpdateManyWithWhereWithoutSupervisorInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutSupervisorInput>
  }

  export type TaskScalarWhereInput = {
    AND?: TaskScalarWhereInput | TaskScalarWhereInput[]
    OR?: TaskScalarWhereInput[]
    NOT?: TaskScalarWhereInput | TaskScalarWhereInput[]
    id?: StringFilter<"Task"> | string
    title?: StringFilter<"Task"> | string
    description?: StringNullableFilter<"Task"> | string | null
    status?: EnumTaskStatusFilter<"Task"> | $Enums.TaskStatus
    priority?: EnumPriorityLevelNullableFilter<"Task"> | $Enums.PriorityLevel | null
    startDate?: DateTimeNullableFilter<"Task"> | Date | string | null
    dueDate?: DateTimeNullableFilter<"Task"> | Date | string | null
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
    sectionId?: StringFilter<"Task"> | string
    parentTaskId?: StringNullableFilter<"Task"> | string | null
    supervisorId?: StringNullableFilter<"Task"> | string | null
    projectId?: StringFilter<"Task"> | string
  }

  export type TaskOfUserUpsertWithWhereUniqueWithoutUserInput = {
    where: TaskOfUserWhereUniqueInput
    update: XOR<TaskOfUserUpdateWithoutUserInput, TaskOfUserUncheckedUpdateWithoutUserInput>
    create: XOR<TaskOfUserCreateWithoutUserInput, TaskOfUserUncheckedCreateWithoutUserInput>
  }

  export type TaskOfUserUpdateWithWhereUniqueWithoutUserInput = {
    where: TaskOfUserWhereUniqueInput
    data: XOR<TaskOfUserUpdateWithoutUserInput, TaskOfUserUncheckedUpdateWithoutUserInput>
  }

  export type TaskOfUserUpdateManyWithWhereWithoutUserInput = {
    where: TaskOfUserScalarWhereInput
    data: XOR<TaskOfUserUpdateManyMutationInput, TaskOfUserUncheckedUpdateManyWithoutUserInput>
  }

  export type TaskOfUserScalarWhereInput = {
    AND?: TaskOfUserScalarWhereInput | TaskOfUserScalarWhereInput[]
    OR?: TaskOfUserScalarWhereInput[]
    NOT?: TaskOfUserScalarWhereInput | TaskOfUserScalarWhereInput[]
    taskId?: StringFilter<"TaskOfUser"> | string
    userId?: StringFilter<"TaskOfUser"> | string
  }

  export type CommentUpsertWithWhereUniqueWithoutAuthorInput = {
    where: CommentWhereUniqueInput
    update: XOR<CommentUpdateWithoutAuthorInput, CommentUncheckedUpdateWithoutAuthorInput>
    create: XOR<CommentCreateWithoutAuthorInput, CommentUncheckedCreateWithoutAuthorInput>
  }

  export type CommentUpdateWithWhereUniqueWithoutAuthorInput = {
    where: CommentWhereUniqueInput
    data: XOR<CommentUpdateWithoutAuthorInput, CommentUncheckedUpdateWithoutAuthorInput>
  }

  export type CommentUpdateManyWithWhereWithoutAuthorInput = {
    where: CommentScalarWhereInput
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyWithoutAuthorInput>
  }

  export type CommentScalarWhereInput = {
    AND?: CommentScalarWhereInput | CommentScalarWhereInput[]
    OR?: CommentScalarWhereInput[]
    NOT?: CommentScalarWhereInput | CommentScalarWhereInput[]
    id?: StringFilter<"Comment"> | string
    content?: StringFilter<"Comment"> | string
    mediaUrl?: StringNullableFilter<"Comment"> | string | null
    createdAt?: DateTimeFilter<"Comment"> | Date | string
    updatedAt?: DateTimeFilter<"Comment"> | Date | string
    authorId?: StringFilter<"Comment"> | string
    taskId?: StringFilter<"Comment"> | string
  }

  export type UserCreateWithoutAccountsInput = {
    id?: string
    email: string
    password?: string | null
    name?: string | null
    avatarUrl?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    projects?: ProjectCreateNestedManyWithoutOwnInput
    projectInvitations?: ProjectInvitationCreateNestedManyWithoutInvitorInput
    belongToProjects?: UserInProjectCreateNestedManyWithoutUserInput
    supervisedTasks?: TaskCreateNestedManyWithoutSupervisorInput
    tasks?: TaskOfUserCreateNestedManyWithoutUserInput
    comments?: CommentCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string
    email: string
    password?: string | null
    name?: string | null
    avatarUrl?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    projects?: ProjectUncheckedCreateNestedManyWithoutOwnInput
    projectInvitations?: ProjectInvitationUncheckedCreateNestedManyWithoutInvitorInput
    belongToProjects?: UserInProjectUncheckedCreateNestedManyWithoutUserInput
    supervisedTasks?: TaskUncheckedCreateNestedManyWithoutSupervisorInput
    tasks?: TaskOfUserUncheckedCreateNestedManyWithoutUserInput
    comments?: CommentUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectUpdateManyWithoutOwnNestedInput
    projectInvitations?: ProjectInvitationUpdateManyWithoutInvitorNestedInput
    belongToProjects?: UserInProjectUpdateManyWithoutUserNestedInput
    supervisedTasks?: TaskUpdateManyWithoutSupervisorNestedInput
    tasks?: TaskOfUserUpdateManyWithoutUserNestedInput
    comments?: CommentUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectUncheckedUpdateManyWithoutOwnNestedInput
    projectInvitations?: ProjectInvitationUncheckedUpdateManyWithoutInvitorNestedInput
    belongToProjects?: UserInProjectUncheckedUpdateManyWithoutUserNestedInput
    supervisedTasks?: TaskUncheckedUpdateManyWithoutSupervisorNestedInput
    tasks?: TaskOfUserUncheckedUpdateManyWithoutUserNestedInput
    comments?: CommentUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type SectionCreateWithoutHasInput = {
    id?: string
    name: string
    listOfTask?: string
    createdAt?: Date | string
  }

  export type SectionUncheckedCreateWithoutHasInput = {
    id?: string
    name: string
    listOfTask?: string
    createdAt?: Date | string
  }

  export type SectionCreateOrConnectWithoutHasInput = {
    where: SectionWhereUniqueInput
    create: XOR<SectionCreateWithoutHasInput, SectionUncheckedCreateWithoutHasInput>
  }

  export type SectionCreateManyHasInputEnvelope = {
    data: SectionCreateManyHasInput | SectionCreateManyHasInput[]
    skipDuplicates?: boolean
  }

  export type TaskCreateWithoutBelongsToProjectInput = {
    id?: string
    title: string
    description?: string | null
    status?: $Enums.TaskStatus
    priority?: $Enums.PriorityLevel | null
    startDate?: Date | string | null
    dueDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sectionId: string
    assignees?: TaskOfUserCreateNestedManyWithoutTaskInput
    subtasks?: TaskCreateNestedManyWithoutParentInput
    comments?: CommentCreateNestedManyWithoutTaskInput
    parent?: TaskCreateNestedOneWithoutSubtasksInput
    supervisor?: UserCreateNestedOneWithoutSupervisedTasksInput
  }

  export type TaskUncheckedCreateWithoutBelongsToProjectInput = {
    id?: string
    title: string
    description?: string | null
    status?: $Enums.TaskStatus
    priority?: $Enums.PriorityLevel | null
    startDate?: Date | string | null
    dueDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sectionId: string
    parentTaskId?: string | null
    supervisorId?: string | null
    assignees?: TaskOfUserUncheckedCreateNestedManyWithoutTaskInput
    subtasks?: TaskUncheckedCreateNestedManyWithoutParentInput
    comments?: CommentUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutBelongsToProjectInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutBelongsToProjectInput, TaskUncheckedCreateWithoutBelongsToProjectInput>
  }

  export type TaskCreateManyBelongsToProjectInputEnvelope = {
    data: TaskCreateManyBelongsToProjectInput | TaskCreateManyBelongsToProjectInput[]
    skipDuplicates?: boolean
  }

  export type ProjectInvitationCreateWithoutToProjectInput = {
    status?: $Enums.InvitationStatus
    createdAt?: Date | string
    invitor: UserCreateNestedOneWithoutProjectInvitationsInput
  }

  export type ProjectInvitationUncheckedCreateWithoutToProjectInput = {
    status?: $Enums.InvitationStatus
    createdAt?: Date | string
    invitorId: string
  }

  export type ProjectInvitationCreateOrConnectWithoutToProjectInput = {
    where: ProjectInvitationWhereUniqueInput
    create: XOR<ProjectInvitationCreateWithoutToProjectInput, ProjectInvitationUncheckedCreateWithoutToProjectInput>
  }

  export type ProjectInvitationCreateManyToProjectInputEnvelope = {
    data: ProjectInvitationCreateManyToProjectInput | ProjectInvitationCreateManyToProjectInput[]
    skipDuplicates?: boolean
  }

  export type UserInProjectCreateWithoutProjectInput = {
    user: UserCreateNestedOneWithoutBelongToProjectsInput
    role: RoleCreateNestedOneWithoutUserInProjectsInput
  }

  export type UserInProjectUncheckedCreateWithoutProjectInput = {
    userId: string
    roleId: string
  }

  export type UserInProjectCreateOrConnectWithoutProjectInput = {
    where: UserInProjectWhereUniqueInput
    create: XOR<UserInProjectCreateWithoutProjectInput, UserInProjectUncheckedCreateWithoutProjectInput>
  }

  export type UserInProjectCreateManyProjectInputEnvelope = {
    data: UserInProjectCreateManyProjectInput | UserInProjectCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type RoleCreateWithoutProjectInput = {
    id?: string
    name: string
    listOfPermission: string
    isDefault?: boolean
    userInProjects?: UserInProjectCreateNestedManyWithoutRoleInput
  }

  export type RoleUncheckedCreateWithoutProjectInput = {
    id?: string
    name: string
    listOfPermission: string
    isDefault?: boolean
    userInProjects?: UserInProjectUncheckedCreateNestedManyWithoutRoleInput
  }

  export type RoleCreateOrConnectWithoutProjectInput = {
    where: RoleWhereUniqueInput
    create: XOR<RoleCreateWithoutProjectInput, RoleUncheckedCreateWithoutProjectInput>
  }

  export type RoleCreateManyProjectInputEnvelope = {
    data: RoleCreateManyProjectInput | RoleCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutProjectsInput = {
    id?: string
    email: string
    password?: string | null
    name?: string | null
    avatarUrl?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: OAuthAccountCreateNestedManyWithoutOwnInput
    projectInvitations?: ProjectInvitationCreateNestedManyWithoutInvitorInput
    belongToProjects?: UserInProjectCreateNestedManyWithoutUserInput
    supervisedTasks?: TaskCreateNestedManyWithoutSupervisorInput
    tasks?: TaskOfUserCreateNestedManyWithoutUserInput
    comments?: CommentCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateWithoutProjectsInput = {
    id?: string
    email: string
    password?: string | null
    name?: string | null
    avatarUrl?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: OAuthAccountUncheckedCreateNestedManyWithoutOwnInput
    projectInvitations?: ProjectInvitationUncheckedCreateNestedManyWithoutInvitorInput
    belongToProjects?: UserInProjectUncheckedCreateNestedManyWithoutUserInput
    supervisedTasks?: TaskUncheckedCreateNestedManyWithoutSupervisorInput
    tasks?: TaskOfUserUncheckedCreateNestedManyWithoutUserInput
    comments?: CommentUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserCreateOrConnectWithoutProjectsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
  }

  export type SectionUpsertWithWhereUniqueWithoutHasInput = {
    where: SectionWhereUniqueInput
    update: XOR<SectionUpdateWithoutHasInput, SectionUncheckedUpdateWithoutHasInput>
    create: XOR<SectionCreateWithoutHasInput, SectionUncheckedCreateWithoutHasInput>
  }

  export type SectionUpdateWithWhereUniqueWithoutHasInput = {
    where: SectionWhereUniqueInput
    data: XOR<SectionUpdateWithoutHasInput, SectionUncheckedUpdateWithoutHasInput>
  }

  export type SectionUpdateManyWithWhereWithoutHasInput = {
    where: SectionScalarWhereInput
    data: XOR<SectionUpdateManyMutationInput, SectionUncheckedUpdateManyWithoutHasInput>
  }

  export type SectionScalarWhereInput = {
    AND?: SectionScalarWhereInput | SectionScalarWhereInput[]
    OR?: SectionScalarWhereInput[]
    NOT?: SectionScalarWhereInput | SectionScalarWhereInput[]
    id?: StringFilter<"Section"> | string
    name?: StringFilter<"Section"> | string
    listOfTask?: StringFilter<"Section"> | string
    createdAt?: DateTimeFilter<"Section"> | Date | string
    projectId?: StringFilter<"Section"> | string
  }

  export type TaskUpsertWithWhereUniqueWithoutBelongsToProjectInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutBelongsToProjectInput, TaskUncheckedUpdateWithoutBelongsToProjectInput>
    create: XOR<TaskCreateWithoutBelongsToProjectInput, TaskUncheckedCreateWithoutBelongsToProjectInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutBelongsToProjectInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutBelongsToProjectInput, TaskUncheckedUpdateWithoutBelongsToProjectInput>
  }

  export type TaskUpdateManyWithWhereWithoutBelongsToProjectInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutBelongsToProjectInput>
  }

  export type ProjectInvitationUpsertWithWhereUniqueWithoutToProjectInput = {
    where: ProjectInvitationWhereUniqueInput
    update: XOR<ProjectInvitationUpdateWithoutToProjectInput, ProjectInvitationUncheckedUpdateWithoutToProjectInput>
    create: XOR<ProjectInvitationCreateWithoutToProjectInput, ProjectInvitationUncheckedCreateWithoutToProjectInput>
  }

  export type ProjectInvitationUpdateWithWhereUniqueWithoutToProjectInput = {
    where: ProjectInvitationWhereUniqueInput
    data: XOR<ProjectInvitationUpdateWithoutToProjectInput, ProjectInvitationUncheckedUpdateWithoutToProjectInput>
  }

  export type ProjectInvitationUpdateManyWithWhereWithoutToProjectInput = {
    where: ProjectInvitationScalarWhereInput
    data: XOR<ProjectInvitationUpdateManyMutationInput, ProjectInvitationUncheckedUpdateManyWithoutToProjectInput>
  }

  export type UserInProjectUpsertWithWhereUniqueWithoutProjectInput = {
    where: UserInProjectWhereUniqueInput
    update: XOR<UserInProjectUpdateWithoutProjectInput, UserInProjectUncheckedUpdateWithoutProjectInput>
    create: XOR<UserInProjectCreateWithoutProjectInput, UserInProjectUncheckedCreateWithoutProjectInput>
  }

  export type UserInProjectUpdateWithWhereUniqueWithoutProjectInput = {
    where: UserInProjectWhereUniqueInput
    data: XOR<UserInProjectUpdateWithoutProjectInput, UserInProjectUncheckedUpdateWithoutProjectInput>
  }

  export type UserInProjectUpdateManyWithWhereWithoutProjectInput = {
    where: UserInProjectScalarWhereInput
    data: XOR<UserInProjectUpdateManyMutationInput, UserInProjectUncheckedUpdateManyWithoutProjectInput>
  }

  export type RoleUpsertWithWhereUniqueWithoutProjectInput = {
    where: RoleWhereUniqueInput
    update: XOR<RoleUpdateWithoutProjectInput, RoleUncheckedUpdateWithoutProjectInput>
    create: XOR<RoleCreateWithoutProjectInput, RoleUncheckedCreateWithoutProjectInput>
  }

  export type RoleUpdateWithWhereUniqueWithoutProjectInput = {
    where: RoleWhereUniqueInput
    data: XOR<RoleUpdateWithoutProjectInput, RoleUncheckedUpdateWithoutProjectInput>
  }

  export type RoleUpdateManyWithWhereWithoutProjectInput = {
    where: RoleScalarWhereInput
    data: XOR<RoleUpdateManyMutationInput, RoleUncheckedUpdateManyWithoutProjectInput>
  }

  export type RoleScalarWhereInput = {
    AND?: RoleScalarWhereInput | RoleScalarWhereInput[]
    OR?: RoleScalarWhereInput[]
    NOT?: RoleScalarWhereInput | RoleScalarWhereInput[]
    id?: StringFilter<"Role"> | string
    name?: StringFilter<"Role"> | string
    listOfPermission?: StringFilter<"Role"> | string
    isDefault?: BoolFilter<"Role"> | boolean
    projectId?: StringNullableFilter<"Role"> | string | null
  }

  export type UserUpsertWithoutProjectsInput = {
    update: XOR<UserUpdateWithoutProjectsInput, UserUncheckedUpdateWithoutProjectsInput>
    create: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProjectsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProjectsInput, UserUncheckedUpdateWithoutProjectsInput>
  }

  export type UserUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: OAuthAccountUpdateManyWithoutOwnNestedInput
    projectInvitations?: ProjectInvitationUpdateManyWithoutInvitorNestedInput
    belongToProjects?: UserInProjectUpdateManyWithoutUserNestedInput
    supervisedTasks?: TaskUpdateManyWithoutSupervisorNestedInput
    tasks?: TaskOfUserUpdateManyWithoutUserNestedInput
    comments?: CommentUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: OAuthAccountUncheckedUpdateManyWithoutOwnNestedInput
    projectInvitations?: ProjectInvitationUncheckedUpdateManyWithoutInvitorNestedInput
    belongToProjects?: UserInProjectUncheckedUpdateManyWithoutUserNestedInput
    supervisedTasks?: TaskUncheckedUpdateManyWithoutSupervisorNestedInput
    tasks?: TaskOfUserUncheckedUpdateManyWithoutUserNestedInput
    comments?: CommentUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type ProjectCreateWithoutSectionsInput = {
    id?: string
    name: string
    description?: string | null
    isPersonal?: boolean
    listOfSection?: string
    createdAt?: Date | string
    tasks?: TaskCreateNestedManyWithoutBelongsToProjectInput
    invitations?: ProjectInvitationCreateNestedManyWithoutToProjectInput
    members?: UserInProjectCreateNestedManyWithoutProjectInput
    roles?: RoleCreateNestedManyWithoutProjectInput
    own: UserCreateNestedOneWithoutProjectsInput
  }

  export type ProjectUncheckedCreateWithoutSectionsInput = {
    id?: string
    name: string
    description?: string | null
    isPersonal?: boolean
    listOfSection?: string
    createdAt?: Date | string
    owner: string
    tasks?: TaskUncheckedCreateNestedManyWithoutBelongsToProjectInput
    invitations?: ProjectInvitationUncheckedCreateNestedManyWithoutToProjectInput
    members?: UserInProjectUncheckedCreateNestedManyWithoutProjectInput
    roles?: RoleUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutSectionsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutSectionsInput, ProjectUncheckedCreateWithoutSectionsInput>
  }

  export type ProjectUpsertWithoutSectionsInput = {
    update: XOR<ProjectUpdateWithoutSectionsInput, ProjectUncheckedUpdateWithoutSectionsInput>
    create: XOR<ProjectCreateWithoutSectionsInput, ProjectUncheckedCreateWithoutSectionsInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutSectionsInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutSectionsInput, ProjectUncheckedUpdateWithoutSectionsInput>
  }

  export type ProjectUpdateWithoutSectionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPersonal?: BoolFieldUpdateOperationsInput | boolean
    listOfSection?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUpdateManyWithoutBelongsToProjectNestedInput
    invitations?: ProjectInvitationUpdateManyWithoutToProjectNestedInput
    members?: UserInProjectUpdateManyWithoutProjectNestedInput
    roles?: RoleUpdateManyWithoutProjectNestedInput
    own?: UserUpdateOneRequiredWithoutProjectsNestedInput
  }

  export type ProjectUncheckedUpdateWithoutSectionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPersonal?: BoolFieldUpdateOperationsInput | boolean
    listOfSection?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: StringFieldUpdateOperationsInput | string
    tasks?: TaskUncheckedUpdateManyWithoutBelongsToProjectNestedInput
    invitations?: ProjectInvitationUncheckedUpdateManyWithoutToProjectNestedInput
    members?: UserInProjectUncheckedUpdateManyWithoutProjectNestedInput
    roles?: RoleUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type TaskOfUserCreateWithoutTaskInput = {
    user: UserCreateNestedOneWithoutTasksInput
  }

  export type TaskOfUserUncheckedCreateWithoutTaskInput = {
    userId: string
  }

  export type TaskOfUserCreateOrConnectWithoutTaskInput = {
    where: TaskOfUserWhereUniqueInput
    create: XOR<TaskOfUserCreateWithoutTaskInput, TaskOfUserUncheckedCreateWithoutTaskInput>
  }

  export type TaskOfUserCreateManyTaskInputEnvelope = {
    data: TaskOfUserCreateManyTaskInput | TaskOfUserCreateManyTaskInput[]
    skipDuplicates?: boolean
  }

  export type TaskCreateWithoutParentInput = {
    id?: string
    title: string
    description?: string | null
    status?: $Enums.TaskStatus
    priority?: $Enums.PriorityLevel | null
    startDate?: Date | string | null
    dueDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sectionId: string
    assignees?: TaskOfUserCreateNestedManyWithoutTaskInput
    subtasks?: TaskCreateNestedManyWithoutParentInput
    comments?: CommentCreateNestedManyWithoutTaskInput
    supervisor?: UserCreateNestedOneWithoutSupervisedTasksInput
    belongsToProject: ProjectCreateNestedOneWithoutTasksInput
  }

  export type TaskUncheckedCreateWithoutParentInput = {
    id?: string
    title: string
    description?: string | null
    status?: $Enums.TaskStatus
    priority?: $Enums.PriorityLevel | null
    startDate?: Date | string | null
    dueDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sectionId: string
    supervisorId?: string | null
    projectId: string
    assignees?: TaskOfUserUncheckedCreateNestedManyWithoutTaskInput
    subtasks?: TaskUncheckedCreateNestedManyWithoutParentInput
    comments?: CommentUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutParentInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutParentInput, TaskUncheckedCreateWithoutParentInput>
  }

  export type TaskCreateManyParentInputEnvelope = {
    data: TaskCreateManyParentInput | TaskCreateManyParentInput[]
    skipDuplicates?: boolean
  }

  export type CommentCreateWithoutTaskInput = {
    id?: string
    content: string
    mediaUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    author: UserCreateNestedOneWithoutCommentsInput
  }

  export type CommentUncheckedCreateWithoutTaskInput = {
    id?: string
    content: string
    mediaUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    authorId: string
  }

  export type CommentCreateOrConnectWithoutTaskInput = {
    where: CommentWhereUniqueInput
    create: XOR<CommentCreateWithoutTaskInput, CommentUncheckedCreateWithoutTaskInput>
  }

  export type CommentCreateManyTaskInputEnvelope = {
    data: CommentCreateManyTaskInput | CommentCreateManyTaskInput[]
    skipDuplicates?: boolean
  }

  export type TaskCreateWithoutSubtasksInput = {
    id?: string
    title: string
    description?: string | null
    status?: $Enums.TaskStatus
    priority?: $Enums.PriorityLevel | null
    startDate?: Date | string | null
    dueDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sectionId: string
    assignees?: TaskOfUserCreateNestedManyWithoutTaskInput
    comments?: CommentCreateNestedManyWithoutTaskInput
    parent?: TaskCreateNestedOneWithoutSubtasksInput
    supervisor?: UserCreateNestedOneWithoutSupervisedTasksInput
    belongsToProject: ProjectCreateNestedOneWithoutTasksInput
  }

  export type TaskUncheckedCreateWithoutSubtasksInput = {
    id?: string
    title: string
    description?: string | null
    status?: $Enums.TaskStatus
    priority?: $Enums.PriorityLevel | null
    startDate?: Date | string | null
    dueDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sectionId: string
    parentTaskId?: string | null
    supervisorId?: string | null
    projectId: string
    assignees?: TaskOfUserUncheckedCreateNestedManyWithoutTaskInput
    comments?: CommentUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutSubtasksInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutSubtasksInput, TaskUncheckedCreateWithoutSubtasksInput>
  }

  export type UserCreateWithoutSupervisedTasksInput = {
    id?: string
    email: string
    password?: string | null
    name?: string | null
    avatarUrl?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: OAuthAccountCreateNestedManyWithoutOwnInput
    projects?: ProjectCreateNestedManyWithoutOwnInput
    projectInvitations?: ProjectInvitationCreateNestedManyWithoutInvitorInput
    belongToProjects?: UserInProjectCreateNestedManyWithoutUserInput
    tasks?: TaskOfUserCreateNestedManyWithoutUserInput
    comments?: CommentCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateWithoutSupervisedTasksInput = {
    id?: string
    email: string
    password?: string | null
    name?: string | null
    avatarUrl?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: OAuthAccountUncheckedCreateNestedManyWithoutOwnInput
    projects?: ProjectUncheckedCreateNestedManyWithoutOwnInput
    projectInvitations?: ProjectInvitationUncheckedCreateNestedManyWithoutInvitorInput
    belongToProjects?: UserInProjectUncheckedCreateNestedManyWithoutUserInput
    tasks?: TaskOfUserUncheckedCreateNestedManyWithoutUserInput
    comments?: CommentUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserCreateOrConnectWithoutSupervisedTasksInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSupervisedTasksInput, UserUncheckedCreateWithoutSupervisedTasksInput>
  }

  export type ProjectCreateWithoutTasksInput = {
    id?: string
    name: string
    description?: string | null
    isPersonal?: boolean
    listOfSection?: string
    createdAt?: Date | string
    sections?: SectionCreateNestedManyWithoutHasInput
    invitations?: ProjectInvitationCreateNestedManyWithoutToProjectInput
    members?: UserInProjectCreateNestedManyWithoutProjectInput
    roles?: RoleCreateNestedManyWithoutProjectInput
    own: UserCreateNestedOneWithoutProjectsInput
  }

  export type ProjectUncheckedCreateWithoutTasksInput = {
    id?: string
    name: string
    description?: string | null
    isPersonal?: boolean
    listOfSection?: string
    createdAt?: Date | string
    owner: string
    sections?: SectionUncheckedCreateNestedManyWithoutHasInput
    invitations?: ProjectInvitationUncheckedCreateNestedManyWithoutToProjectInput
    members?: UserInProjectUncheckedCreateNestedManyWithoutProjectInput
    roles?: RoleUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutTasksInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutTasksInput, ProjectUncheckedCreateWithoutTasksInput>
  }

  export type TaskOfUserUpsertWithWhereUniqueWithoutTaskInput = {
    where: TaskOfUserWhereUniqueInput
    update: XOR<TaskOfUserUpdateWithoutTaskInput, TaskOfUserUncheckedUpdateWithoutTaskInput>
    create: XOR<TaskOfUserCreateWithoutTaskInput, TaskOfUserUncheckedCreateWithoutTaskInput>
  }

  export type TaskOfUserUpdateWithWhereUniqueWithoutTaskInput = {
    where: TaskOfUserWhereUniqueInput
    data: XOR<TaskOfUserUpdateWithoutTaskInput, TaskOfUserUncheckedUpdateWithoutTaskInput>
  }

  export type TaskOfUserUpdateManyWithWhereWithoutTaskInput = {
    where: TaskOfUserScalarWhereInput
    data: XOR<TaskOfUserUpdateManyMutationInput, TaskOfUserUncheckedUpdateManyWithoutTaskInput>
  }

  export type TaskUpsertWithWhereUniqueWithoutParentInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutParentInput, TaskUncheckedUpdateWithoutParentInput>
    create: XOR<TaskCreateWithoutParentInput, TaskUncheckedCreateWithoutParentInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutParentInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutParentInput, TaskUncheckedUpdateWithoutParentInput>
  }

  export type TaskUpdateManyWithWhereWithoutParentInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutParentInput>
  }

  export type CommentUpsertWithWhereUniqueWithoutTaskInput = {
    where: CommentWhereUniqueInput
    update: XOR<CommentUpdateWithoutTaskInput, CommentUncheckedUpdateWithoutTaskInput>
    create: XOR<CommentCreateWithoutTaskInput, CommentUncheckedCreateWithoutTaskInput>
  }

  export type CommentUpdateWithWhereUniqueWithoutTaskInput = {
    where: CommentWhereUniqueInput
    data: XOR<CommentUpdateWithoutTaskInput, CommentUncheckedUpdateWithoutTaskInput>
  }

  export type CommentUpdateManyWithWhereWithoutTaskInput = {
    where: CommentScalarWhereInput
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyWithoutTaskInput>
  }

  export type TaskUpsertWithoutSubtasksInput = {
    update: XOR<TaskUpdateWithoutSubtasksInput, TaskUncheckedUpdateWithoutSubtasksInput>
    create: XOR<TaskCreateWithoutSubtasksInput, TaskUncheckedCreateWithoutSubtasksInput>
    where?: TaskWhereInput
  }

  export type TaskUpdateToOneWithWhereWithoutSubtasksInput = {
    where?: TaskWhereInput
    data: XOR<TaskUpdateWithoutSubtasksInput, TaskUncheckedUpdateWithoutSubtasksInput>
  }

  export type TaskUpdateWithoutSubtasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    priority?: NullableEnumPriorityLevelFieldUpdateOperationsInput | $Enums.PriorityLevel | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sectionId?: StringFieldUpdateOperationsInput | string
    assignees?: TaskOfUserUpdateManyWithoutTaskNestedInput
    comments?: CommentUpdateManyWithoutTaskNestedInput
    parent?: TaskUpdateOneWithoutSubtasksNestedInput
    supervisor?: UserUpdateOneWithoutSupervisedTasksNestedInput
    belongsToProject?: ProjectUpdateOneRequiredWithoutTasksNestedInput
  }

  export type TaskUncheckedUpdateWithoutSubtasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    priority?: NullableEnumPriorityLevelFieldUpdateOperationsInput | $Enums.PriorityLevel | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sectionId?: StringFieldUpdateOperationsInput | string
    parentTaskId?: NullableStringFieldUpdateOperationsInput | string | null
    supervisorId?: NullableStringFieldUpdateOperationsInput | string | null
    projectId?: StringFieldUpdateOperationsInput | string
    assignees?: TaskOfUserUncheckedUpdateManyWithoutTaskNestedInput
    comments?: CommentUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type UserUpsertWithoutSupervisedTasksInput = {
    update: XOR<UserUpdateWithoutSupervisedTasksInput, UserUncheckedUpdateWithoutSupervisedTasksInput>
    create: XOR<UserCreateWithoutSupervisedTasksInput, UserUncheckedCreateWithoutSupervisedTasksInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSupervisedTasksInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSupervisedTasksInput, UserUncheckedUpdateWithoutSupervisedTasksInput>
  }

  export type UserUpdateWithoutSupervisedTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: OAuthAccountUpdateManyWithoutOwnNestedInput
    projects?: ProjectUpdateManyWithoutOwnNestedInput
    projectInvitations?: ProjectInvitationUpdateManyWithoutInvitorNestedInput
    belongToProjects?: UserInProjectUpdateManyWithoutUserNestedInput
    tasks?: TaskOfUserUpdateManyWithoutUserNestedInput
    comments?: CommentUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateWithoutSupervisedTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: OAuthAccountUncheckedUpdateManyWithoutOwnNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutOwnNestedInput
    projectInvitations?: ProjectInvitationUncheckedUpdateManyWithoutInvitorNestedInput
    belongToProjects?: UserInProjectUncheckedUpdateManyWithoutUserNestedInput
    tasks?: TaskOfUserUncheckedUpdateManyWithoutUserNestedInput
    comments?: CommentUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type ProjectUpsertWithoutTasksInput = {
    update: XOR<ProjectUpdateWithoutTasksInput, ProjectUncheckedUpdateWithoutTasksInput>
    create: XOR<ProjectCreateWithoutTasksInput, ProjectUncheckedCreateWithoutTasksInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutTasksInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutTasksInput, ProjectUncheckedUpdateWithoutTasksInput>
  }

  export type ProjectUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPersonal?: BoolFieldUpdateOperationsInput | boolean
    listOfSection?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sections?: SectionUpdateManyWithoutHasNestedInput
    invitations?: ProjectInvitationUpdateManyWithoutToProjectNestedInput
    members?: UserInProjectUpdateManyWithoutProjectNestedInput
    roles?: RoleUpdateManyWithoutProjectNestedInput
    own?: UserUpdateOneRequiredWithoutProjectsNestedInput
  }

  export type ProjectUncheckedUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPersonal?: BoolFieldUpdateOperationsInput | boolean
    listOfSection?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: StringFieldUpdateOperationsInput | string
    sections?: SectionUncheckedUpdateManyWithoutHasNestedInput
    invitations?: ProjectInvitationUncheckedUpdateManyWithoutToProjectNestedInput
    members?: UserInProjectUncheckedUpdateManyWithoutProjectNestedInput
    roles?: RoleUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type TaskCreateWithoutAssigneesInput = {
    id?: string
    title: string
    description?: string | null
    status?: $Enums.TaskStatus
    priority?: $Enums.PriorityLevel | null
    startDate?: Date | string | null
    dueDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sectionId: string
    subtasks?: TaskCreateNestedManyWithoutParentInput
    comments?: CommentCreateNestedManyWithoutTaskInput
    parent?: TaskCreateNestedOneWithoutSubtasksInput
    supervisor?: UserCreateNestedOneWithoutSupervisedTasksInput
    belongsToProject: ProjectCreateNestedOneWithoutTasksInput
  }

  export type TaskUncheckedCreateWithoutAssigneesInput = {
    id?: string
    title: string
    description?: string | null
    status?: $Enums.TaskStatus
    priority?: $Enums.PriorityLevel | null
    startDate?: Date | string | null
    dueDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sectionId: string
    parentTaskId?: string | null
    supervisorId?: string | null
    projectId: string
    subtasks?: TaskUncheckedCreateNestedManyWithoutParentInput
    comments?: CommentUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutAssigneesInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutAssigneesInput, TaskUncheckedCreateWithoutAssigneesInput>
  }

  export type UserCreateWithoutTasksInput = {
    id?: string
    email: string
    password?: string | null
    name?: string | null
    avatarUrl?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: OAuthAccountCreateNestedManyWithoutOwnInput
    projects?: ProjectCreateNestedManyWithoutOwnInput
    projectInvitations?: ProjectInvitationCreateNestedManyWithoutInvitorInput
    belongToProjects?: UserInProjectCreateNestedManyWithoutUserInput
    supervisedTasks?: TaskCreateNestedManyWithoutSupervisorInput
    comments?: CommentCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateWithoutTasksInput = {
    id?: string
    email: string
    password?: string | null
    name?: string | null
    avatarUrl?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: OAuthAccountUncheckedCreateNestedManyWithoutOwnInput
    projects?: ProjectUncheckedCreateNestedManyWithoutOwnInput
    projectInvitations?: ProjectInvitationUncheckedCreateNestedManyWithoutInvitorInput
    belongToProjects?: UserInProjectUncheckedCreateNestedManyWithoutUserInput
    supervisedTasks?: TaskUncheckedCreateNestedManyWithoutSupervisorInput
    comments?: CommentUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserCreateOrConnectWithoutTasksInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTasksInput, UserUncheckedCreateWithoutTasksInput>
  }

  export type TaskUpsertWithoutAssigneesInput = {
    update: XOR<TaskUpdateWithoutAssigneesInput, TaskUncheckedUpdateWithoutAssigneesInput>
    create: XOR<TaskCreateWithoutAssigneesInput, TaskUncheckedCreateWithoutAssigneesInput>
    where?: TaskWhereInput
  }

  export type TaskUpdateToOneWithWhereWithoutAssigneesInput = {
    where?: TaskWhereInput
    data: XOR<TaskUpdateWithoutAssigneesInput, TaskUncheckedUpdateWithoutAssigneesInput>
  }

  export type TaskUpdateWithoutAssigneesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    priority?: NullableEnumPriorityLevelFieldUpdateOperationsInput | $Enums.PriorityLevel | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sectionId?: StringFieldUpdateOperationsInput | string
    subtasks?: TaskUpdateManyWithoutParentNestedInput
    comments?: CommentUpdateManyWithoutTaskNestedInput
    parent?: TaskUpdateOneWithoutSubtasksNestedInput
    supervisor?: UserUpdateOneWithoutSupervisedTasksNestedInput
    belongsToProject?: ProjectUpdateOneRequiredWithoutTasksNestedInput
  }

  export type TaskUncheckedUpdateWithoutAssigneesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    priority?: NullableEnumPriorityLevelFieldUpdateOperationsInput | $Enums.PriorityLevel | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sectionId?: StringFieldUpdateOperationsInput | string
    parentTaskId?: NullableStringFieldUpdateOperationsInput | string | null
    supervisorId?: NullableStringFieldUpdateOperationsInput | string | null
    projectId?: StringFieldUpdateOperationsInput | string
    subtasks?: TaskUncheckedUpdateManyWithoutParentNestedInput
    comments?: CommentUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type UserUpsertWithoutTasksInput = {
    update: XOR<UserUpdateWithoutTasksInput, UserUncheckedUpdateWithoutTasksInput>
    create: XOR<UserCreateWithoutTasksInput, UserUncheckedCreateWithoutTasksInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTasksInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTasksInput, UserUncheckedUpdateWithoutTasksInput>
  }

  export type UserUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: OAuthAccountUpdateManyWithoutOwnNestedInput
    projects?: ProjectUpdateManyWithoutOwnNestedInput
    projectInvitations?: ProjectInvitationUpdateManyWithoutInvitorNestedInput
    belongToProjects?: UserInProjectUpdateManyWithoutUserNestedInput
    supervisedTasks?: TaskUpdateManyWithoutSupervisorNestedInput
    comments?: CommentUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: OAuthAccountUncheckedUpdateManyWithoutOwnNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutOwnNestedInput
    projectInvitations?: ProjectInvitationUncheckedUpdateManyWithoutInvitorNestedInput
    belongToProjects?: UserInProjectUncheckedUpdateManyWithoutUserNestedInput
    supervisedTasks?: TaskUncheckedUpdateManyWithoutSupervisorNestedInput
    comments?: CommentUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type UserCreateWithoutCommentsInput = {
    id?: string
    email: string
    password?: string | null
    name?: string | null
    avatarUrl?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: OAuthAccountCreateNestedManyWithoutOwnInput
    projects?: ProjectCreateNestedManyWithoutOwnInput
    projectInvitations?: ProjectInvitationCreateNestedManyWithoutInvitorInput
    belongToProjects?: UserInProjectCreateNestedManyWithoutUserInput
    supervisedTasks?: TaskCreateNestedManyWithoutSupervisorInput
    tasks?: TaskOfUserCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCommentsInput = {
    id?: string
    email: string
    password?: string | null
    name?: string | null
    avatarUrl?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: OAuthAccountUncheckedCreateNestedManyWithoutOwnInput
    projects?: ProjectUncheckedCreateNestedManyWithoutOwnInput
    projectInvitations?: ProjectInvitationUncheckedCreateNestedManyWithoutInvitorInput
    belongToProjects?: UserInProjectUncheckedCreateNestedManyWithoutUserInput
    supervisedTasks?: TaskUncheckedCreateNestedManyWithoutSupervisorInput
    tasks?: TaskOfUserUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCommentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
  }

  export type TaskCreateWithoutCommentsInput = {
    id?: string
    title: string
    description?: string | null
    status?: $Enums.TaskStatus
    priority?: $Enums.PriorityLevel | null
    startDate?: Date | string | null
    dueDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sectionId: string
    assignees?: TaskOfUserCreateNestedManyWithoutTaskInput
    subtasks?: TaskCreateNestedManyWithoutParentInput
    parent?: TaskCreateNestedOneWithoutSubtasksInput
    supervisor?: UserCreateNestedOneWithoutSupervisedTasksInput
    belongsToProject: ProjectCreateNestedOneWithoutTasksInput
  }

  export type TaskUncheckedCreateWithoutCommentsInput = {
    id?: string
    title: string
    description?: string | null
    status?: $Enums.TaskStatus
    priority?: $Enums.PriorityLevel | null
    startDate?: Date | string | null
    dueDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sectionId: string
    parentTaskId?: string | null
    supervisorId?: string | null
    projectId: string
    assignees?: TaskOfUserUncheckedCreateNestedManyWithoutTaskInput
    subtasks?: TaskUncheckedCreateNestedManyWithoutParentInput
  }

  export type TaskCreateOrConnectWithoutCommentsInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutCommentsInput, TaskUncheckedCreateWithoutCommentsInput>
  }

  export type UserUpsertWithoutCommentsInput = {
    update: XOR<UserUpdateWithoutCommentsInput, UserUncheckedUpdateWithoutCommentsInput>
    create: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCommentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCommentsInput, UserUncheckedUpdateWithoutCommentsInput>
  }

  export type UserUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: OAuthAccountUpdateManyWithoutOwnNestedInput
    projects?: ProjectUpdateManyWithoutOwnNestedInput
    projectInvitations?: ProjectInvitationUpdateManyWithoutInvitorNestedInput
    belongToProjects?: UserInProjectUpdateManyWithoutUserNestedInput
    supervisedTasks?: TaskUpdateManyWithoutSupervisorNestedInput
    tasks?: TaskOfUserUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: OAuthAccountUncheckedUpdateManyWithoutOwnNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutOwnNestedInput
    projectInvitations?: ProjectInvitationUncheckedUpdateManyWithoutInvitorNestedInput
    belongToProjects?: UserInProjectUncheckedUpdateManyWithoutUserNestedInput
    supervisedTasks?: TaskUncheckedUpdateManyWithoutSupervisorNestedInput
    tasks?: TaskOfUserUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TaskUpsertWithoutCommentsInput = {
    update: XOR<TaskUpdateWithoutCommentsInput, TaskUncheckedUpdateWithoutCommentsInput>
    create: XOR<TaskCreateWithoutCommentsInput, TaskUncheckedCreateWithoutCommentsInput>
    where?: TaskWhereInput
  }

  export type TaskUpdateToOneWithWhereWithoutCommentsInput = {
    where?: TaskWhereInput
    data: XOR<TaskUpdateWithoutCommentsInput, TaskUncheckedUpdateWithoutCommentsInput>
  }

  export type TaskUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    priority?: NullableEnumPriorityLevelFieldUpdateOperationsInput | $Enums.PriorityLevel | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sectionId?: StringFieldUpdateOperationsInput | string
    assignees?: TaskOfUserUpdateManyWithoutTaskNestedInput
    subtasks?: TaskUpdateManyWithoutParentNestedInput
    parent?: TaskUpdateOneWithoutSubtasksNestedInput
    supervisor?: UserUpdateOneWithoutSupervisedTasksNestedInput
    belongsToProject?: ProjectUpdateOneRequiredWithoutTasksNestedInput
  }

  export type TaskUncheckedUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    priority?: NullableEnumPriorityLevelFieldUpdateOperationsInput | $Enums.PriorityLevel | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sectionId?: StringFieldUpdateOperationsInput | string
    parentTaskId?: NullableStringFieldUpdateOperationsInput | string | null
    supervisorId?: NullableStringFieldUpdateOperationsInput | string | null
    projectId?: StringFieldUpdateOperationsInput | string
    assignees?: TaskOfUserUncheckedUpdateManyWithoutTaskNestedInput
    subtasks?: TaskUncheckedUpdateManyWithoutParentNestedInput
  }

  export type UserCreateWithoutProjectInvitationsInput = {
    id?: string
    email: string
    password?: string | null
    name?: string | null
    avatarUrl?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: OAuthAccountCreateNestedManyWithoutOwnInput
    projects?: ProjectCreateNestedManyWithoutOwnInput
    belongToProjects?: UserInProjectCreateNestedManyWithoutUserInput
    supervisedTasks?: TaskCreateNestedManyWithoutSupervisorInput
    tasks?: TaskOfUserCreateNestedManyWithoutUserInput
    comments?: CommentCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateWithoutProjectInvitationsInput = {
    id?: string
    email: string
    password?: string | null
    name?: string | null
    avatarUrl?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: OAuthAccountUncheckedCreateNestedManyWithoutOwnInput
    projects?: ProjectUncheckedCreateNestedManyWithoutOwnInput
    belongToProjects?: UserInProjectUncheckedCreateNestedManyWithoutUserInput
    supervisedTasks?: TaskUncheckedCreateNestedManyWithoutSupervisorInput
    tasks?: TaskOfUserUncheckedCreateNestedManyWithoutUserInput
    comments?: CommentUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserCreateOrConnectWithoutProjectInvitationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProjectInvitationsInput, UserUncheckedCreateWithoutProjectInvitationsInput>
  }

  export type ProjectCreateWithoutInvitationsInput = {
    id?: string
    name: string
    description?: string | null
    isPersonal?: boolean
    listOfSection?: string
    createdAt?: Date | string
    sections?: SectionCreateNestedManyWithoutHasInput
    tasks?: TaskCreateNestedManyWithoutBelongsToProjectInput
    members?: UserInProjectCreateNestedManyWithoutProjectInput
    roles?: RoleCreateNestedManyWithoutProjectInput
    own: UserCreateNestedOneWithoutProjectsInput
  }

  export type ProjectUncheckedCreateWithoutInvitationsInput = {
    id?: string
    name: string
    description?: string | null
    isPersonal?: boolean
    listOfSection?: string
    createdAt?: Date | string
    owner: string
    sections?: SectionUncheckedCreateNestedManyWithoutHasInput
    tasks?: TaskUncheckedCreateNestedManyWithoutBelongsToProjectInput
    members?: UserInProjectUncheckedCreateNestedManyWithoutProjectInput
    roles?: RoleUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutInvitationsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutInvitationsInput, ProjectUncheckedCreateWithoutInvitationsInput>
  }

  export type UserUpsertWithoutProjectInvitationsInput = {
    update: XOR<UserUpdateWithoutProjectInvitationsInput, UserUncheckedUpdateWithoutProjectInvitationsInput>
    create: XOR<UserCreateWithoutProjectInvitationsInput, UserUncheckedCreateWithoutProjectInvitationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProjectInvitationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProjectInvitationsInput, UserUncheckedUpdateWithoutProjectInvitationsInput>
  }

  export type UserUpdateWithoutProjectInvitationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: OAuthAccountUpdateManyWithoutOwnNestedInput
    projects?: ProjectUpdateManyWithoutOwnNestedInput
    belongToProjects?: UserInProjectUpdateManyWithoutUserNestedInput
    supervisedTasks?: TaskUpdateManyWithoutSupervisorNestedInput
    tasks?: TaskOfUserUpdateManyWithoutUserNestedInput
    comments?: CommentUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateWithoutProjectInvitationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: OAuthAccountUncheckedUpdateManyWithoutOwnNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutOwnNestedInput
    belongToProjects?: UserInProjectUncheckedUpdateManyWithoutUserNestedInput
    supervisedTasks?: TaskUncheckedUpdateManyWithoutSupervisorNestedInput
    tasks?: TaskOfUserUncheckedUpdateManyWithoutUserNestedInput
    comments?: CommentUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type ProjectUpsertWithoutInvitationsInput = {
    update: XOR<ProjectUpdateWithoutInvitationsInput, ProjectUncheckedUpdateWithoutInvitationsInput>
    create: XOR<ProjectCreateWithoutInvitationsInput, ProjectUncheckedCreateWithoutInvitationsInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutInvitationsInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutInvitationsInput, ProjectUncheckedUpdateWithoutInvitationsInput>
  }

  export type ProjectUpdateWithoutInvitationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPersonal?: BoolFieldUpdateOperationsInput | boolean
    listOfSection?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sections?: SectionUpdateManyWithoutHasNestedInput
    tasks?: TaskUpdateManyWithoutBelongsToProjectNestedInput
    members?: UserInProjectUpdateManyWithoutProjectNestedInput
    roles?: RoleUpdateManyWithoutProjectNestedInput
    own?: UserUpdateOneRequiredWithoutProjectsNestedInput
  }

  export type ProjectUncheckedUpdateWithoutInvitationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPersonal?: BoolFieldUpdateOperationsInput | boolean
    listOfSection?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: StringFieldUpdateOperationsInput | string
    sections?: SectionUncheckedUpdateManyWithoutHasNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutBelongsToProjectNestedInput
    members?: UserInProjectUncheckedUpdateManyWithoutProjectNestedInput
    roles?: RoleUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type UserCreateWithoutBelongToProjectsInput = {
    id?: string
    email: string
    password?: string | null
    name?: string | null
    avatarUrl?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: OAuthAccountCreateNestedManyWithoutOwnInput
    projects?: ProjectCreateNestedManyWithoutOwnInput
    projectInvitations?: ProjectInvitationCreateNestedManyWithoutInvitorInput
    supervisedTasks?: TaskCreateNestedManyWithoutSupervisorInput
    tasks?: TaskOfUserCreateNestedManyWithoutUserInput
    comments?: CommentCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateWithoutBelongToProjectsInput = {
    id?: string
    email: string
    password?: string | null
    name?: string | null
    avatarUrl?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: OAuthAccountUncheckedCreateNestedManyWithoutOwnInput
    projects?: ProjectUncheckedCreateNestedManyWithoutOwnInput
    projectInvitations?: ProjectInvitationUncheckedCreateNestedManyWithoutInvitorInput
    supervisedTasks?: TaskUncheckedCreateNestedManyWithoutSupervisorInput
    tasks?: TaskOfUserUncheckedCreateNestedManyWithoutUserInput
    comments?: CommentUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserCreateOrConnectWithoutBelongToProjectsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBelongToProjectsInput, UserUncheckedCreateWithoutBelongToProjectsInput>
  }

  export type ProjectCreateWithoutMembersInput = {
    id?: string
    name: string
    description?: string | null
    isPersonal?: boolean
    listOfSection?: string
    createdAt?: Date | string
    sections?: SectionCreateNestedManyWithoutHasInput
    tasks?: TaskCreateNestedManyWithoutBelongsToProjectInput
    invitations?: ProjectInvitationCreateNestedManyWithoutToProjectInput
    roles?: RoleCreateNestedManyWithoutProjectInput
    own: UserCreateNestedOneWithoutProjectsInput
  }

  export type ProjectUncheckedCreateWithoutMembersInput = {
    id?: string
    name: string
    description?: string | null
    isPersonal?: boolean
    listOfSection?: string
    createdAt?: Date | string
    owner: string
    sections?: SectionUncheckedCreateNestedManyWithoutHasInput
    tasks?: TaskUncheckedCreateNestedManyWithoutBelongsToProjectInput
    invitations?: ProjectInvitationUncheckedCreateNestedManyWithoutToProjectInput
    roles?: RoleUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutMembersInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutMembersInput, ProjectUncheckedCreateWithoutMembersInput>
  }

  export type RoleCreateWithoutUserInProjectsInput = {
    id?: string
    name: string
    listOfPermission: string
    isDefault?: boolean
    project?: ProjectCreateNestedOneWithoutRolesInput
  }

  export type RoleUncheckedCreateWithoutUserInProjectsInput = {
    id?: string
    name: string
    listOfPermission: string
    isDefault?: boolean
    projectId?: string | null
  }

  export type RoleCreateOrConnectWithoutUserInProjectsInput = {
    where: RoleWhereUniqueInput
    create: XOR<RoleCreateWithoutUserInProjectsInput, RoleUncheckedCreateWithoutUserInProjectsInput>
  }

  export type UserUpsertWithoutBelongToProjectsInput = {
    update: XOR<UserUpdateWithoutBelongToProjectsInput, UserUncheckedUpdateWithoutBelongToProjectsInput>
    create: XOR<UserCreateWithoutBelongToProjectsInput, UserUncheckedCreateWithoutBelongToProjectsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBelongToProjectsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBelongToProjectsInput, UserUncheckedUpdateWithoutBelongToProjectsInput>
  }

  export type UserUpdateWithoutBelongToProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: OAuthAccountUpdateManyWithoutOwnNestedInput
    projects?: ProjectUpdateManyWithoutOwnNestedInput
    projectInvitations?: ProjectInvitationUpdateManyWithoutInvitorNestedInput
    supervisedTasks?: TaskUpdateManyWithoutSupervisorNestedInput
    tasks?: TaskOfUserUpdateManyWithoutUserNestedInput
    comments?: CommentUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateWithoutBelongToProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: OAuthAccountUncheckedUpdateManyWithoutOwnNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutOwnNestedInput
    projectInvitations?: ProjectInvitationUncheckedUpdateManyWithoutInvitorNestedInput
    supervisedTasks?: TaskUncheckedUpdateManyWithoutSupervisorNestedInput
    tasks?: TaskOfUserUncheckedUpdateManyWithoutUserNestedInput
    comments?: CommentUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type ProjectUpsertWithoutMembersInput = {
    update: XOR<ProjectUpdateWithoutMembersInput, ProjectUncheckedUpdateWithoutMembersInput>
    create: XOR<ProjectCreateWithoutMembersInput, ProjectUncheckedCreateWithoutMembersInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutMembersInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutMembersInput, ProjectUncheckedUpdateWithoutMembersInput>
  }

  export type ProjectUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPersonal?: BoolFieldUpdateOperationsInput | boolean
    listOfSection?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sections?: SectionUpdateManyWithoutHasNestedInput
    tasks?: TaskUpdateManyWithoutBelongsToProjectNestedInput
    invitations?: ProjectInvitationUpdateManyWithoutToProjectNestedInput
    roles?: RoleUpdateManyWithoutProjectNestedInput
    own?: UserUpdateOneRequiredWithoutProjectsNestedInput
  }

  export type ProjectUncheckedUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPersonal?: BoolFieldUpdateOperationsInput | boolean
    listOfSection?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: StringFieldUpdateOperationsInput | string
    sections?: SectionUncheckedUpdateManyWithoutHasNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutBelongsToProjectNestedInput
    invitations?: ProjectInvitationUncheckedUpdateManyWithoutToProjectNestedInput
    roles?: RoleUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type RoleUpsertWithoutUserInProjectsInput = {
    update: XOR<RoleUpdateWithoutUserInProjectsInput, RoleUncheckedUpdateWithoutUserInProjectsInput>
    create: XOR<RoleCreateWithoutUserInProjectsInput, RoleUncheckedCreateWithoutUserInProjectsInput>
    where?: RoleWhereInput
  }

  export type RoleUpdateToOneWithWhereWithoutUserInProjectsInput = {
    where?: RoleWhereInput
    data: XOR<RoleUpdateWithoutUserInProjectsInput, RoleUncheckedUpdateWithoutUserInProjectsInput>
  }

  export type RoleUpdateWithoutUserInProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    listOfPermission?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    project?: ProjectUpdateOneWithoutRolesNestedInput
  }

  export type RoleUncheckedUpdateWithoutUserInProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    listOfPermission?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserInProjectCreateWithoutRoleInput = {
    user: UserCreateNestedOneWithoutBelongToProjectsInput
    project: ProjectCreateNestedOneWithoutMembersInput
  }

  export type UserInProjectUncheckedCreateWithoutRoleInput = {
    userId: string
    projectId: string
  }

  export type UserInProjectCreateOrConnectWithoutRoleInput = {
    where: UserInProjectWhereUniqueInput
    create: XOR<UserInProjectCreateWithoutRoleInput, UserInProjectUncheckedCreateWithoutRoleInput>
  }

  export type UserInProjectCreateManyRoleInputEnvelope = {
    data: UserInProjectCreateManyRoleInput | UserInProjectCreateManyRoleInput[]
    skipDuplicates?: boolean
  }

  export type ProjectCreateWithoutRolesInput = {
    id?: string
    name: string
    description?: string | null
    isPersonal?: boolean
    listOfSection?: string
    createdAt?: Date | string
    sections?: SectionCreateNestedManyWithoutHasInput
    tasks?: TaskCreateNestedManyWithoutBelongsToProjectInput
    invitations?: ProjectInvitationCreateNestedManyWithoutToProjectInput
    members?: UserInProjectCreateNestedManyWithoutProjectInput
    own: UserCreateNestedOneWithoutProjectsInput
  }

  export type ProjectUncheckedCreateWithoutRolesInput = {
    id?: string
    name: string
    description?: string | null
    isPersonal?: boolean
    listOfSection?: string
    createdAt?: Date | string
    owner: string
    sections?: SectionUncheckedCreateNestedManyWithoutHasInput
    tasks?: TaskUncheckedCreateNestedManyWithoutBelongsToProjectInput
    invitations?: ProjectInvitationUncheckedCreateNestedManyWithoutToProjectInput
    members?: UserInProjectUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutRolesInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutRolesInput, ProjectUncheckedCreateWithoutRolesInput>
  }

  export type UserInProjectUpsertWithWhereUniqueWithoutRoleInput = {
    where: UserInProjectWhereUniqueInput
    update: XOR<UserInProjectUpdateWithoutRoleInput, UserInProjectUncheckedUpdateWithoutRoleInput>
    create: XOR<UserInProjectCreateWithoutRoleInput, UserInProjectUncheckedCreateWithoutRoleInput>
  }

  export type UserInProjectUpdateWithWhereUniqueWithoutRoleInput = {
    where: UserInProjectWhereUniqueInput
    data: XOR<UserInProjectUpdateWithoutRoleInput, UserInProjectUncheckedUpdateWithoutRoleInput>
  }

  export type UserInProjectUpdateManyWithWhereWithoutRoleInput = {
    where: UserInProjectScalarWhereInput
    data: XOR<UserInProjectUpdateManyMutationInput, UserInProjectUncheckedUpdateManyWithoutRoleInput>
  }

  export type ProjectUpsertWithoutRolesInput = {
    update: XOR<ProjectUpdateWithoutRolesInput, ProjectUncheckedUpdateWithoutRolesInput>
    create: XOR<ProjectCreateWithoutRolesInput, ProjectUncheckedCreateWithoutRolesInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutRolesInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutRolesInput, ProjectUncheckedUpdateWithoutRolesInput>
  }

  export type ProjectUpdateWithoutRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPersonal?: BoolFieldUpdateOperationsInput | boolean
    listOfSection?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sections?: SectionUpdateManyWithoutHasNestedInput
    tasks?: TaskUpdateManyWithoutBelongsToProjectNestedInput
    invitations?: ProjectInvitationUpdateManyWithoutToProjectNestedInput
    members?: UserInProjectUpdateManyWithoutProjectNestedInput
    own?: UserUpdateOneRequiredWithoutProjectsNestedInput
  }

  export type ProjectUncheckedUpdateWithoutRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPersonal?: BoolFieldUpdateOperationsInput | boolean
    listOfSection?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: StringFieldUpdateOperationsInput | string
    sections?: SectionUncheckedUpdateManyWithoutHasNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutBelongsToProjectNestedInput
    invitations?: ProjectInvitationUncheckedUpdateManyWithoutToProjectNestedInput
    members?: UserInProjectUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type OAuthAccountCreateManyOwnInput = {
    id?: string
    provider: $Enums.Provider
  }

  export type ProjectCreateManyOwnInput = {
    id?: string
    name: string
    description?: string | null
    isPersonal?: boolean
    listOfSection?: string
    createdAt?: Date | string
  }

  export type ProjectInvitationCreateManyInvitorInput = {
    status?: $Enums.InvitationStatus
    createdAt?: Date | string
    projectId: string
  }

  export type UserInProjectCreateManyUserInput = {
    projectId: string
    roleId: string
  }

  export type TaskCreateManySupervisorInput = {
    id?: string
    title: string
    description?: string | null
    status?: $Enums.TaskStatus
    priority?: $Enums.PriorityLevel | null
    startDate?: Date | string | null
    dueDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sectionId: string
    parentTaskId?: string | null
    projectId: string
  }

  export type TaskOfUserCreateManyUserInput = {
    taskId: string
  }

  export type CommentCreateManyAuthorInput = {
    id?: string
    content: string
    mediaUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    taskId: string
  }

  export type OAuthAccountUpdateWithoutOwnInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
  }

  export type OAuthAccountUncheckedUpdateWithoutOwnInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
  }

  export type OAuthAccountUncheckedUpdateManyWithoutOwnInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
  }

  export type ProjectUpdateWithoutOwnInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPersonal?: BoolFieldUpdateOperationsInput | boolean
    listOfSection?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sections?: SectionUpdateManyWithoutHasNestedInput
    tasks?: TaskUpdateManyWithoutBelongsToProjectNestedInput
    invitations?: ProjectInvitationUpdateManyWithoutToProjectNestedInput
    members?: UserInProjectUpdateManyWithoutProjectNestedInput
    roles?: RoleUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutOwnInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPersonal?: BoolFieldUpdateOperationsInput | boolean
    listOfSection?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sections?: SectionUncheckedUpdateManyWithoutHasNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutBelongsToProjectNestedInput
    invitations?: ProjectInvitationUncheckedUpdateManyWithoutToProjectNestedInput
    members?: UserInProjectUncheckedUpdateManyWithoutProjectNestedInput
    roles?: RoleUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateManyWithoutOwnInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPersonal?: BoolFieldUpdateOperationsInput | boolean
    listOfSection?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectInvitationUpdateWithoutInvitorInput = {
    status?: EnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    toProject?: ProjectUpdateOneRequiredWithoutInvitationsNestedInput
  }

  export type ProjectInvitationUncheckedUpdateWithoutInvitorInput = {
    status?: EnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projectId?: StringFieldUpdateOperationsInput | string
  }

  export type ProjectInvitationUncheckedUpdateManyWithoutInvitorInput = {
    status?: EnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projectId?: StringFieldUpdateOperationsInput | string
  }

  export type UserInProjectUpdateWithoutUserInput = {
    project?: ProjectUpdateOneRequiredWithoutMembersNestedInput
    role?: RoleUpdateOneRequiredWithoutUserInProjectsNestedInput
  }

  export type UserInProjectUncheckedUpdateWithoutUserInput = {
    projectId?: StringFieldUpdateOperationsInput | string
    roleId?: StringFieldUpdateOperationsInput | string
  }

  export type UserInProjectUncheckedUpdateManyWithoutUserInput = {
    projectId?: StringFieldUpdateOperationsInput | string
    roleId?: StringFieldUpdateOperationsInput | string
  }

  export type TaskUpdateWithoutSupervisorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    priority?: NullableEnumPriorityLevelFieldUpdateOperationsInput | $Enums.PriorityLevel | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sectionId?: StringFieldUpdateOperationsInput | string
    assignees?: TaskOfUserUpdateManyWithoutTaskNestedInput
    subtasks?: TaskUpdateManyWithoutParentNestedInput
    comments?: CommentUpdateManyWithoutTaskNestedInput
    parent?: TaskUpdateOneWithoutSubtasksNestedInput
    belongsToProject?: ProjectUpdateOneRequiredWithoutTasksNestedInput
  }

  export type TaskUncheckedUpdateWithoutSupervisorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    priority?: NullableEnumPriorityLevelFieldUpdateOperationsInput | $Enums.PriorityLevel | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sectionId?: StringFieldUpdateOperationsInput | string
    parentTaskId?: NullableStringFieldUpdateOperationsInput | string | null
    projectId?: StringFieldUpdateOperationsInput | string
    assignees?: TaskOfUserUncheckedUpdateManyWithoutTaskNestedInput
    subtasks?: TaskUncheckedUpdateManyWithoutParentNestedInput
    comments?: CommentUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateManyWithoutSupervisorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    priority?: NullableEnumPriorityLevelFieldUpdateOperationsInput | $Enums.PriorityLevel | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sectionId?: StringFieldUpdateOperationsInput | string
    parentTaskId?: NullableStringFieldUpdateOperationsInput | string | null
    projectId?: StringFieldUpdateOperationsInput | string
  }

  export type TaskOfUserUpdateWithoutUserInput = {
    task?: TaskUpdateOneRequiredWithoutAssigneesNestedInput
  }

  export type TaskOfUserUncheckedUpdateWithoutUserInput = {
    taskId?: StringFieldUpdateOperationsInput | string
  }

  export type TaskOfUserUncheckedUpdateManyWithoutUserInput = {
    taskId?: StringFieldUpdateOperationsInput | string
  }

  export type CommentUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type CommentUncheckedUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    taskId?: StringFieldUpdateOperationsInput | string
  }

  export type CommentUncheckedUpdateManyWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    taskId?: StringFieldUpdateOperationsInput | string
  }

  export type SectionCreateManyHasInput = {
    id?: string
    name: string
    listOfTask?: string
    createdAt?: Date | string
  }

  export type TaskCreateManyBelongsToProjectInput = {
    id?: string
    title: string
    description?: string | null
    status?: $Enums.TaskStatus
    priority?: $Enums.PriorityLevel | null
    startDate?: Date | string | null
    dueDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sectionId: string
    parentTaskId?: string | null
    supervisorId?: string | null
  }

  export type ProjectInvitationCreateManyToProjectInput = {
    status?: $Enums.InvitationStatus
    createdAt?: Date | string
    invitorId: string
  }

  export type UserInProjectCreateManyProjectInput = {
    userId: string
    roleId: string
  }

  export type RoleCreateManyProjectInput = {
    id?: string
    name: string
    listOfPermission: string
    isDefault?: boolean
  }

  export type SectionUpdateWithoutHasInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    listOfTask?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SectionUncheckedUpdateWithoutHasInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    listOfTask?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SectionUncheckedUpdateManyWithoutHasInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    listOfTask?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskUpdateWithoutBelongsToProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    priority?: NullableEnumPriorityLevelFieldUpdateOperationsInput | $Enums.PriorityLevel | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sectionId?: StringFieldUpdateOperationsInput | string
    assignees?: TaskOfUserUpdateManyWithoutTaskNestedInput
    subtasks?: TaskUpdateManyWithoutParentNestedInput
    comments?: CommentUpdateManyWithoutTaskNestedInput
    parent?: TaskUpdateOneWithoutSubtasksNestedInput
    supervisor?: UserUpdateOneWithoutSupervisedTasksNestedInput
  }

  export type TaskUncheckedUpdateWithoutBelongsToProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    priority?: NullableEnumPriorityLevelFieldUpdateOperationsInput | $Enums.PriorityLevel | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sectionId?: StringFieldUpdateOperationsInput | string
    parentTaskId?: NullableStringFieldUpdateOperationsInput | string | null
    supervisorId?: NullableStringFieldUpdateOperationsInput | string | null
    assignees?: TaskOfUserUncheckedUpdateManyWithoutTaskNestedInput
    subtasks?: TaskUncheckedUpdateManyWithoutParentNestedInput
    comments?: CommentUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateManyWithoutBelongsToProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    priority?: NullableEnumPriorityLevelFieldUpdateOperationsInput | $Enums.PriorityLevel | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sectionId?: StringFieldUpdateOperationsInput | string
    parentTaskId?: NullableStringFieldUpdateOperationsInput | string | null
    supervisorId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProjectInvitationUpdateWithoutToProjectInput = {
    status?: EnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invitor?: UserUpdateOneRequiredWithoutProjectInvitationsNestedInput
  }

  export type ProjectInvitationUncheckedUpdateWithoutToProjectInput = {
    status?: EnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invitorId?: StringFieldUpdateOperationsInput | string
  }

  export type ProjectInvitationUncheckedUpdateManyWithoutToProjectInput = {
    status?: EnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invitorId?: StringFieldUpdateOperationsInput | string
  }

  export type UserInProjectUpdateWithoutProjectInput = {
    user?: UserUpdateOneRequiredWithoutBelongToProjectsNestedInput
    role?: RoleUpdateOneRequiredWithoutUserInProjectsNestedInput
  }

  export type UserInProjectUncheckedUpdateWithoutProjectInput = {
    userId?: StringFieldUpdateOperationsInput | string
    roleId?: StringFieldUpdateOperationsInput | string
  }

  export type UserInProjectUncheckedUpdateManyWithoutProjectInput = {
    userId?: StringFieldUpdateOperationsInput | string
    roleId?: StringFieldUpdateOperationsInput | string
  }

  export type RoleUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    listOfPermission?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    userInProjects?: UserInProjectUpdateManyWithoutRoleNestedInput
  }

  export type RoleUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    listOfPermission?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    userInProjects?: UserInProjectUncheckedUpdateManyWithoutRoleNestedInput
  }

  export type RoleUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    listOfPermission?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TaskOfUserCreateManyTaskInput = {
    userId: string
  }

  export type TaskCreateManyParentInput = {
    id?: string
    title: string
    description?: string | null
    status?: $Enums.TaskStatus
    priority?: $Enums.PriorityLevel | null
    startDate?: Date | string | null
    dueDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sectionId: string
    supervisorId?: string | null
    projectId: string
  }

  export type CommentCreateManyTaskInput = {
    id?: string
    content: string
    mediaUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    authorId: string
  }

  export type TaskOfUserUpdateWithoutTaskInput = {
    user?: UserUpdateOneRequiredWithoutTasksNestedInput
  }

  export type TaskOfUserUncheckedUpdateWithoutTaskInput = {
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type TaskOfUserUncheckedUpdateManyWithoutTaskInput = {
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type TaskUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    priority?: NullableEnumPriorityLevelFieldUpdateOperationsInput | $Enums.PriorityLevel | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sectionId?: StringFieldUpdateOperationsInput | string
    assignees?: TaskOfUserUpdateManyWithoutTaskNestedInput
    subtasks?: TaskUpdateManyWithoutParentNestedInput
    comments?: CommentUpdateManyWithoutTaskNestedInput
    supervisor?: UserUpdateOneWithoutSupervisedTasksNestedInput
    belongsToProject?: ProjectUpdateOneRequiredWithoutTasksNestedInput
  }

  export type TaskUncheckedUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    priority?: NullableEnumPriorityLevelFieldUpdateOperationsInput | $Enums.PriorityLevel | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sectionId?: StringFieldUpdateOperationsInput | string
    supervisorId?: NullableStringFieldUpdateOperationsInput | string | null
    projectId?: StringFieldUpdateOperationsInput | string
    assignees?: TaskOfUserUncheckedUpdateManyWithoutTaskNestedInput
    subtasks?: TaskUncheckedUpdateManyWithoutParentNestedInput
    comments?: CommentUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateManyWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    priority?: NullableEnumPriorityLevelFieldUpdateOperationsInput | $Enums.PriorityLevel | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sectionId?: StringFieldUpdateOperationsInput | string
    supervisorId?: NullableStringFieldUpdateOperationsInput | string | null
    projectId?: StringFieldUpdateOperationsInput | string
  }

  export type CommentUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: UserUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type CommentUncheckedUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorId?: StringFieldUpdateOperationsInput | string
  }

  export type CommentUncheckedUpdateManyWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorId?: StringFieldUpdateOperationsInput | string
  }

  export type UserInProjectCreateManyRoleInput = {
    userId: string
    projectId: string
  }

  export type UserInProjectUpdateWithoutRoleInput = {
    user?: UserUpdateOneRequiredWithoutBelongToProjectsNestedInput
    project?: ProjectUpdateOneRequiredWithoutMembersNestedInput
  }

  export type UserInProjectUncheckedUpdateWithoutRoleInput = {
    userId?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
  }

  export type UserInProjectUncheckedUpdateManyWithoutRoleInput = {
    userId?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}