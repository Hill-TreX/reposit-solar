import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { createSolarScene } from "../lib/SolarHouseScene";
import AnimatedCounter from "./AnimatedCounter";

const SLIDER_TICKS = 41;

export default function SolarCalculator() {
  const [dailyUse, setDailyUse] = useState(18);
  const [panelOutput, setPanelOutput] = useState(440);
  const [sunHours, setSunHours] = useState(4.5);
  const sceneRef = useRef<HTMLDivElement>(null);
  const solarScene = useRef<{ start: () => void; setPanelCount: (count: number) => void; setBatteryCapacity: (capacity: number) => void } | null>(null);

  const setup = useMemo(() => {
    const panels = Math.min(72, Math.ceil((dailyUse * 1.25) / ((panelOutput / 1000) * sunHours)));
    const battery = Math.max(5, Math.ceil(dailyUse * 0.75));
    const cost = panels * 650 + battery * 520 + 1800;
    return { panels, battery, cost, system: panels * panelOutput / 1000, saving: Math.round(cost * 0.143) };
  }, [dailyUse, panelOutput, sunHours]);

  useEffect(() => {
    if (!sceneRef.current || solarScene.current || !window.THREE) return;
    solarScene.current = createSolarScene(sceneRef.current, null);
    solarScene.current.start();
  }, []);

  useEffect(() => {
    solarScene.current?.setPanelCount(setup.panels);
    solarScene.current?.setBatteryCapacity(setup.battery);
  }, [setup]);

  return (
    <section className="calculator-section" aria-labelledby="calculator-heading">
      <div className="calculator-wrap">
        <p className="calculator-eyebrow">Your energy, visualised</p>
        <h2 id="calculator-heading">Build your <span>solar system</span> in seconds.</h2>
        <p className="calculator-intro">Move the dials to estimate the panels, battery storage and investment needed to power your home. A simple starting point before your tailored quote.</p>

        <div className="calculator-grid">
          <div className="calculator-card">
            <div className="solar-home-visual" ref={sceneRef} aria-label="Interactive 3D model of a house with solar panels and a battery" role="img">
              <span className="solar-scene-loading">Loading 3D home…</span>
            </div>
            <p className="calculator-visual-note">Drag to rotate · scroll to zoom</p>
            <h3>Tell us about your home</h3>
            <Slider label="Daily electricity use" value={`${dailyUse} kWh`} min={5} max={60} valueNumber={dailyUse} onChange={setDailyUse} />
            <div className="calculator-fields">
              <Slider label="Panel output" value={`${panelOutput} W`} min={250} max={600} step={10} valueNumber={panelOutput} onChange={setPanelOutput} />
              <Slider label="Sun hours" value={`${sunHours} h`} min={2} max={7} step={0.5} valueNumber={sunHours} onChange={setSunHours} />
            </div>
          </div>

          <aside className="calculator-result" aria-live="polite">
            <h3>Your recommended setup</h3>
            <p className="calculator-cost"><AnimatedCounter value={setup.cost} prefix="£" /> <small>estimated</small></p>
            <p className="calculator-result-note">A practical system sized around your daily energy needs.</p>
            <div className="calculator-stats">
              <Stat value={setup.panels} label="solar panels" />
              <Stat value={setup.battery} suffix=" kWh" label="battery storage" />
              <Stat value={setup.system} decimals={1} suffix=" kW" label="system output" />
              <Stat value={setup.saving} prefix="£" label="estimated annual saving" />
            </div>
            <Link className="calculator-cta" to="/contact">Get my tailored quote <span>→</span></Link>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Slider({ label, value, min, max, step = 1, valueNumber, onChange }: { label: string; value: string; min: number; max: number; step?: number; valueNumber: number; onChange: (value: number) => void }) {
  const [dragging, setDragging] = useState(false);
  const suffix = value.replace(String(valueNumber), "");
  const decimals = step < 1 ? 1 : 0;
  const marker = Math.round(((valueNumber - min) / (max - min)) * (SLIDER_TICKS - 1));

  const ticks = useMemo(() => {
    return Array.from({ length: SLIDER_TICKS }, (_, index) => {
      if (index === marker) {
        return <span key={index} className="slider-tick slider-tick-active" />;
      }
      return (
        <span
          key={index}
          className={`slider-tick ${index < marker ? "slider-tick-past" : "slider-tick-future"}`}
        />
      );
    });
  }, [marker]);

  return (
    <label className="calculator-field">
      <span>
        <span>{label}</span>
        <strong><AnimatedCounter value={valueNumber} decimals={decimals} suffix={suffix} /></strong>
      </span>
      <div className={`slider-track${dragging ? " slider-dragging" : ""}`}>
        <div className="slider-ticks" aria-hidden="true">
          {ticks}
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={valueNumber}
          aria-label={label}
          onPointerDown={() => setDragging(true)}
          onPointerUp={() => setDragging(false)}
          onPointerCancel={() => setDragging(false)}
          onChange={(event) => {
            onChange(Number(event.target.value));
            setDragging(false);
          }}
        />
      </div>
    </label>
  );
}

function Stat({ value, label, decimals = 0, prefix, suffix }: { value: number; label: string; decimals?: number; prefix?: string; suffix?: string }) {
  return <div className="calculator-stat"><strong><AnimatedCounter value={value} decimals={decimals} prefix={prefix} suffix={suffix} /></strong><span>{label}</span></div>;
}
