const fs = require('fs');
let content = fs.readFileSync('src/pages/Admin.jsx', 'utf8');

const newLock =   useEffect(() => {
    if (selectedEvent || selectedGallery || selectedMember) {
      document.body.classList.add('overflow-hidden');
      document.documentElement.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
      document.documentElement.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
      document.documentElement.classList.remove('overflow-hidden');
    };
  }, [selectedEvent, selectedGallery, selectedMember]);;

content = content.replace(/  useEffect\(\(\) => \{\n    if \(selectedEvent \|\| selectedGallery \|\| selectedMember\) \{\n      document\.body\.style\.overflow = 'hidden';\n      document\.documentElement\.style\.overflow = 'hidden';\n    \} else \{\n      document\.body\.style\.overflow = '';\n      document\.documentElement\.style\.overflow = '';\n    \}\n    return \(\) => \{\n      document\.body\.style\.overflow = '';\n      document\.documentElement\.style\.overflow = '';\n    \};\n  \}, \[selectedEvent, selectedGallery, selectedMember\]\);/g, newLock);

content = content.replace(
  /<div className="fixed inset-0 z-50 flex items-center justify-center p-4">\s*<div className="absolute inset-0 bg-black\/60 backdrop-blur-sm" (onClick=\{[^}]+\})><\/div>\s*<div className="relative bg-surface-container rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl\s*max-h-\[90vh\] overflow-y-auto">/g,
  <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="min-h-full flex items-center justify-center p-4">
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" ></div>
              <div className="relative bg-surface-container rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl my-8">
);

content = content.replace(
  /<div className="fixed inset-0 z-50 flex items-center justify-center p-4">\s*<div className="absolute inset-0 bg-black\/60 backdrop-blur-sm" (onClick=\{[^}]+\})><\/div>\s*<div className="relative bg-surface-container rounded-3xl p-6 md:p-8 max-w-4xl w-full shadow-2xl\s*max-h-\[90vh\] overflow-y-auto">/g,
  <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="min-h-full flex items-center justify-center p-4">
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" ></div>
              <div className="relative bg-surface-container rounded-3xl p-6 md:p-8 max-w-4xl w-full shadow-2xl my-8">
);

// Close the inner wrapper div
content = content.replace(
  /<\/div>\s*<\/div>\s*\)\}/g,
  </div>
            </div>
          </div>
        )}
);

fs.writeFileSync('src/pages/Admin.jsx', content);
console.log("Done");
