'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  // 教师用户的管理
  router.get("/teacher", controller.teacher.getAllTeacher);
  router.get("/addTeacher",controller.teacher.addTeacher);
  router.get("/deleteTeacher",controller.teacher.deleteTeacher);

  // 咨询管理
  router.get("/consult",controller.consult.getConsultInfor);

  // wiki管理
  router.get("/blog", controller.blog.getBlogInfor);
};
