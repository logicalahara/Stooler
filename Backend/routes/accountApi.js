import express from 'express';
import AccountController from '../app/Controllers/AccountController';

const AccountApiRouter = express.Router();

AccountApiRouter.post('/account/signup', (request, response) => {
  const accountController = new AccountController(response);
  accountController.addAccount(request);
});

AccountApiRouter.get('/account/login/', (request, response) => {
  const accountController = new AccountController(response);
  accountController.loginAccount(request);
});
export default AccountApiRouter;
