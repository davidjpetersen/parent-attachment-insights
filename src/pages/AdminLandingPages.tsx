import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { ChevronRight, LayoutTemplate, Save, Plus } from "lucide-react";

interface LandingPage {
  id: string;
  name: string;
  variant: string | null;
  content: any;
}

const AdminLandingPages = () => {
  const { toast } = useToast();
  const [pages, setPages] = useState<LandingPage[]>([]);
  const [selected, setSelected] = useState<LandingPage | null>(null);
  const [newName, setNewName] = useState("");
  const [variant, setVariant] = useState("");
  const editor = useCreateBlockNote({
    initialContent: [],
  });

  useEffect(() => {
    fetchPages();
  }, []);

  useEffect(() => {
    if (selected && selected.content) {
      editor.replaceBlocks(editor.document, selected.content);
    } else {
      editor.removeBlocks(editor.document);
    }
  }, [selected]);

  const fetchPages = async () => {
    const { data, error } = await supabase
      .from("landing_pages")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setPages(data as LandingPage[]);
    }
  };

  const createPage = async () => {
    if (!newName.trim()) return;
    const { data, error } = await supabase
      .from("landing_pages")
      .insert({ name: newName.trim(), variant: variant || null, content: [] })
      .select()
      .single();
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setPages([data as LandingPage, ...pages]);
      setNewName("");
      setVariant("");
    }
  };

  const savePage = async () => {
    if (!selected) return;
    const { error } = await supabase
      .from("landing_pages")
      .update({ name: selected.name, variant: selected.variant, content: editor.document })
      .eq("id", selected.id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Saved" });
    }
  };

  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
          <Link to="/admin" className="hover:text-foreground transition-colors">
            Admin
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">Landing Pages</span>
        </nav>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LayoutTemplate className="w-5 h-5" /> Landing Pages
                </CardTitle>
                <CardDescription>Create and manage landing pages.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Page name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                </div>
                <Input
                  placeholder="Variant (optional)"
                  value={variant}
                  onChange={(e) => setVariant(e.target.value)}
                />
                <Button className="w-full" onClick={createPage}>
                  <Plus className="w-4 h-4 mr-2" /> Create
                </Button>
                <Separator />
                <div className="space-y-2 max-h-72 overflow-y-auto">
                  {pages.map((p) => (
                    <Button
                      key={p.id}
                      variant={p.id === selected?.id ? "secondary" : "outline"}
                      className="w-full justify-start"
                      onClick={() => setSelected(p)}
                    >
                      {p.name} {p.variant && `(${p.variant})`}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="flex-1 space-y-4">
            {selected ? (
              <>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Editing: {selected.name}</h2>
                  <Button onClick={savePage}>
                    <Save className="w-4 h-4 mr-2" /> Save
                  </Button>
                </div>
                <BlockNoteView editor={editor} className="border rounded-md" />
              </>
            ) : (
              <div className="text-muted-foreground">Select a page to edit</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLandingPages;
