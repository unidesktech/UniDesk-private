"use client";
import { Search, Bell, ChevronDown, User, Settings } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { calendarConfig, getUserViewById } from "../../../config/calender.config";
import type { UserView } from "../../../models/calendar-config.model";

interface TopNavigationBarProps {
  currentUserView: UserView;
  setCurrentUserView: (view: UserView) => void;
  globalSearch: string;
  setGlobalSearch: (value: string) => void;
  hasNotifications?: boolean;
}

export default function TopNavigationBar({
  currentUserView,
  setCurrentUserView,
  globalSearch,
  setGlobalSearch,
  hasNotifications = true,
}: TopNavigationBarProps) {
  const [viewDropdownOpen, setViewDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  
  const viewDropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const notificationDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (viewDropdownRef.current && !viewDropdownRef.current.contains(event.target as Node)) {
        setViewDropdownOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
      if (notificationDropdownRef.current && !notificationDropdownRef.current.contains(event.target as Node)) {
        setNotificationDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-white border-b px-6 py-3">
      <div className="flex items-center justify-between">
        {calendarConfig.ui.topBarConfig.showGlobalSearch && (
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search events, classes, students..."
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        )}

        <div className="flex items-center gap-4">
          {calendarConfig.ui.topBarConfig.showNotification && (
            <div className="relative" ref={notificationDropdownRef}>
              <button
                onClick={() => setNotificationDropdownOpen(!notificationDropdownOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                {hasNotifications && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>
              
              {notificationDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border py-2 z-50">
                  <div className="px-4 py-3 border-b">
                    <div className="font-medium text-gray-900">Notifications</div>
                    <div className="text-sm text-gray-500">You have 3 unread notifications</div>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    <div className="px-4 py-3 hover:bg-gray-50 border-b cursor-pointer">
                      <div className="font-medium text-sm">New Event Added</div>
                      <div className="text-xs text-gray-500 mt-1">Winter Holiday has been added to the calendar</div>
                      <div className="text-xs text-gray-400 mt-1">2 hours ago</div>
                    </div>
                    <div className="px-4 py-3 hover:bg-gray-50 border-b cursor-pointer">
                      <div className="font-medium text-sm">Meeting Reminder</div>
                      <div className="text-xs text-gray-500 mt-1">Parent Meeting tomorrow at 2:00 PM</div>
                      <div className="text-xs text-gray-400 mt-1">1 day ago</div>
                    </div>
                    <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                      <div className="font-medium text-sm">Exam Schedule</div>
                      <div className="text-xs text-gray-500 mt-1">Semester Exam schedule has been updated</div>
                      <div className="text-xs text-gray-400 mt-1">2 days ago</div>
                    </div>
                  </div>
                  <button className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-gray-50 border-t mt-2">
                    View All Notifications
                  </button>
                </div>
              )}
            </div>
          )}

          {calendarConfig.ui.topBarConfig.showViewSelector && (
            <div className="relative" ref={viewDropdownRef}>
              <button
                onClick={() => setViewDropdownOpen(!viewDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span>{currentUserView.name}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {viewDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 z-50">
                  {calendarConfig.userViews.map((view) => (
                    <button
                      key={view.id}
                      onClick={() => {
                        const userView = getUserViewById(view.id);
                        if (userView) {
                          setCurrentUserView(userView);
                        }
                        setViewDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                        currentUserView.id === view.id
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-700"
                      }`}
                    >
                      {view.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {calendarConfig.ui.topBarConfig.showUserProfile && (
            <div className="relative" ref={userDropdownRef}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-medium text-lg">
                    {currentUserView.initials}
                  </span>
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-gray-900">
                    {currentUserView.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {currentUserView.role}
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
              
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border py-2 z-50">
                  <div className="px-4 py-3 border-b">
                    <div className="font-medium text-gray-900">
                      {currentUserView.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {currentUserView.email}
                    </div>
                    <div className="text-xs text-blue-600 mt-1">
                      {currentUserView.role}
                    </div>
                  </div>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                    <User className="w-4 h-4" /> My Profile
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                    <Bell className="w-4 h-4" /> Notifications
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                    <Settings className="w-4 h-4" /> Settings
                  </button>
                  <div className="border-t mt-2 pt-2">
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}