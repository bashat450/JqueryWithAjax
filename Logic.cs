using JqueryWithAjax.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace JqueryWithAjax
{
    public class Logic
    {
        SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["jquerydb"].ToString());
        #region === Display All Details ===
        public List<RegisterModel> GetAllDetails()
        {
            List<RegisterModel> allDetails = new List<RegisterModel>();
            try
            {
                con.Open();

                SqlCommand cmd = new SqlCommand("SP_ManageRegister", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Action", "GET");
                cmd.Parameters.AddWithValue("@MobileNum", DBNull.Value);

                SqlDataAdapter adapter = new SqlDataAdapter(cmd);
                DataTable table = new DataTable();
                adapter.Fill(table);

                foreach (DataRow row in table.Rows)
                {
                    RegisterModel model = new RegisterModel()
                    {
                        MobileNum = Convert.ToInt32(row["MobileNum"]),
                        EmailId = Convert.ToString(row["EmailId"]),
                        Name = Convert.ToString(row["Name"])
                    };
                    allDetails.Add(model);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            finally
            {
                con.Close();
            }
            return allDetails;
        }
        #endregion
        #region === Insert Details===
        public void CreateDetails(RegisterModel createModel)
        {
            try
            {
                con.Open();

                SqlCommand cmd = new SqlCommand("SP_ManageRegister", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Action", "INSERT");
                cmd.Parameters.AddWithValue("@MobileNum", createModel.MobileNum);
                cmd.Parameters.AddWithValue("@EmailId", createModel.EmailId);
                cmd.Parameters.AddWithValue("@Name", createModel.Name);

                cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            finally
            {
                con.Close();
            }
        }
        #endregion
        #region === Edit Details ===
        public void EditDetails(RegisterModel editModel)
        {
            try
            {
                con.Open();

                SqlCommand cmd = new SqlCommand("SP_ManageRegister", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Action", "UPDATE");
                cmd.Parameters.AddWithValue("@MobileNum", editModel.MobileNum);
                cmd.Parameters.AddWithValue("@EmailId", editModel.EmailId);
                cmd.Parameters.AddWithValue("@Name", editModel.Name);

                cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error in rows..." + ex.Message);
            }
            finally
            {
                con.Close();
            }
        }
        #endregion
        #region === Delete Details ===
        public void DeleteDetails(int id)
        {
            try
            {
                con.Open();

                SqlCommand cmd = new SqlCommand("SP_ManageRegister", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Action", "DELETE");
                cmd.Parameters.AddWithValue("@MobileNum", id);

                cmd.ExecuteNonQuery();
                con.Close();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            finally
            {
                con.Close();
            }
        }
        #endregion
    }
}
