import { NotificationsRepository } from '@/domain/notification/application/repositories/notifications-repository';
import { Notification } from '@/domain/notification/enterprise/entities/notification';

export class InMemoryNotificationRepository implements NotificationsRepository {
  public items: Notification[] = [];

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.items.find(
      (notification) => notification.id.toString() === notificationId,
    );

    if (!notification) {
      return null;
    }

    return notification;
  }

  async create(notification: Notification) {
    this.items.push(notification);
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.items.findIndex(
      (item) => item.id === notification.id,
    );

    if (notificationIndex === -1) {
      throw new Error('Notification not found');
    }

    this.items[notificationIndex] = notification;
  }
}
