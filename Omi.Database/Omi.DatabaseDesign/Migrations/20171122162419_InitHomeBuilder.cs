using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Omi.DatabaseDesign.Migrations
{
    public partial class InitHomeBuilder : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Package",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreateByUserId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeleteByUserId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    DeleteDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastUpdateByUserId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    LastUpdateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Package", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Package_AspNetUsers_CreateByUserId",
                        column: x => x.CreateByUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Package_AspNetUsers_DeleteByUserId",
                        column: x => x.DeleteByUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Package_AspNetUsers_LastUpdateByUserId",
                        column: x => x.LastUpdateByUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Project",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CityId = table.Column<long>(type: "bigint", nullable: false),
                    CreateByUserId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeleteByUserId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    DeleteDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastUpdateByUserId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    LastUpdateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Project", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Project_GeographicaLocation_CityId",
                        column: x => x.CityId,
                        principalTable: "GeographicaLocation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Project_AspNetUsers_CreateByUserId",
                        column: x => x.CreateByUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Project_AspNetUsers_DeleteByUserId",
                        column: x => x.DeleteByUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Project_AspNetUsers_LastUpdateByUserId",
                        column: x => x.LastUpdateByUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PackageDetail",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Area = table.Column<int>(type: "int", nullable: false),
                    Language = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PackageId = table.Column<long>(type: "bigint", nullable: false),
                    Price = table.Column<int>(type: "int", nullable: false),
                    SortText = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PackageDetail", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PackageDetail_Package_PackageId",
                        column: x => x.PackageId,
                        principalTable: "Package",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PackageFile",
                columns: table => new
                {
                    EntityId = table.Column<long>(type: "bigint", nullable: false),
                    FileEntityId = table.Column<long>(type: "bigint", nullable: false),
                    UsingType = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PackageFile", x => new { x.EntityId, x.FileEntityId });
                    table.ForeignKey(
                        name: "FK_PackageFile_Package_EntityId",
                        column: x => x.EntityId,
                        principalTable: "Package",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PackageFile_FileEntity_FileEntityId",
                        column: x => x.FileEntityId,
                        principalTable: "FileEntity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PackageTaxonomy",
                columns: table => new
                {
                    EntityId = table.Column<long>(type: "bigint", nullable: false),
                    TaxonomyId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PackageTaxonomy", x => new { x.EntityId, x.TaxonomyId });
                    table.ForeignKey(
                        name: "FK_PackageTaxonomy_Package_EntityId",
                        column: x => x.EntityId,
                        principalTable: "Package",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PackageTaxonomy_TaxonomyEntity_TaxonomyId",
                        column: x => x.TaxonomyId,
                        principalTable: "TaxonomyEntity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProjectBlock",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    EntityTypeId = table.Column<long>(type: "bigint", nullable: false),
                    PackageId = table.Column<long>(type: "bigint", nullable: true),
                    ParentId = table.Column<long>(type: "bigint", nullable: true),
                    ProjectId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectBlock", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectBlock_EntityType_EntityTypeId",
                        column: x => x.EntityTypeId,
                        principalTable: "EntityType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProjectBlock_Package_PackageId",
                        column: x => x.PackageId,
                        principalTable: "Package",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ProjectBlock_ProjectBlock_ParentId",
                        column: x => x.ParentId,
                        principalTable: "ProjectBlock",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ProjectBlock_Project_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Project",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ProjectDetail",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Area = table.Column<int>(type: "int", nullable: false),
                    Investor = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Language = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MapLatitude = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MapLongitude = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProjectId = table.Column<long>(type: "bigint", nullable: false),
                    StartedYear = table.Column<int>(type: "int", nullable: false),
                    Street = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TotalApartment = table.Column<int>(type: "int", nullable: false),
                    Website = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectDetail", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectDetail_Project_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Project",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProjectFile",
                columns: table => new
                {
                    EntityId = table.Column<long>(type: "bigint", nullable: false),
                    FileEntityId = table.Column<long>(type: "bigint", nullable: false),
                    UsingType = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectFile", x => new { x.EntityId, x.FileEntityId });
                    table.ForeignKey(
                        name: "FK_ProjectFile_Project_EntityId",
                        column: x => x.EntityId,
                        principalTable: "Project",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProjectFile_FileEntity_FileEntityId",
                        column: x => x.FileEntityId,
                        principalTable: "FileEntity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProjectTaxonomy",
                columns: table => new
                {
                    EntityId = table.Column<long>(type: "bigint", nullable: false),
                    TaxonomyId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectTaxonomy", x => new { x.EntityId, x.TaxonomyId });
                    table.ForeignKey(
                        name: "FK_ProjectTaxonomy_Project_EntityId",
                        column: x => x.EntityId,
                        principalTable: "Project",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProjectTaxonomy_TaxonomyEntity_TaxonomyId",
                        column: x => x.TaxonomyId,
                        principalTable: "TaxonomyEntity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProjectBlockDetail",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Label = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Language = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProjectBlockId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectBlockDetail", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectBlockDetail_ProjectBlock_ProjectBlockId",
                        column: x => x.ProjectBlockId,
                        principalTable: "ProjectBlock",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ProjectBlockFile",
                columns: table => new
                {
                    EntityId = table.Column<long>(type: "bigint", nullable: false),
                    FileEntityId = table.Column<long>(type: "bigint", nullable: false),
                    JsonData = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UsingType = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectBlockFile", x => new { x.EntityId, x.FileEntityId });
                    table.ForeignKey(
                        name: "FK_ProjectBlockFile_ProjectBlock_EntityId",
                        column: x => x.EntityId,
                        principalTable: "ProjectBlock",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProjectBlockFile_FileEntity_FileEntityId",
                        column: x => x.FileEntityId,
                        principalTable: "FileEntity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Package_CreateByUserId",
                table: "Package",
                column: "CreateByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Package_DeleteByUserId",
                table: "Package",
                column: "DeleteByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Package_LastUpdateByUserId",
                table: "Package",
                column: "LastUpdateByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_PackageDetail_PackageId",
                table: "PackageDetail",
                column: "PackageId");

            migrationBuilder.CreateIndex(
                name: "IX_PackageFile_FileEntityId",
                table: "PackageFile",
                column: "FileEntityId");

            migrationBuilder.CreateIndex(
                name: "IX_PackageTaxonomy_TaxonomyId",
                table: "PackageTaxonomy",
                column: "TaxonomyId");

            migrationBuilder.CreateIndex(
                name: "IX_Project_CityId",
                table: "Project",
                column: "CityId");

            migrationBuilder.CreateIndex(
                name: "IX_Project_CreateByUserId",
                table: "Project",
                column: "CreateByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Project_DeleteByUserId",
                table: "Project",
                column: "DeleteByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Project_LastUpdateByUserId",
                table: "Project",
                column: "LastUpdateByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectBlock_EntityTypeId",
                table: "ProjectBlock",
                column: "EntityTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectBlock_PackageId",
                table: "ProjectBlock",
                column: "PackageId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectBlock_ParentId",
                table: "ProjectBlock",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectBlock_ProjectId",
                table: "ProjectBlock",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectBlockDetail_ProjectBlockId",
                table: "ProjectBlockDetail",
                column: "ProjectBlockId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectBlockFile_FileEntityId",
                table: "ProjectBlockFile",
                column: "FileEntityId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectDetail_ProjectId",
                table: "ProjectDetail",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectFile_FileEntityId",
                table: "ProjectFile",
                column: "FileEntityId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectTaxonomy_TaxonomyId",
                table: "ProjectTaxonomy",
                column: "TaxonomyId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PackageDetail");

            migrationBuilder.DropTable(
                name: "PackageFile");

            migrationBuilder.DropTable(
                name: "PackageTaxonomy");

            migrationBuilder.DropTable(
                name: "ProjectBlockDetail");

            migrationBuilder.DropTable(
                name: "ProjectBlockFile");

            migrationBuilder.DropTable(
                name: "ProjectDetail");

            migrationBuilder.DropTable(
                name: "ProjectFile");

            migrationBuilder.DropTable(
                name: "ProjectTaxonomy");

            migrationBuilder.DropTable(
                name: "ProjectBlock");

            migrationBuilder.DropTable(
                name: "Package");

            migrationBuilder.DropTable(
                name: "Project");
        }
    }
}
