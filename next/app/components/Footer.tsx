import React from 'react'

const Footer = () => {
  return (
  <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content items-center p-4">
  <div className="flex flex-col sm:flex-row sm:justify-between w-full items-center gap-4">

    {/* Contact info with icons */}
    <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
      {/* Email */}
      <a href="mailto:kyletan24003@gmail.com" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 12.713l-11.99-7.713v16h23.979v-16l-11.989 7.713zm0-2.426l11.99-7.713h-23.979l11.989 7.713z"/>
        </svg>
        <span>kyletan24003@gmail.com</span>
      </a>

      {/* Phone */}
      <a href="tel:+61404711829" className="flex items-center gap-2 hover:text-green-400 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.21.49 2.53.76 3.88.76a1 1 0 011 1v3.5a1 1 0 01-1 1C9.94 22 2 14.06 2 4.5a1 1 0 011-1H6.5a1 1 0 011 1c0 1.35.26 2.67.76 3.88a1 1 0 01-.21 1.11l-2.2 2.2z"/>
        </svg>
        <span>+61 404 711 829</span>
      </a>
    </div>

    {/* Social icons */}
    <nav className="flex gap-4">
      <a href="https://www.linkedin.com/in/kyle24/" target="_blank" rel="noopener noreferrer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current hover:text-blue-500 transition-colors"
        >
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11.75 20h-3.25v-10h3.25v10zm-1.625-11.25c-1.042 0-1.875-.842-1.875-1.875s.833-1.875 1.875-1.875 1.875.842 1.875 1.875-.833 1.875-1.875 1.875zm13.375 11.25h-3.25v-5.5c0-1.31-.026-2.992-1.825-2.992-1.826 0-2.106 1.428-2.106 2.902v5.59h-3.25v-10h3.125v1.367h.045c.435-.825 1.496-1.694 3.078-1.694 3.292 0 3.895 2.168 3.895 4.983v5.344z"/>
        </svg>
      </a>
    </nav>

  </div>
</footer>
);
}

export default Footer