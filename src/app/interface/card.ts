import {HttpData} from "./data"

export interface CardItem {
  card: HttpData;
  quantity: number;
}

type ActionType = 'add' | 'update' | 'delete';

export interface Action<T> {
    item: T;
    action: ActionType;
  }

