export interface Settings {
  onboarded: boolean;
  colorScheme: "dark" | "light";
  actions: SettingsAction;
}
export type SettingsData = Omit<Settings, "actions">;

interface SettingsAction {
  updateSettings: (setting: Partial<Settings>) => void;
}
