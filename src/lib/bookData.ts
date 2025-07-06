import { supabase } from "@/integrations/supabase/client";
import type { BookData } from "@/hooks/useBookData";

export const fetchBookData = async (bookId: string): Promise<BookData> => {
  const { data: book, error: bookError } = await supabase
    .from("books")
    .select("*")
    .eq("id", bookId)
    .single();

  if (bookError) throw bookError;

  const [
    { data: centralMessage },
    { data: evidenceQuality },
    { data: coreConcepts },
    { data: ageApplications },
    { data: implementation },
    { data: expertReflection },
    { data: chapters }
  ] = await Promise.all([
    supabase.from("book_central_messages").select("*").eq("book_id", bookId).single(),
    supabase.from("book_evidence_quality").select("*").eq("book_id", bookId).single(),
    supabase.from("book_core_concepts").select("*").eq("book_id", bookId).order("sort_order"),
    supabase.from("book_age_applications").select("*").eq("book_id", bookId),
    supabase.from("book_implementation").select("*").eq("book_id", bookId).single(),
    supabase.from("book_expert_reflections").select("*").eq("book_id", bookId).single(),
    supabase.from("book_chapters").select("*").eq("book_id", bookId).order("chapter_number")
  ]);

  const ageAppsFormatted =
    ageApplications?.reduce((acc: Record<string, any>, app: any) => {
      acc[app.age_group] = {
        age_range: app.age_range,
        specific_strategies: Array.isArray(app.specific_strategies)
          ? (app.specific_strategies as string[])
          : [],
        developmental_considerations: app.developmental_considerations,
        practical_examples: Array.isArray(app.practical_examples)
          ? (app.practical_examples as string[])
          : []
      };
      return acc;
    }, {} as Record<string, any>) || {};

  return {
    id: book.id,
    metadata: {
      title: book.title,
      author: book.author,
      publication_year: book.publication_year,
      isbn: book.isbn,
      page_count: book.page_count,
      genre: book.genre,
      target_audience: book.target_audience,
      reading_level: book.reading_level
    },
    central_message: {
      main_thesis: centralMessage?.main_thesis || "",
      key_takeaway: centralMessage?.key_takeaway || "",
      one_sentence_summary: centralMessage?.one_sentence_summary || "",
      target_problem: centralMessage?.target_problem || "",
      proposed_solution: centralMessage?.proposed_solution || ""
    },
    evidence_quality: {
      research_based: evidenceQuality?.research_based || false,
      source_types: Array.isArray(evidenceQuality?.source_types)
        ? (evidenceQuality?.source_types as string[])
        : [],
      study_citations: evidenceQuality?.study_citations || 0,
      expert_credentials: evidenceQuality?.expert_credentials || "",
      evidence_strength: evidenceQuality?.evidence_strength || "",
      bias_assessment: evidenceQuality?.bias_assessment || ""
    },
    core_concepts:
      coreConcepts?.map((concept: any) => ({
        concept_name: concept.concept_name,
        description: concept.description,
        supporting_evidence: concept.supporting_evidence,
        practical_application: concept.practical_application,
        potential_challenges: concept.potential_challenges
      })) || [],
    age_applications: ageAppsFormatted,
    implementation: {
      getting_started: Array.isArray(implementation?.getting_started)
        ? (implementation?.getting_started as string[])
        : [],
      common_obstacles: Array.isArray(implementation?.common_obstacles)
        ? (implementation?.common_obstacles as string[])
        : [],
      success_metrics: Array.isArray(implementation?.success_metrics)
        ? (implementation?.success_metrics as string[])
        : [],
      time_investment: implementation?.time_investment || "",
      difficulty_level: implementation?.difficulty_level || "",
      family_adaptation: implementation?.family_adaptation || ""
    },
    expert_reflection: {
      overall_assessment: expertReflection?.overall_assessment || "",
      recommendation_level: expertReflection?.recommendation_level || "",
      best_fit_families: expertReflection?.best_fit_families || "",
      implementation_priority: expertReflection?.implementation_priority || "",
      long_term_impact: expertReflection?.long_term_impact || ""
    },
    chapters:
      chapters?.map((chapter: any) => ({
        chapter_number: chapter.chapter_number,
        title: chapter.title,
        key_points: Array.isArray(chapter.key_points)
          ? (chapter.key_points as string[])
          : [],
        practical_advice: Array.isArray(chapter.practical_advice)
          ? (chapter.practical_advice as string[])
          : [],
        examples_case_studies: Array.isArray(chapter.examples_case_studies)
          ? (chapter.examples_case_studies as string[])
          : [],
        main_takeaway: chapter.main_takeaway
      })) || []
  };
};
