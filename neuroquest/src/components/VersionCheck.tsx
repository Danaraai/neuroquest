'use client';

import { useEffect, useState } from 'react';

interface VersionData {
  version: string;
  timestamp: number;
}

export function VersionCheck() {
  const [showUpdateNotification, setShowUpdateNotification] = useState(false);

  useEffect(() => {
    const checkForUpdates = async () => {
      try {
        // Fetch the version file with cache-busting query param
        const response = await fetch(`/version.json?t=${Date.now()}`);
        const remoteVersion: VersionData = await response.json();

        // Get stored version from localStorage
        const storedVersion = localStorage.getItem('app-version');

        // If no stored version or versions differ, show notification
        if (!storedVersion || storedVersion !== remoteVersion.timestamp.toString()) {
          // Only show notification if user has already visited before
          if (storedVersion) {
            setShowUpdateNotification(true);
          }
          // Update stored version
          localStorage.setItem('app-version', remoteVersion.timestamp.toString());
        }
      } catch (error) {
        console.error('Failed to check for updates:', error);
      }
    };

    checkForUpdates();
  }, []);

  if (!showUpdateNotification) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-3 rounded-lg shadow-lg z-50 max-w-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-semibold">New version available</p>
          <p className="text-sm text-blue-100">Refresh to get the latest features</p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded text-sm font-semibold whitespace-nowrap transition-colors"
        >
          Refresh
        </button>
        <button
          onClick={() => setShowUpdateNotification(false)}
          className="text-blue-200 hover:text-white text-xl leading-none"
        >
          ×
        </button>
      </div>
    </div>
  );
}
