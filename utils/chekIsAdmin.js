//ДОРОБИТИ      мідлвейр - ф-ція посередник

import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const isManager = req.headers.isManager;
  console.log('isManager: ', isManager);
  if (isManager) {
    try {
      next();
    } catch (err) {
      return res.status(403).json({
        message: 'No access!',
      });
    }
  } else {
    return res.status(403).json({
      message: 'No access!',
    });
  }
};
