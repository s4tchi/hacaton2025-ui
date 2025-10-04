import { EditType } from "./constants";

export const NAVIGATION_BUTTON_LABELS: Record<EditType, string> = {
  [EditType.ADD_MARKER]: 'Добавить маркер',
  [EditType.REMOVE_MARKER]: 'Удалить маркер',
}

export const MARKERS_COUNT_LABEL = 'Количество маркеров:';

export const IS_CONNECTED_LABEL = {
  connected: 'Есть соединение с сервером',
  disconnected: 'Нет соединения с сервером',
}