import React from 'react'
import Link from 'next/link'
const BreadCrumbs = ({ links }: BreadCrumbsProps) => {
  return (
    <div className="px-5 font-semibold breadcrumbs text-sm pt-16 mt-2 bg-black/40 text-white">
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        {links.map((link, idx) => (
          <li key={idx}>
            {link.href ? (
              <Link href={link.href}>{link.text}</Link>
            ) : (
              <p>{link.text}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BreadCrumbs