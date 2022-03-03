import { renderHook, act } from '@testing-library/react-hooks';
import { useConfirmationDialog } from './confirmation-dialog.hook';
import { Lookup } from 'common/models';

describe('confirmation dialog hook specs', () => {
  it('"isOpen" state should be "false" by default', () => {
    // Arrange

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    // Assert
    expect(result.current.isOpen).toEqual(false);
  });

  it('"itemToDelete" state should be an empty object with "Lookup" interface by default', () => {
    // Arrange

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    // Assert
    expect(result.current.itemToDelete).toEqual<Lookup>({
      id: '',
      name: '',
    });
  });

  it('"onAccept", "onClose" and "onOpenDialog" should be functions by default', () => {
    // Arrange

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    // Assert
    expect(result.current.onAccept).toEqual(expect.any(Function));
    expect(result.current.onClose).toEqual(expect.any(Function));
    expect(result.current.onOpenDialog).toEqual(expect.any(Function));
  });

  it('when calling "onOpenDialog" with an item as parameter should change "isOpen" state to "true" and "itemToDelete" to the passed item', () => {
    // Arrange
    const testItem: Lookup = {
      id: '123',
      name: 'Ana Guerrero',
    };

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onOpenDialog(testItem);
    });

    // Assert
    expect(result.current.isOpen).toEqual(true);
    expect(result.current.itemToDelete).toEqual(testItem);
  });

  it('when calling "onAccept" after calling "onOpenDialog" with an item as parameter, should set "itemToDelete" to an empty object', () => {
    // Arrange
    const testItem: Lookup = {
      id: '123',
      name: 'Ana Guerrero',
    };

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onOpenDialog(testItem);
    });
    expect(result.current.itemToDelete).toEqual(testItem);

    act(() => {
      result.current.onAccept();
    });

    // Assert
    expect(result.current.itemToDelete).toEqual<Lookup>({
      id: '',
      name: '',
    });
  });

  it('when calling "onClose" after calling "onOpenDialog" with an item as parameter, should set "isOpen" to false', () => {
    // Arrange
    const testItem: Lookup = {
      id: '123',
      name: 'Ana Guerrero',
    };

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onOpenDialog(testItem);
    });
    expect(result.current.isOpen).toEqual(true);

    act(() => {
      result.current.onClose();
    });

    // Assert
    expect(result.current.isOpen).toEqual(false);
  });
});
