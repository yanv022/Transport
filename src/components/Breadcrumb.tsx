import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="text-sm mb-6">
      <ol className="flex items-center gap-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {item.href ? (
              <Link to={item.href} className="text-blue-900 hover:underline">
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-600">{item.label}</span>
            )}
            {index < items.length - 1 && <ChevronRight size={16} className="text-gray-400" />}
          </li>
        ))}
      </ol>
    </nav>
  );
};
