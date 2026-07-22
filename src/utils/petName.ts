const PET_NAME_KEY = "pet-name";
const DEFAULT_PET_NAME = "闪闪";

export const getPetName = (): string => {
  return localStorage.getItem(PET_NAME_KEY) || DEFAULT_PET_NAME;
};

export const setPetName = (name: string): void => {
  const trimmed = name.trim();
  if (!trimmed) return;
  localStorage.setItem(PET_NAME_KEY, trimmed);
};
