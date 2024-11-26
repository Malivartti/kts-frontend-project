import { Meta } from '@entities/Meta';
import { action, computed, makeObservable, observable } from 'mobx';

import DeliveryStepModel from './models/DeliveryStepModel';
import OrderStepModel from './models/OrderStepModel';
import PaymentStepModel from './models/PaymentStepModel';
import rootStore from '../RootStore';

enum orderPage {
  order = 'order',
  delivery = 'delizery',
  payment = 'payment',
  congratulation = 'congratulation',
}

type PrivateField = '_page' | '_progress' | '_meta' | '_error';

class OrderStore {
  private _page: orderPage = orderPage.order;
  private _progress: number = 0;
  private _meta: Meta = Meta.initial;
  private _error: string = '';
  readonly orderStepModel = new OrderStepModel(this);
  readonly deliveryStepModel = new DeliveryStepModel(this);
  readonly paymentStepModel = new PaymentStepModel(this);

  constructor() {
    makeObservable<OrderStore, PrivateField>(this, {
      _page: observable,
      _progress: observable,
      _meta: observable,
      _error: observable,
      error: computed,
      progress: computed,
      isOrderStep: computed,
      isDeliveryStep: computed,
      isPaymentStep: computed,
      isCongratulationStep: computed,
      isLoading: computed,
      isError: computed,
      isSuccess: computed,
      setError: action,
      setMeta: action,
      nextStep: action,
      prevStep: action,
    });
  }

  get error(): string {
    return this._error;
  }

  get progress(): number {
    return this._progress;
  }

  get isOrderStep(): boolean {
    return this._page === orderPage.order;
  }

  get isDeliveryStep(): boolean {
    return this._page === orderPage.delivery;
  }

  get isPaymentStep(): boolean {
    return this._page === orderPage.payment;
  }

  get isCongratulationStep(): boolean {
    return this._page === orderPage.congratulation;
  }

  get isLoading(): boolean {
    return this._meta === Meta.loading;
  }

  get isError(): boolean {
    return this._meta === Meta.error;
  }

  get isSuccess(): boolean {
    return this._meta === Meta.success;
  }

  setError(error: string): void {
    this._error = error;
  }

  setMeta(meta: Meta): void {
    this._meta = meta;
  }

  nextStep(): void {
    switch (this._page) {
    case orderPage.order:
      this._page = orderPage.delivery;
      this._progress = 33;
      break;
    case orderPage.delivery:
      this._page = orderPage.payment;
      this._progress = 66;
      break;
    case orderPage.payment:
      this._page = orderPage.congratulation;
      this._progress = 100;
      rootStore.bug.setBug([]);
      break;
    }
  }

  prevStep(): void {
    switch (this._page) {
    case orderPage.payment:
      this._page = orderPage.delivery;
      this._progress = 33;
      break;
    case orderPage.delivery:
      this._page = orderPage.order;
      this._progress = 0;
      break;
    }
  }
}

export default OrderStore;
