import { Handler } from './handler';
import { RequestOption } from './request-option';

/**
 * 异常处理
 *
 * @export
 * @class ErrorHandler
 * @implements {Handler}
 */
export class ErrorHandler implements Handler {
  failHandler(res: wx.GeneralCallbackResult | wx.RequestSuccessCallbackResult | any, option?: RequestOption): boolean {
    let errMsg = res.errMsg
    if(res.data) {
      errMsg = res.data.rtnMsg
    }
    if (option && option.errorShowToast) {
      wx.showToast({
        title: errMsg,
        icon: 'none',
        duration: 3000
      })
    }
    return true;
  }

}
