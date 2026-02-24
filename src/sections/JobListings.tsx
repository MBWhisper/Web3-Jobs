import { useState, useMemo } from 'react';
import { JobCard } from '@/components/JobCard';
import { JobDetail } from '@/components/JobDetail';
import { SearchBar } from '@/components/SearchBar';
import { TagCloud } from '@/components/TagCloud';
import { ReportBanner } from '@/components/ReportBanner';
import { jobs } from '@/lib/data';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';

export function JobListings() {
  const isMobile = useIsMobile();
  const [selectedJobId, setSelectedJobId] = useState<string>(jobs[0].id);
  const [mobileSelectedJobId, setMobileSelectedJobId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [remoteOnly, setRemoteOnly] = useState(false);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Search filter
      const matchesSearch = 
        searchQuery === '' ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase());

      // Tag filter
      const matchesTags = 
        selectedTags.length === 0 ||
        selectedTags.some((tag) => job.tags.includes(tag));

      // Remote filter
      const matchesRemote = !remoteOnly || job.isRemote;

      return matchesSearch && matchesTags && matchesRemote;
    });
  }, [searchQuery, selectedTags, remoteOnly]);

  const selectedJob = useMemo(() => {
    return jobs.find((job) => job.id === selectedJobId) || jobs[0];
  }, [selectedJobId]);

  const mobileSelectedJob = useMemo(() => {
    if (!mobileSelectedJobId) return null;
    return jobs.find((job) => job.id === mobileSelectedJobId) || null;
  }, [mobileSelectedJobId]);

  const handleTagSelect = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <section id="job-listings" className="relative py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Report Banner */}
        <div className="mb-8">
          <ReportBanner />
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            remoteOnly={remoteOnly}
            onRemoteChange={setRemoteOnly}
          />
          <TagCloud
            selectedTags={selectedTags}
            onTagSelect={handleTagSelect}
          />
        </div>

        {/* Job Listings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Job Cards List */}
          <ScrollArea className="h-[800px] scrollbar-custom pr-4">
            <div className="space-y-4">
              {filteredJobs.map((job, index) => (
                <div
                  key={job.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <JobCard
                    job={job}
                    isSelected={selectedJobId === job.id}
                    onClick={() => {
                      if (isMobile) {
                        setMobileSelectedJobId(job.id);
                      } else {
                        setSelectedJobId(job.id);
                      }
                    }}
                  />
                </div>
              ))}
              
              {filteredJobs.length === 0 && (
                <div className="text-center py-12 text-gray-500 animate-fade-in">
                  No jobs found matching your criteria.
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Job Detail Panel */}
          <div className="hidden lg:block h-[800px] sticky top-24">
            <JobDetail key={selectedJob.id} job={selectedJob} />
          </div>
        </div>

        {/* Mobile Job Detail Modal */}
        {mobileSelectedJob && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm lg:hidden animate-fade-in"
            onClick={() => setMobileSelectedJobId(null)}
          >
            <div
              className="absolute bottom-0 left-0 right-0 h-[85vh] bg-bg-secondary rounded-t-2xl overflow-hidden animate-slide-up"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <div className="h-full">
                <JobDetail job={mobileSelectedJob} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
