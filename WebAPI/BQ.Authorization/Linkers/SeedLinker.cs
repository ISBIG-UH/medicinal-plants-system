using System.Security.Claims;
using System.Text.RegularExpressions;
using AutoMapper;
using BQ.Authorization.DTO;
using BQ.Authorization.Enum;
using BQ.Authorization.Model;
using BQ.Authorization.Services.Interfaces;
using BQ.Core.Data;
using BQ.Core.Linkers;
using CQ.Core;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace BQ.Authorization.Linkers;

public class SeedLinker : ISeedLinker
{

    private IServiceScope _serviceScope;
    private IDbContext _context;
    private RoleManager<Role> _roleManager;
    private UserManager<User> _userManager;
    private IMapper _mapper;



    public async Task SeedInitialData(IServiceScope serviceScope)
    {
        _serviceScope = serviceScope;

        _context = serviceScope.ServiceProvider.GetService<IDbContext>();
        _roleManager = _serviceScope.ServiceProvider.GetService<RoleManager<Role>>();
        _userManager = _serviceScope.ServiceProvider.GetService<UserManager<User>>();
        _mapper = _serviceScope.ServiceProvider.GetService<IMapper>();


        await SeedInitialRoles();
        await SeedInitialCompanies();
        await SeedInitialUsers();


    }

    private async Task SeedInitialRoles()
    {
        foreach (var roleName in Roles.AllRoles)
        {
            var role = await _roleManager.FindByNameAsync(roleName);
            if (role is null)
            {
                role = new Role(roleName) { Id = Guid.NewGuid().ToString() };
                await _roleManager.CreateAsync(role);
            }
        }
    }

    private async Task SeedInitialCompanies()
    {
        if (!_context.Set<Company>().Any())
        {
            _context.Set<Company>().AddRange(new List<Company> { new Company { Name = "SuperCompany", Description = "A Super Company"} });
            await _context.SaveChangesAsync();
        }
    }

    private async Task SeedInitialUsers()
    {
        
        var sysAdmin = new UserDTO
        {
            Email = "systemadmin@bbconsult.co.uk",
            Password = "cover918Surface!",
            FirstName = "System",
            LastName = "Admin",
            PhoneNumber = "123123"
        };

        await CreateInitialUser(sysAdmin, new[] { Roles.SystemAdminRole });
    }





    private async Task CreateInitialUser(UserDTO initialUser, string[] roles)
    {

        // If user is just created then we add his roles/permissions, otherwise we don't change existing values
        var exists = true;
       
        var user = await _userManager.FindByNameAsync(initialUser.Email);
        
        if (user is null)
        {
            user = _mapper.Map<User>(initialUser);
            user.UserName = initialUser.Email;
            user.EmailConfirmed = true;
            user.AccountStatus = AccountStatus.Active;
            user.AuthSecurityStamp = "";
            
            var result = await _userManager.CreateAsync(user, initialUser.Password);
            exists = result.Succeeded;
        }

        if (exists)
        {
            foreach (var role in roles)
            {
                await _userManager.AddToRoleAsync(user, role);
            }
        }

        await _context.SaveChangesAsync();
    }



}