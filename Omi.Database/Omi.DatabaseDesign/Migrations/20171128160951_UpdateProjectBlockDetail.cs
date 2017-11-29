using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Omi.DatabaseDesign.Migrations
{
    public partial class UpdateProjectBlockDetail : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Area",
                table: "ProjectBlockDetail",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "BedRoomCount",
                table: "ProjectBlockDetail",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ToiletCount",
                table: "ProjectBlockDetail",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TotalRoomOfLayout",
                table: "ProjectBlockDetail",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Area",
                table: "ProjectBlockDetail");

            migrationBuilder.DropColumn(
                name: "BedRoomCount",
                table: "ProjectBlockDetail");

            migrationBuilder.DropColumn(
                name: "ToiletCount",
                table: "ProjectBlockDetail");

            migrationBuilder.DropColumn(
                name: "TotalRoomOfLayout",
                table: "ProjectBlockDetail");
        }
    }
}
