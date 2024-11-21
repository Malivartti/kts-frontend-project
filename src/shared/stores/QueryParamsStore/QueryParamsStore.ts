import { action, computed, entries, get, makeObservable, observable, reaction, remove, set } from 'mobx';
import qs from 'qs';

type PrivateFields = '_params' | '_search';

class QueryParamsStore {
  private _params: qs.ParsedQs = {};
  private _search: string = '';

  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable.deep,
      _search: observable,
      search: computed,
      setSearch: action,
      setParam: action,
    });

    reaction(
      () => entries(this._params),
      () => {
        this._search = qs.stringify(this._params);
      });
  }

  get search(): string {
    return this._search;
  }

  getParam(
    key: string
  ): undefined | string | string[] | qs.ParsedQs | qs.ParsedQs[] {
    return get(this._params, key);
  }

  setParam(key: string, value: string): void {
    if (!value) {
      remove(this._params, key);
    } else {
      set(this._params, { [key]: value });
    }
  }

  setSearch(search: string) {
    search = search.startsWith('?') ? search.slice(1) : search;
    if (this._search !== search) {
      this._search = search;
      this._params = qs.parse(search);
      // console.log(qs.stringify('init', this._params))
    }
  }
}

export default QueryParamsStore;
