import type { ReactNode } from "react";

export type DeviceMode = "smartphone" | "tablet";

export type SmartphoneNotification = {
  id: string;
  app: string;
  title: string;
  message: string;
  time?: string;
  color?: string;
};

export type SmartphoneFrameProps = {
  children: ReactNode;
  deviceMode?: DeviceMode;
  notifications?: SmartphoneNotification[];
  showFrontCamera?: boolean;
  showNotificationHint?: boolean;
  batteryLevel?: number;
  online?: boolean;
  className?: string;
  onBack?: () => void;
  onHome?: () => void;
  onRotate?: () => void;
  onNotificationsChange?: (notifications: SmartphoneNotification[]) => void;
};

export type DevicePreviewProps = Omit<SmartphoneFrameProps, "deviceMode" | "onRotate"> & {
  initialMode?: DeviceMode;
  responsive?: boolean;
};
