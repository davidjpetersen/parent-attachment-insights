import { useQuery } from "@tanstack/react-query";
import { fetchBookData } from "@/lib/bookData";

export interface BookData {
  id: string;
  metadata: {
    title: string;
    author: string;
    publication_year: number;
    isbn: string | null;
    page_count: number;
    genre: string;
    target_audience: string;
    reading_level: string;
  };
  central_message: {
    main_thesis: string;
    key_takeaway: string;
    one_sentence_summary: string;
    target_problem: string;
    proposed_solution: string;
  };
  evidence_quality: {
    research_based: boolean;
    source_types: string[];
    study_citations: number;
    expert_credentials: string;
    evidence_strength: string;
    bias_assessment: string;
  };
  core_concepts: Array<{
    concept_name: string;
    description: string;
    supporting_evidence: string;
    practical_application: string;
    potential_challenges: string;
  }>;
  age_applications: Record<string, {
    age_range: string;
    specific_strategies: string[];
    developmental_considerations: string;
    practical_examples: string[];
  }>;
  implementation: {
    getting_started: string[];
    common_obstacles: string[];
    success_metrics: string[];
    time_investment: string;
    difficulty_level: string;
    family_adaptation: string;
  };
  expert_reflection: {
    overall_assessment: string;
    recommendation_level: string;
    best_fit_families: string;
    implementation_priority: string;
    long_term_impact: string;
  };
  chapters: Array<{
    chapter_number: number;
    title: string;
    key_points: string[];
    practical_advice: string[];
    examples_case_studies: string[];
    main_takeaway: string;
  }>;
}

export const useBookData = (bookId: string) => {
  return useQuery({
    queryKey: ["book", bookId],
    queryFn: () => fetchBookData(bookId),
    enabled: !!bookId
  });
};