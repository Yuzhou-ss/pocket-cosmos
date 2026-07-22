// 快捷入口本地存储工具
const STORAGE_KEY = "quick-access-list";

export interface QuickAccessItem {
  id: string;
  name: string;
  link: string;
  logo?: string;
}

const genId = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

export const getQuickAccessListLocal = (): QuickAccessItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const save = (list: QuickAccessItem[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
};

export const createQuickAccessLocal = (
  item: Omit<QuickAccessItem, "id">,
): QuickAccessItem => {
  const list = getQuickAccessListLocal();
  const newItem: QuickAccessItem = { ...item, id: genId() };
  list.push(newItem);
  save(list);
  return newItem;
};

export const updateQuickAccessLocal = (
  id: string,
  patch: Partial<Omit<QuickAccessItem, "id">>,
): QuickAccessItem | null => {
  const list = getQuickAccessListLocal();
  const idx = list.findIndex((it) => it.id === id);
  if (idx === -1) return null;
  list[idx] = { ...list[idx], ...patch };
  save(list);
  return list[idx];
};

export const deleteQuickAccessLocal = (id: string): boolean => {
  const list = getQuickAccessListLocal();
  const next = list.filter((it) => it.id !== id);
  save(next);
  return next.length !== list.length;
};
