import QueryParamsStore from '../QueryParamsStore';
import UserStore from '../UserStore';


class RootStore {
  readonly query = new QueryParamsStore();
  readonly user = new UserStore();
}

export default RootStore;
