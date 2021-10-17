using System;
using System.Collections.Generic;
using System.Text;

namespace CardGame.BLL.Models
{
    public abstract class BaseEntity
    {
        public int Id { get;  set; }
        public string CreatedBy { get;  set; }
        public DateTime CreatedAt { get;  set; }
        public string LastModifiedBy { get;  set; }
        public DateTime LastModifiedAt { get;  set; }
        public bool isDeleted { get;  set; }

        public void Delete() => isDeleted = true;

        public void AddAuditDataOnCreation(string createdBy, DateTime createdAt)
        {
            CreatedAt = createdAt;
            CreatedBy = createdBy;
        }

        public void AddAuditDataOnEdit(string lastModifiedBy, DateTime lastModifiedAt)
        {
            LastModifiedAt = lastModifiedAt;
            LastModifiedBy = lastModifiedBy;
        }

    }
}
