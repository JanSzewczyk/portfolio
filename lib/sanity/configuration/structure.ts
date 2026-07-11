import { CaseIcon } from "@sanity/icons/Case";
import { CodeIcon } from "@sanity/icons/Code";
import { ComponentIcon } from "@sanity/icons/Component";
import { DocumentIcon } from "@sanity/icons/Document";
import { FolderIcon } from "@sanity/icons/Folder";
import { MasterDetailIcon } from "@sanity/icons/MasterDetail";
import { ProjectsIcon } from "@sanity/icons/Projects";
import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Portfolio")
    .items([
      // ============================================
      // Pages (Singletons)
      // ============================================
      S.listItem()
        .title("Pages")
        .icon(DocumentIcon)
        .child(
          S.list()
            .title("Pages")
            .items([
              S.listItem()
                .title("Portfolio Page")
                .icon(DocumentIcon)
                .child(S.document().schemaType("portfolioPage").documentId("portfolioPage").title("Portfolio Page"))
            ])
        ),

      S.divider(),

      // ============================================
      // Documents (First Level)
      // ============================================

      // Experience
      S.listItem().title("Experience").icon(CaseIcon).child(S.documentTypeList("experience").title("Experience")),

      // Education
      S.listItem().title("Education").icon(MasterDetailIcon).child(S.documentTypeList("education").title("Education")),

      S.divider(),

      // Technologies
      S.listItem().title("Technologies").icon(CodeIcon).child(S.documentTypeList("technology").title("Technologies")),

      // Technology Groups
      S.listItem()
        .title("Technology Groups")
        .icon(ComponentIcon)
        .child(S.documentTypeList("technologyGroup").title("Technology Groups")),

      S.divider(),

      // Projects
      S.listItem().title("Projects").icon(ProjectsIcon).child(S.documentTypeList("project").title("Projects")),

      // Project Groups
      S.listItem()
        .title("Project Groups")
        .icon(FolderIcon)
        .child(S.documentTypeList("projectGroup").title("Project Groups"))
    ]);
