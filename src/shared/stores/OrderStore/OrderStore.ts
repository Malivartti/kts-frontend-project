import { Meta } from '@entities/Meta';
import { action, computed, makeObservable, observable, reaction } from 'mobx';

import rootStore from '../RootStore';
import DeliveryStepModel from './models/DeliveryStepModel';
import OrderStepModel from './models/OrderStepModel';
import PaymentStepModel from './models/PaymentStepModel';

enum orderPage {
  order = 'order',
  delivery = 'delizery',
  payment = 'payment',
  congratulation = 'congratulation',
}

type PrivateField = '_page' | '_progress' | '_meta' | '_message';

class OrderStore {
  private _page: orderPage = orderPage.order;
  private _progress: number = 0;
  private _meta: Meta = Meta.initial;
  private _message: string = '';
  readonly orderStepModel = new OrderStepModel(this);
  readonly deliveryStepModel = new DeliveryStepModel(this);
  readonly paymentStepModel = new PaymentStepModel(this);

  constructor() {
    makeObservable<OrderStore, PrivateField>(this, {
      _page: observable,
      _progress: observable,
      _meta: observable,
      _message: observable,
      message: computed,
      progress: computed,
      isOrderStep: computed,
      isDeliveryStep: computed,
      isPaymentStep: computed,
      isCongratulationStep: computed,
      isLoading: computed,
      isError: computed,
      isSuccess: computed,
      setMessage: action,
      setMeta: action,
      nextStep: action,
      prevStep: action,
    });

    reaction(
      () => this.isDeliveryStep,
      isDelivery => {
        if (isDelivery && rootStore.user.user !== null && !this.deliveryStepModel.name && !this.deliveryStepModel.email) {
          this.deliveryStepModel.setName(rootStore.user.user.name);
          this.deliveryStepModel.setEmail(rootStore.user.user.email);
        }
      }
    );
  }

  get message(): string {
    return this._message;
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

  setMessage(message: string): void {
    this._message = message;
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
      rootStore.bag.setBag([]);
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
