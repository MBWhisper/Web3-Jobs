import { footerColumns } from '@/lib/data';

export function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* FAQ Links */}
        <div className="mb-8 space-y-2">
          <a
            href="#"
            className="block text-gray-400 hover:text-accent-pink transition-colors text-sm"
          >
            What states have the most Web3 developer jobs? ▼
          </a>
          <a
            href="#"
            className="block text-gray-400 hover:text-accent-pink transition-colors text-sm"
          >
            What cities are hiring the most for cryptocurrency jobs? ▼
          </a>
        </div>

        {/* Footer Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 py-8 border-t border-gray-800">
          {footerColumns.map((column, colIndex) => (
            <div key={colIndex}>
              <h4 className="text-white font-semibold mb-4">{column.title}</h4>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li
                    key={linkIndex}
                    className="animate-slide-in-left"
                    style={{ animationDelay: `${linkIndex * 0.05}s` }}
                  >
                    <a
                      href={link.href}
                      className="text-gray-500 hover:text-accent-pink transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">
            © wagmi 2025 <span className="text-accent-pink">Web3 Jobs</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
