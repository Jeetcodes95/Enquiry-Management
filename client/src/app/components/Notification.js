'use client';

import { BellIcon } from '@heroicons/react/outline';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Howl } from 'howler';

export default function NotificationBell({ userId }) {
  const [notifications, setNotifications] = useState([]);
  const [count, setCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    if (!userId) return; 

    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`/api/notifications/${userId}`);
        const data = response.data;
        setNotifications(data.notifications);

        const lastSeenCount = parseInt(localStorage.getItem('lastSeenCount'), 10) || 0;
        const newCount = data.notifications.length - lastSeenCount;
        setCount(newCount > 0 ? newCount : 0);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();

    const interval = setInterval(fetchNotifications, 5000);

    return () => clearInterval(interval);
  }, [userId]);

  useEffect(() => {
    if (count > 0) {
      const savedSoundPreference = localStorage.getItem('soundEnabled');
      if (savedSoundPreference === null) {
        const userResponse = window.confirm('You have new notifications. Would you like to enable sound notifications?');
        if (userResponse) {
          localStorage.setItem('soundEnabled', 'true');
          setSoundEnabled(true);
        } else {
          localStorage.setItem('soundEnabled', 'false');
        }
      } else {
        setSoundEnabled(savedSoundPreference === 'true');
      }
    }
  }, [count]);

  useEffect(() => {
    if (soundEnabled && count > 0) {
      const sound = new Howl({
        src: ['/bellring.wav'],
      });
      sound.play();
    }
  }, [soundEnabled, count]);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      localStorage.setItem('lastSeenCount', notifications.length);
      setCount(0); // Reset count when notifications are viewed
    }
  };

  return (
    <div className="relative">
      <div onClick={toggleNotifications} className="cursor-pointer">
        <BellIcon className="w-8 h-8 text-gray-800 dark:text-gray-200" />
        {count > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
            {count}
          </span>
        )}
      </div>
      {showNotifications && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-y-auto max-h-60">
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <div key={notification._id} className="p-2 border-b border-gray-200 ">
                <h6 className='font-light text-xs'>
                {index+1}. {notification.message}
                </h6>
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-500">No new notifications</div>
          )}
        </div>
      )}
    </div>
  );
}
