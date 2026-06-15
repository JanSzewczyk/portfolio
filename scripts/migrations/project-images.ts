/**
 * One-off migration: move each project's single `thumbnail` into the new ordered
 * `images` collection (as the first image) and drop the removed `longDescription` field.
 *
 * Run against the desired dataset with a write token:
 *   npx sanity exec scripts/migrations/project-images.ts --with-user-token
 *
 * Idempotent: a project that already has a non-empty `images` array (or no `thumbnail`)
 * is skipped, so re-running is safe.
 */
import { randomUUID } from "node:crypto";
import { getCliClient } from "sanity/cli";

type LegacyImage = {
  _type?: string;
  alt?: string;
  asset?: { _ref?: string };
  crop?: unknown;
  hotspot?: unknown;
};

type LegacyProject = {
  _id: string;
  images?: Array<unknown>;
  thumbnail?: LegacyImage;
};

const client = getCliClient();

async function migrate(): Promise<void> {
  const projects = await client.fetch<Array<LegacyProject>>(`*[_type == "project"]{ _id, thumbnail, images }`);

  let migrated = 0;
  let skipped = 0;
  let transaction = client.transaction();

  for (const project of projects) {
    const alreadyMigrated = Array.isArray(project.images) && project.images.length > 0;

    if (alreadyMigrated || !project.thumbnail) {
      skipped += 1;
      continue;
    }

    transaction = transaction.patch(project._id, (patch) =>
      patch.set({ images: [{ ...project.thumbnail, _key: randomUUID() }] }).unset(["thumbnail", "longDescription"])
    );
    migrated += 1;
  }

  if (migrated === 0) {
    // biome-ignore lint/suspicious/noConsole: migration progress output
    console.log(`Nothing to migrate — ${skipped} project(s) already up to date.`);
    return;
  }

  await transaction.commit();
  // biome-ignore lint/suspicious/noConsole: migration progress output
  console.log(`Migrated ${migrated} project(s) (thumbnail → images[0], dropped longDescription); skipped ${skipped}.`);
}

migrate().catch((error: unknown) => {
  // biome-ignore lint/suspicious/noConsole: migration failure output
  console.error("Project images migration failed:", error);
  process.exit(1);
});
