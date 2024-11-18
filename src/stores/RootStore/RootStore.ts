import QueryParamsStore from '../QueryParamsStore';


class RootStore {
  readonly query = new QueryParamsStore();
}

export default RootStore;
