using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Omi.DatabaseDesign.Migrations
{
    public partial class UpdatePackage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectBlock_Package_PackageId",
                table: "ProjectBlock");

            migrationBuilder.DropIndex(
                name: "IX_ProjectBlock_PackageId",
                table: "ProjectBlock");

            migrationBuilder.AddColumn<bool>(
                name: "IsPerspective",
                table: "Package",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "ProjectBlockId",
                table: "Package",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Package_ProjectBlockId",
                table: "Package",
                column: "ProjectBlockId",
                unique: true,
                filter: "[ProjectBlockId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Package_ProjectBlock_ProjectBlockId",
                table: "Package",
                column: "ProjectBlockId",
                principalTable: "ProjectBlock",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Package_ProjectBlock_ProjectBlockId",
                table: "Package");

            migrationBuilder.DropIndex(
                name: "IX_Package_ProjectBlockId",
                table: "Package");

            migrationBuilder.DropColumn(
                name: "IsPerspective",
                table: "Package");

            migrationBuilder.DropColumn(
                name: "ProjectBlockId",
                table: "Package");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectBlock_PackageId",
                table: "ProjectBlock",
                column: "PackageId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectBlock_Package_PackageId",
                table: "ProjectBlock",
                column: "PackageId",
                principalTable: "Package",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
