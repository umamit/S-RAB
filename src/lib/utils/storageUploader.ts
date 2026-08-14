import { supabase } from "../supabaseClient";

/**
 * Upload compressed image to Supabase Storage in 'project-photos' bucket
 * Path: {userId}/{projectId}/{logDate}/{uuid}.jpg
 */
export async function uploadPhoto(
  userId: string,
  projectId: string,
  logDate: string,
  fileBlob: Blob
): Promise<string> {
  const uuid = Math.random().toString(36).substring(2, 15);
  const filePath = `${userId}/${projectId}/${logDate}/${uuid}.jpg`;

  const { error } = await supabase.storage
    .from("project-photos")
    .upload(filePath, fileBlob, {
      contentType: "image/jpeg",
      upsert: true,
    });

  if (error) {
    throw new Error(`Gagal upload foto ke storage: ${error.message}`);
  }

  // Ambil URL publik dari file yang baru saja diupload
  const { data } = supabase.storage
    .from("project-photos")
    .getPublicUrl(filePath);

  if (!data?.publicUrl) {
    throw new Error("Gagal mendapatkan URL publik dari foto");
  }

  return data.publicUrl;
}

/**
 * Delete photo from Supabase Storage given its public URL
 */
export async function deletePhoto(publicUrl: string): Promise<void> {
  try {
    // Ekstrak file path dari URL publik Supabase
    // URL format: https://[project-id].supabase.co/storage/v1/object/public/project-photos/[filePath]
    const marker = "/storage/v1/object/public/project-photos/";
    const index = publicUrl.indexOf(marker);
    if (index === -1) return;

    const filePath = publicUrl.substring(index + marker.length);
    const { error } = await supabase.storage
      .from("project-photos")
      .remove([filePath]);

    if (error) {
      console.error(`Gagal menghapus file dari storage: ${error.message}`);
    }
  } catch (err) {
    console.error("Gagal melakukan penghapusan foto:", err);
  }
}
