import { BellRing, Boxes, Palette } from "lucide-react";

import { DevicePreview } from "../lib/device-preview";

const notifications = [
  { id: "welcome", app: "React Smartphone UI", title: "Template pronto", message: "Arraste a barra superior ou clique nela.", color: "#38bdf8" },
  { id: "components", app: "React", title: "Conteúdo livre", message: "Renderize qualquer aplicação dentro do frame.", color: "#a78bfa" },
];

export function App() {
  return (
    <div className="min-h-screen bg-zinc-950 p-6 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-7xl flex-col items-center justify-center gap-8 lg:flex-row">
        <section className="max-w-md space-y-4">
          <span className="text-sm font-semibold uppercase tracking-[.2em] text-sky-400">React UI package</span>
          <h1 className="text-4xl font-semibold">React Smartphone UI Template</h1>
          <p className="text-zinc-400">Um frame reutilizável com smartphone, tablet, notificações, brilho e navegação via callbacks.</p>
          <ul className="space-y-2 text-sm text-zinc-300"><li className="flex gap-2"><Boxes size={18}/> Composição por children</li><li className="flex gap-2"><BellRing size={18}/> Central de notificações</li><li className="flex gap-2"><Palette size={18}/> CSS customizável</li></ul>
        </section>
        <DevicePreview notifications={notifications} onHome={() => alert("Home")} onBack={() => history.back()}>
          <div className="sui-demo-screen"><p>Quinta-feira</p><h1>14:35</h1><div className="sui-demo-card"><strong>Seu aplicativo aqui</strong><p>O frame não depende de Next.js nem de um roteador específico.</p></div></div>
        </DevicePreview>
      </div>
    </div>
  );
}
