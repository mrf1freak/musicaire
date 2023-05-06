import Suggestions from "./suggestions";
import { type SuggestionsProps } from "./suggestions";

export default function SuggestionsContainer({
  suggestions,
  isLoading,
}: {
  suggestions: SuggestionsProps | undefined;
  isLoading: boolean;
}) {
  if (isLoading) return <div>Loading...</div>;
  if (!suggestions) return null;

  return <Suggestions {...suggestions} />;
}
