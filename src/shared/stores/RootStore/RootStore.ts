import BagStore from '../BagStore';
import QueryParamsStore from '../QueryParamsStore';
import UserStore from '../UserStore';


class RootStore {
  readonly query = new QueryParamsStore();
  readonly user = new UserStore();
  readonly bag = new BagStore();
}

export default RootStore;
