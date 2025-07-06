import { supabase } from "@/integrations/supabase/client";

export interface BookRecord {
  id: string;
  title: string;
  author: string;
  publication_year?: number | null;
  page_count?: number | null;
  genre?: string | null;
  target_audience?: string | null;
}

export async function createBook({ metadata, blocks }: { metadata: Partial<BookRecord>; blocks: any[] }) {
  const { data, error } = await supabase
    .from("books")
    .insert([
      {
        title: metadata.title,
        author: metadata.author,
        publication_year: metadata.publication_year,
        page_count: metadata.page_count,
        genre: metadata.genre,
        target_audience: metadata.target_audience,
      },
    ])
    .select()
    .single();
  if (error) throw error;
  const newId = data!.id;
  localStorage.setItem(`book-blocks-${newId}`, JSON.stringify(blocks));
  return newId;
}

export async function fetchBook(id: string) {
  const { data, error } = await supabase.from("books").select("*").eq("id", id).single();
  if (error) throw error;
  const blocksRaw = localStorage.getItem(`book-blocks-${id}`);
  const blocks = blocksRaw ? JSON.parse(blocksRaw) : [];
  return { ...data, blocks };
}

export async function updateBook(id: string, { blocks }: { blocks: any[] }) {
  await supabase.from("books").update({ updated_at: new Date().toISOString() }).eq("id", id);
  localStorage.setItem(`book-blocks-${id}`, JSON.stringify(blocks));
}
