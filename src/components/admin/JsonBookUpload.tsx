import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface JsonBookData {
  title: string;
  author: string;
  publication_year?: number;
  genre?: string;
  target_audience?: string;
  isbn?: string;
  page_count?: number;
  reading_level?: string;
  central_message?: {
    main_thesis?: string;
    one_sentence_summary?: string;
    target_problem?: string;
    proposed_solution?: string;
    key_takeaway?: string;
  };
  chapters?: Array<{
    chapter_number: number;
    title: string;
    main_takeaway?: string;
    key_points?: string[];
    practical_advice?: string[];
    examples_case_studies?: string[];
  }>;
  core_concepts?: Array<{
    concept_name: string;
    description?: string;
    practical_application?: string;
    supporting_evidence?: string;
    potential_challenges?: string;
    sort_order?: number;
  }>;
  age_applications?: Array<{
    age_group: string;
    age_range?: string;
    developmental_considerations?: string;
    specific_strategies?: string[];
    practical_examples?: string[];
  }>;
  evidence_quality?: {
    research_based?: boolean;
    study_citations?: number;
    evidence_strength?: string;
    source_types?: string[];
    expert_credentials?: string;
    bias_assessment?: string;
  };
  expert_reflection?: {
    overall_assessment?: string;
    recommendation_level?: string;
    best_fit_families?: string;
    implementation_priority?: string;
    long_term_impact?: string;
  };
  implementation?: {
    difficulty_level?: string;
    time_investment?: string;
    family_adaptation?: string;
    getting_started?: string[];
    common_obstacles?: string[];
    success_metrics?: string[];
  };
}

interface JsonBookUploadProps {
  onBookAdded: () => void;
}

