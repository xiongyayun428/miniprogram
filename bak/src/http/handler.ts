import { RequestOption } from "./request-option";

/**
 * 处理程序
 *
 * @export
 * @interface Handler
 */
export interface Handler {
  /**
   * 交易前置处理
   *
   * @param {RequestOption} option
   * @returns {boolean}
   * @memberof Handler
   */
  preHandler?(option: RequestOption): boolean;
  /**
   * 交易后置处理
   *
   * @param {wx.GeneralCallbackResult} resp
   * @returns {boolean}
   * @memberof Handler
   */
  postHandler?(resp: wx.GeneralCallbackResult): boolean;

  /**
   * 交易成功
   *
   * @param {wx.RequestSuccessCallbackResult} res
   * @returns {boolean}
   * @memberof Handler
   */
  successHandler?(result: wx.RequestSuccessCallbackResult): boolean;
  /**
   * 交易失败
   *
   * @param {wx.GeneralCallbackResult | wx.RequestSuccessCallbackResult | any} res
   * @returns {boolean}
   * @memberof Handler
   */
  failHandler?(res: wx.GeneralCallbackResult | wx.RequestSuccessCallbackResult | any, option?: RequestOption): boolean;
}
