﻿using System.Collections.Generic;

namespace DAL.Entities
{
    public class Category
    {
        public Category()
        {
            
        }

        public Category(string name)
        {
            Name = name;
        }
        
        public int Id { get; set; }

        public string Name { get; set; }

        public ICollection<ProductCategory> ProductCategories { get; set; }
    }
}