export const JsonBookUpload = ({ onBookAdded }: JsonBookUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<JsonBookData | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
      setValidationError('Please select a valid JSON file');
      return;
    }

    setSelectedFile(file);
    setValidationError(null);
    
    // Read and preview the JSON
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target?.result as string);
        validateJsonStructure(jsonData);
        setPreviewData(jsonData);
      } catch (error) {
        setValidationError('Invalid JSON format or structure');
        setPreviewData(null);
      }
    };
    reader.readAsText(file);
  };

  const validateJsonStructure = (data: any) => {
    if (!data.title || !data.author) {
      throw new Error('JSON must contain title and author fields');
    }
    
    // Additional validation can be added here
    if (data.chapters && !Array.isArray(data.chapters)) {
      throw new Error('Chapters must be an array');
    }
    
    if (data.core_concepts && !Array.isArray(data.core_concepts)) {
      throw new Error('Core concepts must be an array');
    }
  };

  const insertBookData = async (bookData: JsonBookData) => {
    // Insert main book record
    const { data: book, error: bookError } = await supabase
      .from('books')
      .insert([{
        title: bookData.title,
        author: bookData.author,
        publication_year: bookData.publication_year,
        genre: bookData.genre,
        target_audience: bookData.target_audience,
        isbn: bookData.isbn,
        page_count: bookData.page_count,
        reading_level: bookData.reading_level
      }])
      .select()
      .single();

    if (bookError) throw bookError;

    const bookId = book.id;

    // Insert central message if provided
    if (bookData.central_message) {
      const { error: centralMessageError } = await supabase
        .from('book_central_messages')
        .insert([{
          book_id: bookId,
          ...bookData.central_message
        }]);
      
      if (centralMessageError) throw centralMessageError;
    }

    // Insert chapters if provided
    if (bookData.chapters && bookData.chapters.length > 0) {
      const chaptersToInsert = bookData.chapters.map(chapter => ({
        book_id: bookId,
        chapter_number: chapter.chapter_number,
        title: chapter.title,
        main_takeaway: chapter.main_takeaway,
        key_points: chapter.key_points,
        practical_advice: chapter.practical_advice,
        examples_case_studies: chapter.examples_case_studies
      }));

      const { error: chaptersError } = await supabase
        .from('book_chapters')
        .insert(chaptersToInsert);
      
      if (chaptersError) throw chaptersError;
    }

    // Insert core concepts if provided
    if (bookData.core_concepts && bookData.core_concepts.length > 0) {
      const conceptsToInsert = bookData.core_concepts.map((concept, index) => ({
        book_id: bookId,
        concept_name: concept.concept_name,
        description: concept.description,
        practical_application: concept.practical_application,
        supporting_evidence: concept.supporting_evidence,
        potential_challenges: concept.potential_challenges,
        sort_order: concept.sort_order || index
      }));

      const { error: conceptsError } = await supabase
        .from('book_core_concepts')
        .insert(conceptsToInsert);
      
      if (conceptsError) throw conceptsError;
    }

    // Insert age applications if provided
    if (bookData.age_applications && bookData.age_applications.length > 0) {
      const ageAppsToInsert = bookData.age_applications.map(ageApp => ({
        book_id: bookId,
        age_group: ageApp.age_group,
        age_range: ageApp.age_range,
        developmental_considerations: ageApp.developmental_considerations,
        specific_strategies: ageApp.specific_strategies,
        practical_examples: ageApp.practical_examples
      }));

      const { error: ageAppsError } = await supabase
        .from('book_age_applications')
        .insert(ageAppsToInsert);
      
      if (ageAppsError) throw ageAppsError;
    }

    // Insert evidence quality if provided
    if (bookData.evidence_quality) {
      const { error: evidenceError } = await supabase
        .from('book_evidence_quality')
        .insert([{
          book_id: bookId,
          ...bookData.evidence_quality
        }]);
      
      if (evidenceError) throw evidenceError;
    }

    // Insert expert reflection if provided
    if (bookData.expert_reflection) {
      const { error: reflectionError } = await supabase
        .from('book_expert_reflections')
        .insert([{
          book_id: bookId,
          ...bookData.expert_reflection
        }]);
      
      if (reflectionError) throw reflectionError;
    }

    // Insert implementation if provided
    if (bookData.implementation) {
      const { error: implementationError } = await supabase
        .from('book_implementation')
        .insert([{
          book_id: bookId,
          ...bookData.implementation
        }]);
      
      if (implementationError) throw implementationError;
    }

    return book;
  };

  const handleUpload = async () => {
    if (!previewData) return;

    setUploading(true);
    try {
      await insertBookData(previewData);

      toast({
        title: "Success",
        description: `Book "${previewData.title}" has been uploaded successfully with all related data`,
      });

      // Reset form
      setSelectedFile(null);
      setPreviewData(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      onBookAdded();
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to upload book data",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setPreviewData(null);
    setValidationError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload Book JSON
        </CardTitle>
        <CardDescription>
          Upload a JSON file containing complete book data including chapters, concepts, and metadata
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="jsonFile" className="text-base font-medium">
            Select JSON File
          </Label>
          <Input
            ref={fileInputRef}
            id="jsonFile"
            type="file"
            accept=".json,application/json"
            onChange={handleFileSelect}
            className="h-12 text-base file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium"
          />
        </div>

        {validationError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{validationError}</AlertDescription>
          </Alert>
        )}

        {previewData && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-1">
                <p><strong>Ready to upload:</strong> "{previewData.title}" by {previewData.author}</p>
                <div className="text-sm text-muted-foreground">
                  <p>• {previewData.chapters?.length || 0} chapters</p>
                  <p>• {previewData.core_concepts?.length || 0} core concepts</p>
                  <p>• {previewData.age_applications?.length || 0} age applications</p>
                  <p>• {previewData.central_message ? 'Central message included' : 'No central message'}</p>
                  <p>• {previewData.evidence_quality ? 'Evidence quality data included' : 'No evidence quality data'}</p>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        )}

        <div className="flex gap-2">
          <Button 
            onClick={handleUpload}
            disabled={!previewData || uploading}
            className="flex-1"
          >
            <FileText className="w-4 h-4 mr-2" />
            {uploading ? 'Uploading...' : 'Upload Book Data'}
          </Button>
          
          {selectedFile && (
            <Button 
              variant="outline" 
              onClick={clearFile}
              disabled={uploading}
            >
              Clear
            </Button>
          )}
        </div>

        <div className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
          <p className="font-medium mb-2">Expected JSON Structure:</p>
          <pre className="text-xs overflow-x-auto">
{`{
  "title": "Book Title",
  "author": "Author Name",
  "publication_year": 2024,
  "genre": "Parenting",
  "chapters": [
    {
      "chapter_number": 1,
      "title": "Chapter Title",
      "key_points": ["Point 1", "Point 2"]
    }
  ],
  "core_concepts": [
    {
      "concept_name": "Concept Name",
      "description": "Description"
    }
  ]
}`}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
};