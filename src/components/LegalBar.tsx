import { Link } from "react-router-dom";
import { content } from "../content";

/**
 * Every published site needs its privacy and terms reachable, and each
 * template's own footer is hand-authored and cannot be edited safely across the
 * library. This sits under the footer instead: inherited colour at low opacity,
 * no background of its own, so it reads as part of whatever design it lands in.
 */
export default function LegalBar() {
  return (
    <div className="w-full px-6 py-5 text-center text-xs opacity-55">
      <Link to="/privacy" className="underline underline-offset-4">{content.legal.privacy.title}</Link>
      <span className="mx-3">·</span>
      <Link to="/terms" className="underline underline-offset-4">{content.legal.terms.title}</Link>
    </div>
  );
}