-- Create books table for main book metadata
CREATE TABLE public.books (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  publication_year INTEGER,
  isbn TEXT,
  page_count INTEGER,
  genre TEXT,
  target_audience TEXT,
  reading_level TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create book_central_messages table
CREATE TABLE public.book_central_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  book_id UUID NOT NULL REFERENCES public.books(id) ON DELETE CASCADE,
  main_thesis TEXT,
  key_takeaway TEXT,
  one_sentence_summary TEXT,
  target_problem TEXT,
  proposed_solution TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create book_evidence_quality table
CREATE TABLE public.book_evidence_quality (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  book_id UUID NOT NULL REFERENCES public.books(id) ON DELETE CASCADE,
  research_based BOOLEAN DEFAULT false,
  source_types JSONB,
  study_citations INTEGER DEFAULT 0,
  expert_credentials TEXT,
  evidence_strength TEXT,
  bias_assessment TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create book_core_concepts table
CREATE TABLE public.book_core_concepts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  book_id UUID NOT NULL REFERENCES public.books(id) ON DELETE CASCADE,
  concept_name TEXT NOT NULL,
  description TEXT,
  supporting_evidence TEXT,
  practical_application TEXT,
  potential_challenges TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create book_age_applications table
CREATE TABLE public.book_age_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  book_id UUID NOT NULL REFERENCES public.books(id) ON DELETE CASCADE,
  age_group TEXT NOT NULL,
  age_range TEXT,
  specific_strategies JSONB,
  developmental_considerations TEXT,
  practical_examples JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create book_implementation table
CREATE TABLE public.book_implementation (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  book_id UUID NOT NULL REFERENCES public.books(id) ON DELETE CASCADE,
  getting_started JSONB,
  common_obstacles JSONB,
  success_metrics JSONB,
  time_investment TEXT,
  difficulty_level TEXT,
  family_adaptation TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create book_expert_reflections table
CREATE TABLE public.book_expert_reflections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  book_id UUID NOT NULL REFERENCES public.books(id) ON DELETE CASCADE,
  overall_assessment TEXT,
  recommendation_level TEXT,
  best_fit_families TEXT,
  implementation_priority TEXT,
  long_term_impact TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create book_chapters table
CREATE TABLE public.book_chapters (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  book_id UUID NOT NULL REFERENCES public.books(id) ON DELETE CASCADE,
  chapter_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  key_points JSONB,
  practical_advice JSONB,
  examples_case_studies JSONB,
  main_takeaway TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_book_progress table for tracking reading progress
CREATE TABLE public.user_book_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  book_id UUID NOT NULL REFERENCES public.books(id) ON DELETE CASCADE,
  progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  bookmarks JSONB DEFAULT '[]'::jsonb,
  notes TEXT,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, book_id)
);

-- Enable Row Level Security
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.book_central_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.book_evidence_quality ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.book_core_concepts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.book_age_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.book_implementation ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.book_expert_reflections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.book_chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_book_progress ENABLE ROW LEVEL SECURITY;

-- Create policies for books and related data (publicly readable)
CREATE POLICY "Books are publicly readable" ON public.books FOR SELECT USING (true);
CREATE POLICY "Book central messages are publicly readable" ON public.book_central_messages FOR SELECT USING (true);
CREATE POLICY "Book evidence quality is publicly readable" ON public.book_evidence_quality FOR SELECT USING (true);
CREATE POLICY "Book core concepts are publicly readable" ON public.book_core_concepts FOR SELECT USING (true);
CREATE POLICY "Book age applications are publicly readable" ON public.book_age_applications FOR SELECT USING (true);
CREATE POLICY "Book implementation is publicly readable" ON public.book_implementation FOR SELECT USING (true);
CREATE POLICY "Book expert reflections are publicly readable" ON public.book_expert_reflections FOR SELECT USING (true);
CREATE POLICY "Book chapters are publicly readable" ON public.book_chapters FOR SELECT USING (true);

-- Create policies for user progress (user-specific)
CREATE POLICY "Users can view their own progress" ON public.user_book_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own progress" ON public.user_book_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own progress" ON public.user_book_progress FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own progress" ON public.user_book_progress FOR DELETE USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_books_updated_at BEFORE UPDATE ON public.books FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_user_book_progress_updated_at BEFORE UPDATE ON public.user_book_progress FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample book data
INSERT INTO public.books (id, title, author, publication_year, isbn, page_count, genre, target_audience, reading_level) 
VALUES (
  'e8f1a2b3-c4d5-4e6f-7a8b-9c0d1e2f3a4b',
  'Attached: The New Science of Adult Attachment and How It Can Help You Find—and Keep—Love',
  'Amir Levine, M.D. and Rachel Heller, M.A.',
  2010,
  null,
  300,
  'Psychology, Relationships',
  'Adults seeking to improve their relationships',
  'General audience'
);

-- Insert central message
INSERT INTO public.book_central_messages (book_id, main_thesis, key_takeaway, one_sentence_summary, target_problem, proposed_solution)
VALUES (
  'e8f1a2b3-c4d5-4e6f-7a8b-9c0d1e2f3a4b',
  'The book''s primary argument is that understanding adult attachment styles can significantly improve romantic relationships by helping individuals find and maintain love.',
  'Parents should learn that recognizing and understanding their own and their partner''s attachment styles can lead to healthier and more fulfilling relationships.',
  'The book explains how understanding adult attachment styles can help individuals find and maintain love by improving relationship dynamics.',
  'The book addresses the problem of relationship difficulties stemming from mismatched or misunderstood attachment styles.',
  'The authors propose that by identifying and understanding one''s own and their partner''s attachment styles, individuals can improve communication, resolve conflicts, and build stronger, more secure relationships.'
);

-- Insert evidence quality
INSERT INTO public.book_evidence_quality (book_id, research_based, source_types, study_citations, expert_credentials, evidence_strength, bias_assessment)
VALUES (
  'e8f1a2b3-c4d5-4e6f-7a8b-9c0d1e2f3a4b',
  true,
  '["academic studies", "clinical experience"]'::jsonb,
  0,
  'Amir Levine, M.D., and Rachel Heller, M.A., with backgrounds in mental health and attachment theory.',
  'moderate',
  'The evidence may be biased towards attachment theory as the primary explanation for relationship behaviors, potentially overlooking other psychological or social factors.'
);

-- Insert core concepts
INSERT INTO public.book_core_concepts (book_id, concept_name, description, supporting_evidence, practical_application, potential_challenges, sort_order)
VALUES 
(
  'e8f1a2b3-c4d5-4e6f-7a8b-9c0d1e2f3a4b',
  'Understanding Adult Attachment Styles',
  'The book explains that adult attachment styles are patterns in which people perceive and respond to intimacy in romantic relationships. These styles are Secure, Anxious, and Avoidant, and they influence how individuals behave in relationships.',
  'The authors reference research by Cindy Hazan and Phillip Shaver, which indicates that adults show patterns of attachment similar to those found in children.',
  'Parents can use this understanding to recognize their own attachment styles and how these might affect their relationships with their children and partners.',
  'Parents might struggle to identify their own attachment style or may find it difficult to change ingrained patterns of behavior.',
  1
),
(
  'e8f1a2b3-c4d5-4e6f-7a8b-9c0d1e2f3a4b',
  'Impact of Attachment Styles on Relationships',
  'Attachment styles affect various aspects of relationships, including intimacy, conflict resolution, communication, and expectations. Secure individuals are comfortable with intimacy, anxious individuals crave it, and avoidant individuals shy away from it.',
  'The book provides examples of how different attachment styles manifest in relationships, such as the case of Tamara and Greg.',
  'Parents can apply this concept by observing how their attachment style influences their parenting and work to foster a secure attachment with their children.',
  'Parents may find it challenging to change their attachment style or may not recognize how their style affects their children.',
  2
),
(
  'e8f1a2b3-c4d5-4e6f-7a8b-9c0d1e2f3a4b',
  'Evolutionary Basis of Attachment',
  'The need for close relationships is embedded in our genes, as attachment provided a survival advantage in prehistoric times. This evolutionary perspective explains why attachment behaviors are so deeply ingrained.',
  'The authors discuss John Bowlby''s theory that humans are programmed to form intimate bonds for survival.',
  'Parents can use this understanding to appreciate the importance of forming secure attachments with their children, recognizing it as a fundamental human need.',
  'Parents might find it difficult to balance their own needs for independence with the need to form close bonds with their children.',
  3
);

-- Insert age applications
INSERT INTO public.book_age_applications (book_id, age_group, age_range, specific_strategies, developmental_considerations, practical_examples)
VALUES 
(
  'e8f1a2b3-c4d5-4e6f-7a8b-9c0d1e2f3a4b',
  'infants_toddlers',
  '0-2 years',
  '["Ensure consistent and responsive caregiving", "Engage in face-to-face interactions and play", "Provide a safe and secure environment"]'::jsonb,
  'Attachment formation is crucial; infants need to feel secure and cared for.',
  '["Respond promptly to crying and distress", "Play peek-a-boo to encourage social interaction"]'::jsonb
),
(
  'e8f1a2b3-c4d5-4e6f-7a8b-9c0d1e2f3a4b',
  'preschoolers',
  '3-5 years',
  '["Encourage exploration while providing a secure base", "Foster social skills through play", "Use positive reinforcement to guide behavior"]'::jsonb,
  'Children begin to explore independence but still need reassurance from caregivers.',
  '["Allow them to play independently but stay nearby", "Praise sharing and cooperative play with peers"]'::jsonb
),
(
  'e8f1a2b3-c4d5-4e6f-7a8b-9c0d1e2f3a4b',
  'school_age',
  '6-11 years',
  '["Support emotional expression and understanding", "Encourage problem-solving and critical thinking", "Promote healthy peer relationships"]'::jsonb,
  'Children develop a sense of competence and self-esteem; peer relationships become more important.',
  '["Discuss feelings and emotions openly", "Encourage participation in team sports or group activities"]'::jsonb
),
(
  'e8f1a2b3-c4d5-4e6f-7a8b-9c0d1e2f3a4b',
  'teenagers',
  '12+ years',
  '["Respect their need for independence while providing guidance", "Encourage open communication about challenges", "Support identity exploration and self-discovery"]'::jsonb,
  'Adolescents seek autonomy and develop a stronger sense of identity; peer influence is significant.',
  '["Have regular family meetings to discuss issues", "Encourage involvement in extracurricular activities that align with their interests"]'::jsonb
);

-- Insert implementation data
INSERT INTO public.book_implementation (book_id, getting_started, common_obstacles, success_metrics, time_investment, difficulty_level, family_adaptation)
VALUES (
  'e8f1a2b3-c4d5-4e6f-7a8b-9c0d1e2f3a4b',
  '["Identify your own attachment style using the guidelines in Chapter 3.", "Determine your partner''s attachment style as described in Chapter 4.", "Use the insights from your attachment styles to improve communication and address conflicts as outlined in Chapters 11 and 12."]'::jsonb,
  '["Difficulty in accurately identifying attachment styles.", "Resistance to change from partners with avoidant attachment styles.", "Misinterpretation of attachment behaviors leading to conflict."]'::jsonb,
  '["Improved communication and understanding between partners.", "Reduction in relationship conflicts and misunderstandings.", "Increased satisfaction and stability in the relationship."]'::jsonb,
  'Commit to regular reflection and discussion sessions, approximately 1-2 hours per week.',
  'moderate',
  'Families with diverse attachment styles may need to tailor communication strategies and conflict resolution techniques to accommodate different needs and preferences.'
);

-- Insert expert reflection
INSERT INTO public.book_expert_reflections (book_id, overall_assessment, recommendation_level, best_fit_families, implementation_priority, long_term_impact)
VALUES (
  'e8f1a2b3-c4d5-4e6f-7a8b-9c0d1e2f3a4b',
  'The book provides a comprehensive and insightful exploration of adult attachment theory, offering practical applications for improving romantic relationships.',
  'highly_recommended',
  'Families with members who are struggling with relationship dynamics, particularly those who are interested in understanding and improving their romantic relationships.',
  'high',
  'The book is expected to have a significant long-term impact on family dynamics by fostering healthier relationships and improving communication and understanding between partners.'
);

-- Insert sample chapters
INSERT INTO public.book_chapters (book_id, chapter_number, title, key_points, practical_advice, examples_case_studies, main_takeaway)
VALUES 
(
  'e8f1a2b3-c4d5-4e6f-7a8b-9c0d1e2f3a4b',
  1,
  'Chapter 1. - Decoding Relationship Behavior',
  '["Understanding the underlying motivations behind children''s behavior.", "Recognizing the impact of parental behavior on child development.", "Identifying patterns in family dynamics that influence behavior."]'::jsonb,
  '["Observe and reflect on your own behavior and its impact on your child.", "Communicate openly with your child to understand their perspective."]'::jsonb,
  '["A case study of a family where improved communication resolved behavioral issues.", "An example of how a parent''s stress levels affected their child''s behavior."]'::jsonb,
  'Understanding and decoding relationship behavior is crucial for fostering a healthy family dynamic and supporting children''s emotional development.'
),
(
  'e8f1a2b3-c4d5-4e6f-7a8b-9c0d1e2f3a4b',
  2,
  'Chapter 2. - Dependency Is Not a Bad Word',
  '["Dependency is a natural and essential part of human relationships.", "Understanding different attachment styles can help in nurturing healthy dependencies.", "Healthy dependency fosters security and confidence in children."]'::jsonb,
  '["Identify your child''s attachment style to better support their needs.", "Encourage open communication to strengthen the parent-child bond."]'::jsonb,
  '["A case study of a child with secure attachment thriving in school.", "An example of how understanding dependency improved a parent-child relationship."]'::jsonb,
  'Dependency, when understood and nurtured correctly, is a vital component of healthy relationships and child development.'
);