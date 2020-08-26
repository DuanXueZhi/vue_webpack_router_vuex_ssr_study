/**
 *  * Created by dxz on 2020/8/26-11:09.
 * explain：
 */
export const createError = (code, msg) => {
  const err = new Error(msg)
  err.code = code
  return err
}
