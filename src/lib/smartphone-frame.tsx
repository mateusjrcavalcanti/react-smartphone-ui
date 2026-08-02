import {
  BatteryMedium,
  Bell,
  ChevronDown,
  ChevronLeft,
  Home,
  RotateCw,
  Wifi,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import type { SmartphoneFrameProps } from "./types";

const layout = {
  smartphone: { width: 380, height: 760, radius: 56, screenRadius: 46 },
  tablet: { width: 980, height: 580, radius: 52, screenRadius: 42 },
} as const;

export function SmartphoneFrame({
  children,
  deviceMode = "smartphone",
  notifications: externalNotifications = [],
  showFrontCamera = true,
  showNotificationHint = true,
  batteryLevel = 82,
  online = true,
  className = "",
  onBack,
  onHome,
  onRotate,
  onNotificationsChange,
}: SmartphoneFrameProps) {
  const config = layout[deviceMode];
  const [now, setNow] = useState(() => new Date());
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const [notifications, setNotifications] = useState(externalNotifications);
  const startY = useRef(0);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => setNotifications(externalNotifications), [externalNotifications]);

  const time = useMemo(
    () => now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
    [now],
  );

  const removeNotification = (id: string) => {
    const next = notifications.filter((item) => item.id !== id);
    setNotifications(next);
    onNotificationsChange?.(next);
  };

  return (
    <div className={`sui-device ${className}`} data-device-mode={deviceMode}>
      <div
        className="sui-shell"
        style={{
          width: config.width,
          height: config.height,
          borderRadius: config.radius,
        }}
      >
        <div
          className="sui-screen"
          style={{ borderRadius: config.screenRadius, filter: `brightness(${brightness}%)` }}
        >
          <button
            className="sui-statusbar"
            type="button"
            onClick={() => setDrawerOpen(true)}
            onPointerDown={(event) => {
              startY.current = event.clientY;
            }}
            onPointerUp={(event) => {
              if (event.clientY - startY.current > 24) setDrawerOpen(true);
            }}
          >
            <span>{time}</span>
            {showFrontCamera && <span className="sui-camera"><i /><i /></span>}
            <span className="sui-indicators">
              <Bell size={14} />
              <Wifi size={15} className={online ? "" : "sui-offline"} />
              <BatteryMedium size={17} />
              <small>{Math.max(0, Math.min(100, batteryLevel))}%</small>
            </span>
          </button>

          {showNotificationHint && !drawerOpen && (
            <span className="sui-hint"><ChevronDown size={13} /> deslize para notificações</span>
          )}

          <main className="sui-content">{children}</main>

          <nav className="sui-navbar" aria-label="Navegação do dispositivo">
            <button type="button" onClick={onBack} aria-label="Voltar"><ChevronLeft /></button>
            <button type="button" onClick={onHome} aria-label="Início"><Home /></button>
            <button type="button" onClick={onRotate} aria-label="Girar"><RotateCw /></button>
          </nav>

          <aside className={`sui-drawer ${drawerOpen ? "sui-drawer-open" : ""}`}>
            <div className="sui-drawer-head">
              <div><strong>{time}</strong><span>{now.toLocaleDateString("pt-BR")}</span></div>
              <button type="button" onClick={() => setDrawerOpen(false)}><X /></button>
            </div>
            <label className="sui-brightness">
              Brilho
              <input
                type="range"
                min="25"
                max="110"
                value={brightness}
                onChange={(event) => setBrightness(Number(event.target.value))}
              />
            </label>
            <div className="sui-notifications">
              {notifications.map((notification) => (
                <article key={notification.id} className="sui-notification">
                  <span className="sui-app-dot" style={{ background: notification.color ?? "#3b82f6" }} />
                  <div><small>{notification.app}</small><strong>{notification.title}</strong><p>{notification.message}</p></div>
                  <button type="button" onClick={() => removeNotification(notification.id)}><X size={15} /></button>
                </article>
              ))}
              {notifications.length === 0 && <p className="sui-empty">Nenhuma notificação</p>}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
