export interface Result<T = any> {
  [x: string]: any;
  code: string;
  success: true | false;
  msg: string;
  data?: T;
  pageInfo?: T;
}
