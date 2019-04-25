import { Handler } from "./handler";
import { RequestOption } from "./request-option";

export const Method: string = 'OPTIONS' || 'GET' || 'HEAD' || 'POST' || 'PUT' || 'DELETE' || 'TRACE' || 'CONNECT';

/**
 * HTTP网络请求
 *
 * @export
 * @class Http
 */
export class Http {
  private _handlers: Array<Handler> = new Array<Handler>();

  public get handlers(): Array<Handler> {
    return this._handlers;
  }
  public set handlers(value: Array<Handler>) {
    this._handlers = value;
  }

  public set handler(value: Handler) {
    this._handlers.push(value)
  }

  put(url: string, body: string | object | ArrayBuffer, option?: RequestOption): Promise<any> {
    return this.request(url, body, 'PUT', option);
  }

  delete(url: string, body: string | object | ArrayBuffer, option?: RequestOption): Promise<any> {
    return this.request(url, body, 'DELETE', option);
  }

  post(url: string, body: string | object | ArrayBuffer, option?: RequestOption): Promise<any> {
    return this.request(url, body, 'POST', option);
  }

  get(url: string, body: string | object | ArrayBuffer, option?: RequestOption): Promise<any> {
    return this.request(url, body, 'GET', option);
  }

  request(url: string, body: string | object | ArrayBuffer, method: any, option?: RequestOption): Promise<any> {
    if (!option) {
      option = {};
    }
    if (this.handlers != null && this.handlers.length > 0) {
      for (const handler of this.handlers) {
        if (handler.preHandler && !handler.preHandler(option)) {
          break
        }
      }
    }
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        data: body,
        header: option ? option.header : {},
        method: method,
        success: ((res: any) => {
          const data: any = res.data;
          if (res.statusCode === 200 && data.rtnCode === '000000') {
            //200: 服务端业务处理正常结束
            this.successHandler(data.rtnData)
            resolve(data.rtnData)
          } else {
            this.failHandler(data, option)
            reject(data)
          }
        }),
        fail: ((res: wx.GeneralCallbackResult) => {
          this.failHandler(res, option)
          reject(res)
        }),
        complete: (res: wx.GeneralCallbackResult) => {
          if (this.handlers != null && this.handlers.length > 0) {
            for (const handler of this.handlers) {
              if (handler.postHandler && !handler.postHandler(res)) {
                break
              }
            }
          }
        }
      })
    })
  }

  /**
   * 交易成功处理
   *
   * @private
   * @param {*} resp
   * @memberof Http
   */
  private successHandler(resp: any) {
    if (this.handlers != null && this.handlers.length > 0) {
      for (const handler of this.handlers) {
        if (handler.successHandler && !handler.successHandler(resp)) {
          break
        }
      }
    }
  }

  /**
   * 异常处理
   *
   * @private
   * @param {*} res
   * @memberof Http
   */
  private failHandler(res: any, option?: RequestOption) {
    if (this.handlers != null && this.handlers.length > 0) {
      for (const handler of this.handlers) {
        if (handler.failHandler && !handler.failHandler(res, option)) {
          break
        }
      }
    }
  }
}
