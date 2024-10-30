import { describe, expect, it } from 'vitest';
import { DeleteNotificationUseCase } from '../delete-notification-use-case';
import { NotificationsRepositoryMock } from '../../../../__tests__/mocks/repositories';
import {
  StockLevelNotificationsFaker,
  ExpirationDateNotificationsFaker,
} from '../../../../__tests__/fakers';
import { NotFoundError } from '../../../errors';

describe('DeleteNotificationUseCase', () => {
  it('should delete an existing stock level notification', async () => {
    const notificationsRepository = new NotificationsRepositoryMock();
    const useCase = new DeleteNotificationUseCase(notificationsRepository);

    const fakeNotification = StockLevelNotificationsFaker.fakeStockLevelNotification();
    await notificationsRepository.addStockLevelNotification(fakeNotification);

    await expect(
      useCase.execute({ notificationId: fakeNotification.id }),
    ).resolves.toBeUndefined();

    const foundNotification = await notificationsRepository.findById(fakeNotification.id);
    expect(foundNotification).toBeNull();
  });

  it('should delete an existing expiration date notification', async () => {
    const notificationsRepository = new NotificationsRepositoryMock();
    const useCase = new DeleteNotificationUseCase(notificationsRepository);

    const fakeNotification = ExpirationDateNotificationsFaker.fakeExpirationDateNotification();
    await notificationsRepository.addExpirationDateNotification(fakeNotification);

    await expect(
      useCase.execute({ notificationId: fakeNotification.id }),
    ).resolves.toBeUndefined();

    const foundNotification = await notificationsRepository.findById(fakeNotification.id);
    expect(foundNotification).toBeNull();
  });

  it('should throw NotFoundError when notification does not exist', async () => {
    const notificationsRepository = new NotificationsRepositoryMock();
    const useCase = new DeleteNotificationUseCase(notificationsRepository);

    const nonExistentNotificationId = 'non-existent-notification-id';

    await expect(
      useCase.execute({ notificationId: nonExistentNotificationId }),
    ).rejects.toThrow(NotFoundError);
  });
});
