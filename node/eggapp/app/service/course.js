const Service = require('egg').Service;
 
class CourseService extends Service {
  async getCourseInfor() {
    const client1=this.app.mysql.get("db2");

    const result = client1.select('t_comment');
    return result;
  }

  async addCourse(){
    const client1=this.app.mysql.get("db2");
    const res= client1.insert("t_course",{title: "课程三", cate_id: 3, tea_id: 3});
    return res;
  }

  async deleteCourse(){
    const client1=this.app.mysql.get("db2");
    const res= client1.delete("t_course",{course_id: "2"});
    return res;
  }

  async preCourse(){
    const client1 =this.app.mysql.get("db2");
    const res=client1.query(`SELECT * from t_course where course_id in 
    (SELECT pre_course_id from t_course ,t_pre_course 
      WHERE t_course.course_id=t_pre_course.course_id and t_course.course_id=1
      )`);

    return res;
  }

  async courseCategory(){
    const client1 =this.app.mysql.get("db2");
    var res = client1.select("t_course",{cate_id: 1});
    return res;
  }

  async deleteCourseComment(){
    const client1=this.app.mysql.get("db2");
    const res= client1.delete("t_course_comment",{comm_id: 1});
    return res;
  }

  async courseUpdate(){
    const client1=this.app.mysql.get("db2");
    const res= client1.insert("t_course_update",{content: "asdfghjsryhrt43gertg",course_id: 1});
    return res;
  }
}
 
module.exports = CourseService;