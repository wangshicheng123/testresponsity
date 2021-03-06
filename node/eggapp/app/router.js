'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  // 教师用户的管理
  router.get("/teacher", controller.teacher.getAllTeacher); // 获取所有教师信息
  router.post("/teacher/add",controller.teacher.addTeacher);  // 添加教师
  router.get("/teacher/delete",controller.teacher.deleteTeacher);  // 删除教师

  // 咨询管理
  router.get("/consult",controller.consult.getConsultInfor);  // 获取用户咨询信息

  // wiki管理
  router.get("/blog", controller.blog.getBlogInfor);   // 获取文章信息
  router.get("/blog/delete",controller.blog.deleteBlog);  // 删除文章
  router.get("/blog/category",controller.blog.blogCategory);  // 根据分类进行获取文章
  router.get("/blog/tag",controller.blog.blogTag);   // 根据标签进行获取文章
  router.get("/blog/comment",controller.blog.blogComment);  // 根据文章id获取对应的用户评论
  router.get("/blog/delcomment",controller.blog.deleteComment);  // 根据评论id删除文章下的对应的评论

  // 待补充，暂无token                                         // 根据token 获取用户的个人信息
  // 注意在qingmeng 数据库中存在一张user表，唯一标识用户的是token字段
  // 在exercise数据库中也是一样，因此在用户注册登陆的时候需要一起把相应的用户数据进行插入到数据库

  //课程管理
  router.get("/course",controller.course.getCourseInfor);   // 获取所有的课程列表
  router.post("/course/add",controller.course.addCourse);    // 添加课程
  router.get("/course/delete",controller.course.deleteCourse);  // 删除课程
  router.get("/course/precourse",controller.course.preCourse);   // 获取课程的前置课程
  router.get("/course/category", controller.course.courseCategory);   // 根据分类id获取相应的课程
  router.get("/course/comment",controller.course.courseComment);    // 根据课程id获取对应的评论
  router.get("/course/delecomment",controller.course.deleteCourseComment);  // 根据课程的评论id删除对应的评论
  router.post("/course/update",controller.course.courseUpdate);      // 对于课程的更新添加描述

  // 题库管理
  router.post("/exercises",controller.exercises.insertExercisesInfor);   // 插入对应课程的基本信息
  router.post("/exercises/multiple",controller.exercises.addMultiple);   // 插入对应套题的多选题信息
  router.post("/exercises/single",controller.exercises.addSingle);       // 插入套题对应的单选题信息
  router.post("/exercises/program",controller.exercises.addPromgram);    // 插入套题对应的编程题信息

};
