import { Link } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  to?: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <p className="text-sm text-gray-500">
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`}>
          {index > 0 && <span className="mx-1.5 text-gray-300">/</span>}
          {item.to ? (
            <Link to={item.to} className="hover:text-sage-700">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-700">{item.label}</span>
          )}
        </span>
      ))}
    </p>
  );
}
