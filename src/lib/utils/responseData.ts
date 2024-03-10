import { Request, Response } from 'express';

interface IFResponseData {
  req: Request;
  res: Response;
  data?: any;
  error?: Error | any;
  status?: number;
  paginate?: boolean;
}

export const responseData = ({ req, res, data, error, status, paginate }: IFResponseData) => {
  const page: any = req.query.page;
  const limit: any = req.query.limit;
  const method = req.method;

  if (page && limit && Array.isArray(data) && paginate) {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    return res.status(status || 200).json({
      success: true,
      message: messageHandler(method),
      data: data.slice(startIndex, endIndex),
      meta: {
        total: data.length,
        page: page,
        limit: limit,
      },
    });
  } else if (data) {
    return res.status(status || 200).json({
      success: true,
      message: messageHandler(method),
      data: data,
      meta: {
        total: Array.isArray(data) ? data.length : 1,
        page: page,
        limit: limit,
      },
    });
  } else if (error) {
    console.log(error);
    return res.status(status || 401).json({
      success: false,
      message: error.message,
      data: null,
    });
  } else {
    return res.status(status || 401).json({
      success: false,
      message: 'No data',
      data: null,
    });
  }
};

export const messageHandler = (method: any) => {
  switch (method.toLowerCase()) {
    case 'get':
      return 'Successfully get';
      break;
    case 'post':
      return 'Created successfully';
      break;
    case 'put':
    case 'patch':
      return 'Updated successfully';
      break;
    case 'delete':
      return 'Deleted successfully';
      break;

    default:
      return 'Operations successful';
  }
};
