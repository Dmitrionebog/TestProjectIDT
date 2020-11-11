using Dapper;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Data.SqlClient;

namespace ReactDemo.Models
{
    public class StorageRepository : IStorageRepository
    {
        string connectionString = null;
        public StorageRepository(string conn)
        {
            connectionString = conn;
        }
        public List<DatabaseOutputModel> GetRecords()
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                return db.Query<DatabaseOutputModel>("Select * from " +
                    "(Select Top 1 * from Records " +
                    "where Type = 'actors' " +
                    "ORDER BY NEWID() )as x " +
                    "Union All " +
                    "Select * from " +
                    "(Select Top 1 * from Records " +
                    "where Type = 'actions' " +
                    "ORDER BY NEWID() )as x " +
                    "Union All " +
                    "Select * from " +
                    "(Select Top 1 * from Records " +
                    "where Type = 'additions' " +
                    "ORDER BY NEWID() )as x").ToList();
            }
        }

    }
}
