import { observable, computed } from 'mobx';

class Account {
  @observable accountInfo = [];
  @computed set accountInfo(result) {

  }
}

export default new Account();
