// Notification service for handling browser notifications

export interface NotificationOptions {
  title: string;
  body: string;
  icon?: string;
  tag?: string;
  requireInteraction?: boolean;
}

class NotificationService {
  private static instance: NotificationService;
  private permission: NotificationPermission = 'default';

  private constructor() {
    this.permission = Notification.permission;
  }

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  // Request notification permission from user
  async requestPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      console.warn('This browser does not support desktop notification');
      return 'denied';
    }

    if (this.permission === 'granted') {
      return this.permission;
    }

    if (this.permission !== 'denied') {
      this.permission = await Notification.requestPermission();
    }

    return this.permission;
  }

  // Check if notifications are supported and permitted
  isSupported(): boolean {
    return 'Notification' in window;
  }

  isPermitted(): boolean {
    return this.permission === 'granted';
  }

  // Show a desktop notification
  async showNotification(options: NotificationOptions): Promise<Notification | null> {
    if (!this.isSupported()) {
      console.warn('Notifications not supported');
      return null;
    }

    if (!this.isPermitted()) {
      const permission = await this.requestPermission();
      if (permission !== 'granted') {
        console.warn('Notification permission denied');
        return null;
      }
    }

    try {
      const notification = new Notification(options.title, {
        body: options.body,
        icon: options.icon || '/favicon.ico',
        tag: options.tag,
        requireInteraction: options.requireInteraction || false,
      });

      // Auto-close notification after 5 seconds
      setTimeout(() => {
        notification.close();
      }, 5000);

      return notification;
    } catch (error) {
      console.error('Failed to show notification:', error);
      return null;
    }
  }

  // Play notification sound
  playNotificationSound(): void {
    try {
      // Create audio element for notification sound
      const audio = new Audio();
      audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmUeB0aN0fLadyoH';
      audio.volume = 0.1;
      audio.play().catch(e => console.warn('Could not play notification sound:', e));
    } catch (error) {
      console.warn('Could not create notification sound:', error);
    }
  }

  // Show notification with sound based on settings
  async showNotificationWithSettings(
    options: NotificationOptions,
    settings: { 
      enabled: boolean; 
      sound: boolean; 
      desktop: boolean; 
    }
  ): Promise<void> {
    if (!settings.enabled) {
      return;
    }

    if (settings.sound) {
      this.playNotificationSound();
    }

    if (settings.desktop) {
      await this.showNotification(options);
    }
  }
}

export const notificationService = NotificationService.getInstance();