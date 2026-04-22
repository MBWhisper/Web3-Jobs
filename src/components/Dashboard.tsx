import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { jobsApi } from '@/lib/api';
import type { Job } from '@/types';
import { Button } from '@/components/ui/button';

export const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        // In a real implementation, this would fetch user's saved jobs
        // For now, we'll simulate with recent jobs
        const jobs = await jobsApi.getAll();
        setSavedJobs(jobs.slice(0, 5)); // Show first 5 jobs as example
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load saved jobs');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchSavedJobs();
    }
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Please log in to access the dashboard.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-bg-secondary rounded-xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold">Welcome to Your Dashboard</h1>
              <p className="text-gray-400">Hello, {user.email}</p>
            </div>
            <Button onClick={handleSignOut} variant="outline">
              Sign Out
            </Button>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Your Saved Jobs</h2>
            
            {loading ? (
              <div className="text-center py-8">Loading your saved jobs...</div>
            ) : error ? (
              <div className="text-center py-8 text-red-500">{error}</div>
            ) : savedJobs.length > 0 ? (
              <div className="space-y-4">
                {savedJobs.map((job) => (
                  <div 
                    key={job.id} 
                    className="p-4 border border-border-primary rounded-lg bg-bg-tertiary"
                  >
                    <h3 className="font-semibold">{job.title}</h3>
                    <p className="text-sm text-gray-400">{job.company}</p>
                    <p className="text-sm mt-2">{job.description.substring(0, 100)}...</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                You haven't saved any jobs yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};