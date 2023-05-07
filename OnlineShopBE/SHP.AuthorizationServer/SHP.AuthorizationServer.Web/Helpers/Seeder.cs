﻿using DAL.Entities;
using SHP.AuthorizationServer.Web.Helpers.Interfaces;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SHP.AuthorizationServer.Web.Helpers
{
    public class Seeder : ISeeder
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<AppRole> _roleManager;

        public Seeder(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task Seed()
        {
            if (!_roleManager.Roles.Any())
            {
                var roles = new List<AppRole>
                {
                    new() { Name = "admin" },
                    new() { Name = "moderator" },
                    new() { Name = "seller" },
                    new() { Name = "buyer" }
                };

                foreach (AppRole role in roles)
                {
                    await _roleManager.CreateAsync(role);
                }
            }

            if (!_userManager.Users.Any())
            {
                var admin = new AppUser { UserName = "admin" };
                var moder = new AppUser { UserName = "moder" };
                var seller = new AppUser { UserName = "seller" };
                var buyer = new AppUser { UserName = "buyer" };

                await _userManager.CreateAsync(admin, "Pa$$w0rd");
                await _userManager.CreateAsync(moder, "Pa$$w0rd");
                await _userManager.CreateAsync(seller, "Pa$$w0rd");
                await _userManager.CreateAsync(buyer, "Pa$$w0rd");

                await _userManager.AddToRoleAsync(admin, "admin");
                await _userManager.AddToRoleAsync(moder, "moderator");
                await _userManager.AddToRoleAsync(seller, "seller");
                await _userManager.AddToRoleAsync(buyer, "buyer");
            }

        }
    }
}
