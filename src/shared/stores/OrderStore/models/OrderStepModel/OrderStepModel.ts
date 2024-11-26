import { BugProductModel } from '@entities/BugProduct';
import { Meta } from '@entities/Meta';
import { endpoints } from '@shared/configs/api';
import rootStore from '@shared/stores/RootStore';
import axios from 'axios';
import { action, computed, makeObservable, observable, runInAction, toJS } from 'mobx';

import OrderStore from '../../OrderStore';

type PrivateField = '_order' | '_unavailableProducts';

class OrderStepModel {
  private _orderStore: OrderStore;
  private _order: BugProductModel[] = [];
  private _unavailableProducts: BugProductModel[] = [];

  constructor(orderStore: OrderStore) {
    this._orderStore = orderStore;

    makeObservable<OrderStepModel, PrivateField>(this, {
      _order: observable,
      _unavailableProducts: observable,
      order: computed,
      unavailableProducts: computed,
      orderSum: computed,
      checkStep: action,
    });
  }

  get order(): BugProductModel[] {
    return this._order;
  }

  get unavailableProducts(): BugProductModel[] {
    return this._unavailableProducts;
  }

  get orderSum(): number {
    return this._order.reduce((acc, cur) => acc + (cur.price * cur.count), 0);
  }

  checkStep(): void {
    this._orderStore.setMeta(Meta.loading);
    this._orderStore.setError('');
    this._unavailableProducts = [];
    this._order = [];

    const promises = toJS(rootStore.bug.bug).map(async (product) => {
      const url = endpoints.product.getProduct(product.id);
      try {
        await axios({
          method: 'get',
          url,
        });
        return {
          ...product,
          isOk: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ...product,
          isOk: false,
        };
      }
    });

    Promise.allSettled(promises)
      .then((res) => {
        const unavailableProducts: BugProductModel[] = [];

        res.forEach(item => {
          if (item.status === 'fulfilled' && !item.value.isOk) {
            delete item.value.isOk;
            unavailableProducts.push(item.value);
          }
        });

        if (unavailableProducts.length) {
          runInAction(() => {
            this._unavailableProducts = unavailableProducts;
            this._orderStore.setError('Некоторые продукты не доступны');
            this._orderStore.setMeta(Meta.error);

          });
        } else {
          runInAction(() => {
            this._order = rootStore.bug.bug;
            this._orderStore.setMeta(Meta.success);
          });
          this._orderStore.nextStep();
        }
      });
  }

}

export default OrderStepModel;
