using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Omi.DatabaseDesign.Migrations
{
    public partial class RemoveStatusFromBaseEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "TaxonomyType");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "TaxonomyEntity");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "SettingEntity");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Project");

            migrationBuilder.DropColumn(
                name: "Brand",
                table: "ProductEntity");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Package");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "FileEntity");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "EntityType");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "TaxonomyType",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "TaxonomyEntity",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "SettingEntity",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Project",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Brand",
                table: "ProductEntity",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Package",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "FileEntity",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "EntityType",
                nullable: false,
                defaultValue: 0);
        }
    }
}
