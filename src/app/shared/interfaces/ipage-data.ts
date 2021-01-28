import { IPage } from './ipage'

export interface IPageData<T> {
    data: Array<T>;
    page: IPage;
}
