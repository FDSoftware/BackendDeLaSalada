/*
 * Combine multiple middleware together.
 *
 * @param {Function[]} mids functions of form:
 *   function(req, res, next) { ... }
 * @return {Function} single combined middleware
 */
export function combineMiddleware(mids: any[]) {
  return mids.reduce(function (a, b) {
    return function (req: any, res: any, next: (arg0: any) => any) {
      a(req, res, function (err: any) {
        if (err) {
          return next(err);
        }
        b(req, res, next);
      });
    };
  });
}
