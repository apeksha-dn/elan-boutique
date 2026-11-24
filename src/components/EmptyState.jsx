import { Link } from 'react-router-dom';

export default function EmptyState({ icon: Icon, title, text, actionLabel, actionTo, onAction }) {
  return (
    <div className="empty">
      {Icon && <Icon size={34} strokeWidth={1} aria-hidden="true" />}
      <h2>{title}</h2>
      <p>{text}</p>
      {actionTo && <Link to={actionTo} className="btn btn--dark">{actionLabel}</Link>}
      {onAction && <button className="btn btn--dark" onClick={onAction}>{actionLabel}</button>}
    </div>
  );
}
