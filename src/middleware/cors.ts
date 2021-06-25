import type { NextApiRequest, NextApiResponse } from "next";

export const NextCors = (
  req: NextApiRequest,
  res: NextApiResponse,
  fn: any
) => {
  return new Promise((resolve: any, reject: any) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
};
