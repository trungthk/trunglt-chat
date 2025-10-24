// Multi-language translations for the chat app

export interface Translations {
  // Common
  save: string;
  cancel: string;
  yes: string;
  no: string;
  enabled: string;
  disabled: string;
  
  // Navigation
  settings: string;
  logout: string;
  profile: string;
  
  // Settings page
  userSettings: string;
  account: string;
  notifications: string;
  privacy: string;
  language: string;
  
  // Notifications
  notificationSettings: string;
  enableNotifications: string;
  soundNotifications: string;
  desktopNotifications: string;
  emailNotifications: string;
  pushNotifications: string;
  notificationDescription: string;
  
  // Account
  editProfile: string;
  accountDescription: string;
  
  // Privacy
  privacySettings: string;
  privacyDescription: string;
  
  // Logout
  confirmLogout: string;
  logoutDescription: string;
  loggingOut: string;
  redirectMessage: string;
  
  // Languages
  vietnamese: string;
  english: string;
  selectLanguage: string;
  
  // Channels
  channels: string;
  allChannels: string;
  noChannels: string;
  channel: string;
  
  // Messages
  messages: string;
  noMessages: string;
  newMessage: string;
  sendMessage: string;
}

const translations: Record<string, Translations> = {
  vi: {
    // Common
    save: 'Lưu',
    cancel: 'Hủy',
    yes: 'Có',
    no: 'Không',
    enabled: 'Bật',
    disabled: 'Tắt',
    
    // Navigation
    settings: 'Cài đặt',
    logout: 'Đăng xuất',
    profile: 'Hồ sơ',
    
    // Settings page
    userSettings: 'Cài đặt người dùng',
    account: 'Tài khoản',
    notifications: 'Thông báo',
    privacy: 'Quyền riêng tư',
    language: 'Ngôn ngữ',
    
    // Notifications
    notificationSettings: 'Cài đặt thông báo',
    enableNotifications: 'Bật thông báo',
    soundNotifications: 'Âm thanh thông báo',
    desktopNotifications: 'Thông báo desktop',
    emailNotifications: 'Thông báo email',
    pushNotifications: 'Thông báo đẩy',
    notificationDescription: 'Quản lý cách bạn nhận thông báo',
    
    // Account
    editProfile: 'Chỉnh sửa hồ sơ',
    accountDescription: 'Quản lý cài đặt tài khoản và tùy chọn của bạn',
    
    // Privacy
    privacySettings: 'Cài đặt quyền riêng tư',
    privacyDescription: 'Kiểm soát quyền riêng tư và cài đặt dữ liệu của bạn',
    
    // Logout
    confirmLogout: 'Xác nhận đăng xuất',
    logoutDescription: 'Bạn có chắc chắn muốn đăng xuất? Bạn sẽ cần đăng nhập lại để truy cập tài khoản.',
    loggingOut: 'Đang đăng xuất...',
    redirectMessage: 'Bạn sẽ được chuyển hướng đến trang đăng nhập',
    
    // Languages
    vietnamese: 'Tiếng Việt',
    english: 'English',
    selectLanguage: 'Chọn ngôn ngữ',
    
    // Channels
    channels: 'Kênh',
    allChannels: 'Tất cả kênh',
    noChannels: 'Chưa có kênh nào',
    channel: 'Kênh',
    
    // Messages
    messages: 'Tin nhắn',
    noMessages: 'Chưa có tin nhắn',
    newMessage: 'Tin nhắn mới',
    sendMessage: 'Gửi tin nhắn',
  },
  
  en: {
    // Common
    save: 'Save',
    cancel: 'Cancel',
    yes: 'Yes',
    no: 'No',
    enabled: 'Enabled',
    disabled: 'Disabled',
    
    // Navigation
    settings: 'Settings',
    logout: 'Logout',
    profile: 'Profile',
    
    // Settings page
    userSettings: 'User Settings',
    account: 'Account',
    notifications: 'Notifications',
    privacy: 'Privacy',
    language: 'Language',
    
    // Notifications
    notificationSettings: 'Notification Settings',
    enableNotifications: 'Enable Notifications',
    soundNotifications: 'Sound Notifications',
    desktopNotifications: 'Desktop Notifications',
    emailNotifications: 'Email Notifications',
    pushNotifications: 'Push Notifications',
    notificationDescription: 'Configure how you receive notifications',
    
    // Account
    editProfile: 'Edit Profile',
    accountDescription: 'Manage your account settings and preferences',
    
    // Privacy
    privacySettings: 'Privacy Settings',
    privacyDescription: 'Control your privacy and data settings',
    
    // Logout
    confirmLogout: 'Confirm Logout',
    logoutDescription: 'Are you sure you want to logout? You will need to login again to access your account.',
    loggingOut: 'Logging out...',
    redirectMessage: 'You will be redirected to the login page',
    
    // Languages
    vietnamese: 'Tiếng Việt',
    english: 'English',
    selectLanguage: 'Select Language',
    
    // Channels
    channels: 'Channels',
    allChannels: 'All Channels',
    noChannels: 'No channels yet',
    channel: 'Channel',
    
    // Messages
    messages: 'Messages',
    noMessages: 'No messages yet',
    newMessage: 'New message',
    sendMessage: 'Send message',
  }
};

// Hook to use translations based on current language
export const useTranslations = (language: string): Translations => {
  return translations[language] || translations.vi; // Fallback to Vietnamese
};

export default translations;