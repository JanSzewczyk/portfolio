import { createDataAttribute } from "next-sanity";

export function buildSanityAttribute({ documentId, documentType }: { documentId: string; documentType: string }) {
  return {
    createSanityAttribute(path: string) {
      return createDataAttribute({
        id: documentId,
        type: documentType,
        path
      }).toString();
    }
  };
}
