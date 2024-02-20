import apiClient from "./api-client";

// we add a constraint to tell TS compiler that our type T
// should have a property called id using an interface
interface Entity {
  id: number;
}

// `HttpService` instead of `UserService`
class HttpService {
  endpoint: string;

  // we're supplying the end-point here when we create
  // a new instance of this class
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  // we rename this function, and all other function to make it more generic, for exp getAllUSers => getAll / DeleteUser => Delete ...
  getAll<T>() {
    // we should replace `user` with a generic type parameter
    // ``T`` in this context is called a generic type parameter
    // it is a place holder for a type, when calling this method, we supply a generic type arguments like: getAll<User>
    //
    // whatever we passed when calling getAll methods
    // will be used in here
    const controller = new AbortController();
    const request = apiClient.get<T[]>(this.endpoint, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }

  // we make similair chnages with other methods in this class
  delete(id: number) {
    return apiClient.delete(this.endpoint + "/" + id);
  }

  create<T>(entity: T) {
    // entity instead of user, that's more generic
    // also we should change the type to `T`
    // so we need to add `T` as generic type parameter
    return apiClient.post(this.endpoint, entity);
  }

  // we add a constraint to tell TS compiler that our type T
  // should have a property called id using an interface
  //
  // we extends the `T` generic parameter from Entitiy
  // because Ts compiler doesn't know that our entity, which are intance
  //  of type `T` have a property called id.
  update<T extends Entity>(entity: T) {
    return apiClient.patch(this.endpoint + "/" + entity.id, entity);
  }
}

// we don't wanna create a new instance of this class because we
// have to pass an end point here, we don't wanna hard code an end-point
// otherwise our class won't be reusable, here's what we should do
//
// we should create a function for creating an instance of this class
// here's how:
const create = (endpoint: string) => new HttpService(endpoint);

export default create;

// we do this instead of the old way:
// export default new UserServcie();
