
export default function Footer() {
  return (
    <footer className="bg-card py-4 sm:py-6 mt-6 sm:mt-10">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
          <div className="flex items-center">
            <span className="material-icons text-primary text-2xl mr-2">web</span>
            <span className="font-medium text-xl">WebGen</span>
          </div>
          
          <div className="text-muted-foreground text-xs sm:text-sm">
            &copy; {new Date().getFullYear()} WebGen. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
