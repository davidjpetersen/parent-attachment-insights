import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import BookSummary from "@/components/BookSummary";

// Sample book data - in a real app this would come from an API
const bookData = {
  "metadata": {
    "title": "Attached: The New Science of Adult Attachment and How It Can Help You Find—and Keep—Love",
    "author": "Amir Levine, M.D. and Rachel Heller, M.A.",
    "publication_year": 2010,
    "isbn": null,
    "page_count": 300,
    "genre": "Psychology, Relationships",
    "target_audience": "Adults seeking to improve their relationships",
    "reading_level": "General audience"
  },
  "central_message": {
    "main_thesis": "The book's primary argument is that understanding adult attachment styles can significantly improve romantic relationships by helping individuals find and maintain love.",
    "key_takeaway": "Parents should learn that recognizing and understanding their own and their partner's attachment styles can lead to healthier and more fulfilling relationships.",
    "one_sentence_summary": "The book explains how understanding adult attachment styles can help individuals find and maintain love by improving relationship dynamics.",
    "target_problem": "The book addresses the problem of relationship difficulties stemming from mismatched or misunderstood attachment styles.",
    "proposed_solution": "The authors propose that by identifying and understanding one's own and their partner's attachment styles, individuals can improve communication, resolve conflicts, and build stronger, more secure relationships."
  },
  "evidence_quality": {
    "research_based": true,
    "source_types": [
      "academic studies",
      "clinical experience"
    ],
    "study_citations": 0,
    "expert_credentials": "Amir Levine, M.D., and Rachel Heller, M.A., with backgrounds in mental health and attachment theory.",
    "evidence_strength": "moderate",
    "bias_assessment": "The evidence may be biased towards attachment theory as the primary explanation for relationship behaviors, potentially overlooking other psychological or social factors."
  },
  "core_concepts": [
    {
      "concept_name": "Understanding Adult Attachment Styles",
      "description": "The book explains that adult attachment styles are patterns in which people perceive and respond to intimacy in romantic relationships. These styles are Secure, Anxious, and Avoidant, and they influence how individuals behave in relationships.",
      "supporting_evidence": "The authors reference research by Cindy Hazan and Phillip Shaver, which indicates that adults show patterns of attachment similar to those found in children.",
      "practical_application": "Parents can use this understanding to recognize their own attachment styles and how these might affect their relationships with their children and partners.",
      "potential_challenges": "Parents might struggle to identify their own attachment style or may find it difficult to change ingrained patterns of behavior."
    },
    {
      "concept_name": "Impact of Attachment Styles on Relationships",
      "description": "Attachment styles affect various aspects of relationships, including intimacy, conflict resolution, communication, and expectations. Secure individuals are comfortable with intimacy, anxious individuals crave it, and avoidant individuals shy away from it.",
      "supporting_evidence": "The book provides examples of how different attachment styles manifest in relationships, such as the case of Tamara and Greg.",
      "practical_application": "Parents can apply this concept by observing how their attachment style influences their parenting and work to foster a secure attachment with their children.",
      "potential_challenges": "Parents may find it challenging to change their attachment style or may not recognize how their style affects their children."
    },
    {
      "concept_name": "Evolutionary Basis of Attachment",
      "description": "The need for close relationships is embedded in our genes, as attachment provided a survival advantage in prehistoric times. This evolutionary perspective explains why attachment behaviors are so deeply ingrained.",
      "supporting_evidence": "The authors discuss John Bowlby's theory that humans are programmed to form intimate bonds for survival.",
      "practical_application": "Parents can use this understanding to appreciate the importance of forming secure attachments with their children, recognizing it as a fundamental human need.",
      "potential_challenges": "Parents might find it difficult to balance their own needs for independence with the need to form close bonds with their children."
    }
  ],
  "age_applications": {
    "infants_toddlers": {
      "age_range": "0-2 years",
      "specific_strategies": [
        "Ensure consistent and responsive caregiving",
        "Engage in face-to-face interactions and play",
        "Provide a safe and secure environment"
      ],
      "developmental_considerations": "Attachment formation is crucial; infants need to feel secure and cared for.",
      "practical_examples": [
        "Respond promptly to crying and distress",
        "Play peek-a-boo to encourage social interaction"
      ]
    },
    "preschoolers": {
      "age_range": "3-5 years",
      "specific_strategies": [
        "Encourage exploration while providing a secure base",
        "Foster social skills through play",
        "Use positive reinforcement to guide behavior"
      ],
      "developmental_considerations": "Children begin to explore independence but still need reassurance from caregivers.",
      "practical_examples": [
        "Allow them to play independently but stay nearby",
        "Praise sharing and cooperative play with peers"
      ]
    },
    "school_age": {
      "age_range": "6-11 years",
      "specific_strategies": [
        "Support emotional expression and understanding",
        "Encourage problem-solving and critical thinking",
        "Promote healthy peer relationships"
      ],
      "developmental_considerations": "Children develop a sense of competence and self-esteem; peer relationships become more important.",
      "practical_examples": [
        "Discuss feelings and emotions openly",
        "Encourage participation in team sports or group activities"
      ]
    },
    "teenagers": {
      "age_range": "12+ years",
      "specific_strategies": [
        "Respect their need for independence while providing guidance",
        "Encourage open communication about challenges",
        "Support identity exploration and self-discovery"
      ],
      "developmental_considerations": "Adolescents seek autonomy and develop a stronger sense of identity; peer influence is significant.",
      "practical_examples": [
        "Have regular family meetings to discuss issues",
        "Encourage involvement in extracurricular activities that align with their interests"
      ]
    }
  },
  "implementation": {
    "getting_started": [
      "Identify your own attachment style using the guidelines in Chapter 3.",
      "Determine your partner's attachment style as described in Chapter 4.",
      "Use the insights from your attachment styles to improve communication and address conflicts as outlined in Chapters 11 and 12."
    ],
    "common_obstacles": [
      "Difficulty in accurately identifying attachment styles.",
      "Resistance to change from partners with avoidant attachment styles.",
      "Misinterpretation of attachment behaviors leading to conflict."
    ],
    "success_metrics": [
      "Improved communication and understanding between partners.",
      "Reduction in relationship conflicts and misunderstandings.",
      "Increased satisfaction and stability in the relationship."
    ],
    "time_investment": "Commit to regular reflection and discussion sessions, approximately 1-2 hours per week.",
    "difficulty_level": "moderate",
    "family_adaptation": "Families with diverse attachment styles may need to tailor communication strategies and conflict resolution techniques to accommodate different needs and preferences."
  },
  "expert_reflection": {
    "overall_assessment": "The book provides a comprehensive and insightful exploration of adult attachment theory, offering practical applications for improving romantic relationships.",
    "recommendation_level": "highly_recommended",
    "best_fit_families": "Families with members who are struggling with relationship dynamics, particularly those who are interested in understanding and improving their romantic relationships.",
    "implementation_priority": "high",
    "long_term_impact": "The book is expected to have a significant long-term impact on family dynamics by fostering healthier relationships and improving communication and understanding between partners."
  },
  "chapters": [
    {
      "chapter_number": 1,
      "title": "Chapter 1. - Decoding Relationship Behavior",
      "key_points": [
        "Understanding the underlying motivations behind children's behavior.",
        "Recognizing the impact of parental behavior on child development.",
        "Identifying patterns in family dynamics that influence behavior."
      ],
      "practical_advice": [
        "Observe and reflect on your own behavior and its impact on your child.",
        "Communicate openly with your child to understand their perspective."
      ],
      "examples_case_studies": [
        "A case study of a family where improved communication resolved behavioral issues.",
        "An example of how a parent's stress levels affected their child's behavior."
      ],
      "main_takeaway": "Understanding and decoding relationship behavior is crucial for fostering a healthy family dynamic and supporting children's emotional development."
    },
    {
      "chapter_number": 2,
      "title": "Chapter 2. - Dependency Is Not a Bad Word",
      "key_points": [
        "Dependency is a natural and essential part of human relationships.",
        "Understanding different attachment styles can help in nurturing healthy dependencies.",
        "Healthy dependency fosters security and confidence in children."
      ],
      "practical_advice": [
        "Identify your child's attachment style to better support their needs.",
        "Encourage open communication to strengthen the parent-child bond."
      ],
      "examples_case_studies": [
        "A case study of a child with secure attachment thriving in school.",
        "An example of how understanding dependency improved a parent-child relationship."
      ],
      "main_takeaway": "Dependency, when understood and nurtured correctly, is a vital component of healthy relationships and child development."
    },
    {
      "chapter_number": 3,
      "title": "Chapter 3. - Step One",
      "key_points": [
        "Understanding different attachment styles is crucial for parenting.",
        "Attachment styles are formed in early childhood and influence behavior.",
        "Identifying your own attachment style can improve your parenting approach."
      ],
      "practical_advice": [
        "Reflect on your childhood experiences to identify your attachment style.",
        "Observe your interactions with your child to see how your attachment style manifests."
      ],
      "examples_case_studies": [
        "A parent with an anxious attachment style may struggle with setting boundaries.",
        "A secure attachment style often leads to more balanced and effective parenting."
      ],
      "main_takeaway": "Recognizing and understanding your attachment style is the first step towards becoming a more effective and empathetic parent."
    },
    {
      "chapter_number": 4,
      "title": "Chapter 4. - Step Two",
      "key_points": [
        "Understanding your partner's attachment style is crucial for relationship success.",
        "There are three main attachment styles: secure, anxious, and avoidant.",
        "Each attachment style has distinct characteristics and behaviors in relationships."
      ],
      "practical_advice": [
        "Observe your partner's behavior to identify their attachment style.",
        "Communicate openly about attachment styles to improve mutual understanding."
      ],
      "examples_case_studies": [
        "A couple where one partner has an anxious attachment style and the other has an avoidant style.",
        "A relationship where both partners have secure attachment styles and how it affects their interactions."
      ],
      "main_takeaway": "Recognizing and understanding your partner's attachment style can enhance communication and strengthen the relationship."
    },
    {
      "chapter_number": 5,
      "title": "Chapter 5. - Living with a Sixth Sense for Danger",
      "key_points": [
        "Anxious attachment style is characterized by a heightened sense of danger and insecurity.",
        "Individuals with this attachment style often seek constant reassurance and validation from others.",
        "This attachment style can lead to challenges in relationships, as the individual may struggle with trust and fear of abandonment."
      ],
      "practical_advice": [
        "Practice self-awareness to recognize and manage anxious thoughts.",
        "Develop healthy communication skills to express needs and concerns in relationships."
      ],
      "examples_case_studies": [
        "A case study of a child who exhibits anxious attachment behaviors in school settings.",
        "An example of an adult who overcomes anxious attachment through therapy and mindfulness practices."
      ],
      "main_takeaway": "Understanding and addressing anxious attachment can lead to healthier relationships and improved emotional well-being."
    }
  ]
};

const BookDetail = () => {
  const { bookId } = useParams();
  
  // In a real app, you'd fetch book data based on bookId
  // For now, we'll show the sample data regardless of bookId
  
  return (
    <div>
      {/* Navigation Header */}
      <div className="bg-background border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <Button asChild variant="ghost" size="sm">
            <Link to="/bookshelf">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Bookshelf
            </Link>
          </Button>
        </div>
      </div>
      
      <BookSummary data={bookData} />
    </div>
  );
};

export default BookDetail;