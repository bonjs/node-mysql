'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/test', controller.home.test);
  
  router.post('/sun', controller.home.sun);
  
  router.post('/sendRequest', controller.home.sendRequest);
  router.post('/menuList', controller.home.menuList);
  
  
  router.get('/auth', controller.home.auth);
  
};
