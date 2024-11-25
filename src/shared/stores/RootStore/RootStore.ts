import BugStore from '../BugStore/BugStore';
import QueryParamsStore from '../QueryParamsStore';
import UserStore from '../UserStore';


class RootStore {
  readonly query = new QueryParamsStore();
  readonly user = new UserStore();
  readonly bug = new BugStore();
}

export default RootStore;
