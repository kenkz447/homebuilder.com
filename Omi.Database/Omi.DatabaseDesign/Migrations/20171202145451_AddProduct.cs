using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Omi.DatabaseDesign.Migrations
{
    public partial class AddProduct : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ProductEntity",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Brand = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreateByUserId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeleteByUserId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    DeleteDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastUpdateByUserId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    LastUpdateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Price = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductEntity", x => x.Id);
                    table.UniqueConstraint("AK_ProductEntity_Name", x => x.Name);
                    table.ForeignKey(
                        name: "FK_ProductEntity_AspNetUsers_CreateByUserId",
                        column: x => x.CreateByUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ProductEntity_AspNetUsers_DeleteByUserId",
                        column: x => x.DeleteByUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ProductEntity_AspNetUsers_LastUpdateByUserId",
                        column: x => x.LastUpdateByUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ProductDetail",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    EntityId = table.Column<long>(type: "bigint", nullable: false),
                    Language = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductDetail", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProductDetail_ProductEntity_EntityId",
                        column: x => x.EntityId,
                        principalTable: "ProductEntity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProductFile",
                columns: table => new
                {
                    EntityId = table.Column<long>(type: "bigint", nullable: false),
                    FileEntityId = table.Column<long>(type: "bigint", nullable: false),
                    UsingType = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductFile", x => new { x.EntityId, x.FileEntityId });
                    table.ForeignKey(
                        name: "FK_ProductFile_ProductEntity_EntityId",
                        column: x => x.EntityId,
                        principalTable: "ProductEntity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductFile_FileEntity_FileEntityId",
                        column: x => x.FileEntityId,
                        principalTable: "FileEntity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProductTaxonomy",
                columns: table => new
                {
                    EntityId = table.Column<long>(type: "bigint", nullable: false),
                    TaxonomyId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductTaxonomy", x => new { x.EntityId, x.TaxonomyId });
                    table.ForeignKey(
                        name: "FK_ProductTaxonomy_ProductEntity_EntityId",
                        column: x => x.EntityId,
                        principalTable: "ProductEntity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductTaxonomy_TaxonomyEntity_TaxonomyId",
                        column: x => x.TaxonomyId,
                        principalTable: "TaxonomyEntity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProductDetail_EntityId",
                table: "ProductDetail",
                column: "EntityId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductEntity_CreateByUserId",
                table: "ProductEntity",
                column: "CreateByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductEntity_DeleteByUserId",
                table: "ProductEntity",
                column: "DeleteByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductEntity_LastUpdateByUserId",
                table: "ProductEntity",
                column: "LastUpdateByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductFile_FileEntityId",
                table: "ProductFile",
                column: "FileEntityId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductTaxonomy_TaxonomyId",
                table: "ProductTaxonomy",
                column: "TaxonomyId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProductDetail");

            migrationBuilder.DropTable(
                name: "ProductFile");

            migrationBuilder.DropTable(
                name: "ProductTaxonomy");

            migrationBuilder.DropTable(
                name: "ProductEntity");
        }
    }
}
