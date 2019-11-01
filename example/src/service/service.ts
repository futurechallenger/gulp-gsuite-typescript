import { Utils } from "../util";

class SomeService {
  private _name: string;
  constructor(name: string) {
    this._name = name;
  }

  hi(): string {
    return Utils.composeName("Hi", this._name);
  }
}

export { SomeService };
