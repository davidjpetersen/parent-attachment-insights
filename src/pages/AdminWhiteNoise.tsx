import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ChevronRight, Plus, Headphones } from "lucide-react";
import { Link } from "react-router-dom";

interface WhiteNoiseFile {
  id: string;
  title: string;
  description: string | null;
  file_url: string;
  encoding_format: string | null;
  duration_seconds: number | null;
  language: string | null;
}

interface WhiteNoiseCollection {
  id: string;
  name: string;
  description: string | null;
  white_noise_files: WhiteNoiseFile[];
}

const AdminWhiteNoise = () => {
  const [collections, setCollections] = useState<WhiteNoiseCollection[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const [newCollectionName, setNewCollectionName] = useState("");
  const [newCollectionDescription, setNewCollectionDescription] = useState("");

  const [fileTitle, setFileTitle] = useState("");
  const [fileDescription, setFileDescription] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [fileFormat, setFileFormat] = useState("mp3");
  const [fileDuration, setFileDuration] = useState("");
  const [fileLanguage, setFileLanguage] = useState("");
  const [fileCollectionId, setFileCollectionId] = useState<string | undefined>();

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    const { data, error } = await supabase
      .from("white_noise_collections")
      .select("id,name,description,white_noise_files(id,title,file_url,encoding_format)")
      .order("name");

    if (error) {
      console.error("Error fetching collections", error);
    } else {
      setCollections(data as any);
    }
    setLoading(false);
  };

  const addCollection = async () => {
    if (!newCollectionName.trim()) return;
    const { error } = await supabase.from("white_noise_collections").insert([
      { name: newCollectionName.trim(), description: newCollectionDescription.trim() || null }
    ]);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Collection created" });
      setNewCollectionName("");
      setNewCollectionDescription("");
      fetchCollections();
    }
  };

  const addFile = async () => {
    if (!fileTitle.trim() || !fileUrl.trim() || !fileCollectionId) {
      toast({ title: "Error", description: "Please fill all required fields", variant: "destructive" });
      return;
    }
    const duration = fileDuration ? parseInt(fileDuration) : null;
    const { error } = await supabase.from("white_noise_files").insert([
      {
        title: fileTitle.trim(),
        description: fileDescription.trim() || null,
        file_url: fileUrl.trim(),
        encoding_format: fileFormat,
        duration_seconds: duration,
        language: fileLanguage.trim() || null,
        collection_id: fileCollectionId
      }
    ]);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Audio file added" });
      setFileTitle("");
      setFileDescription("");
      setFileUrl("");
      setFileDuration("");
      setFileLanguage("");
      setFileCollectionId(undefined);
      fetchCollections();
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="w-full">
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-8">
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
          <Link to="/admin" className="hover:text-foreground transition-colors">
            Admin
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">White Noise</span>
        </nav>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">White Noise Collections</h1>
            <p className="text-muted-foreground">Manage calming audio files</p>
          </div>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            <Headphones className="w-4 h-4 mr-2" />
            {collections.length} Collections
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              New Collection
            </CardTitle>
            <CardDescription>Create a group of related sounds</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="collectionName">Name</Label>
              <Input id="collectionName" value={newCollectionName} onChange={(e) => setNewCollectionName(e.target.value)} className="h-10" />
            </div>
            <div>
              <Label htmlFor="collectionDescription">Description</Label>
              <Input id="collectionDescription" value={newCollectionDescription} onChange={(e) => setNewCollectionDescription(e.target.value)} className="h-10" />
            </div>
            <Button onClick={addCollection}>Add Collection</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              New Audio File
            </CardTitle>
            <CardDescription>Add an audio file to a collection</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="fileTitle">Title</Label>
              <Input id="fileTitle" value={fileTitle} onChange={(e) => setFileTitle(e.target.value)} className="h-10" />
            </div>
            <div>
              <Label htmlFor="fileDescription">Description</Label>
              <Input id="fileDescription" value={fileDescription} onChange={(e) => setFileDescription(e.target.value)} className="h-10" />
            </div>
            <div>
              <Label htmlFor="fileUrl">File URL</Label>
              <Input id="fileUrl" value={fileUrl} onChange={(e) => setFileUrl(e.target.value)} className="h-10" placeholder="https://" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="fileFormat">Format</Label>
                <Select value={fileFormat} onValueChange={setFileFormat}>
                  <SelectTrigger className="w-full h-10">
                    <SelectValue placeholder="Format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mp3">MP3</SelectItem>
                    <SelectItem value="m4v">M4V</SelectItem>
                    <SelectItem value="ogg">OGG</SelectItem>
                    <SelectItem value="wav">WAV</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="fileDuration">Duration (sec)</Label>
                <Input id="fileDuration" value={fileDuration} onChange={(e) => setFileDuration(e.target.value)} type="number" className="h-10" />
              </div>
              <div>
                <Label htmlFor="fileLanguage">Language</Label>
                <Input id="fileLanguage" value={fileLanguage} onChange={(e) => setFileLanguage(e.target.value)} className="h-10" />
              </div>
            </div>
            <div>
              <Label htmlFor="fileCollection">Collection</Label>
              <Select value={fileCollectionId} onValueChange={setFileCollectionId}>
                <SelectTrigger className="w-full h-10">
                  <SelectValue placeholder="Select collection" />
                </SelectTrigger>
                <SelectContent>
                  {collections.map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={addFile}>Add Audio File</Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {collections.map((c) => (
            <Card key={c.id} className="border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {c.name}
                  <Badge variant="outline" className="ml-2">{c.white_noise_files.length} files</Badge>
                </CardTitle>
                {c.description && <CardDescription>{c.description}</CardDescription>}
              </CardHeader>
              <CardContent className="space-y-1">
                {c.white_noise_files.map((f) => (
                  <div key={f.id} className="text-sm flex items-center gap-2">
                    <Headphones className="w-4 h-4" />
                    <span className="font-medium">{f.title}</span>
                    <span className="text-muted-foreground text-xs">{f.encoding_format}</span>
                  </div>
                ))}
                {c.white_noise_files.length === 0 && (
                  <p className="text-sm text-muted-foreground">No files yet</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminWhiteNoise;
