using JqueryWithAjax.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace JqueryWithAjax.Controllers
{
    public class HomeController : Controller
    {
        Logic _logic = new Logic();
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult List()
        {
            return Json(_logic.GetAllDetails(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Details(int id)
        {
            var details = _logic.GetAllDetails().Find(del => del.MobileNum == id);
            return Json(details, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Create(RegisterModel createModel)
        {
            _logic.CreateDetails(createModel);
            return Json(new { success = true, message = "Data inserted successfully" }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(RegisterModel editModel)
        {
            _logic.EditDetails(editModel);
            return Json(new { success = true, message = "Data updated successfully" }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(int id)
        {
            _logic.DeleteDetails(id);
            return Json(new { success = true, message = "Data deleted successfully" }, JsonRequestBehavior.AllowGet);
        }



    }
}