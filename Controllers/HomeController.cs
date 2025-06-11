using JqueryWithAjax.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI.WebControls;

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
            try
            {
                // Basic validation for mobile number (can be enhanced with DataAnnotations in model)
                if (createModel.MobileNum <= 0)
                {
                    return Json(new { success = false, message = "Mobile Number cannot be zero or negative." });
                }

                _logic.CreateDetails(createModel);
                return Json(new { success = true, message = "Data inserted successfully" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                // Log the exception (e.g., using a logging framework)
                return Json(new { success = false, message = "Error inserting data: " + ex.Message });
            }
        }

        public JsonResult Update(RegisterModel editModel)
        {
            try
            {
                if (editModel.MobileNum <= 0)
                {
                    return Json(new { success = false, message = "Mobile Number cannot be zero or negative for update." });
                }
                _logic.EditDetails(editModel);
                return Json(new { success = true, message = "Data updated successfully" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                // Log the exception
                return Json(new { success = false, message = "Error updating data: " + ex.Message });
            }
        }

        public JsonResult Delete(int id)
        {
            try
            {
                _logic.DeleteDetails(id);
                return Json(new { success = true, message = "Data deleted successfully" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                // Log the exception
                return Json(new { success = false, message = "Error deleting data: " + ex.Message });
            }
        }
    }
}
