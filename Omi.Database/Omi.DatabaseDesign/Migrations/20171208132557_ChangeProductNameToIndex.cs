using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Omi.DatabaseDesign.Migrations
{
    public partial class ChangeProductNameToIndex : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropUniqueConstraint(
                name: "AK_ProductEntity_Name",
                table: "ProductEntity");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "ProductEntity",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.CreateIndex(
                name: "IX_ProductEntity_Name",
                table: "ProductEntity",
                column: "Name");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ProductEntity_Name",
                table: "ProductEntity");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "ProductEntity",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddUniqueConstraint(
                name: "AK_ProductEntity_Name",
                table: "ProductEntity",
                column: "Name");
        }
    }
}
