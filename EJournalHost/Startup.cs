using EJournal.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore.Sqlite;

using EJournal.Data.EfContext;
using EJournal.Data.Entities.AppUeser;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.OpenApi.Models;
using System.Collections.Generic;
using System.Reflection;
using System.IO;
using EJournal.Data.Interfaces;
using EJournal.Data.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace EJournalHost
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
            services.AddScoped<IJwtTokenService, JwtTokenService>();
            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("gachi-muchi-secret-key"));     
            services.AddDbContext<EfDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("EJornalDataBase")));

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "EJournal API",
                    Description = "A project  ASP.NET Core Web API",
                    TermsOfService = new Uri("https://example.com/terms"),
                    Contact = new OpenApiContact
                    {
                        Name = "Team EJournal",
                        Email = string.Empty,
                    },

                });
                c.AddSecurityDefinition("Bearer",
                    new OpenApiSecurityScheme
                    {
                        Description = "JWT Authorization header using the Bearer scheme.",
                        Type = SecuritySchemeType.Http,
                        Scheme = "bearer"
                    });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement{
                    {
                        new OpenApiSecurityScheme{
                            Reference = new OpenApiReference{
                                Id = "Bearer",
                                Type = ReferenceType.SecurityScheme
                            }
                        },new List<string>()
                    }
                });
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                if (File.Exists(xmlPath))
                {
                    c.IncludeXmlComments(xmlPath);
                }
            });

            services.AddIdentity<DbUser, DbRole>(options =>
                options.Stores.MaxLengthForKeys = 128)
                .AddEntityFrameworkStores<EfDbContext>()
                .AddDefaultTokenProviders();

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(cfg =>
            {
                cfg.RequireHttpsMetadata = false;
                cfg.SaveToken = true;
                cfg.TokenValidationParameters = new TokenValidationParameters()
                {
                    IssuerSigningKey = signingKey,
                    ValidateAudience = false,
                    ValidateIssuer = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    // set ClockSkew is zero
                    ClockSkew = TimeSpan.Zero
                };
            });
            services.AddTransient<IStudents, StudentRepository>();
            services.AddTransient<ITeachers, TeacherRepository>();
            services.AddTransient<IMarks, MarkRepository>();
            services.AddTransient<ILessons, LessonRepository>();
            services.AddTransient<ISpecialities, SpecialityRepository>();
            services.AddTransient<IGroups, GroupRepository>();
            services.AddTransient<INews, NewsRepository>();
            services.AddTransient<IHttpContextAccessor, HttpContextAccessor>();
            services.AddSession();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            ///app.UseSwagger();
            //app.UseSwaggerUI(c =>
            //{
            //    c.SwaggerEndpoint("v1/swagger.json", "My API V1");
            //});

            app.UseCors(
               builder => builder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            //app.UseSpaStaticFiles();
            app.UseSession();
            #region  InitStaticFiles Images
            string pathRoot = InitStaticFiles
                .CreateFolderServer(env, this.Configuration,
                    new string[] { "ImagesPath" });
            app.UseStaticFiles(new StaticFileOptions()
            {
                FileProvider = new PhysicalFileProvider(pathRoot),
                RequestPath = new PathString('/' + Configuration.GetValue<string>("UrlImages"))
            });
            #endregion

            #region  InitStaticFiles UserImages
            string pathuser = InitStaticFiles
                .CreateFolderServer(env, this.Configuration,
                new string[] { "ImagesPath", "ImagesUserPath" });

            app.UseStaticFiles(new StaticFileOptions()
            {
                FileProvider = new PhysicalFileProvider(pathuser),
                RequestPath = new PathString('/' + Configuration.GetValue<string>("UserUrlImages"))

            });
            #endregion
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });

            //await Seed.SeedData(app.ApplicationServices, env, this.Configuration);
        }
    }
}
