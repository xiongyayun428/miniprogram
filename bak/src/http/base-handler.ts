import { Handler } from "./handler";
import { RequestOption } from "./request-option";

/**
 * 基础处理
 *
 * @export
 * @class BaseHandler
 * @implements {Handler}
 */
export class BaseHandler implements Handler {
  preHandler(option: RequestOption): boolean {
    const header: any = option.header = {};
    header['content-type'] = 'application/json'
    header.appId = 'wxe967bd43b2e3b7e2'
    header.errorShowToast = true
    const openid = wx.getStorageSync('openid');
    if (openid) {
      header.openid = openid
    }
    return true;
  }
}
