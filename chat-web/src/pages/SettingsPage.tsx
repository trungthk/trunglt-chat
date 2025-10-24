import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { logoutAsync } from "../features/auth/authSlice";
import { setLanguage, updateNotificationSettings, toggleNotifications } from "../features/ui/uiSlice";
import { useTranslations } from "../utils/translations";
import Avatar from "../components/ui/Avatar";

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const loggingOut = useAppSelector((state) => state.auth.loggingOut);
  const language = useAppSelector((state) => state.ui.language);
  const notifications = useAppSelector((state) => state.ui.notifications);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  
  const t = useTranslations(language);

  const handleLogout = async () => {
    try {
      // Dispatch the logout action
      await dispatch(logoutAsync()).unwrap();
      
      // Navigate to login page after successful logout
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
      
      // Navigate to login even if API call failed
      // since the local state has been cleared
      navigate("/login", { replace: true });
    } finally {
      setShowConfirmDialog(false);
    }
  };

  const handleLogoutClick = () => {
    setShowConfirmDialog(true);
  };

  const handleCancel = () => {
    setShowConfirmDialog(false);
  };

  const handleLanguageChange = (newLanguage: string) => {
    dispatch(setLanguage(newLanguage));
  };

  const handleNotificationToggle = (setting: string, value: boolean) => {
    if (setting === 'enabled') {
      dispatch(toggleNotifications());
    } else {
      dispatch(updateNotificationSettings({ [setting]: value }));
    }
  };

  const handleTestNotification = async () => {
    const { notificationService } = await import("../services/notification");
    await notificationService.showNotificationWithSettings(
      {
        title: language === 'vi' ? 'Thông báo thử nghiệm' : 'Test Notification',
        body: language === 'vi' 
          ? 'Đây là thông báo thử nghiệm để kiểm tra cài đặt của bạn.' 
          : 'This is a test notification to check your settings.',
        icon: '/favicon.ico'
      },
      notifications
    );
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">{t.userSettings}</h2>
      
      {/* User Profile Section */}
      <div className="flex items-center gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
        <Avatar src={user?.avatar} alt={user?.name} size="lg" />
        <div>
          <p className="font-medium text-lg">{user?.name || "Anonymous User"}</p>
          <p className="text-sm text-gray-500">{user?.email || "No email provided"}</p>
        </div>
      </div>

      {/* Settings Options */}
      <div className="space-y-6 mb-8">
        {/* Account Section */}
        <div className="p-6 border rounded-lg">
          <h3 className="font-medium mb-2">{t.account}</h3>
          <p className="text-sm text-gray-600 mb-4">
            {t.accountDescription}
          </p>
          <button className="text-blue-600 text-sm hover:text-blue-800 font-medium">
            {t.editProfile}
          </button>
        </div>

        {/* Language Section */}
        <div className="p-6 border rounded-lg">
          <h3 className="font-medium mb-3">{t.language}</h3>
          <p className="text-sm text-gray-600 mb-4">{t.selectLanguage}</p>
          <div className="flex gap-3">
            <button
              onClick={() => handleLanguageChange('vi')}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                language === 'vi'
                  ? 'bg-blue-100 border-blue-300 text-blue-800 font-medium'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {t.vietnamese}
            </button>
            <button
              onClick={() => handleLanguageChange('en')}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                language === 'en'
                  ? 'bg-blue-100 border-blue-300 text-blue-800 font-medium'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {t.english}
            </button>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="p-6 border rounded-lg">
          <h3 className="font-medium mb-3">{t.notifications}</h3>
          <p className="text-sm text-gray-600 mb-4">
            {t.notificationDescription}
          </p>
          
          <div className="space-y-4">
            {/* Main notification toggle */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{t.enableNotifications}</p>
                <p className="text-sm text-gray-500">
                  {notifications.enabled ? t.enabled : t.disabled}
                </p>
              </div>
              <button
                onClick={() => handleNotificationToggle('enabled', !notifications.enabled)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  notifications.enabled ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                    notifications.enabled ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>

            {/* Individual notification settings */}
            {notifications.enabled && (
              <div className="ml-4 space-y-3 border-l-2 border-gray-200 pl-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">{t.soundNotifications}</span>
                  <button
                    onClick={() => handleNotificationToggle('sound', !notifications.sound)}
                    className={`w-10 h-5 rounded-full transition-colors ${
                      notifications.sound ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform ${
                        notifications.sound ? 'translate-x-5' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">{t.desktopNotifications}</span>
                  <button
                    onClick={() => handleNotificationToggle('desktop', !notifications.desktop)}
                    className={`w-10 h-5 rounded-full transition-colors ${
                      notifications.desktop ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform ${
                        notifications.desktop ? 'translate-x-5' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">{t.pushNotifications}</span>
                  <button
                    onClick={() => handleNotificationToggle('push', !notifications.push)}
                    className={`w-10 h-5 rounded-full transition-colors ${
                      notifications.push ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform ${
                        notifications.push ? 'translate-x-5' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">{t.emailNotifications}</span>
                  <button
                    onClick={() => handleNotificationToggle('email', !notifications.email)}
                    className={`w-10 h-5 rounded-full transition-colors ${
                      notifications.email ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform ${
                        notifications.email ? 'translate-x-5' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
              </div>
            )}
            
            {/* Test notification button */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={handleTestNotification}
                className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium"
              >
                {language === 'vi' ? 'Thử thông báo' : 'Test Notification'}
              </button>
            </div>
          </div>
        </div>

        {/* Privacy Section */}
        <div className="p-6 border rounded-lg">
          <h3 className="font-medium mb-2">{t.privacy}</h3>
          <p className="text-sm text-gray-600 mb-4">
            {t.privacyDescription}
          </p>
          <button className="text-blue-600 text-sm hover:text-blue-800 font-medium">
            {t.privacySettings}
          </button>
        </div>
      </div>

      {/* Logout Button */}
      <div className="pt-6 border-t">
        <button
          onClick={handleLogoutClick}
          disabled={loggingOut}
          className={`w-full px-6 py-3 rounded-lg font-medium transition-colors ${
            loggingOut
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-red-500 hover:bg-red-600 text-white"
          }`}
        >
          {loggingOut ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
              {t.loggingOut}
            </div>
          ) : (
            t.logout
          )}
        </button>
        
        <p className="text-xs text-gray-500 mt-2 text-center">
          {t.redirectMessage}
        </p>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
            <div className="text-center mb-4">
              <div className="text-3xl mb-2">⚠️</div>
              <h3 className="text-lg font-medium">{t.confirmLogout}</h3>
            </div>
            <p className="text-gray-600 mb-6 text-center">
              {t.logoutDescription}
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                disabled={loggingOut}
              >
                {t.cancel}
              </button>
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:bg-gray-400 font-medium"
              >
                {loggingOut ? t.loggingOut : t.logout}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
