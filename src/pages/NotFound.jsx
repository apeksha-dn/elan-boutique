import { SearchX } from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import EmptyState from '../components/EmptyState';

export default function NotFound() {
  useDocumentTitle('Page not found');
  return (
    <section className="container section--tight">
      <EmptyState icon={SearchX} title="We couldn’t find that page" text="The link may be broken or the piece may no longer be available." actionLabel="Back to home" actionTo="/" />
    </section>
  );
}
