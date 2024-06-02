import { RoleCode } from '../database/model/Role';
import { RoleRequest } from '../types/app-request.d';
import { Response, NextFunction } from 'express';

export default (roleCode: RoleCode) => (req: RoleRequest, res: Response, next: NextFunction) => {
  req.currentRoleCode = roleCode;
  next();
};