using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Omi.DatabaseDesign.Migrations
{
    public partial class AddCodeDimesionDescriptionToProduct : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Code",
                table: "ProductEntity",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Dimension",
                table: "ProductEntity",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "ProductDetail",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Code",
                table: "ProductEntity");

            migrationBuilder.DropColumn(
                name: "Dimension",
                table: "ProductEntity");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "ProductDetail");
        }
    }
}
